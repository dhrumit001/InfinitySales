/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.base.js)
 * Version: 19.1.4
 * Build date: Mon Jun 17 2019
 *
 * Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiSchedulerAppointmentsPositioningStrategy = require("./ui.scheduler.appointmentsPositioning.strategy.base");
var _uiSchedulerAppointmentsPositioningStrategy2 = _interopRequireDefault(_uiSchedulerAppointmentsPositioningStrategy);
var _uiSchedulerAppointmentsPositioningStrategy3 = require("./ui.scheduler.appointmentsPositioning.strategy.adaptive");
var _uiSchedulerAppointmentsPositioningStrategy4 = _interopRequireDefault(_uiSchedulerAppointmentsPositioningStrategy3);
var _common = require("../../../core/utils/common");
var _class = require("../../../core/class");
var _class2 = _interopRequireDefault(_class);
var _extend = require("../../../core/utils/extend");
var _ui = require("../../widget/ui.errors");
var _ui2 = _interopRequireDefault(_ui);
var _date = require("../../../core/utils/date");
var _date2 = _interopRequireDefault(_date);
var _type = require("../../../core/utils/type");
var _type2 = _interopRequireDefault(_type);
var _themes = require("../../themes");
var _themes2 = _interopRequireDefault(_themes);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var toMs = _date2.default.dateToMilliseconds;
var abstract = _class2.default.abstract;
var APPOINTMENT_MIN_SIZE = 2,
    COMPACT_APPOINTMENT_DEFAULT_WIDTH = 15,
    APPOINTMENT_DEFAULT_HEIGHT = 20,
    COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT = 18,
    DROP_DOWN_BUTTON_ADAPTIVE_SIZE = 28;
var BaseRenderingStrategy = _class2.default.inherit({
    ctor: function(instance) {
        this.instance = instance;
        this._initPositioningStrategy()
    },
    _initPositioningStrategy: function() {
        this._positioningStrategy = this.instance.fire("isAdaptive") ? new _uiSchedulerAppointmentsPositioningStrategy4.default(this) : new _uiSchedulerAppointmentsPositioningStrategy2.default(this)
    },
    getPositioningStrategy: function() {
        return this._positioningStrategy
    },
    getAppointmentMinSize: function() {
        return APPOINTMENT_MIN_SIZE
    },
    keepAppointmentSettings: function() {
        return false
    },
    getDeltaTime: abstract,
    getAppointmentGeometry: function(coordinates) {
        return coordinates
    },
    needCorrectAppointmentDates: function() {
        return true
    },
    getDirection: function() {
        return "horizontal"
    },
    createTaskPositionMap: function(items) {
        delete this._maxAppointmentCountPerCell;
        var length = items && items.length;
        if (!length) {
            return
        }
        this._defaultWidth = this.instance._cellWidth;
        this._defaultHeight = this.instance._cellHeight;
        this._allDayHeight = this.instance._allDayCellHeight;
        var map = [];
        for (var i = 0; i < length; i++) {
            var coordinates = this._getItemPosition(items[i]);
            if (this._isRtl()) {
                coordinates = this._correctRtlCoordinates(coordinates)
            }
            map.push(coordinates)
        }
        var positionArray = this._getSortedPositions(map),
            resultPositions = this._getResultPositions(positionArray);
        return this._getExtendedPositionMap(map, resultPositions)
    },
    _getDeltaWidth: function(args, initialSize) {
        var intervalWidth = this.instance.fire("getResizableStep") || this.getAppointmentMinSize(),
            initialWidth = initialSize.width;
        return Math.round((args.width - initialWidth) / intervalWidth)
    },
    _correctRtlCoordinates: function(coordinates) {
        var width = coordinates[0].width || this._getAppointmentMaxWidth();
        if (!coordinates[0].appointmentReduced) {
            coordinates[0].left -= width
        }
        this._correctRtlCoordinatesParts(coordinates, width);
        return coordinates
    },
    _correctRtlCoordinatesParts: _common.noop,
    _getAppointmentMaxWidth: function() {
        return this.getDefaultCellWidth()
    },
    _getItemPosition: function(item) {
        var position = this._getAppointmentCoordinates(item),
            allDay = this.isAllDay(item),
            result = [],
            startDate = new Date(this.instance.fire("getField", "startDate", item)),
            isRecurring = !!this.instance.fire("getField", "recurrenceRule", item);
        for (var j = 0; j < position.length; j++) {
            var height = this.calculateAppointmentHeight(item, position[j], isRecurring),
                width = this.calculateAppointmentWidth(item, position[j], isRecurring),
                resultWidth = width,
                appointmentReduced = null,
                multiWeekAppointmentParts = [],
                initialRowIndex = position[j].rowIndex,
                initialCellIndex = position[j].cellIndex;
            if (this._needVerifyItemSize() || allDay) {
                var currentMaxAllowedPosition = position[j].hMax;
                if (this.isAppointmentGreaterThan(currentMaxAllowedPosition, {
                        left: position[j].left,
                        width: width
                    })) {
                    appointmentReduced = "head";
                    initialRowIndex = position[j].rowIndex;
                    initialCellIndex = position[j].cellIndex;
                    resultWidth = this._reduceMultiWeekAppointment(width, {
                        left: position[j].left,
                        right: currentMaxAllowedPosition
                    });
                    multiWeekAppointmentParts = this._getAppointmentParts({
                        sourceAppointmentWidth: width,
                        reducedWidth: resultWidth,
                        height: height
                    }, position[j], startDate);
                    if (this._isRtl()) {
                        position[j].left = currentMaxAllowedPosition
                    }
                }
            }(0, _extend.extend)(position[j], {
                height: height,
                width: resultWidth,
                allDay: allDay,
                rowIndex: initialRowIndex,
                cellIndex: initialCellIndex,
                appointmentReduced: appointmentReduced
            });
            result = this._getAppointmentPartsPosition(multiWeekAppointmentParts, position[j], result)
        }
        return result
    },
    _getAppointmentPartsPosition: function(appointmentParts, position, result) {
        if (appointmentParts.length) {
            appointmentParts.unshift(position);
            result = result.concat(appointmentParts)
        } else {
            result.push(position)
        }
        return result
    },
    _getAppointmentCoordinates: function(itemData) {
        var coordinates = [{
            top: 0,
            left: 0
        }];
        this.instance.fire("needCoordinates", {
            startDate: this.startDate(itemData),
            originalStartDate: this.startDate(itemData, true),
            appointmentData: itemData,
            callback: function(value) {
                coordinates = value
            }
        });
        return coordinates
    },
    _isRtl: function() {
        return this.instance.option("rtlEnabled")
    },
    _getAppointmentParts: function() {
        return []
    },
    _getCompactAppointmentParts: function(appointmentWidth) {
        var cellWidth = this.getDefaultCellWidth() || this.getAppointmentMinSize();
        return Math.round(appointmentWidth / cellWidth)
    },
    _reduceMultiWeekAppointment: function(sourceAppointmentWidth, bound) {
        if (this._isRtl()) {
            sourceAppointmentWidth = Math.floor(bound.left - bound.right)
        } else {
            sourceAppointmentWidth = bound.right - Math.floor(bound.left)
        }
        return sourceAppointmentWidth
    },
    calculateAppointmentHeight: function() {
        return 0
    },
    calculateAppointmentWidth: function() {
        return 0
    },
    isAppointmentGreaterThan: function(etalon, comparisonParameters) {
        var result = comparisonParameters.left + comparisonParameters.width - etalon;
        if (this._isRtl()) {
            result = etalon + comparisonParameters.width - comparisonParameters.left
        }
        return result > this.getDefaultCellWidth() / 2
    },
    isAllDay: function() {
        return false
    },
    cropAppointmentWidth: function(width, cellWidth) {
        if (this.instance.fire("isGroupedByDate")) {
            width = cellWidth
        }
        return width
    },
    _getSortedPositions: function(arr) {
        var result = [],
            __tmpIndex = 0;
        for (var i = 0, arrLength = arr.length; i < arrLength; i++) {
            for (var j = 0, itemLength = arr[i].length; j < itemLength; j++) {
                var item = arr[i][j];
                var start = {
                    i: i,
                    j: j,
                    top: item.top,
                    left: item.left,
                    cellPosition: item.cellPosition,
                    isStart: true,
                    allDay: item.allDay,
                    __tmpIndex: __tmpIndex
                };
                __tmpIndex++;
                var end = {
                    i: i,
                    j: j,
                    top: item.top + item.height,
                    left: item.left + item.width,
                    cellPosition: item.cellPosition,
                    isStart: false,
                    allDay: item.allDay,
                    __tmpIndex: __tmpIndex
                };
                result.push(start, end);
                __tmpIndex++
            }
        }
        result.sort(function(a, b) {
            return this._sortCondition(a, b)
        }.bind(this));
        return result
    },
    _fixUnstableSorting: function(comparisonResult, a, b) {
        if (0 === comparisonResult) {
            if (a.__tmpIndex < b.__tmpIndex) {
                return -1
            }
            if (a.__tmpIndex > b.__tmpIndex) {
                return 1
            }
        }
        return comparisonResult
    },
    _sortCondition: abstract,
    _rowCondition: function(a, b) {
        var isSomeEdge = this._isSomeEdge(a, b);
        var columnCondition = this._normalizeCondition(a.left, b.left, isSomeEdge),
            rowCondition = this._normalizeCondition(a.top, b.top, isSomeEdge);
        return columnCondition ? columnCondition : rowCondition ? rowCondition : a.isStart - b.isStart
    },
    _columnCondition: function(a, b) {
        var isSomeEdge = this._isSomeEdge(a, b);
        var columnCondition = this._normalizeCondition(a.left, b.left, isSomeEdge),
            rowCondition = this._normalizeCondition(a.top, b.top, isSomeEdge);
        return rowCondition ? rowCondition : columnCondition ? columnCondition : a.isStart - b.isStart
    },
    _isSomeEdge: function(a, b) {
        return a.i === b.i && a.j === b.j
    },
    _normalizeCondition: function(first, second, isSomeEdge) {
        var result = first - second;
        return isSomeEdge || Math.abs(result) > 1 ? result : 0
    },
    _getResultPositions: function(sortedArray) {
        var position, stack = [],
            indexes = [],
            result = [],
            intersectPositions = [],
            intersectPositionCount = 0,
            sortedIndex = 0;
        for (var i = 0; i < sortedArray.length; i++) {
            var j, current = sortedArray[i];
            if (current.isStart) {
                position = void 0;
                for (j = 0; j < indexes.length; j++) {
                    if (!indexes[j]) {
                        position = j;
                        indexes[j] = true;
                        break
                    }
                }
                if (void 0 === position) {
                    position = indexes.length;
                    indexes.push(true);
                    for (j = 0; j < stack.length; j++) {
                        stack[j].count++
                    }
                }
                stack.push({
                    index: position,
                    count: indexes.length,
                    i: current.i,
                    j: current.j,
                    sortedIndex: this._skipSortedIndex(position) ? null : sortedIndex++
                });
                if (intersectPositionCount < indexes.length) {
                    intersectPositionCount = indexes.length
                }
            } else {
                var removeIndex = this._findIndexByKey(stack, "i", "j", current.i, current.j),
                    resultItem = stack[removeIndex];
                stack.splice(removeIndex, 1);
                indexes[resultItem.index] = false;
                intersectPositions.push(resultItem);
                if (!stack.length) {
                    indexes = [];
                    for (var k = 0; k < intersectPositions.length; k++) {
                        intersectPositions[k].count = intersectPositionCount
                    }
                    intersectPositions = [];
                    intersectPositionCount = 0
                }
                result.push(resultItem)
            }
        }
        return result.sort(function(a, b) {
            var columnCondition = a.j - b.j,
                rowCondition = a.i - b.i;
            return rowCondition ? rowCondition : columnCondition
        })
    },
    _skipSortedIndex: function(index) {
        return this.instance.fire("getMaxAppointmentsPerCell") && index > this._getMaxAppointmentCountPerCell() - 1
    },
    _findIndexByKey: function(arr, iKey, jKey, iValue, jValue) {
        var result = 0;
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i][iKey] === iValue && arr[i][jKey] === jValue) {
                result = i;
                break
            }
        }
        return result
    },
    _getExtendedPositionMap: function(map, positions) {
        var positionCounter = 0,
            result = [];
        for (var i = 0, mapLength = map.length; i < mapLength; i++) {
            var resultString = [];
            for (var j = 0, itemLength = map[i].length; j < itemLength; j++) {
                map[i][j].index = positions[positionCounter].index;
                map[i][j].sortedIndex = positions[positionCounter].sortedIndex;
                map[i][j].count = positions[positionCounter++].count;
                resultString.push(map[i][j]);
                this._checkLongCompactAppointment(map[i][j], resultString)
            }
            result.push(resultString)
        }
        return result
    },
    _checkLongCompactAppointment: _common.noop,
    _splitLongCompactAppointment: function(item, result) {
        var appointmentCountPerCell = this._getMaxAppointmentCountPerCellByType(item.allDay);
        var compactCount = 0;
        if (void 0 !== appointmentCountPerCell && item.index > appointmentCountPerCell - 1) {
            item.isCompact = true;
            compactCount = this._getCompactAppointmentParts(item.width);
            for (var k = 1; k < compactCount; k++) {
                var compactPart = (0, _extend.extend)(true, {}, item);
                compactPart.left = this._getCompactLeftCoordinate(item.left, k);
                compactPart.cellIndex = compactPart.cellIndex + k;
                compactPart.sortedIndex = null;
                result.push(compactPart)
            }
        }
        return result
    },
    startDate: function startDate(appointment, skipNormalize, position) {
        var startDate = position && position.startDate,
            rangeStartDate = this.instance._getStartDate(appointment, skipNormalize),
            text = this.instance.fire("getField", "text", appointment);
        if (startDate && rangeStartDate > startDate || !startDate) {
            startDate = rangeStartDate
        }
        if (isNaN(startDate.getTime())) {
            throw _ui2.default.Error("E1032", text)
        }
        return startDate
    },
    endDate: function endDate(appointment, position, isRecurring) {
        var endDate = this.instance._getEndDate(appointment),
            realStartDate = this.startDate(appointment, true),
            viewStartDate = this.startDate(appointment, false, position);
        if (viewStartDate.getTime() > endDate.getTime() || isRecurring) {
            var recurrencePartStartDate = position ? position.initialStartDate || position.startDate : realStartDate,
                recurrencePartCroppedByViewStartDate = position ? position.startDate : realStartDate,
                fullDuration = endDate.getTime() - realStartDate.getTime();
            fullDuration = this._adjustDurationByDaylightDiff(fullDuration, realStartDate, endDate);
            endDate = new Date(viewStartDate.getTime() >= recurrencePartStartDate.getTime() ? recurrencePartStartDate.getTime() : viewStartDate.getTime());
            if (isRecurring) {
                endDate = new Date(endDate.getTime() + fullDuration)
            }
            if (!_date2.default.sameDate(realStartDate, endDate) && recurrencePartCroppedByViewStartDate.getTime() < viewStartDate.getTime()) {
                var headDuration = _date2.default.trimTime(endDate).getTime() - recurrencePartCroppedByViewStartDate.getTime(),
                    tailDuration = fullDuration - headDuration || fullDuration;
                endDate = new Date(_date2.default.trimTime(viewStartDate).getTime() + tailDuration)
            }
        }
        if (!this.isAllDay(appointment)) {
            var viewEndDate = _date2.default.roundToHour(this.instance.fire("getEndViewDate"));
            if (endDate > viewEndDate) {
                endDate = viewEndDate
            }
        }
        return endDate
    },
    _adjustDurationByDaylightDiff: function(duration, startDate, endDate) {
        var daylightDiff = this.instance.fire("getDaylightOffset", startDate, endDate);
        return this._needAdjustDuration(daylightDiff) ? this._calculateDurationByDaylightDiff(duration, daylightDiff) : duration
    },
    _needAdjustDuration: function(diff) {
        return 0 !== diff
    },
    _calculateDurationByDaylightDiff: function(duration, diff) {
        return duration + diff * toMs("minute")
    },
    _getAppointmentDurationInMs: function(startDate, endDate, allDay) {
        var result;
        this.instance.fire("getAppointmentDurationInMs", {
            startDate: startDate,
            endDate: endDate,
            allDay: allDay,
            callback: function(duration) {
                result = duration
            }
        });
        return result
    },
    _getMaxNeighborAppointmentCount: function() {
        var overlappingMode = this.instance.fire("getMaxAppointmentsPerCell");
        if (!overlappingMode) {
            var outerAppointmentWidth = this.getCompactAppointmentDefaultWidth() + this.getCompactAppointmentLeftOffset();
            return Math.floor(this.getDropDownAppointmentWidth() / outerAppointmentWidth)
        } else {
            return 0
        }
    },
    _markAppointmentAsVirtual: function(coordinates, isAllDay) {
        var countFullWidthAppointmentInCell = this._getMaxAppointmentCountPerCellByType(isAllDay);
        if (coordinates.count - countFullWidthAppointmentInCell > this._getMaxNeighborAppointmentCount()) {
            coordinates.virtual = {
                top: coordinates.top,
                left: coordinates.left,
                index: coordinates.groupIndex + "-" + coordinates.rowIndex + "-" + coordinates.cellIndex,
                isAllDay: isAllDay
            }
        }
    },
    _getMaxAppointmentCountPerCellByType: function(isAllDay) {
        var appointmentCountPerCell = this._getMaxAppointmentCountPerCell();
        if (_type2.default.isObject(appointmentCountPerCell)) {
            return isAllDay ? this._getMaxAppointmentCountPerCell().allDay : this._getMaxAppointmentCountPerCell().simple
        } else {
            return appointmentCountPerCell
        }
    },
    getDropDownAppointmentWidth: function(intervalCount, isAllDay) {
        return this.getPositioningStrategy().getDropDownAppointmentWidth(intervalCount, isAllDay)
    },
    getDropDownAppointmentHeight: function() {
        return this.getPositioningStrategy().getDropDownAppointmentHeight()
    },
    getDropDownButtonAdaptiveSize: function() {
        return DROP_DOWN_BUTTON_ADAPTIVE_SIZE
    },
    getDefaultCellWidth: function() {
        return this._defaultWidth
    },
    getDefaultCellHeight: function() {
        return this._defaultHeight
    },
    getDefaultAllDayCellHeight: function() {
        return this._allDayHeight
    },
    getCompactAppointmentDefaultWidth: function() {
        return COMPACT_APPOINTMENT_DEFAULT_WIDTH
    },
    getCompactAppointmentTopOffset: function(allDay) {
        return this.getPositioningStrategy().getCompactAppointmentTopOffset(allDay)
    },
    getCompactAppointmentLeftOffset: function() {
        return this.getPositioningStrategy().getCompactAppointmentLeftOffset()
    },
    getAppointmentDataCalculator: _common.noop,
    _customizeCoordinates: function(coordinates, height, appointmentCountPerCell, topOffset, isAllDay) {
        var compactAppointmentDefaultSize, compactAppointmentLeftOffset, index = coordinates.index,
            appointmentHeight = height / appointmentCountPerCell,
            appointmentTop = coordinates.top + index * appointmentHeight,
            top = appointmentTop + topOffset,
            width = coordinates.width,
            left = coordinates.left,
            compactAppointmentTopOffset = this.getCompactAppointmentTopOffset(isAllDay);
        if (coordinates.isCompact) {
            compactAppointmentDefaultSize = this.getCompactAppointmentDefaultWidth();
            compactAppointmentLeftOffset = this.getCompactAppointmentLeftOffset();
            top = coordinates.top + compactAppointmentTopOffset;
            left = coordinates.left + (index - appointmentCountPerCell) * (compactAppointmentDefaultSize + compactAppointmentLeftOffset) + compactAppointmentLeftOffset;
            if (this.instance.fire("isAdaptive")) {
                coordinates.top = top;
                coordinates.left = coordinates.left + compactAppointmentLeftOffset
            }
            appointmentHeight = compactAppointmentDefaultSize;
            width = compactAppointmentDefaultSize;
            this._markAppointmentAsVirtual(coordinates, isAllDay)
        }
        return {
            height: appointmentHeight,
            width: width,
            top: top,
            left: left,
            empty: this._isAppointmentEmpty(height, width)
        }
    },
    _isAppointmentEmpty: function(height, width) {
        return height < this._getAppointmentMinHeight() || width < this._getAppointmentMinWidth()
    },
    _calculateGeometryConfig: function(coordinates) {
        var overlappingMode = this.instance.fire("getMaxAppointmentsPerCell"),
            offsets = this._getOffsets(),
            appointmentDefaultOffset = this._getAppointmentDefaultOffset();
        var appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);
        var ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);
        var maxHeight = this._getMaxHeight();
        if (!(0, _type.isNumeric)(appointmentCountPerCell)) {
            appointmentCountPerCell = coordinates.count;
            ratio = (maxHeight - offsets.unlimited) / maxHeight
        }
        var topOffset = (1 - ratio) * maxHeight;
        if ("auto" === overlappingMode || (0, _type.isNumeric)(overlappingMode)) {
            ratio = 1;
            maxHeight -= appointmentDefaultOffset;
            topOffset = appointmentDefaultOffset
        }
        return {
            height: ratio * maxHeight,
            appointmentCountPerCell: appointmentCountPerCell,
            offset: topOffset
        }
    },
    _getAppointmentCount: _common.noop,
    _getDefaultRatio: _common.noop,
    _getOffsets: _common.noop,
    _getMaxHeight: _common.noop,
    _needVerifyItemSize: function() {
        return false
    },
    needSeparateAppointment: function(allDay) {
        return this.instance.fire("isGroupedByDate") && allDay
    },
    _getMaxAppointmentCountPerCell: function() {
        if (!this._maxAppointmentCountPerCell) {
            var appointmentCountPerCell, overlappingMode = this.instance.fire("getMaxAppointmentsPerCell");
            if (!overlappingMode) {
                appointmentCountPerCell = 2
            }
            if ((0, _type.isNumeric)(overlappingMode)) {
                appointmentCountPerCell = overlappingMode
            }
            if ("auto" === overlappingMode) {
                appointmentCountPerCell = this._getDynamicAppointmentCountPerCell()
            }
            if ("unlimited" === overlappingMode) {
                appointmentCountPerCell = void 0
            }
            this._maxAppointmentCountPerCell = appointmentCountPerCell
        }
        return this._maxAppointmentCountPerCell
    },
    _getDynamicAppointmentCountPerCell: function() {
        return this.getPositioningStrategy().getDynamicAppointmentCountPerCell()
    },
    hasAllDayAppointments: function() {
        return false
    },
    _isCompactTheme: function() {
        return "compact" === (_themes2.default.current() || "").split(".").pop()
    },
    _getAppointmentDefaultOffset: function() {
        return this.getPositioningStrategy().getAppointmentDefaultOffset()
    },
    _getAppointmentDefaultHeight: function() {
        return this._getAppointmentHeightByTheme()
    },
    _getAppointmentMinHeight: function() {
        return this._getAppointmentDefaultHeight()
    },
    _getAppointmentHeightByTheme: function() {
        return this._isCompactTheme() ? COMPACT_THEME_APPOINTMENT_DEFAULT_HEIGHT : APPOINTMENT_DEFAULT_HEIGHT
    },
    _getAppointmentDefaultWidth: function() {
        return this.getPositioningStrategy()._getAppointmentDefaultWidth()
    },
    _getAppointmentMinWidth: function() {
        return this._getAppointmentDefaultWidth()
    },
    _needVerticalGroupBounds: function() {
        return false
    },
    _needHorizontalGroupBounds: function() {
        return false
    }
});
module.exports = BaseRenderingStrategy;
