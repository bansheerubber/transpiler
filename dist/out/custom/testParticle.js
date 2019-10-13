"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _fe9d = require("../render/emitters/particle");
const color_1 = require("../helpers/color");

class _1ab1 extends _fe9d.default {
    constructor() {
        super(...arguments);
        this._ec9c = "./data/egg.png";
    }
}
_1ab1._c68b = [{
        scale: 0.5,
        color: new color_1._9bf6(1, 0, 0, 0.5),
        acceleration: 1,
        time: 0,
    }, {
        scale: 0,
        color: new color_1._9bf6(1, 0, 0, 0),
        time: 5000,
    }];
exports.default = _1ab1;
