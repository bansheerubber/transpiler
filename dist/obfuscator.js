"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const obfuscationMap_1 = require("./obfuscationMap");
function breakFilePath(filePath) {
    let match = filePath.match(/(.+\/)*(.+)$/);
    return [match[1] == undefined ? "" : match[1], match[2]];
}
class Obfuscator {
    static transformer(context) {
        obfuscationMap_1.default.currentSourceFile = "";
        return (file) => {
            function visiter(node, context) {
                obfuscationMap_1.default.echoSourceFile(node);
                function changeNode(newNode) {
                    Obfuscator.obfuscationCount++;
                    return newNode;
                }
                if (node.kind == ts.SyntaxKind.Identifier) {
                    console.log(node.getText(), Obfuscator.kindToName(node.parent.kind));
                    switch (node.parent.kind) {
                        // dealing with property chains and such
                        case ts.SyntaxKind.PropertyAccessExpression: {
                            let property = Obfuscator.getPropertyAccessChainType(node, node.parent);
                            // console.log(`---- ${node.getText()}'s type is ${property.parentTypeName}`)
                            if (property.symbol) {
                                // if we aren't the start, we're basically guarenteed to be a member of a class
                                if (!property.isStart) {
                                    if (property.parentTypeName) {
                                        let obfuscatedElements = obfuscationMap_1.default.getObfuscatedClassesFromType(property.parentTypeName);
                                        if (obfuscatedElements[0]) {
                                            node = changeNode(ts.createIdentifier(obfuscationMap_1.default.getObfuscatedStringFromScope(obfuscatedElements, node.getText())));
                                        }
                                    }
                                }
                                // if we aren't the start, then treat us like a local/global variable
                                else {
                                    let newNode = Obfuscator.createLocalIdentifier(node);
                                    node = newNode != undefined ? newNode : node;
                                }
                            }
                            break;
                        }
                        // dealing with class declarations
                        case ts.SyntaxKind.InterfaceDeclaration:
                        case ts.SyntaxKind.ClassDeclaration: {
                            node = changeNode(ts.createIdentifier(obfuscationMap_1.default.getObfuscatedClassString(node.getText())));
                            break;
                        }
                        // dealing with new creation expression
                        case ts.SyntaxKind.NewExpression: {
                            let newNode = Obfuscator.createLocalIdentifier(node);
                            node = newNode != undefined ? newNode : node;
                            break;
                        }
                        // dealing with property assignments for objects
                        case ts.SyntaxKind.PropertyAssignment: {
                            let propertyAssignment = node.parent;
                            // if the property initializer is the node, then we need to obfuscate. this means its likely a local variable/global
                            if (propertyAssignment.initializer == node) {
                                let newNode = Obfuscator.createLocalIdentifier(node);
                                node = newNode != undefined ? newNode : node;
                            }
                            // we're dealing with the property name itself
                            else {
                                // get the expression that is us defining the object literal and get the type of it
                                let objectLiteralExpression = node.parent.parent;
                                let type = Obfuscator.checker.getContextualType(objectLiteralExpression);
                                // once we got the type, now transform the property
                                if (type) {
                                    let typeName = Obfuscator.typeToString(type);
                                    let closestScope = obfuscationMap_1.default.getObfuscatedClass(typeName);
                                    // get the class from the type name, then get the property value using the class as our scope
                                    if (closestScope) {
                                        node = changeNode(ts.createIdentifier(obfuscationMap_1.default.getObfuscatedStringFromScope([closestScope], node.getText())));
                                    }
                                }
                            }
                            break;
                        }
                        // dealing with binding expressions
                        case ts.SyntaxKind.BindingElement: {
                            let symbol = Obfuscator.checker.getSymbolAtLocation(node.parent.parent.parent.initializer);
                            if (symbol != undefined) {
                                let typeName = Obfuscator.typeToString(Obfuscator.checker.getTypeOfSymbolAtLocation(symbol, symbol.declarations[0]));
                                if (typeName) {
                                    let newNode = changeNode(ts.createIdentifier(obfuscationMap_1.default.getObfuscatedStringFromScope([obfuscationMap_1.default.getObfuscatedClass(typeName)], node.getText())));
                                    node = newNode != undefined ? newNode : node;
                                }
                                else {
                                    let newNode = Obfuscator.createLocalIdentifier(node);
                                    node = newNode != undefined ? newNode : node;
                                }
                            }
                            // if it doesn't exist, treat it like a local variable
                            else {
                                var newNode = Obfuscator.createLocalIdentifier(node);
                                node = newNode != undefined ? newNode : node;
                            }
                            break;
                        }
                        // dealing with class related declarations
                        case ts.SyntaxKind.PropertySignature:
                        case ts.SyntaxKind.PropertyDeclaration:
                        case ts.SyntaxKind.MethodSignature:
                        case ts.SyntaxKind.MethodDeclaration: {
                            var newNode = Obfuscator.createLocalIdentifier(node, true);
                            node = newNode != undefined ? newNode : node;
                            break;
                        }
                        // dealing with various declarations
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
                        case ts.SyntaxKind.ShorthandPropertyAssignment:
                        case ts.SyntaxKind.ExpressionStatement:
                        case ts.SyntaxKind.ExpressionWithTypeArguments:
                        case ts.SyntaxKind.GetAccessor:
                        case ts.SyntaxKind.SetAccessor:
                        case ts.SyntaxKind.ConditionalExpression:
                        case ts.SyntaxKind.Decorator:
                        case ts.SyntaxKind.TypeAssertionExpression:
                        case ts.SyntaxKind.ArrayLiteralExpression:
                        case ts.SyntaxKind.ExportAssignment: {
                            // if we're just a stray identifier inside one of the kinds of expressions, that means we're probably a local variable. look us up	
                            var newNode = Obfuscator.createLocalIdentifier(node);
                            node = newNode != undefined ? newNode : node;
                            break;
                        }
                    }
                }
                else if (node.kind == ts.SyntaxKind.StringLiteral) {
                    let match = node.text.match(/(?<=%\[)(\w+):\W(\w+)(?=\])/g);
                    if (match) {
                        for (let element of match) {
                            let [className, property] = element.split(": ");
                            let obfuscatedElement = obfuscationMap_1.default.getObfuscatedFromScope([obfuscationMap_1.default.getObfuscatedClass(className)], property);
                            if (obfuscatedElement) {
                                node = ts.createStringLiteral(node.text.replace(`%[${element}]`, obfuscatedElement.obfuscation));
                            }
                        }
                    }
                }
                return ts.visitEachChild(node, (childNode) => visiter(childNode, context), context);
            }
            return visiter(file, context);
        };
    }
    static createLocalIdentifier(node, isDeclaration = false) {
        function changeNode(newNode) {
            Obfuscator.obfuscationCount++;
            return newNode;
        }
        if (!isDeclaration) {
            let symbol = Obfuscator.checker.getSymbolAtLocation(node);
            let type = Obfuscator.checker.getTypeAtLocation(symbol.getDeclarations()[0]);
            // check to see if this symbol is an export (holy shit its long)
            if ((node.getText() == Obfuscator.typeToString(type) || type.symbol && type.symbol.parent && type.symbol.parent.exports && type.symbol.parent.exports.get(node.getText()))
                && type.symbol.valueDeclaration && type.symbol.valueDeclaration.parent && type.symbol.valueDeclaration.parent.fileName && type.symbol.valueDeclaration.parent.fileName != node.getSourceFile().fileName) {
                // get the real exported symbol name now
                let obfuscation = obfuscationMap_1.default.getObfuscatedStringFromScope([obfuscationMap_1.default.root], node.getText());
                // if we did actually obfuscate, then continue
                if (obfuscation != node.getText()) {
                    if (!(type.symbol && type.symbol.parent && type.symbol.parent.exports && type.symbol.parent.exports.get(node.getText()))) {
                        obfuscation = "default";
                    }
                    let fileName = breakFilePath(type.symbol.valueDeclaration.parent.fileName)[1].replace(/\..+/, "") + "_1";
                    return changeNode(ts.createIdentifier(`${fileName}.${obfuscation}`));
                }
            }
        }
        var closestScope = obfuscationMap_1.default.getClosestScope(node.parent);
        if (closestScope) {
            return changeNode(ts.createIdentifier(obfuscationMap_1.default.getObfuscatedStringFromScope([closestScope, obfuscationMap_1.default.root], node.getText())));
        }
        else {
            return undefined;
        }
    }
    static kindToName(kind) {
        for (let property of Object.getOwnPropertyNames(ts.SyntaxKind)) {
            if (ts.SyntaxKind[property] == kind) {
                return property;
            }
        }
    }
    // gets a chain of property accesses, which allows us to obfuscate code
    static getPropertyAccessChainType(identifier, node) {
        let symbol = this.checker.getSymbolAtLocation(identifier);
        if (symbol) {
            var parentTypeName = this.symbolToTypeString(symbol, node);
        }
        return {
            symbol,
            parentTypeName,
            isStart: node && identifier == node.expression
        };
    }
    static expressionToTypeString(expression) {
        return this.typeToString(this.checker.getContextualType(expression));
    }
    static symbolToTypeString(symbol, location) {
        if (symbol.parent) {
            let parent = symbol.parent;
            if (parent.getDeclarations()[0].localSymbol) {
                return this.sanitizeTypeString(parent.getDeclarations()[0].localSymbol.getEscapedName());
            }
            else {
                return this.typeToString(this.checker.getTypeOfSymbolAtLocation(parent, parent.declarations[0]));
            }
        }
    }
    static typeToString(type) {
        return this.sanitizeTypeString(this.checker.typeToString(type));
    }
    static sanitizeTypeString(value) {
        value = value.replace(/typeof /g, "");
        value = value.replace(/;/g, "");
        if (value.indexOf("=>") != -1) {
            let split = value.split(" => ");
            value = split[split.length - 1];
        }
        return value.replace("[]", "");
    }
}
Obfuscator.obfuscationCount = 0;
exports.default = Obfuscator;
//# sourceMappingURL=obfuscator.js.map