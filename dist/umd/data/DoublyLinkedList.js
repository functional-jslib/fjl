(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../is', '../subClass', '../monad/Monad', '../functor/Functor'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../is'), require('../subClass'), require('../monad/Monad'), require('../functor/Functor'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.subClass, global.Monad, global.Functor);
        global.DoublyLinkedList = mod.exports;
    }
})(this, function (exports, _is, _subClass, _Monad, _Functor) {
    /**
     * Created by elyde on 1/8/2017.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Monad2 = _interopRequireDefault(_Monad);

    var _Functor2 = _interopRequireDefault(_Functor);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var DLLNode = (0, _subClass.subClass)(_Functor2.default, function DLLNode(id, value) {
        if (!(this instanceof DLLNode)) {
            return DLLNode.of(id, value);
        }
        _Functor2.default.call(this, (0, _is.isset)(value) ? value : null);
        this.id = !(0, _is.isset)(id) ? null : id;
        this.prev = null;
        this.next = null;
    }, {
        toString: function toString() {
            return this.constructor.name + '(' + this.id + ', ' + this.value + ')';
        },
        map: function map(fn) {
            return DLLNode.of(this.id, fn(this.value));
        }
    }, {
        of: function of(id, value) {
            return new DLLNode(id, value);
        }
    }),
        DoublyLinkedList = (0, _subClass.subClass)(_Monad2.default, function DoublyLinkedList(id, value) {
        if (!(this instanceof DoublyLinkedList)) {
            return DoublyLinkedList.of(id, value);
        }
        this.value = this.last = this.head = id instanceof DLLNode ? id : DLLNode(id, value);
    }, {
        insert: function insert(node) {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
            return this;
        },
        fromToStringTemplate: function fromToStringTemplate(value) {
            return this.constructor.name + '(' + value + ')';
        },
        toString: function toString(separator) {
            separator = separator || ' -> ';
            return this.fromToStringTemplate(this.reduce(function (agg, node) {
                return separator + node;
            }, ''));
        },
        filter: function filter(fn) {
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
        map: function map(fn) {
            var node = this.head,
                list = DoublyLinkedList();
            while (node) {
                list.insert(fn(node));
                node = node.next;
            }
            return list;
        },
        reduce: function reduce(fn, agg) {
            var node = this.head;
            while (node) {
                agg = fn(agg, node);
                node = node.next;
            }
            return agg;
        },
        reduceRight: function reduceRight(fn, agg) {
            var node = this.last;
            while (node) {
                agg = fn(agg, node);
                node = node.prev;
            }
            return agg;
        }
    }, {
        of: function of(id, value) {
            return new DoublyLinkedList(id, value);
        },
        DLLNode: DLLNode
    });

    exports.default = DoublyLinkedList;
});