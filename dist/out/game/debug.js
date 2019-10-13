"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");

const _16d3 = require("../render/text");
const Matter = require("matter-js");
const _2b12 = require("./keybinds");

class _86cf {
    constructor() {
        this._5640 = [];
        this._b761 = [];
    }
    _cb2(_b406) {
        let _160e = this._a9d1();
        this._5640.push(_b406);
        if (this._5640.length > 0) {
            this._b761.push(_160e - this._a9d1());
        }
        if (this._5640.length > _86cf._d745) {
            this._5640.splice(0, 1);
        }
        if (this._b761.length > _86cf._d745) {
            this._b761.splice(0, 1);
        }
    }
    _a9d1() {
        let _e1c7 = 0;
        for (let _d6ef of this._5640) {
            _e1c7 += _d6ef;
        }
        return _e1c7 / this._5640.length;
    }
    _336() {
        let _a26f = Number.MAX_VALUE;
        for (let _8292 of this._b761) {
            if (_8292 < _a26f) {
                _a26f = _8292;
            }
        }
        return _a26f;
    }
}
_86cf._d745 = 30;
class _ad4a {
    constructor(_c7a9) {
        this._96f1 = new _86cf();
        this._b1c9 = new _86cf();
        this._dc6b = new _86cf();
        this._db96 = new _86cf();
        this._2d31 = this._bad2();
        this._22a8 = true;
        this._f5d4 = 0;
        this._a499 = 0;
        this._3a3e = false;
        this._c7a9 = _c7a9;
        this._4323 = new _16d3.default(_c7a9, "big", true, new PIXI.TextStyle({
            fill: 0x00FF00,
            fontSize: 12
        }));
        this._484f = this._c7a9._fe65._c9cb();
        this._28a3 = Matter.Render.create({
            element: document.body,
            engine: this._c7a9._b6db._3b2a,
            options: {
                width: this._c7a9._fe65._f65d,
                height: this._c7a9._fe65._5b3,
                hasBounds: true,
                showVelocity: true,
                showPosition: true,
                showConvexHulls: true,
                showCollisions: true,
                showSeparations: true,
                showAxes: true,
                showPositions: true,
                showDebug: true,
                wireframeBackground: "rgba(0, 0, 0, 0)",
            }
        });
        this._f5d4 = this._c7a9._fe65._f65d;
        this._a499 = this._c7a9._fe65._5b3;
        new _2b12._17f6(() => {
            if (this._22a8) {
                let _707d = this._28a3.canvas.getContext("2d");
                _707d.clearRect(0, 0, this._28a3.canvas.width, this._28a3.canvas.height);
            }
            this._22a8 = !this._22a8;
        }, () => {
        }, "f2", _2b12._17f6._580f, "");
    }
    _492a() {
        if (this._c7a9._fe65 && this._c7a9._fe65._33d1) {
            Matter.Render.lookAt(this._28a3, {
                min: {
                    x: this._c7a9._fe65._33d1._f04c._724 - this._c7a9._fe65._f65d / 2,
                    y: this._c7a9._fe65._33d1._f04c._141 - this._c7a9._fe65._5b3 / 2,
                },
                max: {
                    x: this._c7a9._fe65._33d1._f04c._724 + this._c7a9._fe65._f65d / 2,
                    y: this._c7a9._fe65._33d1._f04c._141 + this._c7a9._fe65._5b3 / 2,
                },
            });
        }
    }
    _b597(_27b, _8dc3, _330f, _45d4, _69c4, _20f9) {
        if (this._c7a9._fe65 && this._c7a9._fe65._33d1) {
            this._492a();
            if (this._c7a9._fe65._f65d != this._f5d4 || this._c7a9._fe65._5b3 != this._a499) {
                this._28a3.options.width = this._c7a9._fe65._f65d;
                this._28a3.options.height = this._c7a9._fe65._5b3;
                this._28a3.canvas.width = this._c7a9._fe65._f65d;
                this._28a3.canvas.height = this._c7a9._fe65._5b3;
            }
            this._f5d4 = this._c7a9._fe65._f65d;
            this._a499 = this._c7a9._fe65._5b3;
        }
        this._96f1._cb2(_27b);
        this._b1c9._cb2(_45d4);
        this._dc6b._cb2(_69c4);
        this._db96._cb2(_20f9);
        let _e698 = 1000 / (this._96f1._a9d1() * 1000 + this._b1c9._a9d1() + this._dc6b._a9d1() + this._db96._a9d1());
        let _b755 = [
            `Version: ${this._c7a9._6eaf}`,
            `JSSpeed: ${this._2d31.toFixed(3)}s`,
            `GPU: ${this._484f}`,
            `FPS: ${_e698.toFixed(0)}`,
            `Delta Time: ${(this._96f1._a9d1() * 1000).toFixed(2)} (${(this._96f1._336() * 1000).toFixed(2)}) ms`,
            `Tick Time: ${this._b1c9._a9d1().toFixed(2)} (${this._b1c9._336().toFixed(2)}) ms`,
            `Render Time: ${this._dc6b._a9d1().toFixed(2)} (${this._dc6b._336().toFixed(2)}) ms`,
            `Collision Time: ${this._db96._a9d1().toFixed(2)} (${this._db96._336().toFixed(2)}) ms`,
            `Resolution: ${this._c7a9._fe65._f65d}x${this._c7a9._fe65._5b3}, ${(this._c7a9._fe65._f65d / this._c7a9._fe65._5b3).toFixed(2)}`,
            `# Objects Ticked: ${_8dc3}/${_330f}`,
            `# Rigid Bodies: ${this._c7a9._b6db._7c57.size}`,
            `Latency: ${Math.floor(this._c7a9._48ef._b854._1016)}`,
            `Connection: ${this._c7a9._48ef._b854._15}`,
        ];
        this._4323._fd1b = _b755.join("\n");
    }
    _bad2() {
        let _e46d = performance.now();
        let _f9a8 = 5000000;
        let _1c06 = [];
        for (let _1519 = _f9a8; _1519 > 0; _1519--) {
            let _97c7 = _1519 * _1519 / 2 + _1519 * 31;
            _1c06[_1519 % 50] = _97c7;
        }
        let _1ee7 = performance.now();
        return (_1ee7 - _e46d) / 1000;
    }
}
exports.default = _ad4a;
