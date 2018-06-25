const

    /**
     * Makes a copy of incoming value;  If value is an `array` a slice of array is returned;
     * @function module:object.copy
     * @param x {*} - Thing to make copy of.
     * @param [out = {}] {*} - Out param.  When `x` is array `out` isn't used.
     * @returns {*} - Copy of thing passed in.
     */
    copy = (x, out = {}) => {
        if (!x) { return x; } // if `null`, `undefined`, `''`, `0`, `false` return
        switch (x.constructor) {
            // If array make a slice of it
            case Array:
                return x.slice(0);

            // If immutable primitive, return it
            case Symbol:
            case Boolean:
            case String:
            case Number:
                return x;

            // Else make copy
            default:
                return Object.assign(out, x);
        }
    }
;

export default clone;
