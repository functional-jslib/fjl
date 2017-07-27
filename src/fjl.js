/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 */

export {apply} from './function/apply';
export {call} from './function/call';
export {compose} from './function/compose';
export {curry, curryN, curry2, curry3, curry4, curry5,
    __, curry_, curryN_, curry2_, curry3_, curry4_, curry5_} from './function/curry';
export {negate as negateP} from './function/negate';

export {typeOf} from './object/typeOf';

export {isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet} from './object/is';

export {isTruthy, isFalsy} from './boolean/is';
export {not, or, and, equal} from './boolean/boolean';

export {instanceOf} from './object/instanceOf';

export {assign, assignDeep, keys, hasOwnProperty, length,
    instanceOf} from './object/objectPrelude';

export { complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect } from './object/object';

export { map, filter, reduce, reduceRight,
    some, every, forEach, concat, join,
    reverse } from './array/arrayPrelude';

export { complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect,
    // @todo make all list (array and string) ops work on strings as well:
    all, any, or, and,
    flatten, flattenMulti, head, tail,
    init, last, take, drop, splitStrAt, splitArrayAt, splitAt,
    indexUntil, takeWhile, dropWhile, span, breakOnList,
    lengths, orderedLengths, trimLengths,
    zip, zipN, sortAsc, sortDesc,
    sortDescByLength, unzip, unzipN} from './array/array';

export {split, lines, words, unlines, unwords} from './string/string';

export {negate} from './number/number';

export {version} from '../generated-for-src/version';

// Compounded version of set-theory ops (@todo should probably have a version for strings (in separate library maybe)?)
export const

    complement = curry2((functor, ...others) => {
        switch (typeOf(functor)) {
            case 'Array':
                return arrayComplement(functor, ...others);
            default:
                return objComplement(functor, ...others);
        }
    }),

    difference = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayDifference(functor1, functor2);
            default:
                return objDifference(functor1, functor2);
        }
    }),

    union = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayUnion(functor1, functor2);
            default:
                return objUnion(functor1, functor2);
        }
    }),

    intersect = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayIntersect(functor1, functor2);
            default:
                return objIntersect(functor1, functor2);
        }
    });
