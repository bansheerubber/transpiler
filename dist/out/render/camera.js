"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


const _d441 = require("../helpers/vector");


class _58b4 {
    constructor(_52d) {
        this._f04c = new _d441.default(0, 0);
        this._3139 = 1;
        this._a42d = 0;
        this._52d = _52d;
        this._79dd = _52d._fe65;
    }
    _19c4(_146a) {
        if (this._dafa) {
            this._dafa._7256();
        }
        this._dafa = _146a;
        _146a._e51e = _146a._f669 = (_fe2e) => {
            this._f04c._724 = _fe2e._724;
            this._f04c._141 = _fe2e._141;
        };
    }
    _497(_8260) {
        if (this._ba00) {
            this._ba00._7256();
        }
        this._ba00 = _8260;
        _8260._9487 = _8260._4e90 = (_26c7) => {
            this._a7f7 = _26c7;
        };
    }
    _944d(_45aa) {
        let _25d4 = Math.floor(this._79dd._2603.screen.width / 2);
        let _dfe5 = Math.floor(this._79dd._2603.screen.height / 2);
        this._79dd._a0e7.pivot.x = this._f04c._724 - _25d4 / this._3139;
        this._79dd._a0e7.pivot.y = this._f04c._141 - _dfe5 / this._3139;
        this._79dd._a0e7.scale.x = this._3139;
        this._79dd._a0e7.scale.y = this._3139;
        this._79dd._a0e7.rotation = this._a42d;
    }
    set _a7f7(_a7f7) {
        this._3139 = _a7f7;
    }
    get _a7f7() {
        return this._3139;
    }
    set _aae7(_aae7) {
        this._a42d = _aae7;
    }
    get _aae7() {
        return this._a42d;
    }
}
exports.default = _58b4;
