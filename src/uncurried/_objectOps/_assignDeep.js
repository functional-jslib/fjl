
import {isObject} from './_is';

import {keys, _hasOwnProperty} from '../_jsPlatform/_object';

export const
    /**
     * Merges all objects down into one.
     * @function module:_objectOps.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    _assignDeep = (obj0, ...objs) =>
        objs.reduce((topAgg, obj) =>
            !obj ? topAgg : keys(obj).reduce((agg, key) => {
                let propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if (_hasOwnProperty(key, agg) && propDescription &&
                    !(propDescription.get && propDescription.set) &&
                    !propDescription.writable) {
                    return agg;
                }
                if (isObject(agg[key]) && isObject(obj[key])) {
                    _assignDeep(agg[key], obj[key]);
                }
                else { agg[key] = obj[key]; }
                return agg;
            }, topAgg)
        , obj0);
