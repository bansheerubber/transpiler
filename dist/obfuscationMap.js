"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const obfuscator_1 = require("./obfuscator");
const obfuscationElement_1 = require("./structure/obfuscationElement");
const obfuscationClass_1 = require("./structure/obfuscationClass");
const obfuscationMethod_1 = require("./structure/obfuscationMethod");
function breakFilePath(filePath) {
    let match = filePath.match(/(.+\/)*(.+)$/);
    return [match[1] == undefined ? "" : match[1], match[2]];
}
function resolvePath(filePath) {
    let split = filePath.split("/");
    let output = [];
    for (let element of split) {
        if (element == "..") {
            output.pop();
        }
        else if (element != ".") {
            output.push(element);
        }
    }
    return output.join("/");
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
class ObfuscationMap {
    static debugPrint() {
        this.root.printScope();
        console.log(`${this.root.getCount()} obfuscated names generated`);
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
    static createObfuscatedClass(name, node) {
        return new obfuscationClass_1.default(this.root, name, node, true);
    }
    static createObfuscatedMethod(parent, name, node) {
        return new obfuscationMethod_1.default(parent, name, node, true);
    }
    static createObfuscatedElement(parent, name, node, isFinished, obfuscation) {
        let element = this.getObfuscatedFromScope([parent], name);
        if (element) {
            element.node = node;
            element.isFinished = isFinished;
            if (element.isFinished && element.obfuscation == "") {
                element.generateObfuscation(obfuscation);
            }
        }
        else {
            return new obfuscationElement_1.default(parent, name, node, isFinished, obfuscation);
        }
    }
    static getObfuscatedName(obfuscatedNamePrefix = "") {
        return "_" + obfuscatedNamePrefix + getRandomInt(0, 16 ** 4).toString(16);
        // return obfuscatedNamePrefix + String.fromCodePoint(codepoints[getRandomInt(0, codepoints.length - 1)])
    }
    static getObfuscatedClass(className) {
        return this.root.globalNameToObfuscation(this.sanitizeName(className));
    }
    static getObfuscatedFromScope(scopes, name) {
        name = this.sanitizeName(name);
        for (let scope of scopes) {
            if (scope) {
                let value = scope.nameToElement(name);
                if (value != undefined) {
                    return value;
                }
            }
        }
        return undefined;
    }
    static getObfuscatedStringFromScope(scopes, name) {
        let obfuscatedElement = this.getObfuscatedFromScope(scopes, this.sanitizeName(name));
        if (obfuscatedElement) {
            return obfuscatedElement.obfuscation;
        }
        else {
            return name;
        }
    }
    static getObfuscatedClassString(className) {
        let obfuscatedElement = this.getObfuscatedClass(this.sanitizeName(className));
        if (obfuscatedElement) {
            return obfuscatedElement.obfuscation;
        }
        else {
            return className;
        }
    }
    static getClosestScope(node) {
        let parent = node;
        while (parent = parent.parent) {
            // if we find a method, find the class it belongs to and return it
            if (parent.kind == ts.SyntaxKind.MethodDeclaration) {
                return this.getObfuscatedFromScope([this.getClosestScope(parent)], parent.name.getText());
            }
            // if we find a class, return its obfuscated element
            else if (parent.kind == ts.SyntaxKind.ClassDeclaration || parent.kind == ts.SyntaxKind.InterfaceDeclaration) {
                return this.getObfuscatedClass(parent.name.getText());
            }
            // if we find a function declaration, then we belong to the global scope
            else if (parent.kind == ts.SyntaxKind.FunctionDeclaration) {
                if (parent.name == undefined) {
                    return this.root;
                }
                else {
                    return this.getObfuscatedFromScope([this.root], parent.name.getText());
                }
            }
            // if we have a constructor, just return the class
            else if (parent.kind == ts.SyntaxKind.Constructor) {
                return this.getClosestScope(parent);
            }
        }
        return this.root;
    }
    static sanitizeName(name) {
        return name.replace(/,/g, "");
    }
    static echoSourceFile(node) {
        let parent = node;
        while (parent = parent.parent) {
            if (parent.kind == ts.SyntaxKind.SourceFile) {
                let sourceFile = parent;
                if (sourceFile.fileName != this.currentSourceFile) {
                    console.log("\x1B[91mnow traversing\x1B[0m", sourceFile.fileName);
                    this.currentSourceFile = sourceFile.fileName;
                }
            }
        }
    }
    static getObfuscatedClassesFromType(typeName) {
        // handle unions
        if (typeName.indexOf(" | ") != -1) {
            let output = [];
            let split = typeName.split(" | ");
            for (let element of split) {
                output.push(this.getObfuscatedClass(element));
            }
            return output;
        }
        else {
            return [this.getObfuscatedClass(typeName)];
        }
    }
    static handleNode(node) {
        // console.log(Obfuscator.kindToName(node.kind))
        switch (node.kind) {
            // handling obfuscating class names
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ClassDeclaration: {
                let classDeclaration = node;
                let obfuscatedClass = new obfuscationClass_1.default(ObfuscationMap.root, classDeclaration.name.getText(), node, true);
                // firuging out what classes we need to inherit
                if (classDeclaration.heritageClauses) {
                    for (let i = 0; i < classDeclaration.heritageClauses.length; i++) {
                        for (let j = 0; j < classDeclaration.heritageClauses[i].types.length; j++) {
                            let foundClass = classDeclaration.heritageClauses[i].types[j].expression.getText();
                            if (foundClass) {
                                obfuscatedClass.inherits.add(foundClass);
                            }
                        }
                    }
                }
                break;
            }
            // handling obfuscating class properties
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor: {
                if (node.parent.kind == ts.SyntaxKind.ClassDeclaration || node.parent.kind == ts.SyntaxKind.InterfaceDeclaration) {
                    let propertyDeclaration = node;
                    ObfuscationMap.createObfuscatedElement(ObfuscationMap.getObfuscatedClass(propertyDeclaration.parent.name.getText()), propertyDeclaration.name.getText(), node, true);
                }
                else if (node.parent.kind == ts.SyntaxKind.TypeLiteral) {
                    let typeLiteral = node.parent;
                    let propertyDeclaration = node;
                    ObfuscationMap.createObfuscatedElement(ObfuscationMap.getObfuscatedClass(typeLiteral.getText()), propertyDeclaration.name.getText(), node, true);
                }
                break;
            }
            // handling obfuscating class methods
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration: {
                let methodDeclaration = node;
                if (node.kind == ts.SyntaxKind.FunctionDeclaration) {
                    var methodScope = ObfuscationMap.root;
                }
                else {
                    var methodScope = ObfuscationMap.getObfuscatedClass(methodDeclaration.parent.name.getText());
                }
                if (methodDeclaration.name == undefined) {
                    // loop through its parameters and add them as local variables
                    for (let parameter of methodDeclaration.parameters) {
                        ObfuscationMap.createObfuscatedElement(ObfuscationMap.root, parameter.name.getText(), node, true);
                    }
                }
                else {
                    let method = ObfuscationMap.createObfuscatedMethod(methodScope, methodDeclaration.name.getText(), node);
                    // loop through its parameters and add them as local variables
                    for (let parameter of methodDeclaration.parameters) {
                        ObfuscationMap.createObfuscatedElement(method, parameter.name.getText(), node, true);
                    }
                }
                break;
            }
            // handling type literals (anonymous interfaces)
            case ts.SyntaxKind.TypeLiteral: {
                // define it like a class
                let typeLiteral = node;
                new obfuscationClass_1.default(ObfuscationMap.root, typeLiteral.getText(), node, true);
                break;
            }
            // handling constructors
            case ts.SyntaxKind.Constructor: {
                let constructorDeclaration = node;
                let classScope = ObfuscationMap.getClosestScope(constructorDeclaration);
                // loop through its parameters and add them as local variables
                for (let parameter of constructorDeclaration.parameters) {
                    ObfuscationMap.createObfuscatedElement(classScope, parameter.name.getText(), node, true);
                }
                break;
            }
            // handling local variables
            case ts.SyntaxKind.VariableDeclaration: {
                let variableDeclaration = node;
                let scope = ObfuscationMap.getClosestScope(variableDeclaration);
                if (scope) {
                    ObfuscationMap.createObfuscatedElement(scope, variableDeclaration.name.getText(), node, true);
                }
                else {
                    console.log("could not obfuscate", variableDeclaration.name.getText());
                }
                break;
            }
            // dealing with binding expressions
            case ts.SyntaxKind.BindingElement: {
                let symbol = obfuscator_1.default.checker.getSymbolAtLocation(node.parent.parent.initializer);
                if (symbol != undefined) {
                    let typeName = obfuscator_1.default.typeToString(obfuscator_1.default.checker.getTypeOfSymbolAtLocation(symbol, symbol.declarations[0]));
                    if (typeName) {
                        let element = ObfuscationMap.getObfuscatedFromScope([ObfuscationMap.getObfuscatedClass(typeName)], node.getText());
                        if (element == undefined) {
                            ObfuscationMap.createObfuscatedElement(ObfuscationMap.getClosestScope(node), node.getText(), node, false);
                        }
                        else {
                            ObfuscationMap.createObfuscatedElement(ObfuscationMap.getClosestScope(node), node.getText(), node, true, element.obfuscation);
                        }
                    }
                }
                else {
                    console.warn("Warning: Found undefined symbol in binding statemnet");
                    ObfuscationMap.createObfuscatedElement(ObfuscationMap.getClosestScope(node), node.getText(), node, true);
                }
                break;
            }
        }
    }
    static transformer(context) {
        ObfuscationMap.currentSourceFile = "";
        return (file) => {
            function traverseNode(node, context) {
                ObfuscationMap.echoSourceFile(node);
                ObfuscationMap.handleNode(node);
                return ts.visitEachChild(node, (childNode) => traverseNode(childNode, context), context);
            }
            return traverseNode(file, context);
        };
    }
}
// public static obfuscatedClasses: { [key: string]: ObfuscatedElement } = {}
ObfuscationMap.obfuscatedClasses = new Map();
ObfuscationMap.visitedMap = {};
ObfuscationMap.count = 0;
ObfuscationMap.currentSourceFile = "";
exports.default = ObfuscationMap;
//# sourceMappingURL=obfuscationMap.js.map