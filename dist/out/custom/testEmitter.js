"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _d654 = require("../render/emitters/emitter");
const _1ab1 = require("./testParticle");
const _28b7 = require("../helpers/range");
class _86a8 extends _d654.default {
    constructor() {
        super(...arguments);
        this._42b = [_1ab1.default];
        this._680f = new _28b7.default(0, Math.PI * 2);
        this._b37b = 50;
        this._d568 = new _28b7.default(150, 400);
    }
}
exports.default = _86a8;
