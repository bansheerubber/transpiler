"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _9a0e = require("./networkBase");
const _ab61 = require("./network");
const fs = require("fs");
const _c5df = require("../game/scheduler");


const _fbb7 = require("./client");
const _e52a = require("./remoteMethod");
const _13d = require("ws");
const _cc33 = require("https");
class _962b {
    constructor(_b0d3) {
        this._3d67 = 7000;
        this._601d = "N/A";
        this._4338 = false;
        this._b0d3 = _b0d3;
        this._852d(this._3d67);
    }
    _852d(_c04e, _588c, _4a0d, _b3db) {
        if (_588c && fs.existsSync(_588c) && fs.lstatSync(_588c).isFile()
            && _4a0d && fs.existsSync(_4a0d) && fs.lstatSync(_4a0d).isFile()
            && _b3db && fs.existsSync(_b3db) && fs.lstatSync(_b3db)) {
            const _1956 = new _cc33.createServer({
                cert: fs.readFileSync(_588c),
                key: fs.readFileSync(_4a0d),
                ca: fs.readFileSync(_b3db)
            });
            var _6b9f = {
                server: _1956
            };
            _1956.listen(_c04e);
            this._4338 = true;
        }
        else {
            if (_588c || _4a0d) {
                _c5df.default._349d(100, console.error, `Could not find certificate or key files at "${_588c}" or "${_4a0d}"`);
            }
            var _6b9f = {
                port: _c04e,
                server: true
            };
            this._4338 = false;
        }
        let _3220 = Object.assign({
            perMessageDeflate: {
                zlibDeflateOptions: {
                    chunkSize: 1024,
                    memLevel: 9,
                    level: 9
                },
                zlibInflateOptions: {
                    chunkSize: 15 * 1024
                },
                clientNoContextTakeover: true,
                serverNoContextTakeover: true,
                serverMaxWindowBits: 15,
                concurrencyLimit: 10,
                threshold: 64
            }
        }, _6b9f);
        this._9385 = new _13d.Server(_3220);
        console.log(`Server listening on port ${this._3d67}...`);
        this._9385.on("connection", (_28da, _6d56) => {
            new _fbb7.default(this._b0d3._295f, _28da, _6d56);
        });
        this._9385.on("error", (_c9e3) => {
            console.log("connection error", _c9e3);
        });
    }
}
class _6bb4 extends _9a0e.default {
    constructor(_295f) {
        super(_295f);
        this._d38a = {};
        this._9f4 = {};
        this._4943 = 0;
        this._6d92 = new _962b(this);
    }
    _1b64() {
        let _6128 = [];
        for (let _35b1 of this._c8bb.values()) {
            let _9d89 = [];
            let _58df;
            if ((_58df = this._e04a(_35b1))) {
                for (let _35b1 of _58df) {
                    _9d89.push(_35b1._c756);
                }
            }
            _6128.push({
                _e69: _ab61.default._6d6d(_35b1, true),
                _8cc9: _9d89
            });
        }
        return _6128;
    }
    _e97b(_fd47, _b817, _981c) {
        let _aa24 = this._9055[_b817];
        let _96ab = this._a301;
        this._d38a[_96ab] = {
            _981c,
            _fd47,
            _aa24,
            _3ac8: new Promise((_bfaa, _e7da) => {
                this._b2dc[_96ab] = (_65ff) => {
                    let _7d14 = this._9055[_b817]._8b9a()._8907[_fd47._340a];
                    if (_7d14._5cdd != undefined) {
                        let _c33d = _7d14._5cdd.validate(_65ff);
                        if (_c33d == false) {
                            console.error(`Remote Return: Failed to validate a return ${_7d14._5cdd.name} for method ${_7d14._5dc2}`);
                            _d55a._7256();
                            return _e7da({
                                client: _d55a,
                                error: "unvalidated",
                            });
                        }
                    }
                    _fd47._707c({
                        _7a75: _d55a,
                        _e98f: _65ff,
                    });
                    _bfaa({
                        client: _d55a,
                        value: _65ff,
                    });
                };
                this._a7d9[_96ab] = (_805e) => {
                    _fd47._d9c0({
                        _471f: _d55a,
                        _5223: _805e,
                    });
                    _e7da({
                        client: _d55a,
                        error: _805e,
                    });
                };
                setTimeout(() => {
                    this._4974(_96ab, "timeout");
                }, 2000);
            }),
        };
        this._a301++;
        return _96ab;
    }
    _6552(_718c, _e54e, _cf60) {
        let _3d5a = new _e52a._a05e(this, this._4943, _e54e, this._4c56.size);
        for (let _b2bb of this._4c56.values()) {
            let _1a50 = this._e97b(_3d5a, _718c, _b2bb);
            _b2bb._50e5(_718c, _e54e, _1a50, _cf60);
        }
        this._9f4[this._4943] = _3d5a;
        this._4943++;
    }
    _845a(_411b, _175c) {
        let { _2e48, _71d4, _d4de, _e80d, } = _411b;
        if (this._9055[_2e48]) {
            let _ca88 = this._9055[_2e48];
            if (this._295f._9991 && _ca88._8b9a()._8907[_71d4]) {
                let _134d = _ca88._8b9a()._8907[_71d4]._e821(_ca88, _175c, ..._e80d);
                _175c._c0f4(_d4de, _134d);
            }
        }
    }
    _a10b(_9eb2, _ddc3) {
        let _3570 = this._d38a[_9eb2._77f7];
        if (_3570 && _3570._167e == _ddc3 && (_3570._6244._9633 || _3570._6244._369c == _ddc3)) {
            this._ce84(_9eb2._77f7, _9eb2._f751);
        }
    }
    _16c2() {
        return this._9f4[this._4943 - 1];
    }
}
exports.default = _6bb4;
