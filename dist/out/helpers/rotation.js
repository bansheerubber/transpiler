"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _d441 = require("./vector");
exports._55fc = 180 / Math.PI;
exports._b8ff = Math.PI / 180;
class _eb3 {
    constructor(_ef66 = 0) {
        this._fee8 = 0;
        this._65d5 = new _d441.default(1, 0);
        this._ef66 = _ef66;
    }
    set _ef66(_ef66) {
        this._fee8 = _ef66;
        this._65d5._724 = Math.cos(_ef66);
        this._65d5._141 = Math.sin(_ef66);
    }
    get _ef66() {
        return this._fee8;
    }
    set _31b4(_31b4) {
        this._65d5 = _31b4._18ad();
        this._fee8 = Math.atan2(_31b4._141, _31b4._724);
        if (_31b4._141 < 0) {
            this._fee8 += Math.PI * 2;
        }
    }
    get _31b4() {
        return this._65d5;
    }
}
exports.default = _eb3;
