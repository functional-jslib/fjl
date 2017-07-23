/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 */

export {assign, assignDeep} from './objectPrelude';

export {compose} from './compose';

export {__, curry, curryN, curry2, curry3, curry4, curry5,
    curry_, curryN_, curry2_, curry3_, curry4_, curry5_} from './curry';

export {typeOf} from './typeOf';

export {isset, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet} from './is';

export {call} from './call';
export {apply} from './apply';

export {complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect} from './object';

export {map, filter, reduce, reduceRight,
    some, every, forEach, concat, join,
    reverse} from './listPrelude';

export {complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect,
    flatten, flattenMulti, head, tail,
    init, last, zip, zipN, sortAsc, sortDesc,
    sortDescByLength, unzip, unzipN} from './list';

export {complement, difference, union, intersect} from './compounded';

export {split, lines, words, unlines, unwords} from './string';

export {version} from './generated/version';
