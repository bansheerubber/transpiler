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
let _f59c = class _f59c extends _a18a.default {
    static _e886(_c4bf) {
        if (typeof _c4bf == "number" || _c4bf == undefined) {
            return true;
        }
        else {
            return false;
        }
    }
};
_f59c = __decorate([
    networkDecorators_1._58f1(Number)
], _f59c);
exports.default = _f59c;
