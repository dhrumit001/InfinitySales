/**
 * DevExtreme (ui/file_manager/ui.file_manager.common.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _deferred = require("../../core/utils/deferred");
var _common = require("../../core/utils/common");
var whenSome = function(arg, onSuccess, onError) {
    onSuccess = onSuccess || _common.noop;
    onError = onError || _common.noop;
    var createResult = function(result, success, canceled, error) {
        return {
            result: result,
            success: success,
            canceled: canceled || false,
            error: error || null
        }
    };
    var createErrorInfo = function(index, result) {
        return {
            index: index,
            errorId: result.errorId
        }
    };
    if (!Array.isArray(arg)) {
        return (0, _deferred.when)(arg).then(onSuccess, function(error) {
            if (error) {
                onError(createErrorInfo(0, error))
            }
        })
    }
    var deferreds = arg.map(function(item, index) {
        return (0, _deferred.when)(item).then(function(result) {
            return createResult(result, true)
        }, function(error) {
            if (error) {
                onError(createErrorInfo(index, error))
            }
            return createResult(null, false, !error, error)
        })
    });
    return _deferred.when.apply(null, deferreds).then(function() {
        var resArray = [].slice.call(arguments);
        if (resArray.some(function(res) {
                return res.success
            })) {
            onSuccess()
        }
        return resArray
    })
};
module.exports = whenSome;
