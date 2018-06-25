
export const

    /**
     * Pushes incoming `item` onto array (`agg`) and return array (`agg`).
     * @private
     * @param agg {Array}
     * @param item {*}
     * @returns {Array}
     */
    aggregateArr$ = (agg, item) => {
        agg.push(item);
        return agg;
    }

;
