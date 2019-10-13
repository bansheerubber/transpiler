"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passthrough_vert_1 = require("./shaders/passthrough.vert");
const shadowmask2_frag_1 = require("./shaders/shadowmask2.frag");
class _b790 {
    static _9228(_8baf, _959d, _706a) {
        let _f533 = _8baf.createShader(_959d);
        _8baf.shaderSource(_f533, _706a);
        _8baf.compileShader(_f533);
        if (!_8baf.getShaderParameter(_f533, _8baf.COMPILE_STATUS)) {
            throw `Failed to compile shader: ${_8baf.getShaderInfoLog(_f533)}`;
        }
        else {
            return _f533;
        }
    }
    static _df4(_378) {
        this._8c5a = _378.createProgram();
        _378.attachShader(this._8c5a, this._9228(_378, _378.VERTEX_SHADER, passthrough_vert_1.default));
        _378.attachShader(this._8c5a, this._9228(_378, _378.FRAGMENT_SHADER, shadowmask2_frag_1.default));
        _378.bindAttribLocation(this._8c5a, 15, "vertexPosition");
        _378.linkProgram(this._8c5a);
        if (!_378.getProgramParameter(this._8c5a, _378.LINK_STATUS)) {
            throw `Could not link program: '${_378.getProgramInfoLog(this._8c5a)}'`;
        }
    }
}
exports.default = _b790;
