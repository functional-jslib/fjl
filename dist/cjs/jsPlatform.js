'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _array = require('./jsPlatform/array');

Object.defineProperty(exports, 'map', {
    enumerable: true,
    get: function get() {
        return _array.map;
    }
});
Object.defineProperty(exports, 'filter', {
    enumerable: true,
    get: function get() {
        return _array.filter;
    }
});
Object.defineProperty(exports, 'reduce', {
    enumerable: true,
    get: function get() {
        return _array.reduce;
    }
});
Object.defineProperty(exports, 'reduceRight', {
    enumerable: true,
    get: function get() {
        return _array.reduceRight;
    }
});
Object.defineProperty(exports, 'forEach', {
    enumerable: true,
    get: function get() {
        return _array.forEach;
    }
});
Object.defineProperty(exports, 'some', {
    enumerable: true,
    get: function get() {
        return _array.some;
    }
});
Object.defineProperty(exports, 'every', {
    enumerable: true,
    get: function get() {
        return _array.every;
    }
});
Object.defineProperty(exports, 'join', {
    enumerable: true,
    get: function get() {
        return _array.join;
    }
});
Object.defineProperty(exports, 'push', {
    enumerable: true,
    get: function get() {
        return _array.push;
    }
});
Object.defineProperty(exports, 'reverse', {
    enumerable: true,
    get: function get() {
        return _array.reverse;
    }
});

var _list = require('./jsPlatform/list');

Object.keys(_list).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _list[key];
        }
    });
});

var _string = require('./jsPlatform/string');

Object.keys(_string).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _string[key];
        }
    });
});