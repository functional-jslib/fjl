/**
 * Created by elyde on 1/8/2017.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).

'use strict';

import {assert, expect} from 'chai';
import compose from '../../src/compose';
import {length} from '../../../src/combinators';
import {__} from '../../src/curry';
import {complement, difference, union, intersect, flatten, flattenMulti, concat, join, equals} from '../../src/arrayCombinators';
import {expectInstanceOf, expectFalse, expectTrue, expectEqual, expectFunction} from './../helpers';
import DoublyLinkedList from './../../../src/data/DoublyLinkedList';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('data.DoublyLinkedList', function () {

    describe('Construction', function () {
        it ('should construct an instance when called as a function with no values', function () {
            expectInstanceOf(DoublyLinkedList(), DoublyLinkedList);
        });
        it ('should construct an instance when called with `new` and no values passed in', function () {
            expectInstanceOf(new DoublyLinkedList(), DoublyLinkedList);
        });
    });

    describe('#reduce', function () {

    });

});
