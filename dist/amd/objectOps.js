define(['exports', './curry', './is'], function (exports, _curry, _is) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.complement = exports.difference = exports.intersect = exports.union = exports.keys = exports.length = exports.toString = exports.hasOwnProperty = exports.assign = exports.assignDeep = undefined;


    /**
     * @returns {Function}
     */
    /**
     * Created by elyde on 12/10/2016.
     * Set functions for objects.
     */

    function defineAssign() {
        if (Object.assign) {
            return (obj0, ...objs) => Object.assign(obj0, ...objs);
        }
        return (obj0, ...objs) => objs.reduce((topAgg, obj) => {
            return Object.keys(obj).reduce((agg, key) => {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0);
    }

    const

    /**
     * Merges all objects down into one.
     * @function module:assign.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assignDeep = exports.assignDeep = (obj0, ...objs) => objs.reduce((topAgg, obj) => {
        return Object.keys(obj).reduce((agg, key) => {
            let propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (agg.hasOwnProperty(key) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
                return agg;
            }
            if ((0, _is.isObject)(agg[key]) && (0, _is.isObject)(obj[key])) {
                assignDeep(agg[key], obj[key]);
            } else {
                agg[key] = obj[key];
            }
            return agg;
        }, topAgg);
    }, obj0),


    /**
     * Defined as `Object.assign` else is the same thing but shimmed.
     * @function module:assign.assign
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assign = exports.assign = defineAssign(),
          hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry2)((x, propName) => x.hasOwnProperty(propName)),
          toString = exports.toString = obj => obj.toString(),
          length = exports.length = x => x.length,
          keys = exports.keys = x => Object.keys(x),
          union = exports.union = (0, _curry.curry2)((obj1, obj2) => assignDeep(obj1, obj2)),
          intersect = exports.intersect = (0, _curry.curry2)((obj1, obj2) => Object.keys(obj1).reduce((agg, key) => {
        if (hasOwnProperty(obj2, key)) {
            agg[key] = obj2[key];
        }
        return agg;
    }, {})),
          difference = exports.difference = (0, _curry.curry2)((obj1, obj2) => Object.keys(obj1).reduce((agg, key) => {
        if (!hasOwnProperty(obj2, key)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {})),
          complement = exports.complement = (0, _curry.curry2)((obj0, ...objs) => objs.reduce((agg, obj) => {
        return assignDeep(agg, difference(obj, obj0));
    }, {}));

    exports.default = {
        hasOwnProperty,
        length,
        assign,
        assignDeep,
        complement,
        difference,
        intersect,
        union
    };
});