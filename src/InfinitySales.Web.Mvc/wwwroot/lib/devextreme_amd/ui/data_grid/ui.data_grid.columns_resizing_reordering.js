define(function (require, exports, module) {/**
 * DevExtreme (ui/data_grid/ui.data_grid.columns_resizing_reordering.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiData_grid = require("./ui.data_grid.core");
var _uiData_grid2 = _interopRequireDefault(_uiData_grid);
var _uiGrid_core = require("../grid_core/ui.grid_core.columns_resizing_reordering");
var _uiGrid_core2 = _interopRequireDefault(_uiGrid_core);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
exports.DraggingHeaderView = _uiGrid_core2.default.views.draggingHeaderView;
exports.DraggingHeaderViewController = _uiGrid_core2.default.controllers.draggingHeader;
exports.ColumnsSeparatorView = _uiGrid_core2.default.views.columnsSeparatorView;
exports.TablePositionViewController = _uiGrid_core2.default.controllers.tablePosition;
exports.ColumnsResizerViewController = _uiGrid_core2.default.controllers.columnsResizer;
exports.TrackerView = _uiGrid_core2.default.views.trackerView;
_uiData_grid2.default.registerModule("columnsResizingReordering", _uiGrid_core2.default);

});
