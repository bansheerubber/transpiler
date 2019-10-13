"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obfuscationElement_1 = require("./obfuscationElement");
class ObfuscationMethod extends obfuscationElement_1.default {
    constructor() {
        super(...arguments);
        this.arguments = new Set();
        this.locals = new Set();
    }
}
exports.default = ObfuscationMethod;
//# sourceMappingURL=obfuscationMethod.js.map