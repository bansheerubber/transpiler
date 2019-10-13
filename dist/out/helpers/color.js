"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _37a0 {
    constructor(_a5bd, _f74a, _4ad1, _fac4 = 1) {
        this._a5bd = 0;
        this._f74a = 0;
        this._4ad1 = 0;
        this._fac4 = 0;
        this._a5bd = _a5bd;
        this._f74a = _f74a;
        this._4ad1 = _4ad1;
        this._fac4 = _fac4;
    }
    _2a4d() {
        let _f063 = Math.max(0, Math.min(1, Math.abs(-6 * (this._a5bd - 3 / 6)) - 1));
        let _575a = Math.max(0, Math.min(1, -Math.abs(-6 * (this._a5bd - 2 / 6)) + 2));
        let _ff39 = Math.max(0, Math.min(1, -Math.abs(-6 * (this._a5bd - 4 / 6)) + 2));
        let _1716 = (-Math.abs(6 * (this._f74a - 3 / 6)) + 2) > 0
            ? 1 : 0;
        let _5d3c = (Math.abs(6 * (this._f74a - 2 / 3)) - 1) > 0 ? 1 : 0;
        let _b800 = (Math.abs(6 * (this._f74a - 4 / 6)) - 1) > 0 ? 1 : 0;
        let _296 = ((1 - _f063) * (1 - this._f74a)) * _1716;
        let _5b38 = ((1 - _575a) * (1 - this._f74a)) * _5d3c;
        let _2781 = ((1 - _ff39) * (1 - this._f74a)) * _b800;
        let _bead = (_296 + _f063) * this._4ad1;
        let _268b = (_5b38 + _575a) * this._4ad1;
        let _5eb8 = (_2781 + _ff39) * this._4ad1;
        return new _9bf6(_bead, _268b, _5eb8, this._fac4);
    }
}
exports._37a0 = _37a0;
class _9bf6 {
    constructor(_1d4e, _1dcc, _9e94, _17db = 1) {
        this._1d4e = 0;
        this._1dcc = 0;
        this._9e94 = 0;
        this._17db = 0;
        this._1d4e = _1d4e;
        this._1dcc = _1dcc;
        this._9e94 = _9e94;
        this._17db = _17db;
    }
    _eb86() {
        return Math.floor(this._1d4e * 255) << 16 | Math.floor(this._1dcc * 255) << 8 | Math.floor(this._9e94 * 255) << 0;
    }
    _1fce() {
        if (this._17db == 1) {
            return `#${this._eb86().toString(16)}`;
        }
        else {
            return `rgba(${this._1d4e}, ${this._1dcc}, ${this._9e94}, ${this._17db})`;
        }
    }
    _e3fe() {
        let _8b41 = 2 * Math.sqrt(this._1d4e ** 2 + this._9e94 ** 2 + this._1dcc ** 2 - this._1dcc * this._1d4e - this._9e94 * this._1dcc - this._9e94 * this._1d4e);
        return new _37a0(Math.atan2(this._9e94 - this._1dcc, Math.sqrt((2 * this._1d4e - this._9e94 - this._1dcc) / 3)), _8b41 / (this._1d4e + this._9e94 + this._1dcc + _8b41), (this._1d4e + this._9e94 + this._1dcc + _8b41) / 3, this._17db);
    }
    static _57b2(_e2a9, _e59c, _bcd5) {
        return new _9bf6((_e2a9._1d4e * (1 - _bcd5)) + _e59c._1d4e * _bcd5, (_e2a9._1dcc * (1 - _bcd5)) + _e59c._1dcc * _bcd5, (_e2a9._9e94 * (1 - _bcd5)) + _e59c._9e94 * _bcd5, (_e2a9._17db * (1 - _bcd5)) + _e59c._17db * _bcd5);
    }
    static _7f(_8527) {
        if (typeof _8527 == "number") {
            let _17c9 = ((input) & (255 << 0)) / (255 << 0);
            let _d3fd = ((input) & (255 << 8)) / (255 << 8);
            let _6a73 = ((input) & (255 << 16)) / (255 << 16);
            return new _9bf6(_17c9, _d3fd, _6a73, 1);
        }
        else {
            if (_8527.indexOf("#") != -1) {
                if (_8527.length > 4) {
                    let _b222 = _8527.substring(1, _8527.length);
                    return this._7f(parseInt(_b222, 16));
                }
                else {
                    let _b222 = _8527.substring(1, _8527.length);
                    return this._7f(parseInt(_b222 + _b222, 16));
                }
            }
            else {
                let _da3a = _8527.match(/[0-9\.]+/g);
                let _17c9 = parseInt(_da3a[0]) / 255;
                let _d3fd = parseInt(_da3a[1]) / 255;
                let _6a73 = parseInt(_da3a[2]) / 255;
                let _6ea6 = parseInt(_da3a[3]);
                return new _9bf6(_17c9, _d3fd, _6a73, isNaN(_6ea6) ? 1 : _6ea6);
            }
        }
    }
}
_9bf6._4296 = new _9bf6(1, 1, 1, 1);
_9bf6._bf1b = new _9bf6(0, 0, 0, 1);
_9bf6._2ce4 = new _9bf6(1, 1, 1, 0);
exports._9bf6 = _9bf6;
