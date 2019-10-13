"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b;
const _b10d = require("./remoteObject");
const _1745 = require("../game/game");
const networkDecorators_1 = require("./networkDecorators");

const _404c = require("./clientInterpreter");
const _ab61 = require("./network");
let _fbb7 = class _fbb7 extends _b10d.default {
    constructor(_2e76, _cc9, _9ff) {
        super(_2e76);
        this._1b24 = new _404c.default(this);
        this._4d7c = 0;
        this._42a9 = 0;
        if (_cc9 && _9ff) {
            this._cc9 = _cc9;
            this._f888 = _9ff.connection.remoteAddress;
            console.log(`${this._f888} has joined`);
            this._cc9.on("close", () => {
                console.log(`${this._f888} has left`);
                this._7256();
            });
            this._cc9.on("message", (_92c5) => {
                this._1b24._f4ea(_92c5);
            });
            this._cc9.on("pong", () => {
                this._4d7c = Math.ceil((performance.now() - this._42a9)) / 2;
                this._8eed(4, this._4d7c);
            });
            this._8eed(0, this._2e76._48ef._1b64());
        }
    }
    _81e7(_3e79) {
        super._ba41(_3e79);
        let _18bf = performance.now();
        if (_18bf - this._42a9 > 5000) {
            this._cc9.ping();
            this._42a9 = _18bf;
        }
    }
    _8518(_6cd8) {
        super._8518(_6cd8);
        this._2e76._48ef._4c56.add(this);
    }
    _8eed(_a12, _61c5) {
        if (this._cc9.readyState == 1) {
            let _55d5 = _ab61.default._6d6d([_a12, _61c5]);
            this._cc9.send(_55d5);
        }
    }
    _c0f4(_c53, _1817) {
        this._8eed(2, {
            _c53,
            _1817
        });
    }
    _50e5(_671, _d594, _ac93, _460a) {
        this._8eed(1, {
            _671,
            _d594,
            _ac93,
            _460a,
        });
    }
    _7256() {
        super._7256();
        this._2e76._48ef._4c56.delete(this);
        this._cc9.close();
    }
};
__decorate([
    networkDecorators_1._901f,
    __metadata("design:type", Object)
], _fbb7.prototype, "_cc9", void 0);
__decorate([
    networkDecorators_1._901f,
    __metadata("design:type", String)
], _fbb7.prototype, "_f888", void 0);
__decorate([
    networkDecorators_1._901f,
    __metadata("design:type", typeof (_a = typeof _404c.default !== "undefined" && _404c.default) === "function" ? _a : Object)
], _fbb7.prototype, "_1b24", void 0);
__decorate([
    networkDecorators_1._901f,
    __metadata("design:type", Number)
], _fbb7.prototype, "_4d7c", void 0);
__decorate([
    networkDecorators_1._901f,
    __metadata("design:type", Number)
], _fbb7.prototype, "_42a9", void 0);
_fbb7 = __decorate([
    networkDecorators_1._8f6(),
    networkDecorators_1._536c,
    __metadata("design:paramtypes", [typeof (_b = typeof _1745.default !== "undefined" && _1745.default) === "function" ? _b : Object, Object, Object])
], _fbb7);
exports.default = _fbb7;
