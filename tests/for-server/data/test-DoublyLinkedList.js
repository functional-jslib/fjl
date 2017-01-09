/**
 * Created by elyde on 1/8/2017.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).

'use strict';

import {assert, expect} from 'chai';
import {expectInstanceOf, expectFalse, expectTrue, expectEqual, expectFunction} from './../helpers';
import DoublyLinkedList from './../../../src/data/DoublyLinkedList';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

let {DLLNode} = DoublyLinkedList;

describe ('data.DoublyLinkedList', function () {

    describe('#DLLNode', function () {
        describe('Construction', function () {
            it ('should construct `DLLNode` when called as a function', function () {
                let dllNode = DLLNode();
                expectInstanceOf(dllNode, DLLNode);
            });
            it ('should construct `DLLNode` when called with `new`', function () {
                let dllNode = new DLLNode();
                expectInstanceOf(dllNode, DLLNode);
            });
            it ('should construct `DLLNode` when called as a function with an `id` and a `value` value', function () {
                let id = 0,
                    value = 'some-value',
                    dllNode = DLLNode(id, value);
                expectInstanceOf(dllNode, DLLNode);
                expectEqual(dllNode.id, id);
                expectEqual(dllNode.value, value);
            });
            it ('should construct `DLLNode` when called with `new` with an `id` and a `value` value', function () {
                let id = 0,
                    value = 'some-value',
                    dllNode = new DLLNode(id, value);
                expectInstanceOf(dllNode, DLLNode);
                expectEqual(dllNode.id, id);
                expectEqual(dllNode.value, value);
            });
        });
        describe('#map', function () {
            it ('should be a method on instances', function () {
                let dllNode = DLLNode();
                expectFunction(dllNode.map);
            });
        });
    });

    describe('Construction', function () {
        it ('should construct an instance when called as a function with no values', function () {
            let dll = DoublyLinkedList();
            expectInstanceOf(dll, DoublyLinkedList);
            expectEqual(dll.head.next, null);
            expectEqual(dll.head.prev, null);
            expectEqual(dll.head.value, null);
        });
        it ('should construct an instance when called with `new` and no values passed in', function () {
            let dll = new DoublyLinkedList();
            expectInstanceOf(dll, DoublyLinkedList);
            expectEqual(dll.head.next, null);
            expectEqual(dll.head.prev, null);
            expectEqual(dll.head.value, null);
        });
        it ('should construct an instance when called as a function with a `DLLNode` passed in', function () {
            let node = DLLNode(0, 'some-value-here'),
                dll = DoublyLinkedList(node);
            expectInstanceOf(dll, DoublyLinkedList);
            expectEqual(dll.head.id, node.id);
            expectEqual(dll.head.value, node.value);
        });
        it ('should construct an instance when called with `new` and a `DLLNode` passed in', function () {
            let node = DLLNode(0, 'some-value-here'),
                dll = new DoublyLinkedList(node);
            expectInstanceOf(dll, DoublyLinkedList);
            expectEqual(dll.head.id, node.id);
            expectEqual(dll.head.value, node.value);
            expectInstanceOf(dll, DoublyLinkedList);
        });
        it ('should construct an instance when called as a function with an `id` and a `value`', function () {
            let id = 0,
                value = 'some-value-here',
                dll = DoublyLinkedList(id, value);
            expectInstanceOf(dll, DoublyLinkedList);
            expectEqual(dll.head.id, id);
            expectEqual(dll.head.value, value);
            expectInstanceOf(dll, DoublyLinkedList);
            expectInstanceOf(dll, DoublyLinkedList);
        });
        it ('should construct an instance when called with `new` and  an `id` and a `value` passed in', function () {
            let id = 0,
                value = 'some-value-here',
                dll = new DoublyLinkedList(id, value);
            expectInstanceOf(dll, DoublyLinkedList);
            expectEqual(dll.head.id, id);
            expectEqual(dll.head.value, value);
            expectInstanceOf(dll, DoublyLinkedList);
            expectInstanceOf(dll, DoublyLinkedList);
        });
    });

    describe('#reduce', function () {
        it ('should be a method on instances of type `DoublyLinkedList`', function () {
            let dll = new DoublyLinkedList();
            expectFunction(dll.reduce);
        });
        it ('should reduce a DoublyLinkedList down to some aggregator', function () {
            let dll = new DoublyLinkedList(),
                separator = ' -> ',
                values = ['value1', 'value2', 'value3'],
                reduction;
            values.forEach((value, index) => dll.insert(index, value));
            reduction = dll.reduce((agg, node) => {
                return agg + node.value + (node.next ? separator : '');
            }, '');
            expectEqual(reduction, values.concat(separator));
        });
    });

});
