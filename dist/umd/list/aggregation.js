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
     * Pushes incoming `item` onto array (`agg`) and return array (`agg`).
     * @private
     * @param agg {Array}
     * @param item {*}
     * @returns {Array}
     */
    aggregateArr$ = exports.aggregateArr$ = function aggregateArr$(agg, item) {
        agg.push(item);
        return agg;
    };
});