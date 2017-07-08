/**
 * Created by elyde on 12/25/2016.
 */

import {isObject} from './is';

export function assignDeep (obj0, ...objs) {
    return objs.reduce((topAgg, obj) => {
        return Object.keys(obj).reduce((agg, key) => {
            let propDescription = Object.getOwnPropertyDescriptor(agg, key);
            // If property is not writable move to next item in collection
            if (agg.hasOwnProperty(key) && propDescription &&
                !(propDescription.get && propDescription.set) &&
                !propDescription.writable) {
                return agg;
            }
            if (isObject(agg[key]) && isObject(obj[key])) {
                assignDeep(agg[key], obj[key]);
            }
            else {
                agg[key] = obj[key];
            }
            return agg;
        }, topAgg);
    }, obj0);
}

export function assign (obj0, ...objs) {
    if (Object.assign) {
        return Object.assign(obj0, ...objs);
    }
    return objs.reduce((topAgg, obj) => {
        return Object.keys(obj).reduce((agg, key) => {
            agg[key] = obj[key];
            return agg;
        }, topAgg);
    }, obj0);
}

export default {
    assign,
    assignDeep
};
