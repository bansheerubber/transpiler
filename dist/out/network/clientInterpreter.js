"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



const _ab61 = require("./network");
class _404c {
    constructor(_964c) {
        this._964c = _964c;
    }
    _f4ea(_59a7) {
        try {
            var _81c1 = _ab61.default._dbc7(_59a7);
            switch (_81c1[0]) {
                case 0: {
                    let _12d9 = _81c1[1];
                    this._964c._2e76._48ef._845a(_12d9, this._964c);
                }
                case 1: {
                    let _ac83 = _81c1[1];
                    this._964c._2e76._48ef._a10b(_ac83, this._964c);
                }
            }
        }
        catch (_b00e) {
            console.log("Player: Failed to parse message", _b00e);
            this._964c._7256();
        }
    }
}
exports.default = _404c;
