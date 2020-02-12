import * as ts from "typescript";
import ObfuscationMap from "./obfuscationMap";
import ObfuscationElement from "./structure/obfuscationElement";
import * as fs from "fs"

function breakFilePath(filePath: string): string[] {
	let match = filePath.match(/(.+\/)*(.+)$/)
	return [match[1] == undefined ? "" : match[1], match[2]]
}

interface PropertyNode {
	symbol: ts.Symbol
	parentTypeName: string
	isStart: boolean
}

export default class Obfuscator {
	public static checker: ts.TypeChecker
	public static obfuscationCount: number = 0

	public static transformer(context) {
		ObfuscationMap.currentSourceFile = ""
		return (file) => {
			function visiter(node, context) {
				ObfuscationMap.echoSourceFile(node)

				function changeNode(newNode) {
					Obfuscator.obfuscationCount++
					return newNode
				}
				
				if(node.kind == ts.SyntaxKind.Identifier) {
					// console.log(node.getText(), Obfuscator.kindToName(node.parent.kind))
					
					switch(node.parent.kind) {
						// dealing with property chains and such
						case ts.SyntaxKind.PropertyAccessExpression: {
							let property = Obfuscator.getPropertyAccessChainType(node, node.parent as ts.PropertyAccessExpression)
							// console.log(`---- ${node.getText()}'s type is ${property.parentTypeName}`)
							if(property.symbol) {
								// if we aren't the start, we're basically guarenteed to be a member of a class
								if(!property.isStart) {
									if(property.parentTypeName
										&& (!(property.symbol as any).parent 
											|| !(property.symbol as any).parent.parent
											|| (property.symbol as any).parent.parent.valueDeclaration.kind == ts.SyntaxKind.SourceFile)) {

										let obfuscatedElements = ObfuscationMap.getObfuscatedClassesFromType(property.parentTypeName)
										if(obfuscatedElements[0]) {
											node = changeNode(ts.createIdentifier(ObfuscationMap.getObfuscatedStringFromScope(obfuscatedElements, node.getText())))
										}
										else if(property.symbol && (property.symbol as any).parent) {
											try {
												let type = Obfuscator.checker.getTypeAtLocation((property.symbol as any).parent.getDeclarations()[0]) as any
												let obfuscatedElements2 = ObfuscationMap.getObfuscatedClassesFromType(Obfuscator.typeToString(type))
												if(obfuscatedElements2[0]) {
													node = changeNode(ts.createIdentifier(ObfuscationMap.getObfuscatedStringFromScope(obfuscatedElements2, node.getText())))
												}
											}
											// ReactDOM errors out here, and breaks the typescript API. idk why, its been months since i understood this code, so fuck it here's a try/catch
											catch {
												// if it breaks, treat the reference like a local/global variable
												let newNode = Obfuscator.createLocalIdentifier(node)
												node = newNode != undefined ? newNode : node
											}
										}
									}
								}
								// if we aren't the start, then treat us like a local/global variable
								else {
									let newNode = Obfuscator.createLocalIdentifier(node)
									node = newNode != undefined ? newNode : node
								}
							}
							break
						}
						
						// dealing with class declarations
						case ts.SyntaxKind.InterfaceDeclaration:
						case ts.SyntaxKind.ClassDeclaration: {
							node = changeNode(ts.createIdentifier(ObfuscationMap.getObfuscatedClassString(node.getText())))
							break
						}
						
						// dealing with new creation expression
						case ts.SyntaxKind.NewExpression: {
							let newNode = Obfuscator.createLocalIdentifier(node)
							node = newNode != undefined ? newNode : node
							break
						}
						
						// dealing with property assignments for objects
						case ts.SyntaxKind.PropertyAssignment: {
							let propertyAssignment = node.parent as ts.PropertyAssignment
							// if the property initializer is the node, then we need to obfuscate. this means its likely a local variable/global
							if(propertyAssignment.initializer == node) {
								let newNode = Obfuscator.createLocalIdentifier(node)
								node = newNode != undefined ? newNode : node
							}
							// we're dealing with the property name itself
							else {
								// get the expression that is us defining the object literal and get the type of it
								let objectLiteralExpression = node.parent.parent as ts.ObjectLiteralExpression
								let type = Obfuscator.checker.getContextualType(objectLiteralExpression)

								// once we got the type, now transform the property
								if(type) {
									let typeName = Obfuscator.typeToString(type)
									let closestScope = ObfuscationMap.getObfuscatedClassesFromType(typeName)
									// get the class from the type name, then get the property value using the class as our scope
									if(closestScope) {
										node = changeNode(ts.createIdentifier(ObfuscationMap.getObfuscatedStringFromScope(closestScope, node.getText())))
									}
								}
							}
							break
						}
						
						// dealing with binding expressions
						case ts.SyntaxKind.BindingElement: {
							let symbol = Obfuscator.checker.getSymbolAtLocation((node.parent.parent.parent as any).initializer)

							if(symbol != undefined) {
								let typeName = Obfuscator.typeToString(Obfuscator.checker.getTypeOfSymbolAtLocation(symbol, symbol.declarations[0]))
								if(typeName) {
									let newNode = changeNode(ts.createIdentifier(ObfuscationMap.getObfuscatedStringFromScope(ObfuscationMap.getObfuscatedClassesFromType(typeName), node.getText())))
									node = newNode != undefined ? newNode : node
								}
								else {
									let newNode = Obfuscator.createLocalIdentifier(node)
									node = newNode != undefined ? newNode : node
								}
							}
							// if it doesn't exist, treat it like a local variable
							else {
								var newNode = Obfuscator.createLocalIdentifier(node)
								node = newNode != undefined ? newNode : node
							}
							break
						}
						
						// dealing with class related declarations
						case ts.SyntaxKind.PropertySignature:
						case ts.SyntaxKind.PropertyDeclaration:
						case ts.SyntaxKind.MethodSignature:
						case ts.SyntaxKind.MethodDeclaration: {
							var newNode = Obfuscator.createLocalIdentifier(node, true)
							node = newNode != undefined ? newNode : node
							break
						}

						// dealing with shorthand assignments
						case ts.SyntaxKind.ShorthandPropertyAssignment: {
							function temp(obfuscatedClass: ObfuscationElement[], node: ts.Node): ts.Node {
								// get the obfuscated property name from the type
								let obfuscatedProperty = ObfuscationMap.getObfuscatedFromScope(obfuscatedClass, node.getText()).obfuscation
								// get the obfuscated name of the variable
								let obfuscatedVariable = Obfuscator.createLocalIdentifier(node) as any

								if(obfuscatedVariable) {
									obfuscatedVariable.escapedText = `${obfuscatedProperty}: ${obfuscatedVariable.escapedText}`
									node = obfuscatedVariable
								}
								return node
							}
							
							// do some property access bullshit to read the correct type
							let obfuscatedClass = ObfuscationMap.getObfuscatedClassesFromType(Obfuscator.typeToString(Obfuscator.checker.getTypeAtLocation(node.parent.parent.symbol.getDeclarations()[0].parent)))

							if(obfuscatedClass[0]) {
								node = temp(obfuscatedClass, node)
							}
							else {
								// try to find the class based on the properties we define in our object
								let potentialInterface = ObfuscationMap.findClassByProperties(Array.from(node.parent.parent.symbol.members.keys()))
								if(potentialInterface) {
									node = temp([potentialInterface], node)
								}
								else {
									var newNode = Obfuscator.createLocalIdentifier(node)
									node = newNode != undefined ? newNode : node
								}
							}
							break
						}

						case ts.SyntaxKind.JsxAttribute: {
							try {
								let className = node.parent.parent.parent.tagName.getText()
								let obfuscatedClass = ObfuscationMap.getObfuscatedClass(className)
								if(obfuscatedClass) {
									let propertyClassName = obfuscatedClass.typeArguments[0]
									let propertyClass = ObfuscationMap.getObfuscatedClass(propertyClassName)
									let obfuscated = ObfuscationMap.getObfuscatedStringFromScope([propertyClass], node.getText())
									
									let newNode = changeNode(ts.createIdentifier(obfuscated))
									node = newNode != undefined ? newNode : node
								}
							}
							catch {

							}
							break
						}
						
						// dealing with various accesses. usually, this code is triggered when a local/global variable is referenced
						// i don't want to have a default clause that encompasses all of this, because this isn't all the remaining "kinds" left. these are the kinds that are compatible with the code ran in the case itself. other kinds not included in the entire switch statement might not be compatible with the code ran in the case. in order to reduce errors and make bug checking easier, it is better to list out the 5000 different kinds that are compatible with the code
						case ts.SyntaxKind.BinaryExpression:
						case ts.SyntaxKind.VariableDeclaration:
						case ts.SyntaxKind.Parameter:
						case ts.SyntaxKind.FunctionDeclaration:
						case ts.SyntaxKind.IfStatement:
						case ts.SyntaxKind.WhileStatement:
						case ts.SyntaxKind.ForStatement:
						case ts.SyntaxKind.ForInStatement:
						case ts.SyntaxKind.ForOfStatement:
						case ts.SyntaxKind.DoStatement:
						case ts.SyntaxKind.CaseClause:
						case ts.SyntaxKind.SwitchStatement:
						case ts.SyntaxKind.CallExpression:
						case ts.SyntaxKind.PostfixUnaryExpression:
						case ts.SyntaxKind.PrefixUnaryExpression:
						case ts.SyntaxKind.ElementAccessExpression:
						case ts.SyntaxKind.ReturnStatement:
						case ts.SyntaxKind.YieldExpression:
						case ts.SyntaxKind.TypeOfExpression:
						case ts.SyntaxKind.CatchClause:
						case ts.SyntaxKind.SpreadElement:
						case ts.SyntaxKind.ImportClause:
						case ts.SyntaxKind.ImportSpecifier:
						case ts.SyntaxKind.AsExpression:
						case ts.SyntaxKind.TemplateSpan:
						case ts.SyntaxKind.ExpressionStatement:
						case ts.SyntaxKind.ExpressionWithTypeArguments:
						case ts.SyntaxKind.GetAccessor:
						case ts.SyntaxKind.SetAccessor:
						case ts.SyntaxKind.ConditionalExpression:
						case ts.SyntaxKind.Decorator:
						case ts.SyntaxKind.TypeAssertionExpression:
						case ts.SyntaxKind.ArrayLiteralExpression:
						case ts.SyntaxKind.ExportAssignment:
						case ts.SyntaxKind.TypeReference: 
						case ts.SyntaxKind.JsxExpression: {
							// if we're just a stray identifier inside one of the kinds of expressions, that means we're probably a local variable. look us up	
							var newNode = Obfuscator.createLocalIdentifier(node)
							node = newNode != undefined ? newNode : node
							break
						}
					}
				}
				// this code replaces a specially formatted string with an obfuscated property name
				else if(node.kind == ts.SyntaxKind.StringLiteral) {
					let match = node.text.match(/(?<=%\[)(\w+):\W(\w+)(?=\])/g)
					if(match) {
						for(let element of match) {
							let [className, property] = element.split(": ")
							let obfuscatedElement = ObfuscationMap.getObfuscatedFromScope([ObfuscationMap.getObfuscatedClass(className)], property)
							if(obfuscatedElement) {
								node = ts.createStringLiteral(node.text.replace(`%[${element}]`, obfuscatedElement.obfuscation))
							}
						}
					}
				}
				
				return ts.visitEachChild(node, (childNode) => visiter(childNode, context), context)
			}
	
			return visiter(file, context)
		}
	}

	public static createLocalIdentifier(node: ts.Node, isDeclaration: boolean = false): ts.Node {
		function changeNode(newNode) {
			Obfuscator.obfuscationCount++
			return newNode
		}

		if(!isDeclaration) {
			let symbol = Obfuscator.checker.getSymbolAtLocation(node)

			if(symbol) {
				let type = Obfuscator.checker.getTypeAtLocation(symbol.getDeclarations()[0]) as any
			
				// check to see if this symbol is an export (holy shit its long)
				if((node.getText() == Obfuscator.typeToString(type) || type.symbol && type.symbol.parent && type.symbol.parent.exports && type.symbol.parent.exports.get(node.getText()))
					&& type.symbol.valueDeclaration && type.symbol.valueDeclaration.parent && type.symbol.valueDeclaration.parent.fileName && type.symbol.valueDeclaration.parent.fileName != node.getSourceFile().fileName) {
	
					// get the real exported symbol name now
					
					let obfuscation = ObfuscationMap.getObfuscatedStringFromScope([ObfuscationMap.root], node.getText())
					// if we did actually obfuscate, then continue
					if(obfuscation != node.getText()) {
						if(!(type.symbol && type.symbol.parent && type.symbol.parent.exports && type.symbol.parent.exports.get(node.getText()))) {
							obfuscation = "default"
						}
						
						let fileName = breakFilePath(type.symbol.valueDeclaration.parent.fileName)[1].replace(/\..+/, "") + "_1"
						return changeNode(ts.createIdentifier(`${fileName}.${obfuscation}`))
					}
				}
			}
		}
		
		var closestScope = ObfuscationMap.getClosestScope(node.parent)
		if(closestScope) {
			let obfuscation = ""
			while((obfuscation = ObfuscationMap.getObfuscatedStringFromScope([closestScope, ObfuscationMap.root], node.getText())) == node.getText()
				&& closestScope != ObfuscationMap.root) {
				
				closestScope = closestScope.parent
			}

			return obfuscation == node.getText() ? undefined : changeNode(ts.createIdentifier(obfuscation))
		}
		else {
			let obfuscation = ObfuscationMap.getObfuscatedStringFromScope([ObfuscationMap.root], node.getText())
			return obfuscation == node.getText() ? undefined : changeNode(ts.createIdentifier(obfuscation))
		}
	}

	public static kindToName(kind) {
		for(let property of Object.getOwnPropertyNames(ts.SyntaxKind)) {
			if(ts.SyntaxKind[property] == kind) {
				return property
			}
		}
	}
	
	// gets a chain of property accesses, which allows us to obfuscate code
	public static getPropertyAccessChainType(identifier: ts.Identifier, node: ts.PropertyAccessExpression): PropertyNode {
		let symbol = this.checker.getSymbolAtLocation(identifier)

		if(symbol) {
			var parentTypeName = this.symbolToTypeString(symbol, node)
		}

		return {
			symbol,
			parentTypeName,
			isStart: node && identifier == node.expression
		}
	}
	
	public static expressionToTypeString(expression: ts.Expression): string {
		return this.typeToString(this.checker.getContextualType(expression))
	}

	public static symbolToTypeString(symbol: ts.Symbol, location: ts.Node): string {
		if((symbol as any).parent) {
			let parent = (symbol as any).parent

			if(parent.getDeclarations()[0].localSymbol) {
				return this.sanitizeTypeString(parent.getDeclarations()[0].localSymbol.getEscapedName())
			}
			else {
				return this.typeToString(this.checker.getTypeOfSymbolAtLocation(parent, parent.declarations[0]))
			}
		}
	}

	public static typeToString(type: ts.Type): string {
		return this.sanitizeTypeString(this.checker.typeToString(type))
	}

	private static sanitizeTypeString(value: string): string {
		value = value.replace(/typeof /g, "")
		value = value.replace(/;/g, "")
		if(value.indexOf("=>") != -1) {
			let split = value.split(" => ")
			value = split[split.length - 1]
		}

		return value.replace("[]", "")
	}
}