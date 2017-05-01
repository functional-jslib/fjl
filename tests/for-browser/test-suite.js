define('test-suite', ['exports'], function (exports) { 'use strict';

/**
 * Created by elyde on 12/10/2016.
 */
Object.defineProperty(exports, "__esModule", {
    value: true
});
var expectInstanceOf = exports.expectInstanceOf = curry2(function (value, instance) {
    return expect(value).to.be.instanceOf(instance);
});
var expectFunction = exports.expectFunction = function expectFunction(value) {
    return expectInstanceOf(value, Function);
};
var expectEqual = exports.expectEqual = curry2(function (value, value2) {
    return expect(value).to.be.equal(value2);
});
var expectFalse = exports.expectFalse = function expectFalse(value) {
    return expectEqual(value, false);
};
var expectTrue = exports.expectTrue = function expectTrue(value) {
    return expectEqual(value, true);
};
var hasOwnProperty = exports.hasOwnProperty = function hasOwnProperty(instance, key) {
    return Object.prototype.hasOwnProperty.call(instance, key);
};
var length = exports.length = function length(something) {
    return something.length;
};
var add = exports.add = curry2(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.reduce(function (agg, num) {
        return num + agg;
    }, 0);
});
var multiply = exports.multiply = curry2(function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return args.reduce(function (agg, num) {
        return num * agg;
    }, 1);
});
var divide = exports.divide = curry2(function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return args.reduce(function (agg, num) {
        return agg / num;
    }, args.shift());
});

exports.default = {
    expectFunction: expectFunction,
    expectInstanceOf: expectInstanceOf,
    expectEqual: expectEqual,
    expectFalse: expectFalse,
    expectTrue: expectTrue,
    hasOwnProperty: hasOwnProperty,
    length: length,
    add: add,
    multiply: multiply,
    divide: divide
};
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Created by elyde on 12/29/2016.
 */

describe('Array Combinators', function () {

    describe('#complement', function () {
        it('should return an empty array when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, complement)();
        });
        it('should return an empty array if only one array is passed in', function () {
            compose(expectEqual(__, 0), length, complement)([1, 2, 3]);
        });
        it('should return elements not in first array passed to it', function () {
            var testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[[1, 2, 3], [1, 2, 3, 4, 5]], 2, [4, 5]], [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7, 8]], 7, [4, 5, 4, 5, 6, 7, 8]], [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 1, 2, 3]], 4, [4, 5, 4, 5]]];
            testCases.forEach(function (testCase) {
                var _testCase = _slicedToArray(testCase, 3),
                    subjects = _testCase[0],
                    expectedLen = _testCase[1],
                    expectedElms = _testCase[2],
                    result = complement.apply(null, subjects);

                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#difference', function () {
        it('should return an empty array when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, difference)();
        });
        it('should return a clone of the passed in array if it is only the first array that is passed in', function () {
            compose(expectEqual(__, 3), length, difference([]))([1, 2, 3]);
        });
        it('should return an empty array when there are no differences between the two arrays passed in', function () {
            compose(expectEqual(__, 0), length, difference([1, 2, 3]))([1, 2, 3]);
        });
        it('should return a clone of the passed in array if it is only the first array that is passed in', function () {
            compose(expectEqual(__, 3), length, difference([]))([1, 2, 3]);
        });
        it('should return the difference between two arrays passed in', function () {
            var testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 2, [4, 5]], [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 5, [4, 5, 6, 7, 8]], [[1, 2, 3, 4, 5], [1, 2, 3], 2, [4, 5]]];
            testCases.forEach(function (testCase) {
                var _testCase2 = _slicedToArray(testCase, 4),
                    subj1 = _testCase2[0],
                    subj2 = _testCase2[1],
                    expectedLen = _testCase2[2],
                    expectedElms = _testCase2[3],
                    result = difference(subj1, subj2);

                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#intersect', function () {
        it('should return an empty array when receiving an empty array as parameter 1', function () {
            compose(expectEqual(__, 0), length, intersect)([]);
            compose(expectEqual(__, 0), length, intersect([]))([1, 2, 3]);
        });
        it('should return an empty array when receiving an empty array as parameter 2', function () {
            compose(expectEqual(__, 0), length, intersect([1, 2, 3]))([]);
        });
        it('should return an empty array when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, intersect([]))([]);
        });
        it('should return an empty array when no arrays are passed in', function () {
            compose(expectEqual(__, 0), length, intersect)();
        });
        it('should return an intersection of the two arrays passed in', function () {
            var testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 3, [1, 2, 3]], [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 3, [1, 2, 3]], [[1, 2, 3, 4, 5], [1, 2, 3], 3, [1, 2, 3]]];
            testCases.forEach(function (testCase) {
                var _testCase3 = _slicedToArray(testCase, 4),
                    subj1 = _testCase3[0],
                    subj2 = _testCase3[1],
                    expectedLen = _testCase3[2],
                    expectedElms = _testCase3[3],
                    result = intersect(subj1, subj2);

                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#union', function () {
        it('should return an union of the two arrays', function () {
            var testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]], [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4, 5]]];
            testCases.forEach(function (testCase) {
                var _testCase4 = _slicedToArray(testCase, 4),
                    subj1 = _testCase4[0],
                    subj2 = _testCase4[1],
                    expectedLen = _testCase4[2],
                    expectedElms = _testCase4[3],
                    result = union(subj1, subj2);

                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });
});
/**
 * Created by elyde on 11/13/2016.
 */
describe('compose', function () {

    it('should be of type function.', function () {
        expect(compose).to.be.instanceOf(Function);
    });

    it('should return a function whether or not any parameters were passed in to it.', function () {
        expect(compose()).to.be.instanceOf(Function);
        expect(compose(console.log)).to.be.instanceOf(Function);
    });

    it('should return a function that when used returns the passed in value if `compose` ' + 'itself didn\'t receive any parameters.', function () {
        var result = compose();
        expect(result(99)).to.equal(99);
    });

    it('should be able to compose an arbitrary number of functions and execute them as expected ' + 'from generated function.', function () {
        var min = curry2(Math.min),
            max = curry2(Math.max),
            pow = curry2(Math.pow),
            composed = compose(min(8), max(5), pow(2)),
            randomNum = curry2(function (start, end) {
            return Math.round(Math.random() * end + start);
        }),
            random = randomNum(0),
            expectedFor = function expectedFor(num) {
            return min(8, max(5, pow(num, 2)));
        };
        [8, 5, 3, 2, 1, 0, random(89), random(55), random(34)].forEach(function (num) {
            expect(composed(num)).to.equal(expectedFor(num));
        });
    });
});
/**
 * Created by elyde on 11/13/2016.
 */

describe('curry', function () {

    // Set curry here to use below
    var multiplyRecursive = function multiplyRecursive() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return args.reduce(function (agg, num) {
            return num * agg;
        }, 1);
    },
        addRecursive = function addRecursive() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return args.reduce(function (agg, num) {
            return num + agg;
        }, 0);
    },
        divideR = function divideR() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return args.reduce(function (agg, num) {
            return agg / num;
        }, args.shift());
    };

    it('should be of type function.', function () {
        expect(curry).to.be.instanceOf(Function);
    });

    it('should return a function when called with or without args.', function () {
        expect(curry()).to.be.instanceOf(Function);
        expect(curry(99)).to.be.instanceOf(Function);
        expect(curry(function () {})).to.be.instanceOf(Function);
        expect(curry(console.log)).to.be.instanceOf(Function);
    });

    it('should return a function that fails when no function is passed (as it\'s first param).', function () {
        assert.throws(curry(), Error);
        assert.throws(curry(99), Error);
    });

    it('should return a properly curried function when correct arity for said function is met.', function () {
        var min8 = curry(Math.min, 8),
            max5 = curry(Math.max, 5),
            pow2 = curry(Math.pow, 2);

        // Expect functions
        [min8, max5, pow2].forEach(function (func) {
            expect(func).to.be.instanceOf(Function);
        });

        // Expect functions work correctly
        expect(min8(9)).to.equal(8);
        expect(min8(8)).to.equal(8);
        expect(min8(7)).to.equal(7);
        expect(max5(6)).to.equal(6);
        expect(max5(5)).to.equal(5);
        expect(max5(4)).to.equal(5);
        expect(pow2(2)).to.equal(4);
        expect(pow2(3)).to.equal(8);
        expect(pow2(4)).to.equal(16);
    });

    it('should be able to correctly curry functions of different arity as long as their arity is met.', function () {
        var min = curry2(Math.min),
            max = curry2(Math.max),
            pow = curry2(Math.pow),
            min8 = curry(Math.min, 8),
            max5 = curry(Math.max, 5),
            pow2 = curry(Math.pow, 2),
            isValidTangentLen = curry(function (a, b, cSqrd) {
            return pow(a, 2) + pow(b, 2) === cSqrd;
        }, 2, 2),
            random = curry(function (start, end) {
            return Math.round(Math.random() * end + start);
        }, 0),
            expectedFor = function expectedFor(num) {
            return min(8, max(5, pow(2, num)));
        };

        // Expect functions returned for `curry` calls
        expect(isValidTangentLen).to.be.instanceOf(Function);

        // Expect functions returned for `curry` calls
        [min8, max5, pow2].forEach(function (func) {
            expect(func).to.be.instanceOf(Function);
        });

        // Expect `curry`ed functions to work as expected
        expect(isValidTangentLen(8)).to.equal(true);
        expect(isValidTangentLen(21)).to.equal(false);

        // Expect `curry`ed functions to work as expected
        [8, 5, 3, 2, 1, 0, random(89), random(55), random(34)].forEach(function (num) {
            var composed = compose(min8, max5, pow2);
            expect(composed(num)).to.equal(expectedFor(num));
        });
    });

    it('should enforce `Placeholder` values when currying', function () {
        var add = curry(addRecursive),
            multiply = curry(multiplyRecursive),
            multiplyExpectedResult = Math.pow(5, 5);

        // Curry add to add 3 numbers
        expect(add(__, __, __)(1, 2, 3)).to.equal(6);
        expect(add(1, __, __)(2, 3)).to.equal(6);
        expect(add(1, 2, __)(3)).to.equal(6);
        expect(add(1, 2, 3)).to.equal(6);

        // Curry multiply and pass args in non-linear order
        expect(multiply(__, __, __, __, __)(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply(__, __, 5, __, __)(5, 5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply(5, __, 5, __, __)(5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply(5, __, 5, __, 5)(5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply(5, __, 5, 5, 5)(5)).to.equal(multiplyExpectedResult);
        expect(multiply(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);

        expect(add(__, __, __)(1, 2, 3, 5, 6)).to.equal(17);
        expect(add(__, 1, __)(2, 3, 5, 6)).to.equal(17);
        expect(add(__, 1, 2)(3, 5, 6)).to.equal(17);
        expect(add(1, 2, 3, 5, 6)).to.equal(17);
    });

    it('should respect argument order and placeholder order.', function () {
        // Curry divideR to divde 3 or more numbers
        expect(curry(divideR, 25, 5)).to.be.instanceOf(Function);
        expect(curry(divideR, __, 625, __)(3125, 5)).to.equal(1);
        expect(curry(divideR, Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
    });
});
/**
 * Created by elyde on 11/25/2016.
 */

describe('curryN', function () {

    // Set curry here to use below
    var multiplyRecursive = function multiplyRecursive() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return args.reduce(function (agg, num) {
            return num * agg;
        }, 1);
    },
        addRecursive = function addRecursive() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return args.reduce(function (agg, num) {
            return num + agg;
        }, 0);
    },
        divideR = function divideR() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return args.reduce(function (agg, num) {
            return agg / num;
        }, args.shift());
    };

    it('should be of type function.', function () {
        expect(curryN).to.be.instanceOf(Function);
    });

    it('should return a function that throws an error when no arguments are passed.', function () {
        var result = curryN();
        expect(result).to.be.instanceOf(Function);
        assert.throws(result, Error);
    });

    it('should enforce `Placeholder` values when currying', function () {
        var add3Nums = curryN(addRecursive, 3),
            multiply5Nums = curryN(multiplyRecursive, 5),
            multiplyExpectedResult = Math.pow(5, 5);

        // Curry add to add 3 numbers
        expect(add3Nums(__, __, __)(1, 2, 3)).to.equal(6);
        expect(add3Nums(1, __, __)(2, 3)).to.equal(6);
        expect(add3Nums(1, 2, __)(3)).to.equal(6);
        expect(add3Nums(1, 2, 3)).to.equal(6);

        // Curry multiply and pass args in non-linear order
        expect(multiply5Nums(__, __, __, __, __)(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(__, __, 5, __, __)(5, 5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(5, __, 5, __, __)(5, 5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(5, __, 5, __, 5)(5, 5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(5, __, 5, 5, 5)(5)).to.equal(multiplyExpectedResult);
        expect(multiply5Nums(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);
    });

    it('should pass in any values passed the arity when executing the curried function', function () {
        var add3Nums = curryN(addRecursive, 3);

        // Curry add to add 3 numbers
        expect(add3Nums(__, __, __)(1, 2, 3)).to.equal(6);
        expect(add3Nums(1, __, __)(2, 3)).to.equal(6);
        expect(add3Nums(1, 2, __)(3)).to.equal(6);
        expect(add3Nums(1, 2, 3)).to.equal(6);

        // Curry `add` to add any numbers passed required arity
        expect(add3Nums(__, __, __)(1, 2, 3, 5, 6)).to.equal(17);
        expect(add3Nums(__, 1, __)(2, 3, 5, 6)).to.equal(17);
        expect(add3Nums(__, 1, 2)(3, 5, 6)).to.equal(17);
        expect(add3Nums(1, 2, 3, 5, 6)).to.equal(17);
    });

    it('should respect the passed in "executeArity" (shouldn\'t be called to passed in arity length is reached', function () {
        var multiply5Nums = curryN(multiplyRecursive, 5),
            multiplyExpectedResult = Math.pow(5, 5),
            argsToTest = [[5, 5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5], [5, 5], [5]],
            partiallyAppliedResults = [multiply5Nums(__, __, __, __, __), multiply5Nums(__, __, 5, __, __), multiply5Nums(5, __, 5, __, __), multiply5Nums(5, __, 5, __, 5), multiply5Nums(5, __, 5, 5, 5)];

        // Curry multiply and pass args in non-linear order
        argsToTest.forEach(function (args, index) {
            expect(partiallyAppliedResults[index]).to.be.instanceOf(Function);
            expect(partiallyAppliedResults[index].apply(null, args)).to.equal(multiplyExpectedResult);
        });
    });

    it('should respect argument order and placeholder order.', function () {
        var divideC = curryN(divideR, 3);

        // Curry divideR to divde 3 or more numbers
        expect(divideC(25, 5)).to.be.instanceOf(Function);
        expect(divideC(__, 625, __)(3125, 5)).to.equal(1);
        expect(divideC(Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
    });
});
/**
 * Created by elyde on 1/21/2017.
 */
describe('errorIfNotTypeFactory', function () {

    it('should be of type function.', function () {
        expectFunction(errorIfNotTypeFactory);
    });

    it('should return a function whether or not any parameters were passed in to it.', function () {
        expectFunction(errorIfNotTypeFactory());
        expectFunction(errorIfNotTypeFactory('someContextNameHere'));
    });

    it('should return a function that when fired with error condition should include the shared contextName.', function () {
        var fn1 = errorIfNotTypeFactory(),
            fn2 = errorIfNotTypeFactory('someContextNameHere');
        expectFunction(fn1);
        expectFunction(fn2);
        assert.throws(curry(fn1, 'someValueName', 99, Array), '.someValueName is required to be of one of ' + 'the types : ["Array"].  Type received: Number');
        assert.throws(curry(fn2, 'someValueName', 99, Array), 'someContextNameHere.someValueName is required to be of one of ' + 'the types : ["Array"].  Type received: Number');
        assert.throws(curry(fn2, 'someValueName', 99, Array, String, Function), 'someContextNameHere.someValueName is required to be of one of ' + 'the types : ["Array", "String", "Function"].  Type received: Number');
    });

    it('should return a function that throws an error when the passed in value doesn\'t match one of ' + 'the "one-or-more" passed in types.', function () {
        var errorIfNotType = errorIfNotTypeFactory('someContextName');
        assert.throws(curry(errorIfNotType, 'someValueName', 99, Array), Error);
        assert.throws(curry(errorIfNotType, 'someValueName', 99, String, Array), Error);
        assert.throws(curry(errorIfNotType, 'someValueName', 99, String, Function, Array), Error);
    });

    it('should return a function that does not throw an error when the passed in value matches one of ' + 'the "one-or-more" passed in types.', function () {
        var errorIfNotType = errorIfNotTypeFactory('someContextName');
        assert.doesNotThrow(curry(errorIfNotType, 'someValueName', 99, Array, Number, String), Error);
        assert.doesNotThrow(curry(errorIfNotType, 'someValueName', 99, Number, Array), Error);
        assert.doesNotThrow(curry(errorIfNotType, 'someValueName', 99, String, Function, Number), Error);
    });
});
/**
 * Created by u067265 on 5/1/17.
 */

describe('Function Operators', function () {

    // @todo implement more extensive tests later
    describe('#call', function () {
        it('should be a function', function () {
            expectFunction(call);
        });
        it('should call a function passed into it', function () {
            expectEqual(call(add, null, 1, 2, 3, 4, 5), 15);
        });
        it('should take context into account', function () {
            var _this = this;

            var sideEffectsOp = function sideEffectsOp() {
                _this.hello = 'ola';
                return _this;
            };
            expectEqual(call(sideEffectsOp, {}).hello, 'ola');
        });
    });

    // @todo implement more extensive tests later
    describe('#apply', function () {
        it('should be a function', function () {
            expectFunction(apply);
        });
        it('should call a function passed into it with args array passed in as third parameter', function () {
            expectEqual(apply(add, null, [1, 2, 3, 4, 5]), 15);
        });
        it('should take context into account', function () {
            var _this2 = this;

            var sideEffectsOp = function sideEffectsOp() {
                _this2.hello = 'ola';
                return _this2;
            };
            expectEqual(apply(sideEffectsOp, {}).hello, 'ola');
        });
    });
});
/**
 * Created by elyde on 1/30/2017.
 */

describe('is#isFunction', function () {
    it('should return true if value is a function', function () {
        [function () {}, Math.pow, console.log, function () {}].forEach(function (value) {
            return expectTrue(isFunction(value));
        });
    });
    it('should return `false` when value is not a function', function () {
        [-1, 0, 1, [], {}, 'abc'].forEach(function (value) {
            return expectFalse(isFunction(value));
        });
    });
});

describe('is#isset', function () {
    it('should return true for any value that is not `null` or `undefined`', function () {
        [-1, 0, 1, 'a', true, false, function () {}, [], {}, Symbol('hotdog')].forEach(function (value) {
            return expectTrue(isset(value));
        });
    });
    it('should return `false` for any value that is `null` or `undefined`', function () {
        [null, undefined].forEach(function (value) {
            return expectFalse(isset(value));
        });
    });
});

describe('is#issetAndOfType', function () {
    it('should return true for any value that is "set" and is of given "Type"', function () {
        [[-1, Number], [0, 'Number'], [1, Number], ['a', String], [true, Boolean], [false, Boolean.name], [function () {}, Function], [[], Array.name], [{}, Object.name], [Symbol('hotdog'), Symbol]].forEach(function (tuple) {
            return expectTrue(issetAndOfType.apply(null, tuple));
        });
    });
    it('should return `false` for any value that is not "set" or is not of given "Type"', function () {
        [[-1, Array], [0, 'Function'], [1, Function], ['a', Boolean], [true, Object], [false, String], [function () {}, String.name], [[], 'String'], [{}, 'HotDog'], [Symbol('hotdog'), 'SomeConstructName']].forEach(function (tuple) {
            return expectFalse(issetAndOfType.apply(null, tuple));
        });
    });
});

describe('is#isArray', function () {
    it('should return `true` when given value is an array', function () {
        expectTrue(isArray([]));
    });
    it('should return `false` when given value is not an array', function () {
        expectFalse(isArray(function () {}));
    });
});

describe('is#isObject', function () {
    it('should return `true` when given value is a direct instance of `Object`', function () {
        expectTrue(isObject({}));
    });
    it('should return `false` when given value is not a direct instance of `Object`', function () {
        expectFalse(isObject(function () {}));
    });
});

describe('is#isBoolean', function () {
    it('should return `true` when given value is a boolean', function () {
        expectTrue(isBoolean(true));
        expectTrue(isBoolean(false));
    });
    it('should return `false` when given value is not a boolean', function () {
        expectFalse(isBoolean(function () {}));
    });
});

describe('is#isNumber', function () {
    it('should return `true` when given value is a number', function () {
        expectTrue(isNumber(99));
        expectTrue(isNumber(-1.0));
        expectTrue(isNumber(Number('1e-3')));
    });
    it('should return `false` when given value is not a number', function () {
        expectFalse(isNumber(function () {}));
        expectFalse(isNumber(NaN));
    });
});

describe('is#isString', function () {
    it('should return `true` when given value is a string', function () {
        expectTrue(isString('hello'));
        expectTrue(isString(String('hello')));
    });
    it('should return `false` when given value is not a string', function () {
        expectFalse(isString(function () {}));
        expectFalse(isString(NaN));
    });
});

if (typeof Map !== 'undefined') {
    describe('is#isMap', function () {
        it('should return `true` when given value is a map', function () {
            expectTrue(isMap(new Map()));
        });
        it('should return `false` when given value is not a map', function () {
            expectFalse(isMap(function () {}));
            expectFalse(isMap(NaN));
        });
    });
}

if (typeof Set !== 'undefined') {
    describe('is#isSet', function () {
        it('should return `true` when given value is a set', function () {
            expectTrue(isSet(new Set()));
        });
        it('should return `false` when given value is not a set', function () {
            expectFalse(isSet(function () {}));
            expectFalse(isSet(NaN));
        });
    });
}

if (typeof WeakMap !== 'undefined') {
    describe('is#isWeakMap', function () {
        it('should return `true` when given value is a weak map', function () {
            expectTrue(isWeakMap(new WeakMap()));
        });
        it('should return `false` when given value is not a weak map', function () {
            expectFalse(isWeakMap(function () {}));
            expectFalse(isWeakMap(NaN));
        });
    });
}

if (typeof WeakSet !== 'undefined') {
    describe('is#isWeakSet', function () {
        it('should return `true` when given value is a weak set', function () {
            expectTrue(isWeakSet(new WeakSet()));
        });
        it('should return `false` when given value is not a weak set', function () {
            expectFalse(isWeakSet(function () {}));
            expectFalse(isWeakSet(NaN));
        });
    });
}

describe('is#isUndefined', function () {
    it('should return `true` when given value is a undefined', function () {
        expectTrue(isUndefined(undefined));
    });
    it('should return `false` when given value is not a undefined', function () {
        expectFalse(isUndefined(function () {}));
        expectFalse(isUndefined(NaN));
    });
});

describe('is#isNull', function () {
    it('should return `true` when given value is a null', function () {
        expectTrue(isNull(null));
    });
    it('should return `false` when given value is not a null', function () {
        expectFalse(isNull(function () {}));
        expectFalse(isNull(NaN));
    });
});

describe('is#isSymbol', function () {
    it('should return `true` when given value is a symbol', function () {
        expectTrue(isSymbol(Symbol('hello123')));
    });
    it('should return `false` when given value is not a symbol', function () {
        expectFalse(isSymbol(function () {}));
        expectFalse(isSymbol(NaN));
    });
});

describe('is#isEmpty', function () {
    it('should return `true` when given value is empty', function () {
        [0, null, undefined, '', [], {}, function () {}, function () {}].forEach(function (value) {
            return expectTrue(isEmpty(value));
        });
    });
    it('should return `false` when given value is not empty', function () {
        [1, 'something', [1, 2, 3], { a: 'b' }, function (a, b, c) {}, function (id) {
            return id;
        }].forEach(function (value) {
            return expectFalse(isEmpty(value));
        });
    });
});

describe('is#isConstructablePrimitive', function () {
    it('should return `true` when given value is of an "constructable"', function () {
        [[], {}, 99, 'hello'].forEach(function (value) {
            return expectTrue(isConstructablePrimitive(value));
        });
    });
    it('should return `false` when given value is not of an "constructable"', function () {
        expectFalse(isConstructablePrimitive(NaN));
    });
});
/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by elyde on 11/25/2016.
 */

describe('Object Combinators', function () {

    describe('complement', function () {
        it('should be a function', function () {
            expectFunction(complement);
        });
        it('should return an object with only properties not found in the first obj', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { d: 4 },
                subj3 = { e: 5, f: 6, g: 7 },
                result = complement(subj1, subj2, subj3);
            [subj2, subj3].forEach(function (subj) {
                Object.keys(subj).forEach(function (key) {
                    expectEqual(result[key], subj[key]);
                });
            });
            Object.keys(subj1).forEach(function (key) {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('difference', function () {

        it('should be a function', function () {
            expectFunction(difference);
        });

        it('should return all the props from obj1 that aren\'t in obj2', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { d: 4 },
                result = difference(subj1, subj2);
            Object.keys(subj1).forEach(function (key) {
                expectEqual(result[key], subj1[key]);
            });
            Object.keys(subj2).forEach(function (key) {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('union', function () {
        it('should be a function', function () {
            expectFunction(union);
        });
        it('should return an object containing all properties from the two objects passed in', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { e: 5, f: 6, g: 7 },
                result = union(subj1, subj2);
            [subj2, subj1].forEach(function (subj) {
                Object.keys(subj).forEach(function (key) {
                    expectEqual(result[key], subj[key]);
                });
            });
        });
    });

    describe('intersect', function () {
        it('should be a function', function () {
            expectFunction(union);
        });
        it('should return an object that contains values from both passed in objects', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { a: 5, b: 6, c: 7 },
                result = intersect(subj1, subj2);
            Object.keys(subj2).forEach(function (key) {
                expectEqual(result[key], subj2[key]);
            });
        });
    });
});
/**
 * Created by elyde on 11/13/2016.
 */

describe('pureCurry', function () {

    it('should be of type function.', function () {
        expectFunction(pureCurry);
    });

    it('should return a function when called with or without args.', function () {
        expectFunction(pureCurry());
        expectFunction(pureCurry(99));
        expectFunction(pureCurry(function () {}));
        expectFunction(pureCurry(console.log));
    });

    it('should return a function that fails when no function is passed in (as it\'s first param).', function () {
        assert.throws(pureCurry(), Error);
        assert.throws(pureCurry(99), Error);
    });

    it('should return a curried function.', function () {
        var min8 = pureCurry(Math.min, 8),
            max5 = pureCurry(Math.max, 5),
            pow2 = pureCurry(Math.pow, 2);

        // Expect functions
        [min8, max5, pow2].forEach(function (func) {
            expectFunction(func);
        });

        // Expect functions work correctly
        expect(min8(9)).to.equal(8);
        expect(min8(8)).to.equal(8);
        expect(min8(7)).to.equal(7);
        expect(max5(6)).to.equal(6);
        expect(max5(5)).to.equal(5);
        expect(max5(4)).to.equal(5);
        expect(pow2(2)).to.equal(4);
        expect(pow2(3)).to.equal(8);
        expect(pow2(4)).to.equal(16);
    });

    it('should be able to correctly pureCurry functions of different arity as long as their arity is met.', function () {
        var min = pureCurry2(Math.min),
            max = pureCurry2(Math.max),
            pow = pureCurry2(Math.pow),
            min8 = pureCurry(Math.min, 8),
            max5 = pureCurry(Math.max, 5),
            pow2 = pureCurry(Math.pow, 2),
            isValidTangentLen = pureCurry(function (a, b, cSqrd) {
            return pow(a, 2) + pow(b, 2) === cSqrd;
        }, 2, 2),
            random = pureCurry(function (start, end) {
            return Math.round(Math.random() * end + start);
        }, 0),
            expectedFor = function expectedFor(num) {
            return min(8, max(5, pow(2, num)));
        };

        // Expect functions returned for `pureCurry` calls
        expectFunction(isValidTangentLen);

        // Expect functions returned for `pureCurry` calls
        [min8, max5, pow2].forEach(function (func) {
            expectFunction(func);
        });

        // Expect `pureCurry`ed functions to work as expected
        expect(isValidTangentLen(8)).to.equal(true);
        expect(isValidTangentLen(21)).to.equal(false);

        // Expect `pureCurry`ed functions to work as expected
        [8, 5, 3, 2, 1, 0, random(89), random(55), random(34)].forEach(function (num) {
            var composed = compose(min8, max5, pow2);
            expect(composed(num)).to.equal(expectedFor(num));
        });
    });
});
/**
 * Created by elyde on 11/25/2016.
 */

describe('pureCurryN', function () {

    // Set pureCurry here to use below
    var multiplyRecursive = function multiplyRecursive() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return args.reduce(function (agg, num) {
            return num * agg;
        }, 1);
    },
        addRecursive = function addRecursive() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return args.reduce(function (agg, num) {
            return num + agg;
        }, 0);
    },
        divideR = function divideR() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return args.reduce(function (agg, num) {
            return agg / num;
        }, args.shift());
    };

    it('should be of type function.', function () {
        expect(pureCurryN).to.be.instanceOf(Function);
    });

    it('should return a function that throws an error when no arguments are passed.', function () {
        var result = pureCurryN();
        expect(result).to.be.instanceOf(Function);
        assert.throws(result, Error);
    });

    it('should pass in any values passed the arity when executing the curried function', function () {
        var add3Nums = pureCurryN(addRecursive, 3);

        // Curry add to add 3 numbers
        expect(add3Nums()(1, 2, 3)).to.equal(6);
        expect(add3Nums(1)(2, 3)).to.equal(6);
        expect(add3Nums(1, 2)(3)).to.equal(6);
        expect(add3Nums(1, 2, 3)).to.equal(6);

        // Curry `add` to add any numbers passed required arity
        expect(add3Nums()(1, 2, 3, 5, 6)).to.equal(17);
        expect(add3Nums(1)(2, 3, 5, 6)).to.equal(17);
        expect(add3Nums(1, 2)(3, 5, 6)).to.equal(17);
        expect(add3Nums(1, 2, 3, 5, 6)).to.equal(17);
    });

    it('should respect the passed in "executeArity" (shouldn\'t be called to passed in arity length is reached', function () {
        var multiply5Nums = pureCurryN(multiplyRecursive, 5),
            multiplyExpectedResult = Math.pow(5, 5),
            argsToTest = [[5, 5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5], [5, 5], [5]],
            partiallyAppliedResults = [multiply5Nums(), multiply5Nums(5), multiply5Nums(5, 5), multiply5Nums(5, 5, 5), multiply5Nums(5, 5, 5, 5)];

        // Curry multiply and pass args in non-linear order
        argsToTest.forEach(function (args, index) {
            expect(partiallyAppliedResults[index]).to.be.instanceOf(Function);
            expect(partiallyAppliedResults[index].apply(null, args)).to.equal(multiplyExpectedResult);
        });
    });
});
/**
 * Created by edlc on 1/30/17.
 */

describe('#typeOf', function () {
    it('should be a function', function () {
        expectFunction(typeOf);
    });
    it('should require an arity of `1`', function () {
        expectEqual(typeOf.length, 1);
    });
    it('should return "Undefined" when no value is passed in', function () {
        expectEqual(typeOf(), 'Undefined');
    });
    it('should return the passed type\'s name', function () {
        [[[], 'Array'], [{}, 'Object'], ['', 'String'], [function () {}, 'Function'], [99, 'Number'], [true, 'Boolean'], [false, 'Boolean'], [null, 'Null'], [undefined, 'Undefined']].forEach(function (tuple) {
            return expectEqual(typeOf(tuple[0]), tuple[1]);
        });
    });
});

describe('#typeOfIs', function () {
    it('should be a function', function () {
        expectFunction(typeOfIs);
    });
    it('should require an arity of `2`', function () {
        expectEqual(typeOfIs.length, 2);
    });
    it('should return `false` when no value is passed in', function () {
        expectFalse(typeOfIs());
    });
    it('should return `true` when passed in value is of passed in type name/string', function () {
        [[[], 'Array'], [{}, 'Object'], ['', 'String'], [function () {}, 'Function'], [99, 'Number'], [true, 'Boolean'], [false, 'Boolean'], [null, 'Null'], [undefined, 'Undefined']].forEach(function (tuple) {
            return expectTrue(typeOfIs.apply(null, tuple));
        });
    });
    it('should return `true` when passed in value is of passed in type constructor', function () {
        [[[], Array], [{}, Object], ['', String], [function () {}, Function], [99, Number], [true, Boolean], [false, Boolean]].forEach(function (tuple) {
            return expectTrue(typeOfIs.apply(null, tuple));
        });
    });
    it('should return `false` when passed in value is not of passed in type name/string', function () {
        [[[], 'Object'], [{}, 'Array'], ['', 'NaN'], [function () {}, 'Number'], [99, 'Function'], [true, 'NaN'], [false, 'Number']].forEach(function (tuple) {
            return expectFalse(typeOfIs.apply(null, tuple));
        });
    });
    it('should return `false` when passed in value is not of passed in type constructor', function () {
        [[[], Object], [{}, Array], ['', NaN], [function () {}, Number], [99, Function], [true, NaN], [false, Number]].forEach(function (tuple) {
            return expectFalse(typeOfIs.apply(null, tuple));
        });
    });
});

Object.defineProperty(exports, '__esModule', { value: true });

});
