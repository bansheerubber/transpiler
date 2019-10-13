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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a, _b, _c;
const _b10d = require("../network/remoteObject");
const _1745 = require("../game/game");
const networkDecorators_1 = require("../network/networkDecorators");
const _fbb7 = require("../network/client");
let _948b = class _948b extends _b10d.default {
    constructor(_2e76, _d41b) {
        super(_2e76);
        this._d41b = "";
        this._d41b = _d41b;
        this._9633 = true;
    }
    _8518(_4201, _7b77) {
        super._8518(_4201);
        this._d41b = _7b77;
        if (_4201._c42) {
            console.log("frog:", this);
        }
        console.log("frog's enemy:", _7b77);
    }
    _8885() {
        console.log("frog will defeat this enemy:", this._d41b);
    }
    _aacf(_85bb, _6a56, _622, _ef86) {
        return 53;
    }
    _ec4b() {
        console.log("executed client command");
        return "we did it";
    }
};
__decorate([
    networkDecorators_1._c27f(),
    __param(2, networkDecorators_1._d993),
    __param(3, networkDecorators_1._55b0),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, typeof (_a = typeof _948b !== "undefined" && _948b) === "function" ? _a : Object, typeof (_b = typeof _fbb7.default !== "undefined" && _fbb7.default) === "function" ? _b : Object]),
    __metadata("design:returntype", Number)
], _948b.prototype, "_aacf", null);
__decorate([
    networkDecorators_1._d55a(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], _948b.prototype, "_ec4b", null);
_948b = __decorate([
    networkDecorators_1._8f6("_d41b"),
    networkDecorators_1._536c,
    __metadata("design:paramtypes", [typeof (_c = typeof _1745.default !== "undefined" && _1745.default) === "function" ? _c : Object, String])
], _948b);
exports.default = _948b;
