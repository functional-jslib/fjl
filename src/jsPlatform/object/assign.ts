import {curry2} from "../../function";
import {AssignFunc} from "./types";

/**
 * Defined as `Object.assign` else is the same thing but shimmed.
 * @function module:jsPlatform/object.assign
 * @param obj0 {Object}
 * @param objs {...{Object}}
 * @returns {Object}
 */
const assign: AssignFunc = ((): AssignFunc => curry2(
    Object.assign ?
        (obj0, ...objs) => Object.assign(obj0, ...objs) :
        (obj0, ...objs) => objs.reduce((topAgg, obj) => {
            return Object.keys(obj).reduce((agg, key) => {
                agg[key] = obj[key];
                return agg;
            }, topAgg);
        }, obj0)
))() as AssignFunc;

export default assign;
