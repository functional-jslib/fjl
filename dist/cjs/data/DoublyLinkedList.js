/**
 * Created by elyde on 1/8/2017.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _is = require('../is');

var _subClass = require('../subClass');

var _Monad = require('../monad/Monad');

var _Monad2 = _interopRequireDefault(_Monad);

var _Functor = require('../functor/Functor');

var _Functor2 = _interopRequireDefault(_Functor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    },
    isDLLNode: function isDLLNode(value) {
        return value instanceof DLLNode;
    }
}),
    isDLLNode = DLLNode.isDLLNode,
    DoublyLinkedList = (0, _subClass.subClass)(_Monad2.default, function DoublyLinkedList() {
    if (!(this instanceof DoublyLinkedList)) {
        return DoublyLinkedList.of();
    }
    this.value = this.last = this.head = DLLNode();
}, {
    insert: function insert(nodeOrId, valueIfId) {
        if (!(0, _is.isset)(nodeOrId) || !isDLLNode(nodeOrId) && !(0, _is.isset)(valueIfId)) {
            return this;
        }
        var node = isDLLNode(nodeOrId) ? nodeOrId : DLLNode(nodeOrId, valueIfId);
        this.head.prev = node;
        node.next = this.head;
        this.value = this.head = node;
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
        while (node && (0, _is.isset)(node.value)) {
            agg = fn(agg, node);
            node = node.next;
        }
        return agg;
    },
    reduceRight: function reduceRight(fn, agg) {
        var node = this.last.prev;
        while (node && (0, _is.isset)(node.value)) {
            agg = fn(agg, node);
            node = node.prev;
        }
        return agg;
    }
}, {
    of: function of() {
        return new DoublyLinkedList();
    },
    DLLNode: DLLNode
});

exports.default = DoublyLinkedList;