"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obfuscationElement_1 = require("./obfuscationElement");
const obfuscationMap_1 = require("../obfuscationMap");
class ObfuscationClass extends obfuscationElement_1.default {
    constructor() {
        super(...arguments);
        this.isAnonymous = false;
        this.inherits = new Set(); // list of all classes we inherit
        this.hasInheritedScope = false;
    }
    // go through the inherit set and inherit their scopes
    inheritScope() {
        if (!this.hasInheritedScope) {
            this.hasInheritedScope = true;
            for (let element of this.inherits) {
                let classElement = obfuscationMap_1.default.getObfuscatedClass(element);
                if (classElement) {
                    classElement.inheritScope();
                    for (let inheritedElement of classElement.scope) {
                        this.renameObfuscation(inheritedElement.name, inheritedElement.obfuscation);
                    }
                }
            }
        }
    }
    // remove one of the names from our scope
    renameObfuscation(name, obfuscation) {
        for (let element of this.scope.values()) {
            if (element.name == name) {
                element.obfuscation = obfuscation;
            }
        }
    }
}
exports.default = ObfuscationClass;
//# sourceMappingURL=obfuscationClass.js.map