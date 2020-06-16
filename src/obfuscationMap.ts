import * as ts from "typescript"
import Obfuscator from "./obfuscator";
import * as fs from "fs";
import codepoints from "./codepoints"
import { string, elementType } from "prop-types";
import ObfuscationElement from "./structure/obfuscationElement";
import ObfuscationClass from "./structure/obfuscationClass";
import ObfuscationRoot from "./structure/obfuscationRoot";
import ObfuscationMethod from "./structure/obfuscationMethod";
import ObfuscationFunction from "./structure/obfuscationFunction";
import ObfuscationProperty from "./structure/obfuscationProperty";

function breakFilePath(filePath: string): string[] {
	let match = filePath.match(/(.+\/)*(.+)$/)
	return [match[1] == undefined ? "" : match[1], match[2]]
}

function resolvePath(filePath: string): string {
	let split = filePath.split("/")
	let output = []
	for(let element of split) {
		if(element == "..") {
			output.pop()
		}
		else if(element != ".") {
			output.push(element)
		}
	}

	return output.join("/")
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hashString(input: string, extraNumbers: number[]): number {
	let hash = 0
	
	for(let number of extraNumbers) {
		hash = (hash << 5) - hash + number
		hash = hash | 0
	}

	for(let i = 0; i < input.length; i++) {
		let character = input.charCodeAt(i)
		hash = (hash << 5) - hash + character
		hash = hash | 0
	}
	return hash
}

export default class ObfuscationMap {
	public static checker: ts.TypeChecker
	// public static obfuscatedClasses: { [key: string]: ObfuscatedElement } = {}
	public static obfuscatedClasses: Map<string, ObfuscationElement> = new Map<string, ObfuscationElement>()
	public static visitedMap: {} = {}
	public static count: number = 0;
	public static currentSourceFile: string = ""

	public static root: ObfuscationRoot

	public static totalLines: number = 0

	public static useUnicode: boolean = false

	public static debugPrint(): void {
		this.root.printScope()
		console.log(`${this.root.getCount()} obfuscated names generated`)
	}
	
	/*public static obfuscateClass(className: string, inherits: string[] = []): ObfuscatedElement {
		className = this.sanitizeName(className)
		if(!this.rootNode.isNameTaken(className)) {
			// let element = new ObfuscatedElement(this.rootNode, className, "", inherits)
			let element = new ObfuscatedClass(this.rootNode, className, "")

			for(let inherited of inherits) {
				element.parentClasses.add(inherited)
			}

			this.obfuscatedClasses.set(className, element)
			return element
		}
		else {
			return this.getObfuscatedFromScope([this.rootNode], className)
		}
	}

	public static obfuscateMethod(obfuscatedClass: ObfuscatedElement, methodName: string): ObfuscatedElement {
		methodName = this.sanitizeName(methodName)
		if(!obfuscatedClass.isNameTaken(methodName)) {
			return new ObfuscatedElement(obfuscatedClass, methodName)
		}
		else {
			return this.getObfuscatedFromScope([obfuscatedClass], methodName)
		}
	}

	public static obfuscateProperty(obfuscatedClass: ObfuscatedElement, propretyName: string): ObfuscatedElement {
		propretyName = this.sanitizeName(propretyName)
		if(!obfuscatedClass.isNameTaken(propretyName)) {
			return new ObfuscatedElement(obfuscatedClass, propretyName)
		}
		else {
			return this.getObfuscatedFromScope([obfuscatedClass], propretyName)
		}
	}

	public static obfuscateLocalVariable(scope: ObfuscatedElement, variableName: string, obfuscationOverride?: string): ObfuscatedElement {
		variableName = this.sanitizeName(variableName)
		if(!scope.isNameTaken(variableName)) {
			return new ObfuscatedElement(scope, variableName, "", [], obfuscationOverride)
		}
		else {
			return this.getObfuscatedFromScope([scope], variableName)
		}
	}*/

	public static createObfuscatedClass(name: string, node: ts.Node): ObfuscationClass {
		return new ObfuscationClass(this.root, name, node, true)
	}

	public static createObfuscatedMethod(parent: ObfuscationElement, name: string, node: ts.Node): ObfuscationMethod {
		return new ObfuscationMethod(parent, name, node, true)
	}

	public static createObfuscatedFunction(parent: ObfuscationElement, name: string, node: ts.Node): ObfuscationFunction {
		return new ObfuscationFunction(parent, name, node, true)
	}

	public static createObfuscatedProperty(parent: ObfuscationClass, name: string, node: ts.Node, isOptional: boolean): ObfuscationProperty {
		return new ObfuscationProperty(parent, name, node, isOptional)
	}

	public static createObfuscatedElement(parent: ObfuscationElement, name: string, node: ts.Node, isFinished: boolean, obfuscation?: string): ObfuscationElement {
		let element = this.getObfuscatedFromScope([parent], name)
		if(element) {
			element.node = node
			element.isFinished = isFinished
			
			if(element.isFinished && element.obfuscation == "") {
				element.generateObfuscation(obfuscation)
			}
		}
		else {
			return new ObfuscationElement(parent, name, node, isFinished, obfuscation)
		}
	}

	public static getObfuscatedName(obfuscatedNamePrefix: string = ""): string {	
		if(this.useUnicode) {
			return obfuscatedNamePrefix + String.fromCodePoint(codepoints[getRandomInt(0, codepoints.length - 1)])
		}
		else {
			return "_" + obfuscatedNamePrefix + this.getRandomName(3)
		}
	}

	public static getRandomName(length: number): string {
		function getRandomChar() {
			let number = getRandomInt(0, 61)
			if(number >= 0 && number <= 25) {
				return String.fromCharCode(65 + number)
			}
			else if(number >= 26 && number <= 51) {
				return String.fromCharCode(97 + number - 26)
			}
			else if(number >= 52 && number <= 61) {
				return String.fromCharCode(48 + number - 52)
			}
		}

		let output = ""
		for(let i = 0; i < length; i++) {
			output += getRandomChar()
		}
		return output
	}

	public static getObfuscatedClass(className: string): ObfuscationClass {
		return this.root.globalNameToObfuscation(this.sanitizeName(className)) as ObfuscationClass
	}
	
	public static getObfuscatedFromScope(scopes: ObfuscationElement[], name: string): ObfuscationElement {
		name = this.sanitizeName(name)
		for(let scope of scopes) {
			if(scope) {
				let value = scope.nameToElement(name)
				if(value != undefined) {
					return value
				}
			}
		}
		return undefined
	}

	public static getObfuscatedStringFromScope(scopes: ObfuscationElement[], name: string): string {
		let obfuscatedElement = this.getObfuscatedFromScope(scopes, this.sanitizeName(name))
		if(obfuscatedElement) {
			return obfuscatedElement.obfuscation
		}
		else {
			return name
		}
	}

	public static getObfuscatedClassString(className: string): string {
		let obfuscatedElement = this.getObfuscatedClass(this.sanitizeName(className))
		if(obfuscatedElement) {
			return obfuscatedElement.obfuscation
		}
		else {
			return className
		}
	}

	public static findClassByProperties(propertyNames: string[]): ObfuscationClass {
		let candidate: ObfuscationClass
		let highestPercent = 0
		
		// go through all classes and see if we have any that match the given property names
		for(let element of this.root.scope) {
			if(element instanceof ObfuscationClass) {
				let numberOfProperties = 0
				let foundProperties = 0
				let incompatible = false
				
				for(let property of element.scope) {
					if(property instanceof ObfuscationProperty) {
						numberOfProperties++
						if(propertyNames.includes(property.name)) {
							foundProperties++
						}
					}
					else if(property instanceof ObfuscationMethod) {
						incompatible = true
						break
					}
				}

				if(!incompatible && numberOfProperties / propertyNames.length >= 1 && highestPercent < foundProperties / numberOfProperties) {
					candidate = element
					highestPercent = foundProperties / numberOfProperties
				}
			}
		}
		return highestPercent > 0.8 ? candidate : undefined
	}

	public static getClosestScope(node: ts.Node): ObfuscationElement {
		let parent: ts.Node = node
		while(parent = parent.parent) {
			// if we find a method, find the class it belongs to and return it
			if(parent.kind == ts.SyntaxKind.MethodDeclaration) {
				return this.getObfuscatedFromScope([this.getClosestScope(parent)], (parent as ts.MethodDeclaration).name.getText())
			}
			// if we find a class, return its obfuscated element
			else if(parent.kind == ts.SyntaxKind.ClassDeclaration || parent.kind == ts.SyntaxKind.InterfaceDeclaration) {
				return this.getObfuscatedClass((parent as ts.ClassDeclaration).name.getText())
			}
			// if we find a function declaration, then we belong to the global scope
			else if(parent.kind == ts.SyntaxKind.FunctionDeclaration || parent.kind == ts.SyntaxKind.ArrowFunction || parent.kind == ts.SyntaxKind.FunctionExpression) {
				if((parent as ts.FunctionDeclaration).name == undefined) {
					return this.getObfuscatedFromScope([this.getClosestScope(parent)], this.getFunctionHash(parent))
				}
				else {
					return this.getObfuscatedFromScope([this.root], (parent as ts.FunctionDeclaration).name.getText())
				}
			}
			// if we have a constructor, just return the class
			else if(parent.kind == ts.SyntaxKind.Constructor) {
				return this.getClosestScope(parent)
			}
		}
		return this.root
	}

	public static getFunctionHash(node: ts.Node): string {
		let node2: ts.FunctionDeclaration = node as ts.FunctionDeclaration

		let hashable = ""
		for(let parameter of node2.parameters) {
			hashable += parameter.name.getText()
		}
		return `anon_${hashString(hashable, [node.pos, node.end, node.parent.pos, node.parent.end])}`
	}

	public static sanitizeName(name: string): string {
		return name.replace(/,/g, "")
	}

	public static echoSourceFile(node: ts.Node, force: boolean = false): void {
		let parent = node
		while(parent = parent.parent) {
			if(parent.kind == ts.SyntaxKind.SourceFile) {
				let sourceFile = parent as ts.SourceFile
				if(sourceFile.fileName != this.currentSourceFile || force) {
					let lines = fs.readFileSync(sourceFile.fileName).toString().split("\n").length
					this.totalLines += lines
					console.log(`\x1B[91mnow traversing\x1B[0m ${sourceFile.fileName}, ${lines} lines`)
					this.currentSourceFile = sourceFile.fileName
				}
			}
		}
	}

	public static getObfuscatedClassesFromType(typeName: string): ObfuscationElement[] {
		// handle unions
		if(typeName.indexOf(" | ") != -1) {
			let output: ObfuscationElement[] = []
			let split = typeName.split(" | ")
			for(let element of split) {
				output.push(this.getObfuscatedClass(element))
			}
			return output
		}
		else {
			return [this.getObfuscatedClass(typeName)]
		}
	}

	public static handleNode(node: ts.Node) {
		/*if(node.kind == ts.SyntaxKind.Identifier) {
			console.log(node.getText(), Obfuscator.kindToName(node.parent.kind))
		}
		else {
			console.log(Obfuscator.kindToName(node.kind))
		}*/

		switch(node.kind) {
			// handling obfuscating class names
			case ts.SyntaxKind.InterfaceDeclaration:
			case ts.SyntaxKind.ClassDeclaration: {
				let classDeclaration = node as ts.ClassDeclaration

				let obfuscatedClass = new ObfuscationClass(ObfuscationMap.root, classDeclaration.name.getText(), node, true)

				// firuging out what classes we need to inherit
				if(classDeclaration.heritageClauses) {
					for(let i = 0; i < classDeclaration.heritageClauses.length; i++) {
						for(let j = 0; j < classDeclaration.heritageClauses[i].types.length; j++) {
							let foundClass = classDeclaration.heritageClauses[i].types[j].expression.getText()
							if(foundClass) {
								obfuscatedClass.inherits.add({
									name: foundClass,
									node: classDeclaration.heritageClauses[i].types[j].expression,
								})

								let typeArguments = (classDeclaration.heritageClauses[i].types[j].expression.parent as any).typeArguments
								if(typeArguments) {
									for(let i = 0; i < typeArguments.length; i++) {
										obfuscatedClass.typeArguments.push(typeArguments[i].getText())
									}
								}
							}
						}
					}
				}
				
				break
			}
			
			// handling obfuscating class properties
			case ts.SyntaxKind.PropertySignature:
			case ts.SyntaxKind.PropertyDeclaration:
			case ts.SyntaxKind.GetAccessor:
			case ts.SyntaxKind.SetAccessor: {
				function canObfuscate(className: string) {
					let egg = ObfuscationMap.getObfuscatedClass(className)
					if(egg && egg.inherits) {
						for(let inheritedClass of egg.inherits.values()) {
							for(let type of (inheritedClass.node.parent.parent as any).types) {
								let symbol = Obfuscator.checker.getTypeAtLocation(type).getSymbol()

								let sourceFile = symbol.declarations[0].parent as ts.SourceFile
								if(symbol.declarations[0].parent.kind == ts.SyntaxKind.ModuleBlock) {
									sourceFile = symbol.declarations[0].parent.parent.parent as ts.SourceFile
								}

								if(sourceFile.fileName.includes("node_modules")) {
									if(symbol.members.get((node as any).name.getText() as any)) {
										console.log(`Found library member ${(node as any).name.getText()}, not obfuscating...`)
										return false
									}
								}
							}
						}
					}
					return true
				}
				
				if(node.parent.kind == ts.SyntaxKind.ClassDeclaration || node.parent.kind == ts.SyntaxKind.InterfaceDeclaration) {
					let propertyDeclaration = node as ts.PropertyDeclaration
					if(canObfuscate(propertyDeclaration.parent.name.getText())) {
						ObfuscationMap.createObfuscatedProperty(ObfuscationMap.getObfuscatedClass(propertyDeclaration.parent.name.getText()), propertyDeclaration.name.getText(), node, false)
					}
				}
				else if(node.parent.kind == ts.SyntaxKind.TypeLiteral) {
					let typeLiteral = node.parent as ts.TypeLiteralNode
					let propertyDeclaration = node as ts.PropertyDeclaration
					if(canObfuscate(typeLiteral.getText())) {
						ObfuscationMap.createObfuscatedProperty(ObfuscationMap.getObfuscatedClass(typeLiteral.getText()), propertyDeclaration.name.getText(), node, false)
					}
				}
				break
			}
			
			// handling obfuscating class methods
			case ts.SyntaxKind.MethodSignature:
			case ts.SyntaxKind.MethodDeclaration:
			case ts.SyntaxKind.ArrowFunction:
			case ts.SyntaxKind.FunctionExpression:
			case ts.SyntaxKind.FunctionDeclaration: {
				let methodDeclaration = node as ts.MethodDeclaration
				if(node.kind == ts.SyntaxKind.FunctionDeclaration || node.kind == ts.SyntaxKind.ArrowFunction || node.kind == ts.SyntaxKind.FunctionExpression) {
					var methodScope = ObfuscationMap.root as ObfuscationElement
				}
				else {
					var methodScope = ObfuscationMap.getObfuscatedClass((methodDeclaration.parent as ts.ClassDeclaration).name.getText()) as ObfuscationElement
				}

				if(methodDeclaration.name == undefined) {
					let scopeName = ObfuscationMap.getFunctionHash(node)
					let functionElement = ObfuscationMap.createObfuscatedFunction(ObfuscationMap.getClosestScope(node), scopeName, node)
					
					// loop through its parameters and add them as local variables
					for(let parameter of methodDeclaration.parameters) {
						ObfuscationMap.createObfuscatedElement(functionElement, parameter.name.getText(), node, true)
					}
				}
				else {
					let egg = methodScope as ObfuscationClass
					if(egg.inherits) {
						for(let inheritedClass of egg.inherits.values()) {
							for(let type of (inheritedClass.node.parent.parent as any).types) {
								let symbol = Obfuscator.checker.getTypeAtLocation(type).getSymbol()

								let sourceFile = symbol.declarations[0].parent as ts.SourceFile
								if(symbol.declarations[0].parent.kind == ts.SyntaxKind.ModuleBlock) {
									sourceFile = symbol.declarations[0].parent.parent.parent as ts.SourceFile
								}

								if(sourceFile.fileName.includes("node_modules")) {
									if(symbol.members.get(methodDeclaration.name.getText() as any)) {
										console.log(`Found library function ${methodDeclaration.name.getText()}, not obfuscating...`)
										break
									}
								}
							}
						}
					}
					
					let method = ObfuscationMap.createObfuscatedMethod(methodScope, methodDeclaration.name.getText(), node)

					// loop through its parameters and add them as local variables
					for(let parameter of methodDeclaration.parameters) {
						ObfuscationMap.createObfuscatedElement(method, parameter.name.getText(), node, true)
					}
				}
				break
			}
			
			// handling type literals (anonymous interfaces)
			case ts.SyntaxKind.TypeLiteral: {
				// define it like a class
				let typeLiteral = node as ts.TypeLiteralNode
				new ObfuscationClass(ObfuscationMap.root, typeLiteral.getText(), node, true)
				break
			}
			
			// handling constructors
			case ts.SyntaxKind.Constructor: {
				let constructorDeclaration = node as ts.ConstructorDeclaration
				let classScope = ObfuscationMap.getClosestScope(constructorDeclaration)
				// loop through its parameters and add them as local variables
				for(let parameter of constructorDeclaration.parameters) {
					ObfuscationMap.createObfuscatedElement(classScope, parameter.name.getText(), node, true)
				}
				break
			}
			
			// handling local variables
			case ts.SyntaxKind.VariableDeclaration: {
				let variableDeclaration = node as ts.VariableDeclaration
				let scope = ObfuscationMap.getClosestScope(variableDeclaration)
				if(scope) {
					ObfuscationMap.createObfuscatedElement(scope, variableDeclaration.name.getText(), node, true)
				}
				else {
					console.log("could not obfuscate", variableDeclaration.name.getText())
				}
				break
			}

			// dealing with binding expressions
			case ts.SyntaxKind.BindingElement: {
				let symbol = Obfuscator.checker.getSymbolAtLocation((node.parent.parent as any).initializer)
				
				if(symbol != undefined) {
					let typeName = Obfuscator.typeToString(Obfuscator.checker.getTypeOfSymbolAtLocation(symbol, symbol.declarations[0]))
					if(typeName) {
						let element = ObfuscationMap.getObfuscatedFromScope([ObfuscationMap.getObfuscatedClass(typeName)], node.getText())
						if(element == undefined) {
							ObfuscationMap.createObfuscatedElement(ObfuscationMap.getClosestScope(node), node.getText(), node, false)
						}
						else {
							ObfuscationMap.createObfuscatedElement(ObfuscationMap.getClosestScope(node), node.getText(), node, true, element.obfuscation)
						}
					}	
				}
				else {
					console.warn(`Warning: Found undefined symbol in binding statement ${node.getText()}`)
					ObfuscationMap.createObfuscatedElement(ObfuscationMap.getClosestScope(node), node.getText(), node, true)
				}
				
				break
			}
		}
	}

	public static transformer(context) {
		ObfuscationMap.currentSourceFile = ""
		return (file) => {
			function traverseNode(node: ts.Node, context) {
				ObfuscationMap.echoSourceFile(node)
				ObfuscationMap.handleNode(node)
				return ts.visitEachChild(node, (childNode) => traverseNode(childNode, context), context)
			}
			
			return traverseNode(file, context)
		}
	}
}