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
var _a;
const _afd4 = require("../game/damage/player");
const damageable_1 = require("../game/damage/damageable");
const _1745 = require("../game/game");
const _2b12 = require("../game/keybinds");
const _16d7 = require("../collision/collidableBox");
const _ea4f = require("../render/sprite");
const networkDecorators_1 = require("../network/networkDecorators");
const _d441 = require("../helpers/vector");
const Matter = require("matter-js");
let _5466 = class _5466 extends _afd4.default {
    constructor(_2e76) {
        super(_2e76, new _afd4._1207({
            _627c: 1000,
            _caab: 500,
            _f3a0: 500
        }));
        this._4638 = new _ea4f.default(_2e76, "./data/egg.png");
        this._acea = new _16d7.default(_2e76, new _d441.default(0, 0), 149, 149);
        Matter.Body.setInertia(this._acea._2ec6, Number.POSITIVE_INFINITY);
        this._acea._2ec6.frictionAir = 0.2;
        this._acea._2ec6.friction = 0;
        this._acea._2ec6.frictionStatic = 0;
        new _2b12._17f6(() => {
            this._a1b5._964c = true;
        }, () => {
            this._a1b5._964c = false;
        }, "w", _2b12._17f6._580f, "Move Camera Up");
        new _2b12._17f6(() => {
            this._a1b5._f7b4 = true;
        }, () => {
            this._a1b5._f7b4 = false;
        }, "s", _2b12._17f6._580f, "Move Camera Down");
        new _2b12._17f6(() => {
            this._a1b5._e03e = true;
        }, () => {
            this._a1b5._e03e = false;
        }, "a", _2b12._17f6._580f, "Move Camera Left");
        new _2b12._17f6(() => {
            this._a1b5._9c8e = true;
        }, () => {
            this._a1b5._9c8e = false;
        }, "d", _2b12._17f6._580f, "Move Camera Right");
    }
    _499d(_5b8e) {
        return false;
    }
};
_5466 = __decorate([
    networkDecorators_1._536c,
    __metadata("design:paramtypes", [typeof (_a = typeof _1745.default !== "undefined" && _1745.default) === "function" ? _a : Object])
], _5466);
exports.default = _5466;
