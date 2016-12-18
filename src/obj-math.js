/**
 * Created by elyde on 12/10/2016.
 */

'use strict';

export function objDiff (obj1, obj2) {
    return Object.keys(obj1).reduce((agg, key) => {
        if (!obj2.hasOwnProperty(key)) {
            agg[key] = obj1[key];
        }
        return agg;
    }, {});
}

export default {
    objDiff
};
