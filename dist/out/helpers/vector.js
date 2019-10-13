"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
class _d441 {
    constructor(_724 = 0, _141 = 0) {
        this._724 = _724;
        this._141 = _141;
    }
    _e724(_7bd1) {
        this._724 += _7bd1._724;
        this._141 += _7bd1._141;
        return this;
    }
    _5366(_c2c2) {
        this._724 -= _c2c2._724;
        this._141 -= _c2c2._141;
        return this;
    }
    _f537(_b29a) {
        this._724 *= _b29a;
        this._141 *= _b29a;
        return this;
    }
    _e0cd() {
        let _2b97 = this._f375();
        if (_2b97 != 0) {
            this._724 /= _2b97;
            this._141 /= _2b97;
            return this;
        }
        else {
            this._724 = 0;
            this._141 = 0;
            return this;
        }
    }
    _b446() {
        let _4b63 = this._724;
        let _6b71 = this._141;
        this._724 = _6b71;
        this._141 = -_4b63;
        return this;
    }
    _5005(_d1b8) {
        return this._3645()._e724(_d1b8);
    }
    _8f61(_e065) {
        return this._3645()._5366(_e065);
    }
    _1802(_85) {
        return this._3645()._f537(_85);
    }
    _18ad() {
        return this._3645()._e0cd();
    }
    _ff30() {
        return this._3645()._b446();
    }
    _e3ae(_3b50) {
        this._724 = _3b50._724;
        this._141 = _3b50._141;
        return this;
    }
    _3645() {
        return new _d441(this._724, this._141);
    }
    _603a(_8811) {
        return this._724 * _8811._724 + this._141 * _8811._141;
    }
    _f375() {
        return Math.sqrt(this._724 * this._724 + this._141 * this._141);
    }
    _c83c(_fd6b, _bc9a) {
        this._724 = _fd6b;
        this._141 = _bc9a;
        return this;
    }
    _b5ab() {
        if (!this._cd11) {
            this._cd11 = Matter.Vector.create(this._724, this._141);
        }
        this._cd11.x = this._724;
        this._cd11.y = this._141;
        return this._cd11;
    }
}
exports.default = _d441;
