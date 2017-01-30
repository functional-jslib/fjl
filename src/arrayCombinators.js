/**
 * Created by elyde on 12/29/2016.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for arrects.
 */

'use strict';

import {curry2} from './curry';

const

    concat = curry2((arr0, ...arrays) => arr0.concat.apply(arr0, arrays)),

    filter = curry2((fn, arr) => arr.filter(fn)),

    reduce = curry2((fn, agg, arr) => arr.reduce(fn, agg));

export let

    flatten = arr => {
        return arr.reduce((agg, elm) => {
            if (Array.isArray(elm)) {
                return concat(agg, flatten(elm));
            }
            agg.push(elm);
            return agg;
        }, []);
    },

    flattenMulti = curry2((arr0, ...arrays) => {
        return reduce((agg, arr) => concat(agg, flatten(arr)), flatten(arr0), arrays);
    }),

    union = curry2((arr1, arr2) => {
        let whereNotInArray1 = elm => arr1.indexOf(elm) === -1;
        return concat(arr1, filter(whereNotInArray1, arr2));
    }),

    intersect = curry2((arr1, arr2) => {
        return arr2.length === 0 ? [] :
            filter(elm => arr2.indexOf(elm) > -1, arr1);
    }),

    difference = curry2((arr1, arr2) => {
        if (arr2.length === 0) {
            return arr1.slice();
        }
        return reduce((agg, elm) => {
            if (arr2.indexOf(elm) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    }),

    complement = curry2((arr0, ...arrays) => {
        return reduce((agg, arr) => {
            return concat(agg, difference(arr, arr0));
        }, [], arrays);
    });

export default {
    complement,
    difference,
    intersect,
    union,
    flatten,
    flattenMulti
};
