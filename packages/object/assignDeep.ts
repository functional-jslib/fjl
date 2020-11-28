import {isObject} from './is';
import {keys} from '../platform/object';
import {curry2} from '../function/curry';

export const
    /**
     * Merges all objects down into one (takes two or more args).
     */
    assignDeep = curry2((obj0, ...objs) =>
        !obj0 ? obj0 : objs.reduce((topAgg, obj) =>
                !obj ? topAgg : Object.keys(obj).reduce((agg, key) => {
                    const propDescription = Object.getOwnPropertyDescriptor(agg, key);
                    // If property is not writable move to next item in collection
                    if (Object.prototype.hasOwnProperty.call(agg, key) && propDescription &&
                        !(propDescription.get && propDescription.set) &&
                        !propDescription.writable) {
                        return agg;
                    }
                    if (isObject(agg[key]) && isObject(obj[key])) {
                        assignDeep(agg[key], obj[key]);
                    } else {
                        agg[key] = obj[key];
                    }
                    return agg;
                }, topAgg)
            , obj0));
