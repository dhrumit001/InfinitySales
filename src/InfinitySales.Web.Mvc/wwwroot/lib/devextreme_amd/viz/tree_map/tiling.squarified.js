define(function (require, exports, module) {/**
 * DevExtreme (viz/tree_map/tiling.squarified.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _max = Math.max,
    _squarify = require("./tiling.squarified.base");

function accumulate(total, current) {
    return _max(total, current)
}

function squarified(data) {
    return _squarify(data, accumulate, false)
}
require("./tiling").addAlgorithm("squarified", squarified);
module.exports = squarified;

});
