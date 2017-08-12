/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 */

export {apply} from './functionOps/apply';
export {call} from './functionOps/call';
export {compose} from './functionOps/compose';
export {curry, curryN, curry2, curry3, curry4, curry5,
    __, curry_, curryN_, curry2_, curry3_, curry4_, curry5_} from './functionOps/curry';
export {negateP} from './functionOps/negateP';

export {typeOf} from './objectOps/typeOf';

export {isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet} from './objectOps/is';

export {isTruthy, isFalsy} from './booleanOps/is';
export {not, or, and, equal} from './booleanOps/boolean';

export {instanceOf} from './objectOps/instanceOf';

export {assign, assignDeep, keys, hasOwnProperty, length,
    instanceOf} from './objectOps/objectPrelude';

export { complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect } from './objectOps/objectOps';

export { map, filter, reduce, reduceRight,
    some, every, forEach, concat, join,
    reverse } from './listOps/listOpsPlatformPrelude';

export { complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect,
    // @todo make all list (listOps and stringOps) ops work on strings as well:
    all, any, or, and,
    flatten, flattenMulti, head, tail,
    init, last, take, drop, splitAt,
    indexWhile, takeWhile, dropWhile, span, breakOnList,
    zip, zipN, unzip, unzipN} from './listOps/listOps';

export {split, lines, words, unlines, unwords} from './stringOps/string';

export {negate} from './numberOps/number';

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
