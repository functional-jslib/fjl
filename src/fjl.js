/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 */

export {isTruthy, isFalsy, not, or, and, equal} from './boolean/boolean';

export {assign, assignDeep, keys, hasOwnProperty, length, toString,
    instanceOf} from './object/objectPrelude';

export {compose} from './function/compose';

export {__, curry, curryN, curry2, curry3, curry4, curry5,
    curry_, curryN_, curry2_, curry3_, curry4_, curry5_} from './function/curry';

export {typeOf} from './type-checking/typeOf';

export {isset, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet} from './type-checking/is';

export {call} from './function/call';
export {apply} from './function/apply';

export {complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect} from './object/object';

export {map, filter, reduce, reduceRight,
    some, every, forEach, concat, join,
    reverse} from './list/listPrelude';

export {complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect,
    flatten, flattenMulti, head, tail,
    init, last, zip, zipN, sortAsc, sortDesc,
    sortDescByLength, unzip, unzipN} from './list/list';

export {complement, difference, union, intersect} from './compounded';

export {split, lines, words, unlines, unwords} from './list/string';

export {version} from '../generated-for-src/version';
