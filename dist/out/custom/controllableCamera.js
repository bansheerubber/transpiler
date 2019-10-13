"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _58b4 = require("../render/camera");
const _d441 = require("../helpers/vector");


class _4098 extends _58b4.default {
    constructor(_52d) {
        super(_52d);
        this._c3be = {
            _8653: 0,
            _8d3e: 0,
            _4ecd: 0,
            _276: 0
        };
        this._a3d3 = 750;
    }
    _944d(_2015) {
        let _a45b = this._a3d3 * _2015 / this._a7f7;
        this._f04c._e724(new _d441.default(-this._c3be._276 * _a45b + this._c3be._4ecd * _a45b, -this._c3be._8653 * _a45b + this._c3be._8d3e * _a45b));
        super._944d(_2015);
    }
    _6f14() {
        this._c3be._8653 = 0;
        this._c3be._8d3e = 0;
        this._c3be._4ecd = 0;
        this._c3be._276 = 0;
    }
    _29e1() {
        this._c3be._8653 = 0;
        this._c3be._8d3e = 0;
        this._c3be._4ecd = 0;
        this._c3be._276 = 0;
    }
}
exports.default = _4098;
