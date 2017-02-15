/**
 * Created by elyde on 12/6/2016.
 */
'use strict';

import {assign, assignDeep} from './assign';
import compose from './compose';
import {__, curry, curryN, curry2, curry3, curry4, curry5} from './curry';
import {subClass, subClassMulti} from './subClass';
import {typeOf, typeOfIs} from './typeOf';
import {isset, issetAndOfType, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet, isConstructablePrimitive} from './is';
import {notEmptyAndOfType} from './not';
import errorIfNotTypeFactory from './errorIfNotTypeFactory';
import {length, complement, difference, union, intersect} from './operators';
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
    assign,
    assignDeep,
    compose,
    __,
    curry,
    curryN,
    curry2,
    curry3,
    curry4,
    curry5,
    subClass,
    subClassMulti,
    isset,
    issetAndOfType,
    typeOf,
    typeOfIs,
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
    notEmptyAndOfType,
    errorIfNotTypeFactory,
    complement,
    difference,
    intersect,
    union,
    objComplement,
    objDifference,
    objIntersect,
    objUnion,
    arrayDifference,
    arrayIntersect,
    arrayComplement,
    arrayUnion,
    length,
    version
};
