/**
 * Created by elyde on 1/8/2017.
 */

'use strict';

import {isset} from '../is';
import {subClass} from '../subClass';
import Monad from '../monad/Monad';
import Functor from '../functor/Functor';

let DLLNode = subClass(
    Functor,
    function DLLNode(id, value) {
        if (!(this instanceof DLLNode)) {
            return DLLNode.of(id, value);
        }
        Functor.call(this, isset(value) ? value : null);
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
        of: function (id, value) {
            return new DLLNode(id, value);
        },
        isDLLNode: function (value) {
            return value instanceof DLLNode;
        }
    }),

    isDLLNode = DLLNode.isDLLNode,

    DoublyLinkedList = subClass(Monad, function DoublyLinkedList(id, value) {
        if (!(this instanceof DoublyLinkedList)) {
            return DoublyLinkedList.of(id, value);
        }
        this.value =
            this.last =
                this.head =
                    isDLLNode(id) ? id : DLLNode(id, value);
    }, {
        insert: function (nodeOrId, valueIfId) {
            if (!isset(nodeOrId) || (!isDLLNode(nodeOrId) && !isset(valueIfId))) {
                return this;
            }
            let node = isDLLNode(nodeOrId) ? nodeOrId : DLLNode(nodeOrId, valueIfId);
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
            var node = this.head,
                list = DoublyLinkedList();
            while (node) {
                list.insert(fn(node));
                node = node.next;
            }
            return list;
        },
        reduce: function (fn, agg) {
            var node = this.head;
            while (node && isset(node.value)) {
                agg = fn(agg, node);
                node = node.next;
            }
            return agg;
        },
        reduceRight: function (fn, agg) {
            var node = this.last;
            while (node && isset(node.value)) {
                agg = fn(agg, node);
                node = node.prev;
            }
            return agg;
        }
    }, {
        of: function (id, value) {
            return new DoublyLinkedList(id, value);
        },
        DLLNode
    });

export default DoublyLinkedList;
