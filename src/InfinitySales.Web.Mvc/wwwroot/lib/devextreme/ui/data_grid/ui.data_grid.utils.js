/**
 * DevExtreme (ui/data_grid/ui.data_grid.utils.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiGrid_core = require("../grid_core/ui.grid_core.utils");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);
var _utils = require("../../data/utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
exports.createGroupFilter = function(path, storeLoadOptions) {
    var i, groups = (0, _utils.normalizeSortingInfo)(storeLoadOptions.group),
        filter = [];
    for (i = 0; i < path.length; i++) {
        filter.push([groups[i].selector, "=", path[i]])
    }
    if (storeLoadOptions.filter) {
        filter.push(storeLoadOptions.filter)
    }
    return _uiGrid_core2.default.combineFilters(filter)
};
