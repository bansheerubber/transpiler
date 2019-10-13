"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


const perf_hooks_1 = require("perf_hooks");
const _c5df = require("./scheduler");
const Matter = require("matter-js");
class _66bf {
    constructor(_1ca1) {
        this._e132 = new Set();
        this._5f5e = new _c5df.default();
        this._b77 = 0;
        this._b773 = 16 / 1000;
        this._ee = [];
        this._1ca1 = _1ca1;
    }
    _c139() {
        this._5fa4 = true;
        this._9a9e();
    }
    _af80() {
        this._5fa4 = false;
    }
    _9a9e() {
        let _aaf3 = perf_hooks_1.performance.now();
        let _d672 = (_aaf3 - this._b77) / 1000;
        let _c953 = ((_aaf3 - this._b77) + this._933d + this._b5b3) / 1000;
        if (this._1ca1._b6db) {
            var _c814 = perf_hooks_1.performance.now();
            this._1ca1._b6db._2b45(_c953, this._b773);
            this._b9fa = perf_hooks_1.performance.now() - _c814;
        }
        let _6d41 = perf_hooks_1.performance.now();
        let _3abe = this._1dc9(_c953);
        let _4f75 = this._e132.size;
        this._5f5e._297a();
        this._933d = perf_hooks_1.performance.now() - _6d41;
        if (this._1ca1._fe65) {
            var _ac1f = perf_hooks_1.performance.now();
            this._1ca1._fe65._d4e6(_c953);
            this._b5b3 = perf_hooks_1.performance.now() - _ac1f;
        }
        if (this._1ca1._52cb) {
            if (this._1ca1._52cb._22a8) {
                this._1ca1._52cb._492a();
                let _b71 = perf_hooks_1.performance.now();
                Matter.Render.world(this._1ca1._52cb._28a3);
                this._b9fa += perf_hooks_1.performance.now() - _b71;
            }
            this._1ca1._52cb._b597(_d672, _3abe, _4f75, this._933d, this._b5b3, this._b9fa);
        }
        if (this._5fa4) {
            if (this._1ca1._c42) {
                window.requestAnimationFrame(this._9a9e.bind(this));
            }
            else {
                setTimeout(() => {
                    this._9a9e();
                }, 20);
            }
        }
        this._b77 = perf_hooks_1.performance.now();
        this._b773 = _c953;
    }
    _1dc9(_74e1) {
        let _81ba = 0;
        for (let _e671 of this._e132.values()) {
            if (_e671._5423) {
                _e671._ba41(_74e1);
                _81ba++;
            }
        }
        return _81ba;
    }
}
exports.default = _66bf;
