"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _8198 = require("../game/gameObject");
const PIXI = require("pixi.js");


const Matter = require("matter-js");
const _d441 = require("../helpers/vector");

class _3a9f extends _8198.default {
    constructor(_2e76) {
        super(_2e76);
        this._374b = [];
        this._4d28 = new PIXI.Graphics();
        this._a6ba = new _d441.default(0, 0);
        this._8690 = new _d441.default(0, 0);
    }
    _ba41(_1b1c) {
        this._2e76._fe65._a0e7.addChild(this._4d28);
        this._4d28.clear();
        this._4d28.lineStyle(1, 0x000000);
        this._4d28.beginFill(0xFF0000);
        this._4d28.drawCircle(this._2ec6.position.x, this._2ec6.position.y, 50);
        this._4d28.endFill();
    }
    get _2129() {
        return this._2ec6.angle;
    }
    set _2129(value) {
        Matter.Body.setAngle(this._2ec6, value);
    }
    _7076(_5593) {
        Matter.Body.setPosition(this._2ec6, _5593._b5ab());
    }
    _a2b8() {
        return new _d441.default(this._2ec6.position.x, this._2ec6.position.x);
    }
    _d59d(_18dc) {
        Matter.Body.setVelocity(this._2ec6, _18dc._b5ab());
    }
    _bfe4() {
        return new _d441.default(this._2ec6.velocity.x, this._2ec6.velocity.y);
    }
    _a931(_74c5) {
    }
    _8113() {
        return new _d441.default(0, 0);
    }
}
exports.default = _3a9f;
