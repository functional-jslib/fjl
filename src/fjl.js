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
    init, last, reverse} from './arrayOperators';

import {complement, difference, union, intersect} from './operators';

import version from './generated/version';

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
    version
};
