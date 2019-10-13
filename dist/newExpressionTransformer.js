"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
class NewExpressionTransformer {
    static transformer(context) {
        return (file) => {
            function visiter(node, context) {
                if (node.kind == ts.SyntaxKind.NewExpression && NewExpressionTransformer.isInReconstructor(node)) {
                    let expression = node;
                    node = NewExpressionTransformer.createNewReplacement(expression.expression, NewExpressionTransformer.positionId, expression.arguments);
                    NewExpressionTransformer.positionId++;
                }
                else if (node.kind == ts.SyntaxKind.ClassDeclaration) {
                    NewExpressionTransformer.positionId = 0;
                }
                return ts.visitEachChild(node, (childNode) => visiter(childNode, context), context);
            }
            return visiter(file, context);
        };
    }
    static isInReconstructor(node) {
        let parent = node;
        while ((parent = parent.parent) !== undefined) {
            if (parent.kind == ts.SyntaxKind.MethodDeclaration) {
                let declaration = parent;
                if (declaration.name.getText() == "reconstructor") {
                    return true;
                }
            }
        }
        return false;
    }
    // creates a replacement for the new expression, for networking purposes
    static createNewReplacement(classIdentifier, positionId, args) {
        if (NewExpressionTransformer.debug) {
            console.log(`NewExpressionTransformer: Created 'Network.createRemoteClass(this, ${positionId}, ${classIdentifier.getText()}, ...)'`);
        }
        return ts.createCall(ts.createPropertyAccess(ts.createIdentifier("Network"), "createRemoteClass"), undefined, [ts.createIdentifier("this"), ts.createLiteral(positionId), classIdentifier, ...args]);
    }
}
NewExpressionTransformer.positionId = 0;
NewExpressionTransformer.debug = true;
exports.default = NewExpressionTransformer;
//# sourceMappingURL=newExpressionTransformer.js.map