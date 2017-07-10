/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 */

import {assign, assignDeep} from './assign';
import compose from './compose';

import {__, curry, curryN, curry2, curry3, curry4, curry5,
    curry_, curryN_, curry2_, curry3_, curry4_, curry5_} from './curry';

import {typeOf, typeOfIs} from './typeOf';

import {instanceOf, isset, issetAndOfType, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet, isConstructablePrimitive, notEmptyAndOfType} from './is';

import errorIfNotTypeFactory from './errorIfNotTypeFactory';
import {call, apply} from './fnOperators';

import {complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect} from './objOperators';

import {complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect,
    flatten, flattenMulti, map, filter,
    reduce, reduceRight, head, tail,
    init, last, reverse, orderedLengths, lengths, zip, zipN,
    getSortByOrder, sortAsc, sortDesc, sortDescByLength, concat,
    ASC, DESC, join, unzip, unzipN} from './arrayOperators';

import {complement, difference, union, intersect} from './operators';

import {split, lines, words, unlines, unwords} from './stringOps';

import version from './generated/version';

/**
 * Fjl
 * @module fjl
 * @type {{__: PlaceHolder, apply: apply, arrayComplement, arrayDifference, arrayIntersect, arrayUnion, assign: assign, assignDeep: assignDeep, call: call, complement: Function, compose: compose, curry: curry, curryN: curryN, curry2: curry2, curry3: curry3, curry4: curry4, curry5: curry5, curry_: curry_, curryN_: curryN_, curry2_: curry2_, curry3_: curry3_, curry4_: curry4_, curry5_: curry5_, difference: Function, errorIfNotTypeFactory: errorIfNotTypeFactory, filter, flatten: module:fjl.flatten, flattenMulti, head: module:fjl.head, init: module:fjl.init, intersect: Function, instanceOf: Function, isset: module:fjl.isset, issetAndOfType: module:fjl.issetAndOfType, isNumber: module:fjl.isNumber, isFunction: module:fjl.isFunction, isArray: module:fjl.isArray, isBoolean: module:fjl.isBoolean, isObject: module:fjl.isObject, isString: module:fjl.isString, isMap: module:fjl.isMap, isSet: module:fjl.isSet, isWeakSet: module:fjl.isWeakSet, isWeakMap: module:fjl.isWeakMap, isUndefined: module:fjl.isUndefined, isNull: module:fjl.isNull, isSymbol: module:fjl.isSymbol, isEmpty: module:fjl.isEmpty, isConstructablePrimitive: isConstructablePrimitive, last: module:fjl.last, map, notEmptyAndOfType: module:fjl.notEmptyAndOfType, objComplement: Function, objDifference: Function, objIntersect: Function, objUnion: Function, reduce, reduceRight, reverse, tail: module:fjl.tail, typeOf: module:fjl.typeOf, typeOfIs: Function, union: Function, version: string}}
 */
export default {
    __,
    apply,
    arrayComplement,
    arrayDifference,
    arrayIntersect,
    arrayUnion,
    assign,
    assignDeep,
    call,
    complement,
    compose,
    curry,
    curryN,
    curry2,
    curry3,
    curry4,
    curry5,
    curry_,
    curryN_,
    curry2_,
    curry3_,
    curry4_,
    curry5_,
    difference,
    errorIfNotTypeFactory,
    filter,
    flatten,
    flattenMulti,
    head,
    init,
    intersect,
    instanceOf,
    isset,
    issetAndOfType,
    isNumber,
    isFunction,
    isArray,
    isBoolean,
    isObject,
    isString,
    isMap,
    isSet,
    isWeakSet,
    isWeakMap,
    isUndefined,
    isNull,
    isSymbol,
    isEmpty,
    isConstructablePrimitive,
    last,
    map,
    notEmptyAndOfType,
    objComplement,
    objDifference,
    objIntersect,
    objUnion,
    reduce,
    reduceRight,
    reverse,
    tail,
    typeOf,
    typeOfIs,
    union,
    join, split, lines, words, unlines, unwords,
    orderedLengths, zip, zipN, unzip, unzipN,
    getSortByOrder, sortAsc, sortDesc, sortDescByLength, concat,
    ASC, DESC,
    lengths,
    version
};
