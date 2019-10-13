"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1745 = require("./game/game");
const main_1 = require("./custom/main");

const _d441 = require("./helpers/vector");
const _47b2 = require("./helpers/vectorInterpolation");
const _d747 = require("./helpers/scalarInterpolation");

require("./network/validators/numberValidator");
require("./network/validators/stringValidator");
(async function () {
    let _36d0 = new _1745.default(typeof window != "undefined");
    _36d0._a93();
    main_1.default(_36d0);
    if (_36d0._c42) {
        window["game"] = _36d0;
        window["Vector"] = _d441.default;
        window["VectorInterpolation"] = _47b2.default;
        window["SmoothVectorInterpolation"] = _47b2._2ff1;
        window["ScalarInterpolation"] = _d747.default;
        window["SmoothScalarInterpolation"] = _d747._7304;
        window["test"] = async function (_ecee, _15ab) {
            _ecee._aacf(25, "frog", _15ab);
            try {
                let _3c75 = await _ecee._ec35();
                console.log(_3c75);
            }
            catch (_4747) {
                console.log(_4747);
            }
        };
    }
})();
