"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const _28b7 = require("../../helpers/range");

const _d441 = require("../../helpers/vector");
const _8198 = require("../../game/gameObject");

const _eb3 = require("../../helpers/rotation");

class _d654 extends _8198.default {
    constructor(_2e76, _3f6e) {
        super(_2e76);
        this._3f6e = new _d441.default(0, 0);
        this._9de6 = new _d441.default(1, 1);
        this._f261 = 0;
        this._feb = [];
        this._7223 = [];
        this._ec00 = 0;
        this._1413 = 0;
        this._3054 = 0;
        this._3005 = new _eb3.default();
        this._3f6e = _3f6e;
        if (typeof this._680f == "number") {
            this._3005._ef66 = this._680f;
        }
    }
    _ba41(_4402) {
        let _a1fc = () => {
            if (this._b37b instanceof _28b7.default) {
                this._3054 = this._b37b._1841();
            }
            else {
                this._3054 = this._b37b;
            }
        };
        this._1413 += _4402;
        if (this._3054 == 0) {
            _a1fc();
        }
        let _b5de = this._1413 * 1000 / this._3054;
        for (let _ec73 = 0; _ec73 < _b5de || _ec73 < 5; _ec73++) {
            this._1413 -= this._3054 / 1000;
            if (this._680f instanceof _28b7.default) {
                this._3005._ef66 = this._680f._9f18();
            }
            if (this._d568 instanceof _28b7.default) {
                var _c805 = this._d568._9f18();
            }
            else {
                var _c805 = this._d568;
            }
            let _febd = new _d441.default(this._3f6e._724, this._3f6e._141);
            if (this._ec00 instanceof _28b7.default) {
                var _ac8e = this._ec00._9f18();
            }
            else {
                var _ac8e = this._ec00;
            }
            _febd._e724(this._3005._31b4._1802(_ac8e));
            let _8c10 = _28b7.default._1841(0, this._42b.length - 1);
            let _90b = new this._42b[_8c10](this._2e76, _febd, this._3005._31b4._1802(_c805), this);
            this._7223.push(_90b);
            _a1fc();
        }
    }
    _97d(_88c7) {
        this._3f6e._c83c(_88c7._724, _88c7._141);
    }
    _b3fb() {
        return this._3f6e;
    }
    _90f0(_25ff) {
        this._9de6._c83c(_25ff._724, _25ff._141);
    }
    _a01e() {
        return this._9de6;
    }
}
exports.default = _d654;
