export const

    /**
     * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
     * @function module:objectOps.jsonClone
     * @param x {*}
     * @returns {*}
     */
    jsonClone = x => JSON.parse(JSON.stringify(x))

;
