"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const networkDecorators_1 = require("../networkDecorators");
const _a18a = require("./validator");
let _82f4 = class _82f4 extends _a18a.default {
    static _e886(_8788) {
        if (typeof _8788 == "string" || _8788 == undefined) {
            return true;
        }
        else {
            return false;
        }
    }
};
_82f4 = __decorate([
    networkDecorators_1._58f1(String)
], _82f4);
exports.default = _82f4;
