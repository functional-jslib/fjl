/**
 * Created by elyde on 1/8/2017.
 */

'use strict';

import {isset} from '../is';
import {subClass} from '../subClass';
import Monad from '../monad/Monad';
import Comonad from '../functor/Comonad';

let DLLNode = subClass(
    Comonad,
    function DLLNode(id, value) {
        if (!(this instanceof DLLNode)) {
            return DLLNode.of(id, value);
        }
        Comonad.call(this, isset(value) ? value : null);
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

    nodeHasValidPrev = node => isset(node.prev) && isset(node.prev.extract()),

    nodeHasValidNext = node => isset(node.next) && isset(node.next.extract()),

    isDLLNode = DLLNode.isDLLNode,

    DoublyLinkedList = subClass(Monad, function DoublyLinkedList() {
        if (!(this instanceof DoublyLinkedList)) {
            return DoublyLinkedList.of();
        }
        this.value =
            this.last =
                this.head = DLLNode();
    }, {
        insert: function (nodeOrId, valueIfId) {
            if (!isset(nodeOrId) || (!isDLLNode(nodeOrId) && !isset(valueIfId))) {
                return this;
            }
            let node = isDLLNode(nodeOrId) ? nodeOrId : DLLNode(nodeOrId, valueIfId);
            this.head.prev = node;
            node.next = this.head;
            this.value =
                this.head = node;
            return this;
        },
        delete: function (nodeOrId) {
            var filteredDll = this.filter(function (node) {
                return nodeOrId === node || node.id === nodeOrId;
            }),
                foundNode,
                nodeHasPrev,
                nodeHasNext;

            if (!nodeHasValidNext(filteredDll.head)) {
                return this;
            }

            foundNode = filteredDll.head.next;
            nodeHasNext = nodeHasValidNext(foundNode);
            nodeHasPrev = nodeHasValidPrev(foundNode);

            if (nodeHasPrev && nodeHasNext) {
                foundNode.prev.next = foundNode.next;
            }
            else if (nodeHasNext && !nodeHasPrev) {
                this.value =
                    this.head =
                        foundNode.next;
            }

            if (nodeHasValidNext(foundNode.next)) {
                this.delete(foundNode.next.next);
            }

            return this;
        },
        toString: function (separator) {
            separator = separator || ' -> ';
            return this.constructor.name + '(' +
                this.reduce((agg, node) => {
                    return separator + node;
                }, '') + ')';
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
            while (node && isset(node.extract())) {
                agg = fn(agg, node);
                node = node.next;
            }
            return agg;
        },
        reduceRight: function (fn, agg) {
            var node = this.last.prev;
            while (node && isset(node.extract())) {
                agg = fn(agg, node);
                node = node.prev;
            }
            return agg;
        }
    }, {
        of: function () {
            return new DoublyLinkedList();
        },
        DLLNode
    });

export default DoublyLinkedList;
