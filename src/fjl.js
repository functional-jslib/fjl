/**
 * Created by elyde on 12/6/2016.
 */
'use strict';

import compose from './compose';
import {curry, curryN, curry2, curry3, curry4, curry5} from './curry';
import {subClass, subClassMulti} from './subClass';
import {complement, difference, union, intersect} from './objOperators';
import {typeOf, typeOfIs, typeOfIsMulti} from './typeOf';
import {isset, issetMulti, issetAndOfType, isNumber,
    isFunction, isArray, isBoolean,
    isObject, isString, isUndefined, isNull, isSymbol, isEmpty,
    isEmptyMulti, isEmptyObj} from './is';
import {notOfTypeOrEmpty, notEmptyAndOfType} from './not';
import Functor from './functor/Functor';
import Bifunctor from './functor/Bifunctor';
import Apply from './functor/Apply';
import Applicative from './functor/Applicative';
import Chain from './functor/Chain';
import Extend from './functor/Extend';
import Monad from './monad/Monad';
import {Maybe, Just, Nothing, maybe} from './monad/Maybe';
import {Either, Left, Right, either} from './monad/Either';
import version from './generated/version';

export default {
    complement,
    compose,
    curry,
    curryN,
    curry2,
    curry3,
    curry4,
    curry5,
    subClass,
    subClassMulti,
    difference,
    isset,
    issetMulti,
    issetAndOfType,
    typeOf,
    typeOfIs,
    typeOfIsMulti,
    isNumber,
    isFunction,
    isArray,
    isBoolean,
    isObject,
    isString,
    isUndefined,
    isNull,
    isSymbol,
    isEmpty,
    isEmptyMulti,
    isEmptyObj,
    intersect,
    notOfTypeOrEmpty,
    notEmptyAndOfType,
    union,
    Functor,
    Bifunctor,
    Apply,
    Applicative,
    Chain,
    Extend,
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
