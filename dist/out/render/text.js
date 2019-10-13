"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const _1319 = require("./renderObject");

class _16d3 extends _1319.default {
    constructor(_2e76, _fd1b, _e494, _bddd) {
        super(_2e76);
        this._e494 = true;
        this._ea10 = new PIXI.Text(_fd1b, _bddd);
        this._fd1b = _fd1b;
        this._bddd = _bddd;
        this._e494 = _e494;
        if (_e494) {
            this._2e76._fe65._25f4.addChild(this._ea10);
        }
        else {
            this._2e76._fe65._a0e7.addChild(this._ea10);
        }
        this._2e76._fe65._eed3(this);
    }
    set _fd1b(_fd1b) {
        this._ea10.text = _fd1b;
    }
    get _fd1b() {
        return this._ea10.text;
    }
    set _bddd(_bddd) {
        this._ea10.style = _bddd;
    }
    get _bddd() {
        return this._ea10.style;
    }
}
exports.default = _16d3;
