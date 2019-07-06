/**
 * DevExtreme (ui/file_manager/ui.file_manager.messages.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileManagerMessages = void 0;
var _message = require("../../localization/message");
var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ErrorCode = {
    NoAccess: 0,
    FileExists: 1,
    FileNotFound: 2,
    DirectoryExists: 3
};
var FileManagerMessages = exports.FileManagerMessages = {
    get: function(errorId, args) {
        switch (errorId) {
            case ErrorCode.NoAccess:
                return _message2.default.format("dxFileManager-errorNoAccess");
            case ErrorCode.FileExists:
                return _message2.default.format("dxFileManager-errorFileExistsFormat", args);
            case ErrorCode.FileNotFound:
                return _message2.default.format("dxFileManager-errorFileNotFoundFormat", args);
            case ErrorCode.DirectoryExists:
                return _message2.default.format("dxFileManager-errorDirectoryExistsFormat", args)
        }
        return _message2.default.format("dxFileManager-errorDefault")
    }
};
