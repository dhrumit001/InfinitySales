/**
 * DevExtreme (viz/sankey/data_validator.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var graphModule = require("./graph");
var validator = {
    validate: function(data, incidentOccurred) {
        var result = null;
        if (this._hasCycle(data)) {
            result = "E2006";
            incidentOccurred("E2006")
        }
        return result
    },
    _hasCycle: function(data) {
        return graphModule.struct.hasCycle(data)
    }
};
module.exports = validator;
