"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _9a0e = require("./networkBase");
const _ab61 = require("./network");



class _87db {
    constructor(_3536) {
        this._79e9 = {};
        this._1016 = -1;
        this._15 = "";
        this._3536 = _3536;
        this._aa26("ws://localhost:7000");
    }
    _aa26(_c5cd, _12e7 = {}) {
        this._15 = _c5cd;
        this._79e9 = _12e7;
        this._d029 = new WebSocket(_c5cd);
        this._d029.onmessage = this._ac54.bind(this);
        this._d029.onopen = this._303.bind(this);
        this._d029.onclose = this._e368.bind(this);
        this._d029.onerror = this._1867.bind(this);
        this._1b3b = 0;
    }
    _b3f0() {
        this._d029.close();
    }
    _303(_f2a7) {
        this._1016 = 0;
    }
    _e368(_f835) {
        this._1016 = -1;
        this._15 = "";
    }
    _1867(_b48a) {
    }
    _ac54(_7be4) {
        try {
            var _54b7 = _ab61.default._dbc7(_7be4.data);
        }
        catch (_8e4d) {
            console.error("Client Network: Failed to parse server message.", _8e4d);
        }
        switch (_54b7[0]) {
            case 0: {
                let _532a = _54b7[1];
                this._3536._96d9(_532a);
            }
            case 1: {
                let _36de = _54b7[1];
                this._3536._845a(_36de);
            }
            case 2: {
                let _ca7a = _54b7[1];
                this._3536._ce84(_ca7a._77f7, _ca7a._f751);
            }
            case 4: {
                this._1016 = _54b7[1];
            }
        }
    }
    _8545(_5164, _7f06) {
        this._d029.send(_ab61.default._6d6d([_5164, _7f06]));
    }
}
class _6b4c extends _9a0e.default {
    constructor(_295f) {
        super(_295f);
        this._d38a = {};
        this._b854 = new _87db(this);
    }
    _96d9(_9488) {
        let _5084 = [];
        for (let _bdad of _9488) {
            _5084.push(_ab61.default._dbc7(_bdad._e69));
        }
        for (let _5f95 in _5084) {
            let _aa3f = _5084[_5f95];
            let _7d78 = _9488[_5f95]._8cc9;
            let _6219 = [];
            for (let _5f95 = 0; _5f95 < _7d78.length; _5f95++) {
                _6219[_5f95] = this._295f._48ef._9055[_7d78[_5f95]];
            }
            this._295f._48ef._80bd(_aa3f, _6219);
        }
        for (let _aa3f of _5084) {
            let _c5d9 = _aa3f;
            if (!this._295f._48ef._2fb4[_c5d9._c756]) {
                _c5d9._8518(_ab61.default._7bf, ..._ab61.default._f16f(_ab61.default._bcdd(_c5d9.constructor), _c5d9));
            }
        }
    }
    _cd3b(_d36d, _7df3, _e049) {
        let _3c1c = this._a301;
        this._d38a[_3c1c] = {
            _cdd5: this._9055[_d36d],
            _342a: new Promise((_b255, _baa3) => {
                this._b2dc[_3c1c] = _b255;
                this._a7d9[_3c1c] = _baa3;
                setTimeout(() => {
                    this._4974(_3c1c, "timeout");
                }, 5000);
            }),
        };
        this._b854._8545(0, {
            _2e48: _d36d,
            _71d4: _7df3,
            _d4de: _3c1c,
            _e80d: _e049,
        });
        this._a301++;
    }
    _5c60(_c3e7, _d6f9) {
        this._b854._8545(1, {
            _77f7: _c3e7,
            _f751: _d6f9,
        });
    }
    _845a(_f97a) {
        let { _2e48, _71d4, _d4de, _e80d } = _f97a;
        if (this._9055[_2e48]) {
            let _a8e = this._9055[_2e48];
            if (this._295f._c42 && _a8e._8b9a()._8907[_71d4]) {
                let _345e = _a8e._8b9a()._8907[_71d4]._e086(_a8e, ..._e80d);
                this._5c60(_d4de, _345e);
            }
        }
    }
    _7c7a() {
        return this._d38a[this._a301 - 1];
    }
}
exports.default = _6b4c;
