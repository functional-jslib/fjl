/**
 * Created by elyde on 1/8/2017.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).

'use strict';

import {assert, expect} from 'chai';
import {expectInstanceOf, expectFalse, expectTrue, expectEqual, expectFunction} from './../helpers';
import LinkedList from './../../../src/data/LinkedList';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

let {LLNode} = LinkedList;

describe ('data.LinkedList', function () {

    describe('#LLNode', function () {
        describe('Construction', function () {
            it ('should construct `LLNode` when called as a _functionOps', function () {
                let llNode = LLNode();
                expectInstanceOf(llNode, LLNode);
            });
            it ('should construct `LLNode` when called with `new`', function () {
                let llNode = new LLNode();
                expectInstanceOf(llNode, LLNode);
            });
            it ('should construct `LLNode` when called as a _functionOps with an `id_.js` and a `value` value', function () {
                let id = 0,
                    value = 'some-value',
                    llNode = LLNode(id, value);
                expectInstanceOf(llNode, LLNode);
                expectEqual(llNode.id, id);
                expectEqual(llNode.value, value);
            });
            it ('should construct `LLNode` when called with `new` with an `id_.js` and a `value` value', function () {
                let id = 0,
                    value = 'some-value',
                    llNode = new LLNode(id, value);
                expectInstanceOf(llNode, LLNode);
                expectEqual(llNode.id, id);
                expectEqual(llNode.value, value);
            });
        });
        describe('#map', function () {
            let llNode = LLNode();
            it ('should be a method on instances', function () {
                expectFunction(llNode.map);
            });
            it ('should return a `LLNode` when called.', function () {
                expectInstanceOf(llNode.map(x => x), LLNode);
            })
        });
    });

    describe('Construction', function () {
        it ('should construct an instance when called as a _functionOps', function () {
            let linkedList = LinkedList();
            expectInstanceOf(linkedList, LinkedList);
            expectEqual(linkedList.head.next, null);
            expectEqual(linkedList.head.value, null);
        });
        it ('should construct an instance when called with `new`', function () {
            let linkedList = new LinkedList();
            expectInstanceOf(linkedList, LinkedList);
            expectEqual(linkedList.head.next, null);
            expectEqual(linkedList.head.value, null);
        });
    });

});
