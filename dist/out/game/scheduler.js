"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


const perf_hooks_1 = require("perf_hooks");
class _4dd4 {
    constructor(_3bf, _8a9e, _bf2d, _a60e, _e9e6) {
        this._8a9e = undefined;
        this._a60e = [];
        this._e9e6 = 0;
        this._a3d9 = 0;
        this._fc10 = 0;
        this._fab2 = new Promise((_6231, _f39e) => {
            this._85db = _6231;
        });
        if (_e9e6 instanceof _861d) {
            this._a3d9 = _e9e6._c0c8;
        }
        else {
            this._e9e6 = _e9e6;
        }
        this._8a9e = _8a9e;
        this._bf2d = _bf2d;
        this._9fe9 = perf_hooks_1.performance.now();
        this._3bf = _3bf;
    }
    _dbe() {
        this._fc10++;
        if (this._fc10 >= this._a3d9 && this._a3d9 > 0) {
            this._b0bb();
            return true;
        }
        else if (perf_hooks_1.performance.now() - this._9fe9 > this._e9e6 && this._e9e6 > 0) {
            this._b0bb();
            return true;
        }
        else {
            return false;
        }
    }
    _b0bb() {
        this._85db(this._bf2d.apply(this._8a9e, this._a60e));
    }
    async _7c36() {
        return this._fab2;
    }
    _b51c() {
        return this._3bf._c5b6(this);
    }
    _fc1c() {
        return this._3bf._890e(this);
    }
}
exports._4dd4 = _4dd4;
class _861d {
    constructor(_c0c8) {
        this._c0c8 = _c0c8;
    }
}
exports._861d = _861d;
class _c5df {
    constructor() {
        this._9d12 = [];
        _c5df._1908 = this;
    }
    _297a() {
        for (let _3bbb = this._9d12.length - 1; _3bbb >= 0; _3bbb--) {
            if (this._9d12[_3bbb]._dbe()) {
                this._af8b(this._9d12[_3bbb]);
            }
        }
    }
    _349d(_3dde, _1523, _ed56, _564) {
        let _ef1f = new _4dd4(this, _564, _3dde, _1523, _ed56);
        this._9d12.push(_ef1f);
        return _ef1f;
    }
    static _349d(_ed56, _3dde, ..._1523) {
        let _ef1f = new _4dd4(this._1908, undefined, _3dde, _1523, _ed56);
        this._1908._9d12.push(_ef1f);
        return _ef1f;
    }
    _890e(_dea4) {
        if (this._c5b6(_dea4)) {
            this._af8b(_dea4);
        }
    }
    _c5b6(_8fcb) {
        return this._9d12.indexOf(_8fcb) != -1;
    }
    _af8b(_4279) {
        this._9d12.splice(this._9d12.indexOf(_4279), 1);
    }
}
exports.default = _c5df;
