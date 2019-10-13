"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obfuscationMap_1 = require("../obfuscationMap");
class ObfuscationElement {
    constructor(parent, name, node, isFinished, obfuscation) {
        this.scope = new Set();
        this.obfuscation = "";
        this.name = "";
        this.isFinished = false;
        name = obfuscationMap_1.default.sanitizeName(name);
        if (!parent || !parent.nameToElement(name)) {
            this.parent = parent;
            this.name = name;
            this.node = node;
            this.isFinished = isFinished;
            if (parent) {
                this.parent.scope.add(this);
            }
            if (this.isFinished) {
                this.generateObfuscation(obfuscation);
            }
        }
    }
    generateObfuscation(obfuscation) {
        // generate an obfuscated name
        if (obfuscation == undefined) {
            while (this.isObfuscationTaken(obfuscation = obfuscationMap_1.default.getObfuscatedName())) { }
        }
        this.obfuscation = obfuscation;
    }
    // checks to see if this obfuscation is taken in our scope, or any of the scopes above us
    isObfuscationTaken(obfuscation) {
        if (this.parent) {
            for (let object of this.parent.scope) {
                if (object != this) {
                    if (object.obfuscation == obfuscation) {
                        return true;
                    }
                    else if (object.parent) {
                        return object.parent.isObfuscationTaken(obfuscation); // check to see if the obfuscated name is taken above this node
                    }
                }
            }
        }
        return undefined;
    }
    nameToElement(name) {
        for (let object of this.scope) {
            if (object.name == name) {
                return object;
            }
        }
        return undefined;
    }
    printScope() {
        console.log(`Obfuscated names in scope ${this.name}:`);
        for (let child of this.scope.values()) {
            console.log(`   ${child.name} => ${child.obfuscation}`);
        }
        for (let child of this.scope) {
            if (child.scope.size > 0) {
                child.printScope();
            }
        }
    }
    // returns the number of nodes that are under this node's children's node
    getCount() {
        let count = 1;
        for (let child of this.scope) {
            count += child.getCount();
        }
        return count;
    }
}
exports.default = ObfuscationElement;
//# sourceMappingURL=obfuscationElement.js.map