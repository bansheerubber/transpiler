"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _3a9f = require("./collidable");

const Matter = require("matter-js");

class _16d7 extends _3a9f.default {
    constructor(_2e76, _aad8, _7bfe, _a44) {
        super(_2e76);
        this._2ec6 = Matter.Bodies.rectangle(_aad8._724, _aad8._141, _7bfe, _a44);
        this._2e76._b6db._640(this);
    }
    _ba41(_82) {
    }
}
exports.default = _16d7;
