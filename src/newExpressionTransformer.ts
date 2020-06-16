import * as ts from "typescript";
import Obfuscator from "./obfuscator";
import * as path from "path";
import ObfuscationMap from "./obfuscationMap";

export default class NewExpressionTransformer {
	public static positionId: number = 0
	public static debug: boolean = true
	public static networkFile: string = ""

	public static transformer(context) {
		return (file) => {
			function visiter(node, context) {
				if(node.kind == ts.SyntaxKind.NewExpression && NewExpressionTransformer.isInReconstructor(node)) {
					let expression = node as ts.NewExpression
					node = NewExpressionTransformer.createNewReplacement(expression.expression as ts.Identifier, NewExpressionTransformer.positionId, expression.arguments)
					NewExpressionTransformer.positionId++
				}
				else if(node.kind == ts.SyntaxKind.ClassDeclaration) {
					NewExpressionTransformer.positionId = 0
				}
				
				return ts.visitEachChild(node, (childNode) => visiter(childNode, context), context)
			}

			// returns true if we need to modiy the source file and create a reference
			function finder(node, context, foundObject) {
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
	public static createNewReplacement(classIdentifier: ts.Identifier, positionId: number, args: ts.NodeArray<ts.Expression>): ts.Node {
		if(NewExpressionTransformer.debug) {
			console.log(`NewExpressionTransformer: Created 'Network.createRemoteClass(this, ${positionId}, ${classIdentifier.getText()}, ...)'`)
		}

		let obfuscation = this.getNetworkInformation()
		
		return ts.createCall(ts.createPropertyAccess(ts.createIdentifier(`${obfuscation.className}.default`), obfuscation.methodName), undefined, [ts.createIdentifier("this"), ts.createLiteral(positionId), classIdentifier, ...args])
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