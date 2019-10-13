"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _66bf = require("./gameTicker");
const _ab61 = require("../network/network");
const _6b4c = require("../network/clientNetwork");
const _6bb4 = require("../network/serverNetwork");
const _d78d = require("../render/gameRenderer");
const _ad4a = require("./debug");
const _fed4 = require("../collision/gameCollision");

class _1745 {
    constructor(_c42) {
        this._6eaf = "testtype:0.0.0";
        this._605b = new _66bf.default(this);
        this._c42 = _c42;
        this._9991 = !_c42;
        if (_c42) {
            this._48ef = new _6b4c.default(this);
            this._fe65 = new _d78d.default(this);
            this._b6db = new _fed4.default(this);
            this._52cb = new _ad4a.default(this);
            let _ede8 = new Image();
            _ede8.onload = () => {
                let _c59e = 1.25;
                let _f1e8 = 0.5;
                console.log("%c ", "font-size: 1px; padding: " + Math.floor(_ede8.height * _f1e8 / 2) + "px " + Math.floor(_ede8.width * _c59e / 2) + "px; background: url('./data/egg.png'); background-size: " + (_ede8.width * _c59e) + "px " + (_ede8.height * _f1e8) + "px; color: transparent; background-repeat: no-repeat;");
                console.log(`%cpowered by eggine mk3 (${this._6eaf})`, "font-size: 15pt; font-weight: bold;");
            };
            _ede8.src = "./data/egg.png";
        }
        else {
            this._48ef = new _6bb4.default(this);
        }
        _ab61.default._e1d6(this);
    }
    _a93() {
        this._605b._c139();
    }
    _add0() {
        this._605b._af80();
    }
}
exports.default = _1745;
