/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

export default function assign (obj0, ...objs) {
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
