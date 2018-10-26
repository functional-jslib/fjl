define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    const

    /**
     * Pushes incoming `item` onto given array and returns said array.
     * @private
     * @param agg {Array}
     * @param item {*}
     * @returns {Array}
     */
    aggregateArray = exports.aggregateArray = (agg, item) => {
        agg.push(item);
        return agg;
    };
});