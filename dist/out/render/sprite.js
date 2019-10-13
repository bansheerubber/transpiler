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
const PIXI = require("pixi.js");
const networkDecorators_1 = require("../network/networkDecorators");
const _1319 = require("./renderObject");
const _1745 = require("../game/game");
const _d441 = require("../helpers/vector");
const color_1 = require("../helpers/color");


let _ea4f = class _ea4f extends _1319.default {
    constructor(_2e76, _2353) {
        super(_2e76);
        this._feb = [];
        this._7c77 = new _d441.default(1, 1);
        this._df89 = new _d441.default(0, 0);
        if (_2353 == undefined) {
            this._29b2 = new PIXI.Sprite(undefined);
        }
        else if (_2353 instanceof PIXI.Texture) {
            this._29b2 = new PIXI.Sprite(_2353);
        }
        else {
            this._29b2 = PIXI.Sprite.from(_2353);
        }
        this._29b2.anchor.x = 0.5;
        this._29b2.anchor.y = 0.5;
        this._2e76._fe65._a0e7.addChild(this._29b2);
    }
    _97d(_b370) {
        this._29b2.transform.position.x = _b370._724;
        this._29b2.transform.position.y = _b370._141;
        this._df89._724 = _b370._724;
        this._df89._141 = _b370._141;
    }
    _b3fb() {
        this._df89._724 = this._29b2.transform.position.x;
        this._df89._141 = this._29b2.transform.position.y;
        return this._df89;
    }
    _90f0(_64f3) {
        this._29b2.transform.scale.x = _64f3._724;
        this._29b2.transform.scale.y = _64f3._141;
        this._7c77._724 = _64f3._724;
        this._7c77._141 = _64f3._141;
    }
    _a01e() {
        this._7c77._724 = this._29b2.transform.scale.x;
        this._7c77._141 = this._29b2.transform.scale.y;
        return this._7c77;
    }
    set _f261(_f261) {
        this._29b2.rotation = _f261;
    }
    get _f261() {
        return this._29b2.rotation;
    }
    set _8167(_2353) {
        if (_2353 instanceof PIXI.Texture) {
            this._29b2.texture = _2353;
        }
        else {
            this._29b2.texture = PIXI.Texture.from(_2353);
        }
    }
    get _8167() {
        return this._29b2.texture;
    }
    set _67a3(color) {
        this._29b2.tint = color._eb86();
    }
    get _67a3() {
        return color_1._9bf6._7f(this._29b2.tint);
    }
    set _5904(_5904) {
        this._29b2.alpha = _5904;
    }
    get _5904() {
        return this._29b2.alpha;
    }
    set _acd8(mode) {
        this._29b2.blendMode = mode;
    }
    get _acd8() {
        return this._29b2.blendMode;
    }
    _7256() {
        super._7256();
        this._29b2.destroy();
    }
};
_ea4f = __decorate([
    networkDecorators_1._536c,
    __metadata("design:paramtypes", [typeof (_a = typeof _1745.default !== "undefined" && _1745.default) === "function" ? _a : Object, Object])
], _ea4f);
exports.default = _ea4f;
