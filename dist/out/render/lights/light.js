"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


const color_1 = require("../../helpers/color");
const light_vert_1 = require("./shaders/light.vert");
const light_frag_1 = require("./shaders/light.frag");
const PIXI = require("pixi.js");
class _3751 extends PIXI.Filter {
    constructor(_fe45, _c5cf, _5fd6, _98f6) {
        super(light_vert_1.default, light_frag_1.default, {
            "position": {
                type: "v2",
                value: null
            },
            "radius": {
                type: "float",
                value: null
            },
            "color": {
                type: "v4",
                value: null
            },
            "dimensions": {
                type: "v4",
                value: null
            },
            "zoom": {
                type: "float",
                value: null
            }
        });
        this._fe45 = _fe45;
        this._c5cf = _c5cf;
        this._5fd6 = _5fd6;
        this._98f6 = _98f6;
        this._fe45._fe65._508(this);
    }
    _5ce6(_bcdf, _f376, _13d9, _14df, _eb49) {
        this.uniforms.position[0] = this._c5cf._724;
        this.uniforms.position[1] = this._c5cf._141;
        this.uniforms.radius = this._5fd6;
        this.uniforms.color[0] = this._98f6._1d4e;
        this.uniforms.color[1] = this._98f6._1dcc;
        this.uniforms.color[2] = this._98f6._9e94;
        this.uniforms.color[3] = this._98f6._17db;
        this.uniforms.dimensions[0] = this._fe45._fe65._f65d;
        this.uniforms.dimensions[1] = this._fe45._fe65._5b3;
        this.uniforms.dimensions[2] = _f376.width;
        this.uniforms.dimensions[3] = _f376.height;
        this.uniforms.zoom = this._fe45._fe65._33d1._a7f7;
        _bcdf.applyFilter(this, _f376, _13d9, _14df);
    }
}
exports.default = _3751;
