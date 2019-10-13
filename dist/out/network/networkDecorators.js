"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ab61 = require("./network");
require("reflect-metadata");

const _d8ca = require("../game/extensionTree");


function _536c(_c74e) {
    let _8529 = Object.getPrototypeOf(_c74e);
    if (_8529.name) {
        _d8ca.default._d7a6(_8529, _c74e);
    }
    return class extends _c74e {
        constructor(..._3c7e) {
            super(..._3c7e);
            this.context = _c74e.name;
            if (this._8518 && this.context == this.constructor.name) {
                this._8518.apply(this, _3c7e);
            }
        }
    };
}
exports._536c = _536c;
function _8f6(..._7ae8) {
    return (_93a0) => {
        _ab61.default._9c60(_93a0, ..._7ae8)._16a();
    };
}
exports._8f6 = _8f6;
function _58f1(_ed5c) {
    return (_8a05) => {
        _ab61.default._2eef(_8a05, _ed5c);
    };
}
exports._58f1 = _58f1;
function _901f(_14a5, _eaa) {
    _ab61.default._9c60(_14a5.constructor)._887d(_eaa);
}
exports._901f = _901f;
function _1d8d(_fc1c, _2e3b) {
    let _8959 = _ab61.default._9c60(_fc1c.constructor)._acc5(_fc1c[_2e3b]);
    let _a75b = Reflect.getMetadata("design:paramtypes", _fc1c, _2e3b);
    for (let _e622 = 0; _e622 < _a75b.length; _e622++) {
        _8959._e84(_e622, _a75b[_e622]);
    }
    _8959._f51(Reflect.getMetadata("design:returntype", _fc1c, _2e3b));
    return _8959;
}
function _d55a(_2a1a = false) {
    return function (_f888, _3d40, _d87e) {
        let _3bdc = _1d8d(_f888, _3d40);
        _3bdc._e5dd = true;
        _3bdc._e73f = _2a1a;
        _d87e.value = function (..._b505) {
            _3bdc._a6e5(this, ..._b505);
        };
    };
}
exports._d55a = _d55a;
function _c27f(_caca = false) {
    return function (_ded8, _490c, _eaa6) {
        let _918 = _1d8d(_ded8, _490c);
        _918._5f84 = true;
        _918._e73f = _caca;
        _eaa6.value = function (..._b06) {
            _918._55db(this, ..._b06);
            return "frog";
        };
    };
}
exports._c27f = _c27f;
function _d993(_f18e, _ad19, _db9) {
    _ab61.default._9c60(_f18e.constructor)._acc5(_f18e[_ad19])._e84(_db9, undefined);
}
exports._d993 = _d993;
function _55b0(_2ab2, _6aa0, _ca29) {
    _ab61.default._9c60(_2ab2.constructor)._acc5(_2ab2[_6aa0])._e8ad(_ca29);
    _ab61.default._9c60(_2ab2.constructor)._acc5(_2ab2[_6aa0])._e84(_ca29, undefined);
}
exports._55b0 = _55b0;
