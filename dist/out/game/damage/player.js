"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const damageable_1 = require("./damageable");

const _d441 = require("../../helpers/vector");
const _b10d = require("../../network/remoteObject");






const Matter = require("matter-js");
class _4f73 {
}
exports._4f73 = _4f73;
class _1207 {
    constructor(_a714) {
        this._e0c7 = 0;
        this._2869 = 0;
        this._54df = 0;
        this._5656 = 0;
        this._1db4 = new _d441.default();
        this._57da = new _d441.default();
        this._9c8e = false;
        this._e03e = false;
        this._f7b4 = false;
        this._964c = false;
        this._7a3 = 0;
        this._6b39 = 0;
        this._34d1 = 0;
        this._69b1 = new _d441.default(0, 0);
        this._9ed9 = new _d441.default(0, 0);
        this._295c = new _d441.default(0, 0);
        this._aede = new _d441.default(0, 0);
        for (let _3723 of Object.getOwnPropertyNames(_a714)) {
            this[_3723] = _a714[_3723];
        }
    }
    _1df1() {
        if (this._9c8e) {
            this._69b1._724 = 0.2;
        }
        else {
            this._69b1._724 = 0;
        }
        if (this._e03e) {
            this._9ed9._724 = -0.2;
        }
        else {
            this._9ed9._724 = 0;
        }
        if (this._f7b4) {
            this._295c._141 = 0.2;
        }
        else {
            this._295c._141 = 0;
        }
        if (this._964c) {
            this._aede._141 = -0.2;
        }
        else {
            this._aede._141 = 0;
        }
    }
    _d40a() {
        let _8d7c = new _d441.default(0, 0);
        if (this._9c8e) {
            _8d7c._724 += 1;
        }
        if (this._e03e) {
            _8d7c._724 -= 1;
        }
        if (this._f7b4) {
            _8d7c._141 += 1;
        }
        if (this._964c) {
            _8d7c._141 -= 1;
        }
        return _8d7c._e0cd();
    }
    _3868(_7cd, _baf) {
        return Math.max(_7cd._603a(_baf._18ad()), 0);
    }
    _2a51(_292c) {
        this._1df1();
        let _2428 = this._d40a();
        let _3cb1 = new _d441.default(0, 0);
        _3cb1._e724(this._69b1._1802(this._3868(_2428, this._69b1)));
        _3cb1._e724(this._295c._1802(this._3868(_2428, this._295c)));
        _3cb1._e724(this._9ed9._1802(this._3868(_2428, this._9ed9)));
        _3cb1._e724(this._aede._1802(this._3868(_2428, this._aede)));
        return _3cb1;
    }
    _d27d(_cbdf, _8b70) {
        if (_cbdf._f375() - this._34d1 * _8b70 > 0) {
            return this._1db4._c83c(_cbdf._724, _cbdf._141)._e0cd()._f537(-this._34d1 * _8b70);
        }
        else {
            return this._1db4._c83c(_cbdf._724, _cbdf._141)._f537(-1);
        }
    }
}
exports._1207 = _1207;
class _afd4 extends _b10d.default {
    constructor(_2e76, _a1b5) {
        super(_2e76);
        this._fea6 = [];
        this._6bbc = 100;
        this._f391 = this._6bbc;
        this._7c02 = new _d441.default();
        this._a1b5 = _a1b5;
    }
    _6d69(_d5aa) {
        super._ba41(_d5aa);
        Matter.Body.applyForce(this._acea._2ec6, this._acea._2ec6.position, this._a1b5._2a51(_d5aa));
        this._7c02._724 = this._acea._2ec6.position.x;
        this._7c02._141 = this._acea._2ec6.position.y;
        this._4638._97d(this._7c02);
        for (let _7f5c of this._fea6) {
            _7f5c._f04c._c83c(this._7c02._724, this._7c02._141);
        }
    }
}
exports.default = _afd4;
