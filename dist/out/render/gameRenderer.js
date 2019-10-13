"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");



class _d78d {
    constructor(_8670) {
        this._1412 = [];
        this._a0e7 = new PIXI.Container();
        this._25f4 = new PIXI.Container();
        this._8670 = _8670;
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this._2603 = new PIXI.Application({
            width: document.getElementById("canvasContainer").clientWidth,
            height: document.getElementById("canvasContainer").clientHeight,
            backgroundColor: 0x333333,
            resizeTo: document.getElementById("canvasContainer"),
            powerPreference: "high-performance"
        });
        this._2603.stage.addChild(this._a0e7);
        this._2603.stage.addChild(this._25f4);
        document.getElementById("canvasContainer").appendChild(this._2603.view);
        this._2603.view.id = "canvas";
        this._2603.view.onselect = function () {
            return false;
        };
        this._2603.stop();
    }
    _d4e6(_544f) {
        if (this._ca50) {
            this._ca50._944d(_544f);
        }
        this._2603.render();
    }
    set _33d1(_33d1) {
        if (this._ca50) {
            this._ca50._29e1();
        }
        this._ca50 = _33d1;
        _33d1._6f14();
    }
    get _33d1() {
        return this._ca50;
    }
    get _f65d() {
        return this._2603.view.width;
    }
    get _5b3() {
        return this._2603.view.height;
    }
    _c9cb() {
        let _e469 = undefined;
        let _66e = document.getElementById("canvas");
        let _fe77 = _66e.getContext("webgl2");
        let _74de = _fe77.getExtension("WEBGL_debug_renderer_info");
        if (_74de != null) {
            _e469 = _fe77.getParameter(_74de.UNMASKED_RENDERER_WEBGL);
        }
        return _e469;
    }
    _eed3(_1bae) {
        this._1412.push(_1bae);
    }
    _fe6e(_ce6f) {
        let _4d33 = this._1412.indexOf(_ce6f);
        delete this._1412[_4d33];
        this._1412.splice(_4d33, 1);
    }
    _508(_4f69) {
        if (this._a0e7.filters == undefined) {
            this._a0e7.filters = [];
        }
        let _cc3f = [];
        for (let _c9bc of this._a0e7.filters) {
            _cc3f.push(_c9bc);
        }
        _cc3f.push(_4f69);
        this._a0e7.filters = _cc3f;
    }
    _1343(_475d) {
        if (this._a0e7.filters != undefined) {
            let _eafb = [];
            for (let _4aa6 of this._a0e7.filters) {
                if (_4aa6 != _475d) {
                    _eafb.push(_4aa6);
                }
            }
            this._a0e7.filters = _eafb;
        }
    }
}
exports.default = _d78d;
