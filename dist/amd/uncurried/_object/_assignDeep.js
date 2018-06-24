define(['exports', './_is', '../_jsPlatform/_object'], function (exports, _is, _object) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports._assignDeep = undefined;
    const
    /**
     * Merges all objects down into one.
     * @function module:object.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    _assignDeep = exports._assignDeep = (obj0, ...objs) => objs.reduce((topAgg, obj) => !obj ? topAgg : (0, _object.keys)(obj).reduce((agg, key) => {
        let propDescription = Object.getOwnPropertyDescriptor(agg, key);
        // If property is not writable move to next item in collection
        if ((0, _object._hasOwnProperty)(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
            return agg;
        }
        if ((0, _is.isObject)(agg[key]) && (0, _is.isObject)(obj[key])) {
            _assignDeep(agg[key], obj[key]);
        } else {
            agg[key] = obj[key];
        }
        return agg;
    }, topAgg), obj0);
});