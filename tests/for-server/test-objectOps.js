/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by elyde on 11/25/2016.
 * @todo add more extensive tests for `hasOwnProperty`
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {keys} from '../../src/keys';
import {hasOwnProperty} from '../../src/objectPrelude';
import {complement, difference, union, intersect} from '../../src/object';
import {expectTrue, expectFalse, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('Object Operators', function () {

    describe ('hasOwnProperty', function () {
        it ('should be a function', function () {
            expectFunction(hasOwnProperty);
        });
        it ('should return true when passed in object has the passed in property name', function () {
            const obj = {hello: 'ola', ola: 'mambo'};
            expectTrue(hasOwnProperty('hello', obj));
            expectTrue(hasOwnProperty('ola', obj));
        });
        it ('should return false when passed in object doesn\'t have the passed in property name', function () {
            expectFalse(hasOwnProperty('hello', {}));
            expectFalse(hasOwnProperty('mambo', {}));
        });
    });

    describe('complement', function () {
        it('should be a function', function () {
            expectFunction(complement);
        });
        it('should return an object with only properties not found in the first obj', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {d: 4},
                subj3 = {e: 5, f: 6, g: 7},
                result = complement(subj1, subj2, subj3);
            [subj2, subj3].forEach(function (subj) {
                keys(subj).forEach(key => {
                    expectEqual(result[key], subj[key]);
                });
            });
            keys(subj1).forEach(key => {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('difference', function () {

        it('should be a function', function () {
            expectFunction(difference);
        });

        it('should return all the props from obj1 that aren\'t in obj2', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {d: 4},
                result = difference(subj1, subj2);
            Object.keys(subj1).forEach(key => {
                expectEqual(result[key], subj1[key]);
            });
            Object.keys(subj2).forEach(key => {
                expectFalse(result.hasOwnProperty(key));
            });
        });

    });

    describe('union', function () {
        it('should be a function', function () {
            expectFunction(union);
        });
        it ('should return an object containing all properties from the two objects passed in', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {e: 5, f: 6, g: 7},
                result = union(subj1, subj2);
            [subj2, subj1].forEach(function (subj) {
                Object.keys(subj).forEach(key => {
                    expectEqual(result[key], subj[key]);
                });
            });
        });
    });

    describe('intersect', function () {
        it('should be a function', function () {
            expectFunction(union);
        });
        it ('should return an object that contains values from both passed in objects', function () {
            let subj1 = {a: 1, b: 2, c: 3, e: 4, f: 8},
                subj2 = {a: 5, b: 6, c: 7, g: 9},
                sharedKeys = ['a', 'b', 'c'],
                result = intersect(subj1, subj2);
                console.log(result);
            sharedKeys.forEach(key => {
                expectEqual(result[key], subj2[key]);
            });
        });
    });

});
