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
var _a, _b, _c;
const _8198 = require("../game/gameObject");
const _1745 = require("../game/game");
const networkDecorators_1 = require("../network/networkDecorators");

let _d747 = class _d747 extends _8198.default {
    constructor(_2e76, _8e8f, _867b, _d67d, _4e90, _9487) {
        super(_2e76);
        this._916c = 0;
        this._8e8f = _8e8f;
        this._867b = _867b;
        this._d67d = _d67d;
        this._4e90 = _4e90;
        this._9487 = _9487;
    }
    _ba41(_e910) {
        super._ba41(_e910);
        this._916c += _e910;
        let _c8bc = this._916c / this._d67d;
        if (_c8bc < 1) {
            let _61e0 = (this._8e8f * (1 - _c8bc)) + (this._867b * _c8bc);
            this._4e90(_61e0);
        }
        else {
            this._9487(this._867b);
            this._7256();
        }
    }
    _7256() {
        super._7256();
    }
};
_d747 = __decorate([
    networkDecorators_1._536c,
    __metadata("design:paramtypes", [typeof (_a = typeof _1745.default !== "undefined" && _1745.default) === "function" ? _a : Object, Number, Number, Number, typeof (_b = typeof _4e90 !== "undefined" && _4e90) === "function" ? _b : Object, typeof (_c = typeof _4e90 !== "undefined" && _4e90) === "function" ? _c : Object])
], _d747);
exports.default = _d747;
let _7304 = class _7304 extends _d747 {
    _ba41(_2d2f) {
        _8198.default.prototype._ba41.apply(this, [_2d2f]);
        this._916c += _2d2f;
        let _992b = -(((this._916c / this._d67d) - 1) ** 2) + 1;
        if (this._916c < this._d67d) {
            let _7807 = (this._8e8f * (1 - _992b)) + (this._867b * _992b);
            this._4e90(_7807);
        }
        else {
            this._9487(this._867b);
            this._7256();
        }
    }
};
_7304 = __decorate([
    networkDecorators_1._536c
], _7304);
exports._7304 = _7304;
