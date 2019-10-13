"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _8e = require("./random");
class _28b7 {
    constructor(_e6c3, _d761) {
        this._e6c3 = 0;
        this._d761 = 0;
        this._e6c3 = _e6c3;
        this._d761 = _d761;
    }
    _1841(_c834) {
        let _9e02 = Math.ceil(this._e6c3);
        let _d6b = Math.floor(this._d761);
        if (_c834) {
            _8e.default._7087 = _c834;
        }
        let _b654 = Math.floor(_8e.default._6ddb() * (_d6b - _9e02 + 1)) + _9e02;
        return _b654;
    }
    _9f18(_9c50) {
        if (_9c50) {
            _8e.default._7087 = _9c50;
        }
        let _b28d = _8e.default._6ddb() * (this._d761 - this._e6c3) + this._e6c3;
        return _b28d;
    }
    static _1841(_9e02, _d6b) {
        _9e02 = Math.ceil(_9e02);
        _d6b = Math.floor(_d6b);
        return Math.floor(Math.random() * (_d6b - _9e02 + 1)) + _9e02;
    }
    static _9f18(_e6c3, _d761) {
        return Math.random() * (_d761 - _e6c3) + _e6c3;
    }
}
exports.default = _28b7;
