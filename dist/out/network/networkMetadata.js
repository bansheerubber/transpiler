"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _e52a = require("./remoteMethod");
const _d8ca = require("../game/extensionTree");
const _ab61 = require("./network");
class _80 {
    constructor(_db5e, ..._eaed) {
        this._a710 = [];
        this._aec8 = [];
        this._8907 = [];
        this._db5e = _db5e;
        this._c884 = _db5e.name;
        this._a710 = _eaed;
    }
    _16a() {
        let _61b9 = _d8ca.default._2f3a(this._db5e);
        if (_61b9) {
            for (let _8492 of _61b9._fba8()) {
                let _ae33 = _ab61.default._bcdd(_8492._fcac());
                if (_ae33) {
                    this._aec8 = this._aec8.concat(_ae33._aec8);
                    this._8907 = this._8907.concat(_ae33._8907);
                }
            }
        }
    }
    _887d(_59e6) {
        this._aec8.push(_59e6);
    }
    _acc5(_ace) {
        let _5cad;
        if ((_5cad = this._6758(_ace)) == undefined) {
            _5cad = new _e52a.default(this, _ace);
        }
        return _5cad;
    }
    _6758(_d3d) {
        for (let _6c23 of this._8907) {
            if (_6c23._9cab == _d3d) {
                return _6c23;
            }
        }
        return undefined;
    }
    _1c49(_42b4) {
        for (let _9161 of this._aec8) {
            if (_9161 == _42b4) {
                return true;
            }
        }
        return false;
    }
}
exports.default = _80;
