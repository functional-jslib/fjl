
export const

    /**
     * Pushes incoming `item` onto given array and returns said array.
     * @private
     * @param agg {Array}
     * @param items {...any}
     * @returns {Array}
     */
    aggregateArray = (agg, ...items) => {
        agg.push(...items);
        return agg;
    }

;
