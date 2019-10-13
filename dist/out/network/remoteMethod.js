"use strict";
Object.defineProperty(exports, "__esModule", { value: true });





const _ab61 = require("./network");

class _a05e {
    constructor(_b19f, _57f8, _340a, _cc44) {
        this._fb17 = [];
        this._cc44 = 0;
        this._b19f = _b19f;
        this._57f8 = _57f8;
        this._340a = _340a;
        this._cc44 = _cc44;
        this._3df6 = new Promise((_f9b6, _7eac) => {
            this._f9ba = _f9b6;
        });
    }
    _707c(_9b1d) {
        this._fb17.push(_9b1d);
        this._bc14();
    }
    _d9c0(_4ce1) {
        this._cc44--;
        this._bc14();
    }
    _bc14() {
        if (this._fb17.length == this._cc44) {
            this._f9ba(this._fb17);
            this._b19f._9f4[this._57f8] = undefined;
        }
    }
}
exports._a05e = _a05e;
class _e52a {
    constructor(_d916, _9cab) {
        this._b4e3 = [];
        this._54b3 = [];
        this._e5dd = false;
        this._5f84 = false;
        this._e73f = false;
        this._274c = -1;
        this._d916 = _d916;
        this._d916._8907.push(this);
        this._274c = this._d916._8907.indexOf(this);
        this._9cab = _9cab;
        this._5dc2 = this._9cab.name;
    }
    _e84(_4c33, _27b5) {
        if (!this._b4e3[_4c33]) {
            this._b4e3[_4c33] = {
                _d5d8: _27b5,
                _4c33,
            };
        }
    }
    _f51(_319a) {
        this._5cdd = _319a;
    }
    _e8ad(_586) {
        this._54b3[_586] = true;
    }
    _55db(_ab0c, ..._87b) {
        if (_ab0c._2e76._c42 && this._5f84) {
            _ab0c._2e76._48ef._cd3b(_ab0c._c756, this._274c, _87b);
            if (this._e73f) {
                this._9cab.apply(_ab0c, _87b);
            }
        }
    }
    _a6e5(_a77f, ..._4700) {
        if (_a77f._2e76._9991 && this._e5dd) {
            _a77f._2e76._48ef._6552(_a77f._c756, this._274c, _4700);
            if (this._e73f) {
                this._9cab.apply(_a77f, _4700);
            }
        }
    }
    _e821(_ad69, _fee0, ..._ab7b) {
        for (let _20f3 = 0; _20f3 < this._b4e3.length; _20f3++) {
            let _ec0d = this._b4e3[_20f3];
            if (_ec0d._d5d8) {
                let _3b83 = _ab61.default._96a4.get(_ec0d._d5d8);
                if (!_3b83) {
                    console.error(`Remote Method: Undefined validator for ${_ec0d._d5d8.name}`);
                    return undefined;
                }
                else if (!_3b83._e886(_ab7b[_20f3])) {
                    console.error(`Remote Method: Failed to validate ${_ec0d._d5d8.name} at arg index ${_20f3} for method ${this._5dc2}`);
                    _fee0._7256();
                    return undefined;
                }
            }
        }
        for (let _20f3 = 0; _20f3 < this._54b3.length; _20f3++) {
            let _a50a = this._54b3[_20f3];
            if (_a50a) {
                _ab7b[_20f3] = _fee0;
            }
        }
        if (_ad69._9633 || _ad69._369c == _fee0) {
            return this._9cab.apply(_ad69, _ab7b);
        }
    }
    _e086(_f7bb, ..._82fe) {
        return this._9cab.apply(_f7bb, _82fe);
    }
}
exports.default = _e52a;
