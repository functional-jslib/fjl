/**
 * Created by elyde on 12/6/2016.
 */
'use strict';

import compose from './compose';
import {curry, curryN, curry2, curry3, curry4, curry5} from './curry';
import {subClass, subClassMulti} from './subClass';
import {subtractObj} from './math';
import {typeOf, typeOfIs, typeOfIsMulti} from './typeOf';
import {isset, issetMulti, issetAndOfType, isNumber,
    isFunction, isArray, isBoolean,
    isObject, isString, isUndefined, isNull, isSymbol, isEmpty,
    isEmptyMulti, isEmptyObj} from './is';
import {notOfTypeOrEmpty, notEmptyAndOfType} from './not';
import * as symbols from './symbols';
import Functor from './functor/Functor';
import Bifunctor from './functor/Bifunctor';
import Applicable from './functor/Applicable';
import Applicative from './functor/Applicative';
import Chainable from './functor/Chainable';
import Monad from './monad/Monad';
import {Maybe, Just, Nothing, maybe} from './monad/Maybe';
import Either from './monad/Either';
import version from './generated/version';

export default {
    compose,
    curry,
    curryN,
    curry2,
    curry3,
    curry4,
    curry5,
    subClass,
    subClassMulti,
    subtractObj,
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
    notOfTypeOrEmpty,
    notEmptyAndOfType,
    symbols,
    Functor,
    Bifunctor,
    Applicable,
    Applicative,
    Chainable,
    Monad,
    Maybe,
    Just,
    Nothing,
    maybe,
    Either,
    version
};
