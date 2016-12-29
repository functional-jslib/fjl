/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by elyde on 11/25/2016.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {complement, difference, union, intersect} from '../src/objOperators';
import {expectFalse, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

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
            Object.keys(subj).forEach(key => {
                expectEqual(result[key], subj[key]);
            });
        });
        Object.keys(subj1).forEach(key => {
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
        let subj1 = {a: 1, b: 2, c: 3},
            subj2 = {a: 5, b: 6, c: 7},
            result = intersect(subj1, subj2);
        Object.keys(subj2).forEach(key => {
            expectEqual(result[key], subj2[key]);
        });
    });
});
