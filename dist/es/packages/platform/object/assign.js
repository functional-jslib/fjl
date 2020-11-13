import { curry2 } from "../../function";
/**
 * Defined as `Object.assign` else is the same thing but shimmed.
 * @function module:platform/object.assign
 * @param obj0 {Object}
 * @param objs {...{Object}}
 * @returns {Object}
 */
const assign = (() => curry2(Object.assign ?
    (obj0, ...objs) => Object.assign(obj0, ...objs) :
    (obj0, ...objs) => objs.reduce((topAgg, obj) => {
        return Object.keys(obj).reduce((agg, key) => {
            agg[key] = obj[key];
            return agg;
        }, topAgg);
    }, obj0)))();
export default assign;
//# sourceMappingURL=assign.js.map