(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../is', '../subClass', '../typeOf', '../errorIfNotTypeFactory', '../functor/Functor', '../functor/Comonad', '../functor/Bifunctor'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../is'), require('../subClass'), require('../typeOf'), require('../errorIfNotTypeFactory'), require('../functor/Functor'), require('../functor/Comonad'), require('../functor/Bifunctor'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.subClass, global.typeOf, global.errorIfNotTypeFactory, global.Functor, global.Comonad, global.Bifunctor);
        global.LinkedList = mod.exports;
    }
})(this, function (exports, _is, _subClass, _typeOf, _errorIfNotTypeFactory, _Functor, _Comonad, _Bifunctor) {
    /**
     * Created by elyde on 1/13/2017.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _errorIfNotTypeFactory2 = _interopRequireDefault(_errorIfNotTypeFactory);

    var _Functor2 = _interopRequireDefault(_Functor);

    var _Comonad2 = _interopRequireDefault(_Comonad);

    var _Bifunctor2 = _interopRequireDefault(_Bifunctor);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var errorIfNotTypeForLinkedList = (0, _errorIfNotTypeFactory2.default)('LinkedList'),
        errorIfNotTypeForLLNode = (0, _errorIfNotTypeFactory2.default)('LLNode'),
        LLNode = (0, _subClass.subClassMulti)([_Bifunctor2.default, _Comonad2.default], function LLNode(id, value) {
        if (!(this instanceof LLNode)) {
            return LLNode.of(id, value);
        }
        var _next = null;
        var valueToUse = (0, _is.isset)(value) ? value : null;
        _Bifunctor2.default.call(this, valueToUse);
        _Comonad2.default.call(this, valueToUse);
        Object.defineProperties(this, {
            id: {
                writable: true,
                configurable: false,
                enumerable: true,
                value: !(0, _is.isset)(id) ? null : id
            },
            next: {
                set: function set(valueToSet) {
                    errorIfNotTypeForLLNode('next', valueToSet, 'Null', LLNode);
                    _next = valueToSet;
                },
                get: function get() {
                    return _next;
                },
                enumerable: true
            }
        });
    }, {
        toString: function toString() {
            return this.constructor.name + '(' + this.id + ', ' + this.extract() + ')';
        },
        map: function map(fn) {
            return LLNode.of(this.id, fn(this.extract()));
        },
        bimap: function bimap(fn1, fn2) {
            return LLNode.of(fn1(this.id), fn2(this.extract()));
        }
    }, {
        of: function of(nodeOrId, valueIfIdOrNext) {
            var id = function id(value) {
                return value;
            };
            return nodeOrId instanceof LLNode ? nodeOrId.bimap(id, id) : new LLNode(nodeOrId, valueIfIdOrNext);
        },
        isLLNode: function isLLNode(value) {
            return value instanceof LLNode;
        }
    }),
        nodeHasValidNext = function nodeHasValidNext(node) {
        return (0, _is.isset)(node.next) && (0, _is.isset)(node.next.extract());
    },
        isLLNode = LLNode.isLLNode,
        LinkedList = (0, _subClass.subClass)(_Functor2.default, function LinkedList(firstNodeId, firstNodeValue) {
        if (!(this instanceof LinkedList)) {
            return LinkedList.of(firstNodeId, firstNodeValue);
        }
        var _head, _tail;
        _Functor2.default.call(this, LLNode(firstNodeId, firstNodeValue));
        Object.defineProperties(this, {
            size: {
                get: function get() {
                    var node = this.head,
                        count = node.value === null && node.id === null ? 0 : 1;
                    while (node.next) {
                        count++;
                    }
                    return count;
                }
            },
            tail: {
                get: function get() {
                    return _tail;
                },
                set: function set(value) {
                    errorIfNotTypeForLinkedList('tail', value, LLNode);
                    _tail = value;
                },
                enumerable: true
            },
            head: {
                get: function get() {
                    return _head;
                },
                set: function set(value) {
                    errorIfNotTypeForLinkedList('head', value, LLNode);
                    _head = value;
                },
                enumerable: true
            }
        });
        this.head = this.value;
    }, {
        _errorIfUnresolvableNode: function _errorIfUnresolvableNode(methodName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            if (!(0, _is.isset)(args[0]) || !isLLNode(args[0]) && !(0, _is.isset)(args[1])) {
                throw new Error(this.constructor.name + '.' + methodName + ' says: Cannot get node from "' + args.join(', "') + '"');
            }
        },
        _getLastAndPrev: function _getLastAndPrev() {
            var node = this.head,
                prevNode;
            while (node.next) {
                prevNode = node;
                node = node.next;
            }
            return { lastNode: node, prevNode: prevNode };
        },
        _getNodeAndPrevWhere: function _getNodeAndPrevWhere(fn) {
            var node = this.head,
                prevNode;
            while (node.next) {
                if (fn(node)) {
                    break;
                }
                prevNode = node;
                node = node.next;
            }
            return { node: node, prevNode: prevNode };
        },
        _getPrev: function _getPrev(node) {
            var prevNode = this.head;
            while (prevNode.next && prevNode.next !== node) {
                prevNode = prevNode.next;
            }
            return prevNode.next !== null ? prevNode : null;
        },
        _insertNodeAtHead: function _insertNodeAtHead(node) {
            node.next = this.head;
            this.value = this.head = node;
            return this;
        },
        _insertNodeAtEnd: function _insertNodeAtEnd(node) {
            var _getLastAndPrev2 = this._getLastAndPrev(),
                lastNode = _getLastAndPrev2.lastNode;

            if (this.head === lastNode) {
                return this._insertNodeAtHead(node);
            }
            lastNode.next = node;
            return this;
        },
        _findBy: function _findBy(idKeyOrPredicate, value) {
            var typeOfdKeyOrPredicate = (0, _typeOf.typeOf)(idKeyOrPredicate);
            if (typeOfdKeyOrPredicate === Function.name) {
                return this.filter(idKeyOrPredicate).head;
            } else if (typeOfdKeyOrPredicate === String.name) {
                return this.filter(idKeyOrPredicate === 'value' ? function (node) {
                    return node.value === value;
                } : function (node) {
                    return node.id === value;
                }).head;
            }
            throw new Error(this.constructor.name + '._findBy expects either a type of "String" or a ' + 'type of "Function" for it\'s first parameter.  ' + 'Type received: "' + typeOfdKeyOrPredicate + '".');
        },
        insertNodeAtHead: function insertNodeAtHead(nodeOrId, valueIfId) {
            return this._errorIfUnresolvableNode('insertNodeAtHead', nodeOrId, valueIfId)._insertNodeAtHead(LLNode(nodeOrId, valueIfId));
        },
        insertNodeBefore: function insertNodeBefore(node, otherNodeOrId) {
            var prevNode = this._errorIfUnresolvableNode('insertNodeBefore', otherNodeOrId)._errorIfUnresolvableNode('insertNodeBefore', node)._getPrev(otherNodeOrId);
            if (!prevNode) {
                return this._insertNodeAtHead(node);
            }
            node.next = prevNode.next;
            prevNode.next = node;
            return this;
        },
        insertNodeAfter: function insertNodeAfter(node, otherNodeOrId) {
            var parentNode = this._errorIfUnresolvableNode('insertNodeAfter', otherNodeOrId)._errorIfUnresolvableNode('insertNodeAfter', node)._findBy('id', otherNodeOrId);
            if (!parentNode) {
                return this._insertNodeAtEnd(node);
            }
            node.next = parentNode.next;
            parentNode.next = node;
            return this;
        },
        insertNodeAtEnd: function insertNodeAtEnd(nodeOrId, valueIfId) {
            return this._errorIfUnresolvableNode('insertNodeAtEnd', nodeOrId, valueIfId)._insertNodeAtEnd(LLNode(nodeOrId, valueIfId));
        },
        insert: function insert(nodeOrId, valueIfId) {
            return this.insertNodeAtHead(nodeOrId, valueIfId);
        },
        deleteNodeAtHead: function deleteNodeAtHead() {
            var deleted = this.head;
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
        deleteNodeAtEnd: function deleteNodeAtEnd() {
            var _getLastAndPrev3 = this._getLastAndPrev(),
                last = _getLastAndPrev3.last,
                prev = _getLastAndPrev3.prev;

            prev.next = null;
            return last;
        },
        deleteNode: function deleteNode(nodeOrId) {
            this._errorIfUnresolvableNode('deleteNode', nodeOrId);
            var deleted;

            var _getNodeAndPrevWhere2 = this._getNodeAndPrevWhere(function (elm) {
                return nodeOrId === elm || elm.id === nodeOrId;
            }),
                node = _getNodeAndPrevWhere2.node,
                prevNode = _getNodeAndPrevWhere2.prevNode,
                nodeHasNext = nodeHasValidNext(node);

            if (!prevNode) {
                deleted = this.deleteNodeAtHead();
            } else if (!nodeHasNext) {
                deleted = this.deleteNodeAtEnd();
            } else {
                deleted = prevNode.next;
                prevNode.next = node.next;
            }
            return deleted;
        },
        delete: function _delete(nodeOrId) {
            return (0, _is.isset)(nodeOrId) ? this.deleteNode(nodeOrId) : this.deleteNodeAtHead();
        },
        toString: function toString(separator) {
            separator = separator || ' -> ';
            return this.constructor.name + '(' + this.reduce(function (agg, node) {
                return separator + node;
            }, '') + ')';
        },
        equals: function equals(list) {
            return this === list; // @todo fill this method out
        },
        concat: function concat() {
            for (var _len2 = arguments.length, lists = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                lists[_key2] = arguments[_key2];
            }

            return lists.reduce(function (agg, list) {
                return agg.insertNodeAtEnd(list.head);
            }, LinkedList());
        },
        filter: function filter(fn) {
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
        traverse: function traverse(fn, applicative) {
            var node = this.head;
            var list = LinkedList();
            while (node.next) {
                list.insert(applicative.ap(node));
            }
            return list;
        },
        map: function map(fn) {
            var node = this.head,
                list = LinkedList();
            while (node) {
                list.insertNodeAtHead(fn(node));
                node = node.next;
            }
            return list;
        },
        reduce: function reduce(fn, agg) {
            var node = this.head;
            while (node && (0, _is.isset)(node.extract())) {
                agg = fn(agg, node);
                node = node.next;
            }
            return agg;
        },
        reduceRight: function reduceRight(fn, agg) {
            var node = this.last.prev;
            while (node && (0, _is.isset)(node.extract())) {
                agg = fn(agg, node);
                node = node.prev;
            }
            return agg;
        }
    }, {
        of: function of(nodeOrId, valueIfId) {
            return new LinkedList(nodeOrId, valueIfId);
        },
        LLNode: LLNode
    });

    exports.default = LinkedList;
});