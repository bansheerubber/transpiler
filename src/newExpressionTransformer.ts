import * as ts from "typescript";
import Obfuscator from "./obfuscator";
import * as path from "path";
import ObfuscationMap from "./obfuscationMap";

interface InheritanceRoot {
	children: Set<InheritanceNode>
}

interface InheritanceNode {
	name: string
	parent: InheritanceNode | InheritanceRoot
	children: Set<InheritanceNode>
}

export default class NewExpressionTransformer {
	public static positionId: number = 0
	public static debug: boolean = true
	public static networkFile: string = ""
	public static positionIdMap: {
		[index: string]: number,
	} = {}
	public static inheritanceTree: InheritanceRoot = {
		children: new Set(),
	}
	public static inheritanceMap: {
		[index: string]: InheritanceNode,
	} = {}

	public static transformer(context) {
		return (file) => {
			const visiter = (node, context) => {
				if(node.kind == ts.SyntaxKind.ClassDeclaration) {
					NewExpressionTransformer.positionId = 0
					
					const classIdentifier = node as ts.ClassDeclaration
					const className = NewExpressionTransformer.getClass(classIdentifier)
					const parentName = NewExpressionTransformer.getParent(classIdentifier)

					const inheritanceObject = {
						name: className,
						parent: NewExpressionTransformer.inheritanceTree,
						children: new Set<InheritanceNode>(),
					}
					if(parentName === undefined) {
						NewExpressionTransformer.inheritanceTree.children.add(inheritanceObject)
					}
					else {
						if(NewExpressionTransformer.inheritanceMap[parentName] === undefined) {
							const parentObject = {
								name: parentName,
								parent: NewExpressionTransformer.inheritanceTree,
								children: new Set<InheritanceNode>(),
							}
							NewExpressionTransformer.inheritanceTree.children.add(parentObject)
							NewExpressionTransformer.inheritanceMap[parentName] = parentObject
						}
						
						inheritanceObject.parent = NewExpressionTransformer.inheritanceMap[parentName]
						NewExpressionTransformer.inheritanceMap[parentName].children.add(inheritanceObject)
					}
					NewExpressionTransformer.inheritanceMap[className] = inheritanceObject
				}
				
				if(node.kind == ts.SyntaxKind.NewExpression && NewExpressionTransformer.isInReconstructor(node)) {
					let expression = node as ts.NewExpression
					node = NewExpressionTransformer.createNewReplacement(node, expression.expression as ts.Identifier, NewExpressionTransformer.positionId, expression.arguments)
					NewExpressionTransformer.positionId++
				}
				
				return ts.visitEachChild(node, (childNode) => visiter(childNode, context), context)
			}

			// returns true if we need to modiy the source file and create a reference
			const finder = (node, context, foundObject) => {
				if(node.kind == ts.SyntaxKind.NewExpression && NewExpressionTransformer.isInReconstructor(node)) {
					foundObject.found = true
				}
				return ts.visitEachChild(node, (childNode) => finder(childNode, context, foundObject), context)
			}

			let foundObject = {
				found: false
			}
			finder(file, context, foundObject)

			if(foundObject.found == true) {
				file = NewExpressionTransformer.createNetworkReference(file)
			}
	
			return visiter(file, context)
		}
	}

	public static getClass(node: ts.Node): string {
		let parent = node
		while(parent !== undefined) {
			if(parent.kind == ts.SyntaxKind.ClassDeclaration) {
				return (parent as ts.ClassDeclaration).name.getText()
			}
			parent = parent.parent
		}
		return undefined
	}

	public static getParent(node: ts.Node): string {
		let parent = node
		while(parent !== undefined) {
			if(parent.kind == ts.SyntaxKind.ClassDeclaration) {
				let parentClass = parent as ts.ClassDeclaration
				if(parentClass.heritageClauses) {
					for(let i = 0; i < parentClass.heritageClauses.length; i++) {
						for(let j = 0; j < parentClass.heritageClauses[i].types.length; j++) {
							let foundClass = parentClass.heritageClauses[i].types[j].expression.getText()
							if(foundClass) {
								return foundClass
							}
						}
					}
				}
			}
			parent = parent.parent
		}
		return undefined
	}

	public static isRemoteObject(className: string): boolean {
		let parent = this.inheritanceMap[className]
		while(parent !== undefined && parent.name !== undefined) {
			if(parent.name == "RemoteObject") {
				return true
			}
			parent = parent.parent as InheritanceNode
		}
		return false
	}

	public static isInReconstructor(node: ts.Node): boolean {
		let parent = node
		while((parent = parent.parent) !== undefined) {
			if(parent.kind == ts.SyntaxKind.MethodDeclaration) {
				let declaration = parent as ts.MethodDeclaration
				if(declaration.name.getText() == "reconstructor") {
					return true
				}
			}
		}
		return false
	}

	public static createNetworkReference(node: ts.SourceFile): ts.SourceFile {
		let filePath = path.relative(node.fileName.match(/(.+)(?=\/)/g)[0], path.resolve(this.networkFile.replace(".ts", ".js")))
		return ts.updateSourceFileNode(node, [
			ts.createVariableStatement(
				/*modifiers*/ undefined,
				ts.createVariableDeclarationList([
					ts.createVariableDeclaration(
						this.getNetworkInformation().className,
						/*type*/ undefined,
						ts.createCall(
							ts.createIdentifier("require"),
							[],
							[ts.createLiteral(filePath)]
						)
					)
				])
			),
			...node.statements,
		])
	}

	// creates a replacement for the new expression, for networking purposes
	public static createNewReplacement(originalNode: ts.NewExpression, classIdentifier: ts.Identifier, positionId: number, args: ts.NodeArray<ts.Expression>): ts.Node {
		const className = this.getClass(classIdentifier)
		const parentName = this.getParent(classIdentifier)

		const newClassName = classIdentifier.getText()
		if(this.isRemoteObject(newClassName)) {
			positionId += !this.positionIdMap[parentName] ? 0 : this.positionIdMap[parentName]
			this.positionIdMap[className] = positionId + 1// save position id
			
			if(NewExpressionTransformer.debug) {
				console.log(`NewExpressionTransformer: Created 'Network.createRemoteClass(this, ${positionId}, ${newClassName}, ...)'`)
			}

			const obfuscation = this.getNetworkInformation()
			
			return ts.createCall(ts.createPropertyAccess(ts.createIdentifier(`${obfuscation.className}.default`), obfuscation.methodName), undefined, [ts.createIdentifier("this"), ts.createLiteral(positionId), classIdentifier, ...args])
		}
		else {
			return originalNode
		}
	}

	public static getNetworkInformation(): { className: string, methodName: string, } {
		let obfuscatedClass = ObfuscationMap.getObfuscatedClass("Network")
		if(obfuscatedClass !== undefined) {
			return {
				className: obfuscatedClass.obfuscation,
				methodName: ObfuscationMap.getObfuscatedFromScope([obfuscatedClass], "createRemoteClass").obfuscation,
			}
		}
		else {
			return {
				className: "Network_1",
				methodName: "createRemoteClass",
			}
		}
	}
}