"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const passthrough_vert_1 = require("./shaders/passthrough.vert");
const shadowmask2_frag_1 = require("./shaders/shadowmask2.frag");

const color_1 = require("../../helpers/color");

const PIXI = require("pixi.js");
class _fc63 extends PIXI.Filter {
    constructor(_263d, _f444, _3d46, _4e54) {
        super(passthrough_vert_1.default, shadowmask2_frag_1.default, {
            dimensions: {
                type: "v4",
                value: null
            },
            positionData: {
                type: "v4",
                value: null
            },
            lightData: {
                type: "v3",
                value: null
            },
            shadowMask: {
                type: "int",
                value: null
            },
            lightColor: {
                type: "v3",
                value: null
            }
        });
        this._263d = _263d;
        this._f444 = _f444;
        this._3d46 = _3d46;
        this._4e54 = _4e54;
    }
    _1929(_ce4e, _9f18, _997d, _3205, _9911) {
    }
}
exports._fc63 = _fc63;
