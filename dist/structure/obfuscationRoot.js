"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obfuscationElement_1 = require("./obfuscationElement");
const obfuscationClass_1 = require("./obfuscationClass");
const obfuscationMap_1 = require("../obfuscationMap");
class ObfuscationRoot extends obfuscationElement_1.default {
    globalNameToObfuscation(name) {
        for (let object of this.scope) {
            if (object.name == name) {
                return object;
            }
        }
        return undefined;
    }
    inheritClasses() {
        for (let element of this.scope) {
            if (element instanceof obfuscationClass_1.default) {
                element.inheritScope();
            }
        }
    }
    processUnfinished() {
        function recurse(element) {
            for (let temp of element.scope) {
                if (!temp.isFinished) {
                    obfuscationMap_1.default.handleNode(temp.node);
                }
                recurse(temp);
            }
        }
        recurse(this);
    }
}
exports.default = ObfuscationRoot;
//# sourceMappingURL=obfuscationRoot.js.map