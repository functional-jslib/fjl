export interface List {

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @function module:_jsPlatform_list.concat
     * @param fs {...(Array|Object|*)}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in object doesn't have an `every` method.
     */
    concat (...fs: Array<any>[]): Array<any>;

    /**
     * Same as Array.prototype.slice
     * @function module:_jsPlatform_list.slice
     * @param startInd {number}
     * @param endInd {number}
     * @param list {Array}
     * @returns {Array}
     */
    slice (startInd: Number, endInd: Number, list: Array<any>): Array<any>;

    /**
     * `Array.prototype.includes` or shim.
     * @function module:_jsPlatform_list.includes
     * @param x {*}
     * @param xs {Array|String|*}
     * @returns {Boolean}
     */
    includes (x: any, xs: (Array|String|any)): Boolean;

    /**
     * Searches list/list-like for given element `x`.
     * @function module:_jsPlatform_list.indexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf (x: any, xs: (Array|String|any)): Number;

    /**
     * Last index of (`Array.prototype.lastIndexOf`).
     * @function module:fjl.lastIndexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    lastIndexOf (x: any, xs: (Array|String|any)): Number;
}
