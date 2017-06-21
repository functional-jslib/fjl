/**
 * Created by elyde on 12/6/2016.
 */

'use strict';

import {assign, assignDeep} from './assign';
import compose from './compose';

import {__, curry, curryN, curry2, curry3, curry4, curry5,
    pureCurry, pureCurryN, pureCurry2, pureCurry3, pureCurry4, pureCurry5} from './curry';

import {subClass, subClassMulti} from './subClass';
import {typeOf, typeOfIs} from './typeOf';

import {isset, issetAndOfType, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet, isConstructablePrimitive} from './is';

import {notEmptyAndOfType} from './not';
import errorIfNotTypeFactory from './errorIfNotTypeFactory';
import {call, apply} from './fnOperators';

import {complement, difference, union, intersect,  map, filter, reduce, reduceRight} from './operators';

import {complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect} from './objOperators';

import {complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect} from './arrayOperators';

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
    difference,
    errorIfNotTypeFactory,
    filter,
    intersect,
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
    map,
    notEmptyAndOfType,
    pureCurry,
    pureCurryN,
    pureCurry2,
    pureCurry3,
    pureCurry4,
    pureCurry5,
    objComplement,
    objDifference,
    objIntersect,
    objUnion,
    reduce,
    reduceRight,
    subClass,
    subClassMulti,
    typeOf,
    typeOfIs,
    union,
    version
};
