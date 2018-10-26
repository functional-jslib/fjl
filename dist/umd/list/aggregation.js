(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.aggregation = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var

    /**
     * Pushes incoming `item` onto given array and returns said array.
     * @private
     * @param agg {Array}
     * @param item {*}
     * @returns {Array}
     */
    aggregateArray = exports.aggregateArray = function aggregateArray(agg, item) {
        agg.push(item);
        return agg;
    };
});