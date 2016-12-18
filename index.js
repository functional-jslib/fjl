/**
 * Created by elyde on 12/6/2016.
 */
'use strict';

import compose from './src/compose';
import {curry, curryN, curry2, curry3, curry4, curry5} from './src/curry';
import {subClass, subClassMulti} from './src/subClass';
import {objDiff} from './src/obj-math';
import {isset, issetMulti, issetAndOfType, typeOf, typeOfIs,
    typeOfIsMulti, isNumber, isFunction, isArray, isBoolean,
    isObject, isString, isUndefined, isNull, isSymbol, isEmpty,
    isEmptyMulti, isEmptyObj, isEmptyOrNotOfType, notEmptyAndOfType}
    from './src/type-checking';
import * as symbols from './src/symbols';
import Functor from './src/functor/Functor';
import Bifunctor from './src/functor/Bifunctor';
import Applicable from './src/functor/Applicable';
import Applicative from './src/functor/Applicative';
import Chainable from './src/functor/Chainable';
import Monad from './src/monad/Monad';
import {Maybe, Just, Nothing, maybe} from './src/monad/Maybe';
import Either from './src/monad/Either';

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
    objDiff,
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
    isEmptyOrNotOfType,
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
    Either
}