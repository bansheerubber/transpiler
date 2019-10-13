"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _3e18 {
    constructor(_7064, _85a9) {
        this._7064 = _7064;
        this._85a9 = _85a9;
    }
}
class _ca7d extends _3e18 {
    constructor() {
        super(...arguments);
        this._aa3e = [];
    }
}
exports._ca7d = _ca7d;
class _a3e6 extends _3e18 {
    constructor(_d2b0, _7064, _85a9) {
        super(_7064, _85a9);
        this._d2b0 = _d2b0;
    }
}
exports._a3e6 = _a3e6;
class _17f6 {
    constructor(_bc2f, _9bb4, _ab85, _3a4f, _ad16, _5f99, _1ba4, _5755) {
        this._ad16 = "";
        this._5f99 = "";
        this._ab85 = "";
        this._4d8b = 0;
        this._e915 = false;
        _2b12._ce31(_ab85, _3a4f);
        _2b12._935c[_ab85][_3a4f].push(this);
        this._bc2f = _bc2f;
        this._9bb4 = _9bb4;
        this._1ba4 = _1ba4;
        this._5755 = _5755;
        this._ad16 = _ad16;
        this._5f99 = _5f99;
        this._ab85 = _ab85;
        this._4d8b = _3a4f;
    }
    _184f() {
        if (this._bc2f && !this._e915) {
            this._bc2f();
        }
        this._e915 = true;
    }
    _a4e2() {
        if (this._9bb4 && this._e915) {
            this._9bb4();
        }
        this._e915 = false;
    }
}
_17f6._580f = 0;
_17f6._7cac = 0b001;
_17f6._a99 = 0b010;
_17f6._2982 = 0b100;
exports._17f6 = _17f6;
class _2b12 {
    static _ce31(_b457, _1cd5) {
        if (!this._935c[_b457]) {
            this._935c[_b457] = {};
        }
        if (!this._935c[_b457][_1cd5]) {
            this._935c[_b457][_1cd5] = [];
        }
    }
    static _7369(_7ae6) {
        if (_7ae6 instanceof KeyboardEvent) {
            var _3747 = _7ae6.key.toLowerCase();
            var _76d2 = _7ae6.altKey << 2 | _7ae6.ctrlKey << 1 | _7ae6.shiftKey;
        }
        else {
            var _3747 = `mouse${_7ae6.button}`;
            var _76d2 = this._7bf8;
        }
        for (let _58fd of this._7fd6(_3747.toLowerCase(), _76d2)) {
            _58fd._184f();
        }
        for (let _d773 of this._8600) {
            for (let _58fd of this._7fd6(_d773, _76d2)) {
                _58fd._184f();
            }
        }
        if (this._8600.indexOf(_3747) == -1) {
            this._8600.push(_3747);
        }
        this._7bf8 = _76d2;
    }
    static _b04a(_d277) {
        if (_d277 instanceof KeyboardEvent) {
            var _e4a9 = _d277.key.toLowerCase();
            var _f9c0 = _d277.altKey << 2 | _d277.ctrlKey << 1 | _d277.shiftKey;
        }
        else {
            var _e4a9 = `mouse${_d277.button}`;
            var _f9c0 = this._7bf8;
        }
        for (let _5f5c of this._7fd6(_e4a9.toLowerCase(), _f9c0 | this._7bf8)) {
            _5f5c._a4e2();
        }
        this._8600.splice(this._8600.indexOf(_e4a9), 1);
        for (let _e7e5 of this._8600) {
            for (let _5f5c of this._7fd6(_e7e5, this._7bf8, _f9c0)) {
                _5f5c._a4e2();
            }
        }
        this._7bf8 = _f9c0;
    }
    static _7fd6(_6c44, _caf6, _6d6a) {
        let _870f = (_fc63, _8363) => {
            if (!this._935c[_fc63]) {
                return [];
            }
            else {
                return this._935c[_fc63][_8363] != undefined ? this._935c[_fc63][_8363] : [];
            }
        };
        if (Math.log2(_caf6) % 1 != 0) {
            if (_6d6a !== 0) {
                var _90f1 = _870f(_6c44, _caf6);
            }
            else {
                var _90f1 = [];
            }
            for (let _e628 = 0; _e628 < 3; _e628++) {
                if ((_caf6 & (1 << _e628)) && (_6d6a === undefined || !(_6d6a & (1 << _e628)))) {
                    _90f1 = _90f1.concat(_870f(_6c44, 1 << _e628));
                }
            }
            return _90f1;
        }
        else if (_6d6a !== 0) {
            return _870f(_6c44, _caf6);
        }
    }
}
_2b12._935c = {};
_2b12._7bf8 = 0;
_2b12._8600 = [];
exports.default = _2b12;
if (typeof document != "undefined") {
    document.addEventListener("keydown", _2b12._7369.bind(_2b12));
    document.addEventListener("keyup", _2b12._b04a.bind(_2b12));
    document.addEventListener("mousedown", _2b12._7369.bind(_2b12));
    document.addEventListener("mouseup", _2b12._b04a.bind(_2b12));
}
