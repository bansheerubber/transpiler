"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c, _d, _e;
const _8198 = require("../game/gameObject");
const _1745 = require("../game/game");
const networkDecorators_1 = require("../network/networkDecorators");
const _d441 = require("./vector");
let _47b2 = class _47b2 extends _8198.default {
    constructor(_2e76, _9b70, _7f92, _15aa, _f669, _e51e) {
        super(_2e76);
        this._f717 = new _d441.default(0, 0);
        this._1f0e = 0;
        this._9b70 = _9b70;
        this._7f92 = _7f92;
        this._15aa = _15aa;
        this._f669 = _f669;
        this._e51e = _e51e;
    }
    _ba41(_2f64) {
        super._ba41(_2f64);
        this._1f0e += _2f64;
        let _81c9 = this._1f0e / this._15aa;
        if (_81c9 < 1) {
            this._f717._724 = (this._9b70._724 * (1 - _81c9)) + (this._7f92._724 * _81c9);
            this._f717._141 = (this._9b70._141 * (1 - _81c9)) + (this._7f92._141 * _81c9);
            this._f669(this._f717);
        }
        else {
            this._e51e(this._7f92);
            this._7256();
        }
    }
    _7256() {
        super._7256();
    }
};
_47b2 = __decorate([
    networkDecorators_1._536c,
    __metadata("design:paramtypes", [typeof (_a = typeof _1745.default !== "undefined" && _1745.default) === "function" ? _a : Object, typeof (_b = typeof _d441.default !== "undefined" && _d441.default) === "function" ? _b : Object, typeof (_c = typeof _d441.default !== "undefined" && _d441.default) === "function" ? _c : Object, Number, typeof (_d = typeof _f669 !== "undefined" && _f669) === "function" ? _d : Object, typeof (_e = typeof _f669 !== "undefined" && _f669) === "function" ? _e : Object])
], _47b2);
exports.default = _47b2;
let _2ff1 = class _2ff1 extends _47b2 {
    _ba41(_b3d0) {
        _8198.default.prototype._ba41.apply(this, [_b3d0]);
        this._1f0e += _b3d0;
        let _dd27 = -(((this._1f0e / this._15aa) - 1) ** 2) + 1;
        if (this._1f0e < this._15aa) {
            this._f717._724 = (this._9b70._724 * (1 - _dd27)) + (this._7f92._724 * _dd27);
            this._f717._141 = (this._9b70._141 * (1 - _dd27)) + (this._7f92._141 * _dd27);
            this._f669(this._f717);
        }
        else {
            this._e51e(this._7f92);
            this._7256();
        }
    }
};
_2ff1 = __decorate([
    networkDecorators_1._536c
], _2ff1);
exports._2ff1 = _2ff1;
