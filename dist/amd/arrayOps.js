define(['exports', './curry', './functionOps', './is'], function (exports, _curry, _functionOps, _is) {
    /**
     * Array operators module.
     * @module arrayOperators
     * @type {{complement: Function, difference: Function, intersect: Function, union: Function, flatten: Function, flattenMulti: Function, filter: Function, map: Function, reduce: Function, reduceRight: Function, head: Function, tail: Function, init: Function, last: Function, reverse: Function}}
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.complement = exports.difference = exports.intersect = exports.union = exports.unzipN = exports.unzip = exports.zipN = exports.zip = exports.flattenMulti = exports.flatten = exports.reduceRight = exports.reduce = exports.filter = exports.map = exports.reverse = exports.trimLengths = exports.orderedLengths = exports.lengths = exports.breakOnList = exports.span = exports.dropWhile = exports.takeWhile = exports.rangeOnIterable = exports.splitAt = exports.splitArrayAt = exports.splitStrAt = exports.drop = exports.take = exports.last = exports.init = exports.tail = exports.head = exports.sortDescByLength = exports.sortAsc = exports.sortDesc = exports.getSortByOrder = exports.onlyOneOrNegOne = exports.concat = exports.join = exports.not = exports.DESC = exports.ASC = undefined;

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

    function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                arr2[i] = arr[i];
            }

            return arr2;
        } else {
            return Array.from(arr);
        }
    }

    /**
     * @returns {Function}
     */
    function defineReverse() {
        return Array.prototype.reverse ? function (x) {
            return x.reverse();
        } : function (functor) {
            return functor.reduceRight(function (agg, item) {
                agg.push(item);
                return agg;
            }, []);
        };
    }

    var ASC = exports.ASC = 1,
        DESC = exports.DESC = -1,
        not = exports.not = (0, _curry.curry2)(function (p, elm) {
        return !p(elm);
    }),


    /**
     * Functional version of `Array.prototype.join`.
     * @function module:arrayOperators.join
     * @param separator {String|RegExp}
     * @param arr {Array}
     * @returns {String}
     */
    join = exports.join = (0, _curry.curry2)(function (separator, arr) {
        return arr ? arr.join(separator) : '';
    }),


    /**
     * Functional concat (requires 2 or more values to run).
     * @curried Sets minimum arity to 2
     * @param arr0 {Array}
     * @param ...arrays {Array}
     * @type {Function}
     */
    concat = exports.concat = (0, _curry.curry2)(function (arr0) {
        for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            arrays[_key - 1] = arguments[_key];
        }

        return arr0.concat.apply(arr0, arrays);
    }),
        onlyOneOrNegOne = exports.onlyOneOrNegOne = function onlyOneOrNegOne(x) {
        return x === 1 || x === -1 ? x : 1;
    },
        getSortByOrder = exports.getSortByOrder = (0, _curry.curry2)(function (multiplier) {
        var valueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (v) {
            return v;
        };

        var x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = 1 * x,
            ifLessThan = -1 * x;
        return function () {
            for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                values[_key2] = arguments[_key2];
            }

            return values.sort(function (a1, b1) {
                var a = valueFn(a1),
                    b = valueFn(b1);
                if (a > b) {
                    return ifGreaterThan;
                } else if (b > a) {
                    return ifLessThan;
                }
                return 0;
            });
        };
    }),
        sortDesc = exports.sortDesc = getSortByOrder(DESC),
        sortAsc = exports.sortAsc = getSortByOrder(ASC),
        sortDescByLength = exports.sortDescByLength = getSortByOrder(DESC, function (x) {
        return x.length;
    }),


    /**
     * Returns head of array (first item of array).
     * @function module:arrayOperators.head
     * @param functor {Array}
     * @returns {*} - First item from array
     */
    head = exports.head = function head(functor) {
        return functor[0];
    },


    /**
     * Returns tail part of array (everything after the first item as new array).
     * @function module:arrayOperators.tail
     * @param functor {Array}
     * @returns {Array}
     */
    tail = exports.tail = function tail(functor) {
        return functor.slice(1);
    },


    /**
     * Returns everything except last item of array as new array.
     * @function module:arrayOperators.init
     * @param functor {Array}
     * @returns {Array}
     */
    init = exports.init = function init(functor) {
        return functor.slice(0, functor.length - 1);
    },


    /**
     * Returns last item of array.
     * @function module:arrayOperators.last
     * @param functor {Array}
     * @returns {*}
     */
    last = exports.last = function last(functor) {
        return functor[functor.length - 1];
    },
        take = exports.take = (0, _curry.curry2)(function (limit, array) {
        return array.slice(0, limit - 1);
    }),
        drop = exports.drop = (0, _curry.curry2)(function (count, array) {
        return array.slice(count, array.length - 1);
    }),
        splitStrAt = exports.splitStrAt = (0, _curry.curry2)(function (ind, str) {
        return [str.substring(0, ind), str.substring(ind, str.length)];
    }),
        splitArrayAt = exports.splitArrayAt = (0, _curry.curry2)(function (ind, arr) {
        return [arr.slice(0, ind), arr.slice(ind, arr.length)];
    }),
        splitAt = exports.splitAt = (0, _curry.curry2)(function (ind, x) {
        return (0, _is.isString)(x) ? splitStrAt(ind, x) : splitArrayAt(ind, x);
    }),
        rangeOnIterable = exports.rangeOnIterable = (0, _curry.curry2)(function (predicate, arr) {
        var ind = 0;
        while (predicate(arr[ind]) && ind < arr.length) {
            ind += 1;
        }return ind;
    }),
        takeWhile = exports.takeWhile = (0, _curry.curry2)(function (predicate, arr) {
        return arr.slice(0, rangeOnIterable(predicate, arr));
    }),
        dropWhile = exports.dropWhile = (0, _curry.curry2)(function (predicate, arr) {
        return arr.slice(rangeOnIterable(predicate, arr), arr.length - 1);
    }),
        span = exports.span = (0, _curry.curry2)(function (predicate, arr) {
        return [takeWhile(predicate, arr), dropWhile(predicate, arr)];
    }),
        breakOnList = exports.breakOnList = (0, _curry.curry2)(function (predicate, arr) {
        return [takeWhile(not(predicate), arr), dropWhile(not(predicate), arr)];
    }),


    /**
     * Returns the lengths of all the items in an array.
     * @param arrs {...Array}
     * @type {Function}
     */
    lengths = exports.lengths = _curry.curry2.apply(undefined, _toConsumableArray(function (arrs) {
        return arrs.length ? arrs.map(function (arr) {
            return arr.length;
        }) : [];
    })),


    /**
     * Returns an ordered array (ascending or descending) with the lengths of all items passed in.
     * @param orderDir {Number} - 1 or -1 for ascending or descending.
     * @param arrs {...Array}
     * @returns {Array} - Array of lengths;
     */
    orderedLengths = exports.orderedLengths = (0, _curry.curry2)(function (orderDir) {
        for (var _len3 = arguments.length, arrs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            arrs[_key3 - 1] = arguments[_key3];
        }

        return length(arrs) ? (orderDir ? sortAsc : sortDesc)(lengths(arrs)) : [];
    }),
        trimLengths = exports.trimLengths = function trimLengths() {
        for (var _len4 = arguments.length, arrays = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            arrays[_key4] = arguments[_key4];
        }

        var smallLen = orderedLengths(ASC, arrays)[0];
        return arrays.map(function (arr) {
            return arr.length > smallLen ? arr.slice(0, smallLen) : arr.slice(0);
        });
    },


    /**
     * Reverses an array (shimmed if not exists).
     * @function module:arrayOperators.reverse
     * @return {Array}
     */
    reverse = exports.reverse = defineReverse(),


    /**
     * Maps a function to functor (array etc.).
     * @function module:arrayOperators.map
     * @param fn {Function}
     * @param functor {Array|{map: {Function}}}
     * @returns {Array|{map: {Function}}}
     */
    map = exports.map = (0, _curry.curry2)(function (fn, functor) {
        return functor.map(fn);
    }),


    /**
     * Filters a functor (array etc.) with passed in function.
     * @function module:arrayOperators.filter
     * @param fn {Function}
     * @param functor {Array|{filter: {Function}}}
     * @returns {Array|{filter: {Function}}}
     */
    filter = exports.filter = (0, _curry.curry2)(function (fn, arr) {
        return arr.filter(fn);
    }),


    /**
     * Reduces a foldable (array etc.) with passed in function.
     * @function module:arrayOperators.reduce
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {Array|{reduce: {Function}}}
     */
    reduce = exports.reduce = (0, _curry.curry2)(function (fn, agg, arr) {
        return arr.reduce(fn, agg);
    }),


    /**
     * Reduces a foldable (array etc.) from the right with passed in function.
     * @function module:arrayOperators.reduceRight
     * @param fn {Function}
     * @param functor {Array|{reduceRight: {Function}}}
     * @returns {Array|{reduceRight: {Function}}}
     */
    reduceRight = exports.reduceRight = (0, _curry.curry3)(function (fn, agg, functor) {
        return functor.reduceRight(fn, agg);
    }),


    /**
     * Flattens an array.
     * @function module:arrayOperators.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = exports.flatten = function flatten(arr) {
        return arr.reduce(function (agg, elm) {
            if (Array.isArray(elm)) {
                return concat(agg, flatten(elm));
            }
            agg.push(elm);
            return agg;
        }, []);
    },


    /**
     * Flattens all arrays passed in into one array.
     * @function module:arrayOperators.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new array.
     * @returns {Array}
     */
    flattenMulti = exports.flattenMulti = (0, _curry.curry2)(function (arr0) {
        for (var _len5 = arguments.length, arrays = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            arrays[_key5 - 1] = arguments[_key5];
        }

        return reduce(function (agg, arr) {
            return concat(agg, flatten(arr));
        }, flatten(arr0), arrays);
    }),


    /**
     * @function module:arrayOperators.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = exports.zip = (0, _curry.curry2)(function (arr1, arr2) {
        var _trimLengths = trimLengths(arr1, arr2),
            a1 = _trimLengths[0],
            a2 = _trimLengths[1];

        return a1.reduce(function (agg, item, ind) {
            agg.push([item, a2[ind]]);
            return agg;
        }, []);
    }),
        zipN = exports.zipN = (0, _curry.curry2)(function () {
        for (var _len6 = arguments.length, arrs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            arrs[_key6] = arguments[_key6];
        }

        var lists = (0, _functionOps.apply)(trimLengths, arrs);
        return lists.reduce(function (agg, arr, ind) {
            if (!ind) {
                return zip(agg, arr);
            }
            return agg.map(function (arr2) {
                arr.forEach(function (elm) {
                    arr2.push(elm);
                });
                return arr2;
            });
        }, lists.shift());
    }),
        unzip = exports.unzip = function unzip(arr) {
        return reduce(function (agg, item) {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
    },
        unzipN = exports.unzipN = function unzipN() {
        for (var _len7 = arguments.length, arrs = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            arrs[_key7] = arguments[_key7];
        }

        return reduce(function (agg, item) {
            agg.push(unzip(item));
            return agg;
        }, [], arrs);
    },


    /**
     * Creates a union on matching elements from array1.
     * @function module:arrayOperators.union
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    union = exports.union = (0, _curry.curry2)(function (arr1, arr2) {
        return concat(arr1, filter(function (elm) {
            return arr1.indexOf(elm) === -1;
        }, arr2));
    }),


    /**
     * Performs an intersection on array 1 with  elements from array 2.
     * @function module:arrayOperators.intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    intersect = exports.intersect = (0, _curry.curry2)(function (arr1, arr2) {
        return arr2.length === 0 ? [] : filter(function (elm) {
            return arr2.indexOf(elm) > -1;
        }, arr1);
    }),


    /**
     * Returns the difference of array 1 from array 2.
     * @function module:arrayOperators.difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    difference = exports.difference = (0, _curry.curry2)(function (array1, array2) {
        // augment this with max length and min length ordering on op
        var _sortDescByLength = sortDescByLength(array1, array2),
            _sortDescByLength2 = _slicedToArray(_sortDescByLength, 2),
            arr1 = _sortDescByLength2[0],
            arr2 = _sortDescByLength2[1];

        if (!arr2 || arr2.length === 0) {
            return arr1.slice();
        }
        return reduce(function (agg, elm) {
            if (arr2.indexOf(elm) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    }),


    /**
     * Returns the complement of array 0 and the reset of the passed in arrays.
     * @function module:arrayOperators.complement
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    complement = exports.complement = (0, _curry.curry2)(function (arr0) {
        for (var _len8 = arguments.length, arrays = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
            arrays[_key8 - 1] = arguments[_key8];
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
        flattenMulti: flattenMulti,
        filter: filter,
        map: map,
        reduce: reduce,
        reduceRight: reduceRight,
        head: head,
        tail: tail,
        init: init,
        last: last,
        zip: zip,
        zipN: zipN,
        unzip: unzip,
        unzipN: unzipN,
        reverse: reverse,
        lengths: lengths,
        orderedLengths: orderedLengths,
        getSortByOrder: getSortByOrder,
        sortAsc: sortAsc,
        sortDesc: sortDesc,
        sortDescByLength: sortDescByLength,
        breakOnList: breakOnList,
        splitAt: splitAt,
        concat: concat,
        take: take,
        drop: drop,
        join: join,
        ASC: ASC,
        DESC: DESC
    };
});