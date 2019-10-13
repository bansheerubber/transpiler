"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../../helpers/color");
const _ea4f = require("../sprite");


const PIXI = require("pixi.js");


const _28b7 = require("../../helpers/range");

function _e1af(_17dc, _797d, _a2f8) {
    return (_17dc * (1 - _a2f8)) + _797d * _a2f8;
}
var ParticleKeyNames;
(function (ParticleKeyNames) {
    ParticleKeyNames[ParticleKeyNames["scale"] = 0] = "scale";
    ParticleKeyNames[ParticleKeyNames["acceleration"] = 1] = "acceleration";
    ParticleKeyNames[ParticleKeyNames["spin"] = 2] = "spin";
    ParticleKeyNames[ParticleKeyNames["color"] = 3] = "color";
    ParticleKeyNames[ParticleKeyNames["time"] = 4] = "time";
})(ParticleKeyNames || (ParticleKeyNames = {}));
class _fe9d extends _ea4f.default {
    constructor(_2e76, _aeab, _b4ab, _7bf) {
        super(_2e76, undefined);
        this._acd8 = PIXI.BLEND_MODES.ADD;
        this._feb = [];
        this._f014 = 0;
        this._b046 = _28b7.default._1841(0, 100000);
        this._1899 = false;
        this._97d(_aeab);
        this._b4ab = _b4ab;
        this._29b2.anchor.x = 0.5;
        this._29b2.anchor.y = 0.5;
        this._7bf = _7bf;
        if (!this.constructor["particleInterpreted"]) {
            this.constructor["createBackendKeyframes"]();
            this.constructor["createJumpTables"]();
            this.constructor["particleInterpreted"] = true;
        }
    }
    _2849(_2228) {
        super._ba41(_2228);
        if (!this._1899) {
            this._8167 = this._ec9c;
            this._1899 = true;
        }
        let _4412 = this._612b();
        this._97d(this._b3fb()._e724(this._b4ab._1802(_2228)));
        if (_4412 == -1) {
            this._7256();
        }
        else {
            let _741d = this._3e7f(_4412);
            let _af6c = this._e466(_4412, ParticleKeyNames.scale, _741d);
            this._90f0(this._a01e()._c83c(_af6c, _af6c));
            let _a356 = this._e466(_4412, ParticleKeyNames.color, _741d);
            this._67a3 = _a356;
            this._5904 = _a356._17db;
            let _3e08 = this._e466(_4412, ParticleKeyNames.acceleration, _741d);
            if (_3e08 != 0) {
                this._b4ab._e724(this._b4ab._1802(_3e08 * _2228));
            }
            let _cce3 = this._e466(_4412, ParticleKeyNames.spin, _741d);
            this._f261 += _cce3 * _2228;
        }
        this._f014 += _2228;
    }
    _e466(_87da, _8814, _ce21) {
        let _82a7 = this._a10f(_87da, _8814);
        let _8cca = this._7cc5(_87da, _8814);
        if (_82a7 !== undefined) {
            if (_8cca === undefined) {
                return _82a7;
            }
            else {
                return _fe9d._352b(_8cca, _82a7, _ce21, _fe9d._2cc1[_8814]);
            }
        }
        else if (_8cca !== undefined) {
            return _8cca;
        }
        else {
            return _fe9d._7d86[_8814];
        }
    }
    static _352b(_791a, _d39b, _5d66, _d5cb) {
        return _d5cb.apply(null, [_791a, _d39b, _5d66]);
    }
    _7cc5(_91b4, _4fa9) {
        let _908c = this._2176()[_4fa9][_91b4];
        return this._a10f(_908c, _4fa9);
    }
    _a10f(_8051, _e994) {
        let _184d = this._a356()[_8051][_e994];
        if (_184d instanceof _28b7.default) {
            return _184d._9f18(this._a86d(_8051));
        }
        else {
            return _184d;
        }
    }
    _612b() {
        let _5dfc = this._f014 * 1000;
        let _ab2a = this._a356();
        for (let _6a42 = 0; _6a42 < _ab2a.length; _6a42++) {
            let _64e5 = _ab2a[_6a42];
            if (_5dfc < _64e5[ParticleKeyNames.time]) {
                return _6a42;
            }
        }
        return -1;
    }
    _3e7f(_c0fa) {
        let _e7e1 = this._a356();
        let _af1f = _e7e1[_c0fa - 1][ParticleKeyNames.time];
        let _7b4a = _e7e1[_c0fa][ParticleKeyNames.time];
        let _89b0 = ((this._f014 * 1000) - _af1f) / (_7b4a - _af1f);
        return _89b0 > 1 ? 1 : _89b0;
    }
    _a86d(_9a11) {
        return this._679e()[_9a11] + this._b046;
    }
    _a356() {
        return this.constructor.backendKeyframes;
    }
    _2176() {
        return this.constructor.jumpTables;
    }
    _679e() {
        return this.constructor.keyframeSeeds;
    }
    static _3081() {
        for (let _3125 = 0; _3125 < this._c68b.length; _3125++) {
            let _c1df = this._c68b[_3125];
            this._367d[_3125] = [];
            for (let _9229 in _c1df) {
                this._367d[_3125][ParticleKeyNames[_9229]] = _c1df[_9229];
            }
            this._d93f[_3125] = _28b7.default._1841(0, 100000);
        }
    }
    static _512d() {
        for (let _c60e = 0; _c60e < this._367d.length; _c60e++) {
            let _41a6 = this._367d[_c60e];
            for (let _2f0a = 0; _2f0a < _41a6.length; _2f0a++) {
                if (this._ec35[_2f0a] === undefined) {
                    this._ec35[_2f0a] = [];
                }
                if (this._ec35[_2f0a][_c60e] == undefined) {
                    this._ec35[_2f0a][_c60e] = this._ec35[_2f0a][_c60e - 1];
                    if (this._ec35[_2f0a][_c60e] === undefined) {
                        this._ec35[_2f0a][_c60e] = 0;
                    }
                }
                if (_41a6[_2f0a] !== undefined) {
                    this._ec35[_2f0a][_c60e + 1] = _c60e;
                }
            }
        }
    }
    _7256() {
        super._7256();
        if (this._7bf) {
            this._7bf._7223.splice(this._7bf._7223.indexOf(this), 1);
        }
    }
    _d59d(_3d71) {
        this._b4ab._c83c(_3d71._724, _3d71._141);
    }
    _bfe4() {
        return this._b4ab;
    }
}
_fe9d._c68b = [];
_fe9d._367d = [];
_fe9d._ec35 = [];
_fe9d._d93f = [];
_fe9d._257c = false;
_fe9d._2cc1 = {
    [ParticleKeyNames.scale]: _e1af,
    [ParticleKeyNames.acceleration]: _e1af,
    [ParticleKeyNames.spin]: _e1af,
    [ParticleKeyNames.color]: color_1._9bf6._57b2,
};
_fe9d._7d86 = {
    [ParticleKeyNames.scale]: 1,
    [ParticleKeyNames.acceleration]: 0,
    [ParticleKeyNames.spin]: 0,
    [ParticleKeyNames.color]: color_1._9bf6._4296,
};
exports.default = _fe9d;
