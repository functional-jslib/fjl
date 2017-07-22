/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 */

export {assign, assignDeep} from './object';

export {compose} from './compose';

export {__, curry, curryN, curry2, curry3, curry4, curry5,
    curry_, curryN_, curry2_, curry3_, curry4_, curry5_} from './curry';

export {typeOf, typeOfIs} from './typeOf';

export {instanceOf, isset, issetAndOfType, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet} from './is';

export {call, apply} from './functionOps';

export {complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect} from './objectOps';

export {complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect,
    flatten, flattenMulti, map, filter,
    reduce, reduceRight, head, tail,
    init, last, reverse, orderedLengths, lengths, zip, zipN,
    getSortByOrder, sortAsc, sortDesc, sortDescByLength, concat,
    ASC, DESC, join, unzip, unzipN} from './arrayOps';

export {complement, difference, union, intersect} from './operators';

export {split, lines, words, unlines, unwords} from './stringOps';

export {version} from './generated/version';
