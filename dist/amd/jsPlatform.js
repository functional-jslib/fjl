define(['exports', './jsPlatform/array', './jsPlatform/list', './jsPlatform/string'], function (exports, _array, _list, _string) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, 'map', {
        enumerable: true,
        get: function () {
            return _array.map;
        }
    });
    Object.defineProperty(exports, 'filter', {
        enumerable: true,
        get: function () {
            return _array.filter;
        }
    });
    Object.defineProperty(exports, 'reduce', {
        enumerable: true,
        get: function () {
            return _array.reduce;
        }
    });
    Object.defineProperty(exports, 'reduceRight', {
        enumerable: true,
        get: function () {
            return _array.reduceRight;
        }
    });
    Object.defineProperty(exports, 'forEach', {
        enumerable: true,
        get: function () {
            return _array.forEach;
        }
    });
    Object.defineProperty(exports, 'some', {
        enumerable: true,
        get: function () {
            return _array.some;
        }
    });
    Object.defineProperty(exports, 'every', {
        enumerable: true,
        get: function () {
            return _array.every;
        }
    });
    Object.defineProperty(exports, 'join', {
        enumerable: true,
        get: function () {
            return _array.join;
        }
    });
    Object.defineProperty(exports, 'push', {
        enumerable: true,
        get: function () {
            return _array.push;
        }
    });
    Object.defineProperty(exports, 'reverse', {
        enumerable: true,
        get: function () {
            return _array.reverse;
        }
    });
    Object.keys(_list).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _list[key];
            }
        });
    });
    Object.keys(_string).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _string[key];
            }
        });
    });
});