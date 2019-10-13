"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




class _9a0e {
    constructor(_295f) {
        this._9055 = {};
        this._c8bb = new Set();
        this._a01b = {};
        this._2fb4 = {};
        this._4c56 = new Set();
        this._d38a = {};
        this._a301 = 0;
        this._b2dc = {};
        this._a7d9 = {};
        this._527c = 0;
        this._295f = _295f;
    }
    _bc15(_a94b, _8c81) {
        let _b8bd = _8c81 != undefined ? _8c81 : this._527c;
        this._9055[_b8bd] = _a94b;
        _a94b._c756 = _b8bd;
        if (_8c81 == undefined) {
            this._527c++;
        }
        this._c8bb.add(_a94b);
    }
    _4126(_d42c) {
        delete this._9055[_d42c._c756];
        this._c8bb.delete(_d42c);
    }
    _80bd(_d4f4, _9c07) {
        this._a01b[_d4f4._c756] = _9c07;
    }
    _15f3(_e9db, _b960, _7ff4) {
        if (!this._e04a(_e9db)) {
            this._a01b[_e9db._c756] = [];
        }
        this._a01b[_e9db._c756][_7ff4] = _b960;
    }
    _e04a(_7a38) {
        return this._a01b[_7a38._c756];
    }
    _ce84(_dc6b, _dcd2) {
        if (this._b2dc[_dc6b]) {
            this._b2dc[_dc6b](_dcd2);
            this._b2dc[_dc6b] = undefined;
            this._a7d9[_dc6b] = undefined;
            this._d38a[_dc6b] = undefined;
        }
    }
    _4974(_bfe4, _7eb6) {
        if (this._a7d9[_bfe4]) {
            this._a7d9[_bfe4](_7eb6);
            this._b2dc[_bfe4] = undefined;
            this._a7d9[_bfe4] = undefined;
            this._d38a[_bfe4] = undefined;
        }
    }
}
exports.default = _9a0e;
