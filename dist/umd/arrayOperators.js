(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry);
        global.arrayOperators = mod.exports;
    }
})(this, function (exports, _curry) {
    /**
     * Created by elyde on 12/29/2016.
     */
    /**
     * Created by elyde on 12/10/2016.
     * Set functions for arrects.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.complement = exports.difference = exports.intersect = exports.union = exports.flattenMulti = exports.flatten = undefined;

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var concat = (0, _curry.pureCurry2)(function (arr0) {
        for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            arrays[_key - 1] = arguments[_key];
        }

        return arr0.concat.apply(arr0, arrays);
    }),
        filter = (0, _curry.pureCurry2)(function (fn, arr) {
        return arr.filter(fn);
    }),
        reduce = (0, _curry.pureCurry2)(function (fn, agg, arr) {
        return arr.reduce(fn, agg);
    }),
        sortAscByLength = function sortAscByLength(arr1, arr2) {
        return [arr1, arr2].sort(function (a, b) {
            var aLen = a.length,
                bLen = b.length;
            if (aLen > bLen) {
                return -1;
            } else if (bLen > aLen) {
                return 1;
            }
            return 0;
        });
    };

    var flatten = exports.flatten = function flatten(arr) {
        return arr.reduce(function (agg, elm) {
            if (Array.isArray(elm)) {
                return concat(agg, flatten(elm));
            }
            agg.push(elm);
            return agg;
        }, []);
    },
        flattenMulti = exports.flattenMulti = (0, _curry.pureCurry2)(function (arr0) {
        for (var _len2 = arguments.length, arrays = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            arrays[_key2 - 1] = arguments[_key2];
        }

        return reduce(function (agg, arr) {
            return concat(agg, flatten(arr));
        }, flatten(arr0), arrays);
    }),
        union = exports.union = (0, _curry.pureCurry2)(function (arr1, arr2) {
        var whereNotInArray1 = function whereNotInArray1(elm) {
            return arr1.indexOf(elm) === -1;
        };
        return concat(arr1, filter(whereNotInArray1, arr2));
    }),
        intersect = exports.intersect = (0, _curry.pureCurry2)(function (arr1, arr2) {
        return arr2.length === 0 ? [] : filter(function (elm) {
            return arr2.indexOf(elm) > -1;
        }, arr1);
    }),
        difference = exports.difference = (0, _curry.pureCurry2)(function (array1, array2) {
        // augment this with max length and min length ordering on op
        var _sortAscByLength = sortAscByLength(array1, array2),
            _sortAscByLength2 = _slicedToArray(_sortAscByLength, 2),
            arr1 = _sortAscByLength2[0],
            arr2 = _sortAscByLength2[1];

        if (arr2.length === 0) {
            return arr1.slice();
        }
        return reduce(function (agg, elm) {
            if (arr2.indexOf(elm) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    }),
        complement = exports.complement = (0, _curry.pureCurry2)(function (arr0) {
        for (var _len3 = arguments.length, arrays = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            arrays[_key3 - 1] = arguments[_key3];
        }

        return reduce(function (agg, arr) {
            return concat(agg, difference(arr, arr0));
        }, [], arrays);
    });

    exports.default = {
        complement: complement,
        difference: difference,
        intersect: intersect,
        union: union,
        flatten: flatten,
        flattenMulti: flattenMulti
    };
});