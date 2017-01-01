/**
 * Created by elyde on 12/6/2016.
 */
'use strict';

import compose from './compose';
import {__, curry, curryN, curry2, curry3, curry4, curry5} from './curry';
import {subClass, subClassMulti} from './subClass';
import {typeOf, typeOfIs} from './typeOf';
import {isset, issetAndOfType, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet} from './is';
import {notEmptyAndOfType} from './not';
import Functor from './functor/Functor';
import Bifunctor from './functor/Bifunctor';
import Profunctor from './functor/Profunctor';
import Apply from './functor/Apply';
import Applicative from './functor/Applicative';
import Chain from './functor/Chain';
import Extend from './functor/Extend';
import Comonad from './functor/Comonad';
import Monad from './monad/Monad';
import {Maybe, Just, Nothing, maybe} from './monad/Maybe';
import {Either, Left, Right, either} from './monad/Either';
import {length} from './combinators';
import {complement, difference, union, intersect} from './objCombinators';
import {complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect} from './arrayCombinators';
import version from './generated/version';

export default {
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
    notEmptyAndOfType,
    complement,
    difference,
    intersect,
    union,
    arrayDifference,
    arrayIntersect,
    arrayComplement,
    arrayUnion,
    length,
    Functor,
    Bifunctor,
    Profunctor,
    Apply,
    Applicative,
    Chain,
    Extend,
    Comonad,
    Monad,
    Maybe,
    Just,
    Nothing,
    maybe,
    Either,
    Left,
    Right,
    either,
    version
};
