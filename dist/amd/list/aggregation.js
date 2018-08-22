define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    const

    /**
     * Pushes incoming `item` onto array (`agg`) and return array (`agg`).
     * @private
     * @param agg {Array}
     * @param item {*}
     * @returns {Array}
     */
    aggregateArr$ = exports.aggregateArr$ = (agg, item) => {
        agg.push(item);
        return agg;
    };
});