define(['exports', './is_', '../jsPlatform/object_'], function (exports, _is_, _object_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assignDeep = undefined;
    const
    /**
     * Merges all objects down into one.
     * @function module:jsPlatform.objectOps_.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assignDeep = exports.assignDeep = (obj0, ...objs) => objs.reduce((topAgg, obj) => (0, _object_.keys)(obj).reduce((agg, key) => {
        let propDescription = Object.getOwnPropertyDescriptor(agg, key);
        // If property is not writable move to next item in collection
        if ((0, _object_.hasOwnProperty)(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
            return agg;
        }
        if ((0, _is_.isObject)(agg[key]) && (0, _is_.isObject)(obj[key])) {
            assignDeep(agg[key], obj[key]);
        } else {
            agg[key] = obj[key];
        }
        return agg;
    }, topAgg), obj0);
});