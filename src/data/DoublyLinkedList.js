/**
 * Created by elyde on 1/8/2017.
 */

'use strict';

import {isset} from '../is';
import {subClass} from '../subClass';
import Monad from '../monad/Monad';
import Functor from '../functor/Functor';
import Applicative from '../functor/Applicative';

let DLLNode = subClass(
    Functor,
    function DLLNode(id, value) {
        if (!(this instanceof DLLNode)) {
            return DLLNode.of(id, value);
        }
        Functor.call(this, value);
        this.id = !isset(id) ? null : id;
        this.prev = null;
        this.next = null;
    }, {
        toString: function () {
            return this.constructor.name + '(' + this.id + ', ' + this.value + ')';
        },
        map: function (fn) {
            return DLLNode.of(this.id, fn(this.value));
        }
    }, {
        of: function (id, data) {
            return new DLLNode(id, data);
        }
    }),

    DoublyLinkedList = subClass(Monad, function DoublyLinkedList(id, data) {
        if (!(this instanceof DoublyLinkedList)) {
            return DoublyLinkedList.of(id, data);
        }
        this.last =
            this.head =
                id instanceof DLLNode ? id : DLLNode(id, data);
    }, {
        insert: function (node) {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
            return this;
        },
        fromToStringTemplate: function (value) {
            return this.constructor.name + '(' + value + ')';
        },
        toString: function (separator) {
            separator = separator || ' -> ';
            return this.fromToStringTemplate(
                this.reduce((agg, node) => {
                    return separator + node;
                }, '')
            );
        },
        filter: function (fn) {
            this.traverse(Applicative(fn),)
            var node = this.head,
                list = DoublyLinkedList();
            while (node) {
                if (fn(node)) {
                    list.insert(node);
                }
                node = node.next;
            }
            return list;
        },
        map: function (fn) {
            return DoublyLinkedList.of(fn(this.head));
        },
        reduce: function (fn, agg) {
            var node = this.head;
            while (node) {
                agg = fn(agg, node);
                node = node.next;
            }
            return agg;
        },
        reduceRight: function (fn, agg) {
            var node = this.last;
            while (node) {
                agg = fn(agg, node);
                node = node.prev;
            }
            return agg;
        }
    }, {
        of: function (id, data) {
            return new DoublyLinkedList(id, data);
        },
        DLLNode
    });

export default DoublyLinkedList;
