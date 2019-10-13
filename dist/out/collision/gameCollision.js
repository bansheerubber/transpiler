"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");


class _fed4 {
    constructor(_8841) {
        this._3b2a = Matter.Engine.create();
        this._7c57 = new Set();
        this._8841 = _8841;
        this._3b2a.world.gravity.x = 0;
        this._3b2a.world.gravity.y = 0;
    }
    _2b45(_cc2d, _3887) {
        Matter.Engine.update(this._3b2a, _cc2d * 1000, _cc2d / _3887);
    }
    _640(_3d0c) {
        Matter.World.add(this._3b2a.world, _3d0c._2ec6);
        this._7c57.add(_3d0c);
    }
    _373e(_6ed3) {
        Matter.World.remove(this._3b2a.world, _6ed3._2ec6);
        this._7c57.delete(_6ed3);
    }
}
exports.default = _fed4;
