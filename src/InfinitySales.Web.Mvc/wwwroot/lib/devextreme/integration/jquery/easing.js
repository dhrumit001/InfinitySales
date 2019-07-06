/**
 * DevExtreme (integration/jquery/easing.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var jQuery = require("jquery"),
    easing = require("../../animation/easing");
if (jQuery) {
    easing.setEasing(jQuery.easing)
}
