
import {isObject} from './is';
import {keys, hasOwnProperty} from '../jsPlatform/object';
import {curry2} from '../function/curry';

export const
    /**
     * Merges all objects down into one (takes two or more args).
     * @function module:object.assignDeep
     * @param obj0 {Object}
     * @param [objs] {...{Object}} - One or more objects to merge onto `obj0`.
     * @returns {Object}
     */
    assignDeep = curry2((obj0, ...objs) =>
        !obj0 ? obj0 : objs.reduce((topAgg, obj) =>
            !obj ? topAgg : keys(obj).reduce((agg, key) => {
                let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (hasOwnProperty(key, agg) && propDescription &&
                    !(propDescription.get && propDescription.set) &&
                    !propDescription.writable) {
                    return agg;
                }
                if (isObject(agg[key]) && isObject(obj[key])) {
                    assignDeep(agg[key], obj[key]);
                }
                else { agg[key] = obj[key]; }
                return agg;
            }, topAgg)
        , obj0));
