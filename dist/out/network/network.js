"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const _80 = require("./networkMetadata");
const _b10d = require("./remoteObject");
const _8198 = require("../game/gameObject");

class _ab61 {
    static _e1d6(_a2f8) {
        this._7bf = _a2f8;
    }
    static _2eef(_13b0, _a9d2) {
        this._96a4.set(_a9d2, _13b0);
    }
    static _6d6d(_9ff0, _cc6c = false) {
        try {
            return JSON.stringify(this._8814(_9ff0, _cc6c));
        }
        catch (_4487) {
            console.error("Network: Failed to stingify object.", _4487);
            return undefined;
        }
    }
    static _dbc7(_5ea2) {
        try {
            return this._1c56(JSON.parse(_5ea2));
        }
        catch (_3cbb) {
            console.error("Network: Failed to parse object.", _3cbb);
            return undefined;
        }
    }
    static _8814(_ed05, _6baa = false) {
        if (typeof _ed05 == "object") {
            if (Array.isArray(_ed05)) {
                var _3207 = [];
            }
            else {
                var _3207 = {};
            }
            if (_ed05 instanceof _b10d.default) {
                var _39d3 = _ed05._8b9a();
                if (!_6baa) {
                    _3207._7092 = _ed05._c756;
                    return _3207;
                }
            }
            if (_ed05.constructor.name != "Object") {
                _3207._582e = _ed05.constructor.name;
            }
            for (let _cb6b of Object.getOwnPropertyNames(_ed05)) {
                if (_39d3) {
                    if (!_39d3._1c49(_cb6b)) {
                        _3207[_cb6b] = this._8814(_ed05[_cb6b]);
                    }
                }
                else {
                    _3207[_cb6b] = this._8814(_ed05[_cb6b]);
                }
            }
            return _3207;
        }
        else {
            return _ed05;
        }
    }
    static _1c56(_a45b) {
        let _8ce3 = _a45b;
        if (typeof _8ce3 == "object") {
            if (_8ce3._7092) {
                let _405d = this._7bf._48ef._9055[_8ce3._7092];
                if (_405d) {
                    return _405d;
                }
                else {
                    let _b150 = this._623e(_8ce3._7092);
                    this._7bf._48ef._bc15(_b150, _8ce3._7092);
                    return _b150;
                }
            }
            if (_8ce3._c756) {
                this._7bf._48ef._bc15(_8ce3, _8ce3._c756);
            }
            let _b1dc = {};
            if (this._4920[_8ce3._c756]) {
                _b1dc = this._4920[_8ce3._c756];
                var _34 = true;
            }
            let _c797 = this._1fd3(_8ce3._582e);
            if (_8ce3._582e) {
                if (_8ce3._582e == "Array") {
                    _b1dc = [];
                }
                else if (_c797) {
                    if (_34) {
                        Object.setPrototypeOf(_b1dc, _c797._db5e.prototype);
                        delete _b1dc.__stub__;
                    }
                    else {
                        _b1dc = Object.create(_c797._db5e.prototype);
                    }
                    var _cadd = _c797._db5e;
                }
                else {
                    console.error("INVALID CLASSNAME", _8ce3._582e);
                }
            }
            else if (Array.isArray(_8ce3)) {
                _b1dc = [];
            }
            for (let _8da4 of Object.getOwnPropertyNames(_8ce3)) {
                if (_cadd) {
                    var _40e2 = Object.getOwnPropertyDescriptor(_cadd, _8da4);
                }
                if (!this._4a65[_8da4] && ((_40e2 && _40e2.writable) || !_40e2)) {
                    _b1dc[_8da4] = this._1c56(_8ce3[_8da4]);
                }
            }
            return _b1dc;
        }
        else {
            return _8ce3;
        }
    }
    static _9c60(_5794, ..._c8f8) {
        let _2f86;
        if (!(_2f86 = this._bcdd(_5794))) {
            _2f86 = new _80.default(_5794, ..._c8f8);
            this._ea93.push(_2f86);
        }
        else {
            _2f86._a710 = _c8f8;
        }
        return _2f86;
    }
    static _f16f(_9502, _500) {
        let _3bd2 = [];
        for (let _5155 of _9502._a710) {
            if (_5155 == "_2e76") {
                _3bd2.push(this._7bf);
            }
            else {
                _3bd2.push(_500[_5155]);
            }
        }
        return _3bd2;
    }
    static _1fd3(_1b2e) {
        for (let _7b4c of this._ea93) {
            if (_7b4c._c884 == _1b2e) {
                return _7b4c;
            }
        }
        return undefined;
    }
    static _bcdd(_7fe4) {
        return this._1fd3(_7fe4.name);
    }
    static _623e(_b683) {
        if (!this._4920[_b683]) {
            this._4920[_b683] = {
                _6993: _b683
            };
        }
        return this._4920[_b683];
    }
    static _d70c(_6193, _fb4, _2ead, ..._325c) {
        if (this._7bf._48ef._a01b[_6193._c756] && this._7bf._48ef._a01b[_6193._c756][_fb4]) {
            let _36c9 = this._7bf._48ef._a01b[_6193._c756][_fb4];
            _36c9._8518(this._7bf, ...this._f16f(this._bcdd(_2ead), _36c9));
            return _36c9;
        }
        else {
            let _6b51 = new _2ead(..._325c);
            this._7bf._48ef._15f3(_6193, _6b51, _fb4);
            return _6b51;
        }
    }
}
_ab61._ea93 = [];
_ab61._4920 = {};
_ab61._96a4 = new Map();
_ab61._4a65 = {
    "_582e": true,
    "_6993": true,
    "_369c": true,
    "_9633": true,
};
exports.default = _ab61;
_ab61._9c60(_8198.default, "_2e76");
_ab61._bcdd(_8198.default)._887d("_2e76");
_ab61._bcdd(_8198.default)._887d("_e45e");
