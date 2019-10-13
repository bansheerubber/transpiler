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
var _a, _b;
const _1745 = require("../game/game");

const _ab61 = require("./network");

const _8198 = require("../game/gameObject");
const networkDecorators_1 = require("./networkDecorators");



let _b10d = class _b10d extends _8198.default {
    constructor(_2e76, _e45e) {
        super(_2e76, _e45e);
        this._9633 = false;
        this._c756 = -1;
        Object.assign(this);
        this._2e76._48ef._bc15(this);
    }
    _8518(_b08b, ..._ded1) {
        this._2e76 = _b08b;
        this._2e76._48ef._2fb4[this._c756] = true;
    }
    _8b9a() {
        return _ab61.default._bcdd(this.constructor);
    }
    _ec35() {
        return this._2e76._48ef._7c7a()._342a;
    }
    _d39f() {
        return this._2e76._48ef._16c2()._3df6;
    }
    _7256() {
        super._7256();
        this._2e76._48ef._4126(this);
    }
};
_b10d = __decorate([
    networkDecorators_1._536c,
    __metadata("design:paramtypes", [typeof (_a = typeof _1745.default !== "undefined" && _1745.default) === "function" ? _a : Object, typeof (_b = typeof _601a !== "undefined" && _601a) === "function" ? _b : Object])
], _b10d);
exports.default = _b10d;
