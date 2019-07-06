/**
 * DevExtreme (ui/text_box/ui.text_editor.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var registerComponent = require("../../core/component_registrator"),
    TextEditorMask = require("./ui.text_editor.mask");
registerComponent("dxTextEditor", TextEditorMask);
module.exports = TextEditorMask;
