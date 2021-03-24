export const

    /**
     * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
     * @function module:object.jsonClone
     * @param x {*}
     * @returns {*}
     */
    jsonClone = (x: any): any => JSON.parse(JSON.stringify(x))

;
