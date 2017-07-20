define(['exports', './is'], function (exports, _is) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assign = exports.assignDeep = undefined;


    /**
     * @returns {Function}
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
    } /**
       * Created by elyde on 12/25/2016.
       */

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
    assign = exports.assign = defineAssign();

    /**
     * @module assign
     * @type {{assign: Function, assignDeep: Function}}
     */
    exports.default = {
        assign,
        assignDeep
    };
});