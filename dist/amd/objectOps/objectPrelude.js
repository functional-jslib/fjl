define(['exports', './instanceOf', '../functionOps/curry', './is', '../utils/utils'], function (exports, _instanceOf, _curry, _is, _utils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assignDeep = exports.assign = exports.keys = exports.length = exports.hasOwnProperty = exports.instanceOf = undefined;
    Object.defineProperty(exports, 'instanceOf', {
        enumerable: true,
        get: function () {
            return _instanceOf.instanceOf;
        }
    });
    const hasOwnProperty = exports.hasOwnProperty = (0, _utils.fPureTakesOne)('hasOwnProperty'),
          length = exports.length = x => x.length,
          keys = exports.keys = obj => Object.keys(obj),


    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @functionOps module:assign.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = exports.assign = (0, _curry.curry2)(function defineAssign() {
        if (Object.assign) {
            return (obj0, ...objs) => Object.assign(obj0, ...objs);
        }
        return (obj0, ...objs) => objs.reduce((topAgg, obj) => {
            return keys(obj).reduce((agg, key) => {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    }()),


    /**
     * Merges all objects down into one.
     * @functionOps module:assign.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assignDeep = exports.assignDeep = (0, _curry.curry2)((obj0, ...objs) => objs.reduce((topAgg, obj) => {
        return keys(obj).reduce((agg, key) => {
            let propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (hasOwnProperty(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
                return agg;
            }
            if ((0, _is.isObject)(agg[key]) && (0, _is.isObject)(obj[key])) {
                assignDeep(agg[key], obj[key]);
            } else {
                agg[key] = obj[key];
            }
            return agg;
        }, topAgg);
    }, obj0));
});