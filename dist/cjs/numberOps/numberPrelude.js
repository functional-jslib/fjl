/**
 * Created by edlc on 8/3/17.
 * @tentative
 */
// import {curry} from '../functionOps/curry';
// import {isFunction} from '../objectOps/is';
//
// export default Object.getOwnPropertyNames(Math).reduce((agg, key) => {
//     if (!isFunction(Math[key])) { return agg; }
//     switch (Math[key].length) {
//         case 0:
//         case 1:
//             agg[key] = Math[key];
//             break;
//         default:
//             agg[key] = curry(Math[key]);
//             break;
//     }
//     return agg;
// }, {});
"use strict";