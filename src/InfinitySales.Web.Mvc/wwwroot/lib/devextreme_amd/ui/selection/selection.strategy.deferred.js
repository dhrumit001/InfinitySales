define(function (require, exports, module) {/**
 * DevExtreme (ui/selection/selection.strategy.deferred.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var typeUtils = require("../../core/utils/type"),
    SelectionStrategy = require("./selection.strategy"),
    errors = require("../widget/ui.errors"),
    dataQuery = require("../../data/query"),
    Deferred = require("../../core/utils/deferred").Deferred;
module.exports = SelectionStrategy.inherit({
    getSelectedItems: function() {
        return this._loadFilteredData(this.options.selectionFilter)
    },
    getSelectedItemKeys: function() {
        var d = new Deferred,
            that = this,
            key = this.options.key(),
            select = typeUtils.isString(key) ? [key] : key;
        this._loadFilteredData(this.options.selectionFilter, null, select).done(function(items) {
            var keys = items.map(function(item) {
                return that.options.keyOf(item)
            });
            d.resolve(keys)
        }).fail(d.reject);
        return d.promise()
    },
    selectedItemKeys: function(keys, preserve, isDeselect, isSelectAll) {
        if (isSelectAll) {
            var filter = this.options.filter();
            if (!filter) {
                this._setOption("selectionFilter", isDeselect ? [] : null)
            } else {
                this._addSelectionFilter(isDeselect, filter, false)
            }
        } else {
            if (!preserve) {
                this._setOption("selectionFilter", [])
            }
            for (var i = 0; i < keys.length; i++) {
                if (isDeselect) {
                    this.removeSelectedItem(keys[i])
                } else {
                    this.addSelectedItem(keys[i])
                }
            }
        }
        this.onSelectionChanged();
        return (new Deferred).resolve()
    },
    setSelectedItems: function(keys) {
        this._setOption("selectionFilter", null);
        for (var i = 0; i < keys.length; i++) {
            this.addSelectedItem(keys[i])
        }
    },
    isItemDataSelected: function(itemData) {
        return this.isItemKeySelected(itemData)
    },
    isItemKeySelected: function(itemData) {
        var selectionFilter = this.options.selectionFilter;
        if (!selectionFilter) {
            return true
        }
        return !!dataQuery([itemData]).filter(selectionFilter).toArray().length
    },
    _processSelectedItem: function(key) {
        var keyField = this.options.key(),
            filter = [keyField, "=", key];
        if (Array.isArray(keyField)) {
            filter = [];
            for (var i = 0; i < keyField.length; i++) {
                filter.push([keyField[i], "=", key[keyField[i]]]);
                if (i !== keyField.length - 1) {
                    filter.push("and")
                }
            }
        }
        return filter
    },
    addSelectedItem: function(key) {
        var filter = this._processSelectedItem(key);
        this._addSelectionFilter(false, filter, true)
    },
    removeSelectedItem: function(key) {
        var filter = this._processSelectedItem(key);
        this._addSelectionFilter(true, filter, true)
    },
    validate: function() {
        var key = this.options.key;
        if (key && void 0 === key()) {
            throw errors.Error("E1042", "Deferred selection")
        }
    },
    _findSubFilter: function(selectionFilter, filter) {
        if (!selectionFilter) {
            return -1
        }
        var filterString = JSON.stringify(filter);
        for (var index = 0; index < selectionFilter.length; index++) {
            var subFilter = selectionFilter[index];
            if (subFilter && JSON.stringify(subFilter) === filterString) {
                return index
            }
        }
        return -1
    },
    _isLastSubFilter: function(selectionFilter, filter) {
        if (selectionFilter && filter) {
            return this._findSubFilter(selectionFilter, filter) === selectionFilter.length - 1 || 0 === this._findSubFilter([selectionFilter], filter)
        }
        return false
    },
    _addFilterOperator: function(selectionFilter, filterOperator) {
        if (selectionFilter.length > 1 && typeUtils.isString(selectionFilter[1]) && selectionFilter[1] !== filterOperator) {
            selectionFilter = [selectionFilter]
        }
        if (selectionFilter.length) {
            selectionFilter.push(filterOperator)
        }
        return selectionFilter
    },
    _denormalizeFilter: function(filter) {
        if (filter && typeUtils.isString(filter[0])) {
            filter = [filter]
        }
        return filter
    },
    _addSelectionFilter: function(isDeselect, filter, isUnique) {
        var that = this,
            needAddFilter = true,
            currentFilter = isDeselect ? ["!", filter] : filter,
            currentOperation = isDeselect ? "and" : "or",
            selectionFilter = that.options.selectionFilter || [];
        selectionFilter = that._denormalizeFilter(selectionFilter);
        if (selectionFilter && selectionFilter.length) {
            that._removeSameFilter(selectionFilter, filter, isDeselect);
            var lastOperation = that._removeSameFilter(selectionFilter, filter, !isDeselect);
            if (lastOperation && ("or" !== lastOperation && isDeselect || "and" !== lastOperation && !isDeselect)) {
                needAddFilter = false;
                selectionFilter = []
            }
            if (needAddFilter) {
                selectionFilter = that._addFilterOperator(selectionFilter, currentOperation)
            }
        }
        if (needAddFilter) {
            selectionFilter.push(currentFilter)
        }
        selectionFilter = that._normalizeFilter(selectionFilter);
        that._setOption("selectionFilter", !isDeselect && !selectionFilter.length ? null : selectionFilter)
    },
    _normalizeFilter: function(filter) {
        if (filter && 1 === filter.length) {
            filter = filter[0]
        }
        return filter
    },
    _removeSameFilter: function(selectionFilter, filter, inverted) {
        filter = inverted ? ["!", filter] : filter;
        var filterIndex = this._findSubFilter(selectionFilter, filter);
        if (JSON.stringify(filter) === JSON.stringify(selectionFilter)) {
            selectionFilter.splice(0, selectionFilter.length);
            return "undefined"
        }
        if (filterIndex >= 0) {
            if (filterIndex > 0) {
                return selectionFilter.splice(filterIndex - 1, 2)[0]
            } else {
                return selectionFilter.splice(filterIndex, 2)[1] || "undefined"
            }
        } else {
            for (var i = 0; i < selectionFilter.length; i++) {
                var lastRemoveOperation = Array.isArray(selectionFilter[i]) && selectionFilter[i].length > 2 && this._removeSameFilter(selectionFilter[i], filter);
                if (lastRemoveOperation) {
                    if (1 === selectionFilter[i].length) {
                        selectionFilter[i] = selectionFilter[i][0]
                    }
                    return lastRemoveOperation
                }
            }
        }
    },
    getSelectAllState: function() {
        var filter = this.options.filter(),
            selectionFilter = this.options.selectionFilter;
        if (!selectionFilter) {
            return true
        }
        if (!selectionFilter.length) {
            return false
        }
        if (!filter || !filter.length) {
            return
        }
        selectionFilter = this._denormalizeFilter(selectionFilter);
        if (this._isLastSubFilter(selectionFilter, filter)) {
            return true
        }
        if (this._isLastSubFilter(selectionFilter, ["!", filter])) {
            return false
        }
        return
    }
});

});
