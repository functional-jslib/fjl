/**
 * Created by elyde on 1/30/2017.
 */
/**
 * Created by elyde on 1/30/2017.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
let {expect}  = require('chai');
let {isset, issetAndOfType, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet, isConstructablePrimitive}  = require('../../dist/cjs/is');
let {expectTrue, expectFalse, expectFunction}  = require('./helpers');
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~
