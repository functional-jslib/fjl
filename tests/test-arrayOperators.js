/**
 * Created by elyde on 12/29/2016.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {complement, difference, union, intersect, flatten, flattenMulti, concat, join} from '../src/arrayOperators';
import {expectFalse, expectTrue, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('complement', function () {
    it ('should return elements not in first array passed to it', function () {
        let testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 2, [4, 5]]
        ];
        testCases.forEach(testCase => {
            let [subj1, subj2, expectedLen, expectedElms] = testCase,
                result = complement(subj1, subj2);
            expectEqual(result.length, expectedLen);
            result.forEach((elm, ind) => {
                expectEqual(elm, expectedElms[ind]);
            });
        });
    });
});

