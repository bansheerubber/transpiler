"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _c9b5 {
    constructor(_af60) {
        this._3642 = [];
        this._af60 = _af60;
    }
    _fcac() {
        return this._af60;
    }
    _d75d() {
        return this._3642;
    }
    _5192(_81f) {
        this._3642.push(_81f);
        _81f._ba15(this);
    }
    _84f4(_c0d7) {
        this._3642.splice(this._3642.indexOf(_c0d7), 1);
    }
    _ba15(_b06) {
        this._6048 = _b06;
    }
    _2963() {
        return this._6048;
    }
    *_fba8() {
        let _fb1f = this;
        while ((_fb1f = _fb1f._2963()) != undefined) {
            yield _fb1f;
        }
    }
    *_4938() {
        for (let _16d5 of this._3642) {
            yield _16d5;
            for (let _7e09 of _16d5._4938()) {
                yield _7e09;
            }
        }
    }
}
class _d8ca {
    static _d7a6(_e7fb, _fd25) {
        let _f6e1;
        if (this._4a9d[_fd25.name]) {
            _f6e1 = this._4a9d[_fd25.name];
        }
        else {
            _f6e1 = new _c9b5(_fd25);
        }
        let _3406;
        if (this._4a9d[_e7fb.name]) {
            _3406 = this._4a9d[_e7fb.name];
        }
        else {
            _3406 = new _c9b5(_e7fb);
        }
        _3406._5192(_f6e1);
        this._4a9d[_e7fb.name] = _3406;
        this._4a9d[_fd25.name] = _f6e1;
        this._f5fe.push(_e7fb);
        this._f5fe.push(_fd25);
    }
    static _2f3a(_10d0) {
        return this._4a9d[_10d0.name];
    }
}
_d8ca._4a9d = {};
_d8ca._f5fe = [];
exports.default = _d8ca;
