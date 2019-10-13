"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


const _58b4 = require("../render/camera");
class _5ca3 extends _58b4.default {
    constructor(_52d, _678e) {
        super(_52d);
        this._678e = _678e;
    }
    get _678e() {
        return this._f8ff;
    }
    set _678e(value) {
        if (this._f8ff) {
            this._f8ff._feb.splice(this._f8ff._feb.indexOf(this), -1);
        }
        this._f8ff = value;
        this._f8ff._feb.push(this);
        this._f04c._c83c(this._f8ff._b3fb()._724, this._f8ff._b3fb()._141);
    }
    _6f14() {
        if (this._678e) {
            this._f04c._c83c(this._678e._b3fb()._724, this._678e._b3fb()._141);
        }
    }
    _29e1() {
    }
}
exports.default = _5ca3;
