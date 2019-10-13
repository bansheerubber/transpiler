import * as ts from "typescript";

export default class NewExpressionTransformer {
	public static positionId: number = 0
	public static debug: boolean = true

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

	// creates a replacement for the new expression, for networking purposes
	public static createNewReplacement(classIdentifier: ts.Identifier, positionId: number, args: ts.NodeArray<ts.Expression>): ts.Node {
		if(NewExpressionTransformer.debug) {
			console.log(`NewExpressionTransformer: Created 'Network.createRemoteClass(this, ${positionId}, ${classIdentifier.getText()}, ...)'`)
		}
		
		return ts.createCall(ts.createPropertyAccess(ts.createIdentifier("Network"), "createRemoteClass"), undefined, [ts.createIdentifier("this"), ts.createLiteral(positionId), classIdentifier, ...args])
	}
}