/**
 * Created by elyde on 1/13/2017.
 */

'use strict';

import {isset} from "../is";
import {subClass, subClassMulti} from "../subClass";
import {typeOf} from "../typeOf";
import errorIfNotTypeFactory from "../errorIfNotTypeFactory";
import Functor from "../functor/Functor";
import Comonad from "../functor/Comonad";
import Bifunctor from "../functor/Bifunctor";

let errorIfNotTypeForLinkedList = errorIfNotTypeFactory('LinkedList'),
    errorIfNotTypeForLLNode = errorIfNotTypeFactory('LLNode'),
    LLNode = subClassMulti([Bifunctor, Comonad],
        function LLNode(id, value) {
            if (!(this instanceof LLNode)) {
                return LLNode.of(id, value);
            }
            var _next = null;
            let valueToUse = isset(value) ? value : null;
            Bifunctor.call(this, valueToUse);
            Comonad.call(this, valueToUse);
            Object.defineProperties(this, {
                id: {
                    writable: true,
                    configurable: false,
                    enumerable: true,
                    value: !isset(id) ? null : id
                },
                next: {
                    set: function (valueToSet) {
                        errorIfNotTypeForLLNode('next', valueToSet, 'Null', LLNode);
                        _next = valueToSet;
                    },
                    get: function () {
                        return _next;
                    },
                    enumerable: true
                }
            });
        }, {
            toString: function () {
                return this.constructor.name + '(' + this.id + ', ' + this.extract() + ')';
            },
            map: function (fn) {
                return LLNode.of(this.id, fn(this.extract()));
            },
            bimap: function (fn1, fn2) {
                return LLNode.of(fn1(this.id), fn2(this.extract()));
            }
        }, {
            of: function (nodeOrId, valueIfIdOrNext) {
                let id = value => value;
                return nodeOrId instanceof LLNode ? nodeOrId.bimap(id, id) :
                    new LLNode(nodeOrId, valueIfIdOrNext);
            },
            isLLNode: function (value) {
                return value instanceof LLNode;
            }
        }),

    nodeHasValidNext = node => isset(node.next) && isset(node.next.extract()),

    isLLNode = LLNode.isLLNode,

    LinkedList = subClass(Functor, function LinkedList(firstNodeId, firstNodeValue) {
        if (!(this instanceof LinkedList)) {
            return LinkedList.of(firstNodeId, firstNodeValue);
        }
        var _head,
            _tail;
        Functor.call(this, LLNode(firstNodeId, firstNodeValue));
        Object.defineProperties(this, {
            size: {
                get: function () {
                    var node = this.head,
                        count = node.value === null &&
                        node.id === null ? 0 : 1;
                    while (node.next) {
                        count++;
                    }
                    return count;
                }
            },
            tail: {
                get: function () {
                    return _tail;
                },
                set: function (value) {
                    errorIfNotTypeForLinkedList('tail', value, LLNode);
                    _tail = value;
                },
                enumerable: true
            },
            head: {
                get: function () {
                    return _head;
                },
                set: function (value) {
                    errorIfNotTypeForLinkedList('head', value, LLNode);
                    _head = value;
                },
                enumerable: true
            }
        });
        this.head =
            this.value;
    }, {
        _errorIfUnresolvableNode: function (methodName, ...args) {
            if (!isset(args[0]) || (!isLLNode(args[0]) && !isset(args[1]))) {
                throw new Error(this.constructor.name + '.' +
                    methodName + ' says: Cannot get node from "' +
                    args.join(', "') + '"');
            }
        },
        _getLastAndPrev: function () {
            var node = this.head,
                prevNode;
            while (node.next) {
                prevNode = node;
                node = node.next;
            }
            return {lastNode: node, prevNode};
        },
        _getNodeAndPrevWhere: function (fn) {
            var node = this.head,
                prevNode;
            while (node.next) {
                if (fn(node)) {
                    break;
                }
                prevNode = node;
                node = node.next;
            }
            return {node, prevNode};
        },
        _getPrev: function (node) {
            var prevNode = this.head;
            while (prevNode.next && prevNode.next !== node) {
                prevNode = prevNode.next;
            }
            return prevNode.next !== null ? prevNode : null;
        },
        _insertNodeAtHead: function (node) {
            node.next = this.head;
            this.value = this.head = node;
            return this;
        },
        _insertNodeAtEnd: function (node) {
            let {lastNode} = this._getLastAndPrev();
            if (this.head === lastNode) {
                return this._insertNodeAtHead(node);
            }
            lastNode.next = node;
            return this;
        },
        _findBy: function (idKeyOrPredicate, value) {
            let typeOfdKeyOrPredicate = typeOf(idKeyOrPredicate);
            if (typeOfdKeyOrPredicate === Function.name) {
                return this.filter(idKeyOrPredicate).head;
            }
            else if (typeOfdKeyOrPredicate === String.name) {
                return this.filter(
                    idKeyOrPredicate === 'value' ?
                        (node => node.value === value) :
                        (node => node.id === value)
                ).head;
            }
            throw new Error(this.constructor.name +
                '._findBy expects either a type of "String" or a ' +
                'type of "Function" for it\'s first parameter.  ' +
                'Type received: "' + typeOfdKeyOrPredicate + '".');
        },
        insertNodeAtHead: function (nodeOrId, valueIfId) {
            return this._errorIfUnresolvableNode('insertNodeAtHead', nodeOrId, valueIfId)
                ._insertNodeAtHead(LLNode(nodeOrId, valueIfId));
        },
        insertNodeBefore: function (node, otherNodeOrId) {
            let prevNode = this._errorIfUnresolvableNode('insertNodeBefore', otherNodeOrId)
                ._errorIfUnresolvableNode('insertNodeBefore', node)
                ._getPrev(otherNodeOrId);
            if (!prevNode) {
                return this._insertNodeAtHead(node);
            }
            node.next = prevNode.next;
            prevNode.next = node;
            return this;
        },
        insertNodeAfter: function (node, otherNodeOrId) {
            let parentNode =
                this._errorIfUnresolvableNode('insertNodeAfter', otherNodeOrId)
                    ._errorIfUnresolvableNode('insertNodeAfter', node)
                    ._findBy('id', otherNodeOrId);
            if (!parentNode) {
                return this._insertNodeAtEnd(node);
            }
            node.next = parentNode.next;
            parentNode.next = node;
            return this;
        },
        insertNodeAtEnd: function (nodeOrId, valueIfId) {
            return this._errorIfUnresolvableNode('insertNodeAtEnd', nodeOrId, valueIfId)
                ._insertNodeAtEnd(LLNode(nodeOrId, valueIfId));
        },
        insert: function (nodeOrId, valueIfId) {
            return this.insertNodeAtHead(nodeOrId, valueIfId);
        },
        deleteNodeAtHead: function () {
            let deleted = this.head;
            // If `head` has next set head to next
            if (nodeHasValidNext(this.head)) {
                this.head = this.head.next;
            }
            // Else reset `head`
            else {
                this.head = LLNode();
            }
            return deleted;
        },
        deleteNodeAtEnd: function () {
            let {last, prev} = this._getLastAndPrev();
            prev.next = null;
            return last;
        },
        deleteNode: function (nodeOrId) {
            this._errorIfUnresolvableNode('deleteNode', nodeOrId);
            var deleted;
            let {node, prevNode} = this._getNodeAndPrevWhere(elm => nodeOrId === elm || elm.id === nodeOrId),
                nodeHasNext = nodeHasValidNext(node);
            if (!prevNode) {
                deleted = this.deleteNodeAtHead();
            }
            else if (!nodeHasNext) {
                deleted = this.deleteNodeAtEnd();
            }
            else {
                deleted = prevNode.next;
                prevNode.next = node.next;
            }
            return deleted;
        },
        delete: function (nodeOrId) {
            return isset(nodeOrId) ?
                this.deleteNode(nodeOrId) :
                this.deleteNodeAtHead();
        },
        toString: function (separator) {
            separator = separator || ' -> ';
            return this.constructor.name + '(' +
                this.reduce((agg, node) => {
                    return separator + node;
                }, '') + ')';
        },
        equals: function (list) {
            return this === list; // @todo fill this method out
        },
        concat: function (...lists) {
            return lists.reduce((agg, list) => agg.insertNodeAtEnd(list.head), LinkedList());
        },
        filter: function (fn) {
            var node = this.head,
                list = LinkedList();
            while (node) {
                if (fn(node)) {
                    list.insert(node);
                }
                node = node.next;
            }
            return list;
        },
        traverse: function (fn, applicative) {
            var node = this.head;
            let list = LinkedList();
            while (node.next) {
                list.insert(applicative.ap(node));
            }
            return list;
        },
        map: function (fn) {
            var node = this.head,
                list = LinkedList();
            while (node) {
                list.insertNodeAtHead(fn(node));
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
        of: function (nodeOrId, valueIfId) {
            return new LinkedList(nodeOrId, valueIfId);
        },
        LLNode
    });

export default LinkedList;
