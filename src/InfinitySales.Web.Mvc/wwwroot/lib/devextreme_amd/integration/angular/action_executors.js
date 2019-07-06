define(function (require, exports, module) {/**
 * DevExtreme (integration/angular/action_executors.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var Action = require("../../core/action");
Action.registerExecutor({
    ngExpression: {
        execute: function(e) {
            if ("string" === typeof e.action) {
                e.context.$eval(e.action)
            }
        }
    }
});

});
