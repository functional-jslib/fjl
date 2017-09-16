define('testSuite', ['exports'], function (exports) { 'use strict';

/**
 * Created by elyde on 12/10/2016.
 */
Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var apply = function apply(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return fn.apply(null, args);
};

var expectInstanceOf = exports.expectInstanceOf = curry2_(function (value, instance) {
    return expect(value).to.be.instanceOf(instance);
});
var expectFunction = exports.expectFunction = function expectFunction(value) {
    return expectInstanceOf(value, Function);
};
var expectEqual = exports.expectEqual = curry2_(function (value, value2) {
    return expect(value).to.be.equal(value2);
});
var expectFalse = exports.expectFalse = function expectFalse(value) {
    return expectEqual(value, false);
};
var expectTrue = exports.expectTrue = function expectTrue(value) {
    return expectEqual(value, true);
};
var expectLength = exports.expectLength = curry2_(function (len, element) {
    return compose(expectEqual(__, len), length)(element);
});
var hasOwnProperty = exports.hasOwnProperty = function hasOwnProperty(instance, key) {
    return Object.prototype.hasOwnProperty.call(instance, key);
};
var length = exports.length = function length(something) {
    return something.length;
};
var add = exports.add = curry2_(function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return args.reduce(function (agg, num) {
        return num + agg;
    }, 0);
});
var multiply = exports.multiply = curry2_(function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return args.reduce(function (agg, num) {
        return num * agg;
    }, 1);
});
var divide = exports.divide = curry2_(function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    return args.reduce(function (agg, num) {
        return agg / num;
    }, args.shift());
});
var subtract = exports.subtract = curry2_(function (arg0) {
    for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
    }

    return args.reduce(function (agg, num) {
        return agg - num;
    }, arg0);
});
var shallowCompareOnLeft = exports.shallowCompareOnLeft = curry2_(function (incoming, against) {
    return Array.isArray(incoming) ? shallowCompareArraysLeft(incoming, against) : shallowCompareObjectsLeft(incoming, against);
});
var shallowCompareArraysLeft = exports.shallowCompareArraysLeft = curry2_(function (incoming, against) {
    return !incoming.some(function (_, ind) {
        return against[ind] !== incoming[ind];
    });
});
var shallowCompareObjectsLeft = exports.shallowCompareObjectsLeft = curry2_(function (incoming, against, keys) {
    return !(keys || Object.keys(incoming)).some(function (key) {
        return against[key] !== incoming[key];
    });
});
var deepCompareLeft = exports.deepCompareLeft = function deepCompareLeft(incoming, against) {
    return Object.keys(incoming).some(function (key) {
        var typeOfValue = _typeof(incoming[key]);
        return !(typeOfValue !== 'string' || typeOfValue !== 'object' || typeOfValue !== 'Array' ? against[key] === incoming[key] : deepCompareLeft(incoming[key], against[key]));
    });
};
var expectShallowEquals = exports.expectShallowEquals = curry2_(function (a, b) {
    return expectTrue(shallowCompareOnLeft(a, b));
});
var expectDeepEquals = exports.expectDeepEquals = curry2_(function (a, b) {
    return expectTrue(deepCompareLeft(a, b));
});
var range = exports.range = curry2_(function (from, to) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var i = from;
    var out = [];
    if (step < 0 && i > 0) {
        for (; i >= to; i += step) {
            out.push(i);
        }
    } else if (step > 0 && i < to) {
        for (; i <= to; i += step) {
            out.push(i);
        }
    } else {
        throw new Error('Invalid range requested');
    }
    return out;
});
var log = exports.log = console.log.bind(console);
var alphabetCharCodeRange = exports.alphabetCharCodeRange = range('a'.charCodeAt(0), 'z'.charCodeAt(0));
var alphabetArray = exports.alphabetArray = alphabetCharCodeRange.map(function (charCode) {
    return String.fromCharCode(charCode);
});
var alphabetString = exports.alphabetString = alphabetArray.join('');
var peak = exports.peak = function peak() {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
    }

    return apply(log, args);
};

exports.default = {
    expectFunction: expectFunction,
    expectInstanceOf: expectInstanceOf,
    expectEqual: expectEqual,
    expectFalse: expectFalse,
    expectTrue: expectTrue,
    expectLength: expectLength,
    expectShallowEquals: expectShallowEquals,
    expectDeepEquals: expectDeepEquals,
    hasOwnProperty: hasOwnProperty,
    length: length,
    add: add,
    multiply: multiply,
    divide: divide,
    shallowCompareArraysLeft: shallowCompareArraysLeft,
    shallowCompareObjectsLeft: shallowCompareObjectsLeft,
    shallowCompareOnLeft: shallowCompareOnLeft,
    range: range,
    alphabetCharCodeRange: alphabetCharCodeRange,
    alphabetArray: alphabetArray,
    alphabetString: alphabetString
};
/**
 * Created by u067265 on 5/1/17.
 */

describe('#functionOps', function () {

    // @todo implement more extensive tests later
    describe('#call', function () {
        it('should be a functionOps', function () {
            expectFunction(call);
        });
        it('should be curried', function () {
            var adder = call(add);
            expectFunction(adder());
            expectEqual(adder(1, 2, 3, 4, 5), 15);
        });
        it('should call a functionOps passed into it along with passed in arguments', function () {
            expectEqual(call(add, 1, 2, 3, 4, 5), 15);
        });
    });

    // @todo implement more extensive tests later
    describe('#apply', function () {
        it('should be a functionOps', function () {
            expectFunction(apply);
        });
        it('should be curried', function () {
            var addAllInArray = apply(add);
            expectFunction(addAllInArray);
            expectEqual(addAllInArray([1, 2, 3, 4, 5]), 15);
        });
        it('should call a functionOps passed into it with args listOps passed in as second parameter', function () {
            expectEqual(apply(add, [1, 2, 3, 4, 5]), 15);
        });
    });

    describe('#flip', function () {
        it('should be a functionOps', function () {
            expectFunction(flip);
        });
        it('should return a functionOps', function () {
            expectFunction(flip());
            expectFunction(flip(subtract));
        });
        it('should return a functionOps which executes its params in reverse.', function () {
            var subtractor = flip(subtract);
            expectFunction(subtractor);
            expectEqual(subtract(2, 1), subtractor(1, 2));
            expectEqual(subtract(1, 2), subtractor(2, 1));
        });
    });

    describe('#flipN', function () {
        it('should be a functionOps', function () {
            expectFunction(flipN);
        });
        it('should return a functionOps', function () {
            expectFunction(flipN());
            expectFunction(flipN(subtract));
        });
        it('should return a functionOps which executes its params in reverse.', function () {
            var subtractor = flipN(subtract);
            expectFunction(subtractor);
            expectEqual(subtract(3, 2, 1), subtractor(1, 2, 3));
            expectEqual(subtract(1, 2, 3), subtractor(3, 2, 1));
        });
    });

    describe('#until', function () {
        it('should be a functionOps', function () {
            expectFunction(until);
        });

        it('should run while predicate returns `false`', function () {
            var result = until(function (x) {
                return x >= 100;
            }, function (x) {
                return x + x;
            }, 1);
            expectEqual(result, 128);
            // log('Result:', result);
        });

        it('should throw an error when no predicate is passed in', function () {
            assert.throws(function () {
                return until(null, function (x) {
                    return x + x;
                }, 1);
            }, Error);
        });

        it('should throw an error when no operation is passed in', function () {
            assert.throws(function () {
                return until(function (x) {
                    return x >= 100;
                }, null, 1);
            }, Error);
        });
    });

    describe('#id', function () {
        it('should be a functionOps', function () {
            expectFunction(id);
        });
        it('should return whatever you give it', function () {
            expectEqual(id(1), 1);
            expectEqual(id(undefined), undefined);
        });
    });

    describe('#compose', function () {

        it('should be of type functionOps.', function () {
            expect(compose).to.be.instanceOf(Function);
        });

        it('should return a functionOps whether or not any parameters were passed in to it.', function () {
            expect(compose()).to.be.instanceOf(Function);
            expect(compose(console.log)).to.be.instanceOf(Function);
        });

        it('should return a functionOps that when used returns the passed in value if `compose` ' + 'itself didn\'t receive any parameters.', function () {
            var result = compose();
            expect(result(99)).to.equal(99);
        });

        it('should be able to compose an arbitrary numberOps of functions and execute them as expected ' + 'from generated-for-src functionOps.', function () {
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

    describe('#curry', function () {

        it('should be of type functionOps.', function () {
            expectFunction(curry);
        });

        it('should return a functionOps when called with or without args.', function () {
            expectFunction(curry());
            expectFunction(curry(99));
            expectFunction(curry(function () {}));
            expectFunction(curry(console.log));
        });

        it('should return a functionOps that fails when no functionOps is passed in (as it\'s first param).', function () {
            assert.throws(curry(), Error);
            assert.throws(curry(99), Error);
        });

        it('should return a curried functionOps.', function () {
            var min8 = curry(Math.min, 8),
                max5 = curry(Math.max, 5),
                pow2 = curry(Math.pow, 2);

            // Expect functions
            [min8, max5, pow2].forEach(function (func) {
                expectFunction(func);
            });

            // Expect functions work as expected
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
            expectFunction(isValidTangentLen);

            // Expect functions returned for `curry` calls
            [min8, max5, pow2].forEach(function (func) {
                expectFunction(func);
            });

            // Expect `curry`ed functions to work as expected
            expect(isValidTangentLen(8)).to.equal(true);
            expect(isValidTangentLen(21)).to.equal(false);

            // Expect `curry`ed functions to work as expected
            [8, 5, 3, 2, 1, 0, random(89), random(55), random(34)].forEach(function (num) {
                var composed = compose(min8, max5, pow2);
                expect(composed(num)).to.equal(expectedFor(num));
            });

            var add3Items = function add3Items(a, b, c) {
                return a + b + c;
            },
                curriedAdd3Items = curry(add3Items);
        });
    });

    describe('#curryN', function () {

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

        it('should be of type functionOps.', function () {
            expect(curryN).to.be.instanceOf(Function);
        });

        it('should return a functionOps that throws an error when no arguments are passed.', function () {
            var result = curryN();
            expect(result).to.be.instanceOf(Function);
            assert.throws(result, Error);
        });

        it('should pass in any values passed the arity when executing the curried functionOps', function () {
            var add3Nums = curryN(3, addRecursive);

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
            var multiply5Nums = curryN(5, multiplyRecursive),
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

    describe('#curry_', function () {

        // Set curry here to use below
        var multiplyRecursive = function multiplyRecursive() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return args.reduce(function (agg, num) {
                return num * agg;
            }, 1);
        },
            addRecursive = function addRecursive() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                args[_key5] = arguments[_key5];
            }

            return args.reduce(function (agg, num) {
                return num + agg;
            }, 0);
        },
            divideR = function divideR() {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            return args.reduce(function (agg, num) {
                return agg / num;
            }, args.shift());
        };

        it('should be of type functionOps.', function () {
            expect(curry_).to.be.instanceOf(Function);
        });

        it('should return a functionOps when called with or without args.', function () {
            expect(curry_()).to.be.instanceOf(Function);
            expect(curry_(99)).to.be.instanceOf(Function);
            expect(curry_(function () {})).to.be.instanceOf(Function);
            expect(curry_(console.log)).to.be.instanceOf(Function);
        });

        /*it ('should return a functionOps that fails when no functionOps is passed (as it\'s first param).', functionOps () {
         assert.throws(curry_(), Error);
         assert.throws(curry_(99), Error);
         });*/

        it('should return a properly curried functionOps when correct arity for said functionOps is met.', function () {
            var min8 = curry_(Math.min, 8),
                max5 = curry_(Math.max, 5),
                pow2 = curry_(Math.pow, 2);

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
            var min = curry2_(Math.min),
                max = curry2_(Math.max),
                pow = curry2_(Math.pow),
                min8 = curry_(Math.min, 8),
                max5 = curry_(Math.max, 5),
                pow2 = curry_(Math.pow, 2),
                isValidTangentLen = curry_(function (a, b, cSqrd) {
                return pow(a, 2) + pow(b, 2) === cSqrd;
            }, 2, 2),
                random = curry_(function (start, end) {
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
            var add = curry3_(addRecursive),
                multiply = curry5_(multiplyRecursive),
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
            expect(curry_(divideR, 25, 5)).to.be.instanceOf(Function);
            expect(curry_(divideR, __, 625, __)(3125, 5)).to.equal(1);
            expect(curry_(divideR, Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
        });
    });

    describe('#curryN_', function () {

        // Set curry here to use below
        var multiplyRecursive = function multiplyRecursive() {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                args[_key7] = arguments[_key7];
            }

            return args.reduce(function (agg, num) {
                return num * agg;
            }, 1);
        },
            addRecursive = function addRecursive() {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            return args.reduce(function (agg, num) {
                return num + agg;
            }, 0);
        },
            divideR = function divideR() {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                args[_key9] = arguments[_key9];
            }

            return args.reduce(function (agg, num) {
                return agg / num;
            }, args.shift());
        };

        it('should be of type functionOps.', function () {
            expect(curryN_).to.be.instanceOf(Function);
        });

        it('should return a functionOps that throws an error when no arguments are passed.', function () {
            var result = curryN_();
            expect(result).to.be.instanceOf(Function);
            assert.throws(result, Error);
        });

        it('should enforce `Placeholder` values when currying', function () {
            var add3Nums = curryN_(3, addRecursive),
                multiply5Nums = curryN_(5, multiplyRecursive),
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

        it('should pass in any values passed the arity when executing the curried functionOps', function () {
            var add3Nums = curryN_(3, addRecursive);

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
            var multiply5Nums = curryN_(5, multiplyRecursive),
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
            var divideC = curryN_(3, divideR);

            // Curry divideR to divde 3 or more numbers
            expect(divideC(25, 5)).to.be.instanceOf(Function);
            expect(divideC(__, 625, __)(3125, 5)).to.equal(1);
            expect(divideC(Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
        });
    });
});
describe('#functionOps.curry', function () {

    it('should be of type functionOps.', function () {
        expectFunction(curry);
    });

    it('should return a functionOps when called with or without args.', function () {
        expectFunction(curry());
        expectFunction(curry(99));
        expectFunction(curry(function () {}));
        expectFunction(curry(console.log));
    });

    it('should return a functionOps that fails when no functionOps is passed in (as it\'s first param).', function () {
        assert.throws(curry(), Error);
        assert.throws(curry(99), Error);
    });

    it('should return a curried functionOps.', function () {
        var min8 = curry(Math.min, 8),
            max5 = curry(Math.max, 5),
            pow2 = curry(Math.pow, 2);

        // Expect functions
        [min8, max5, pow2].forEach(function (func) {
            expectFunction(func);
        });

        // Expect functions work as expected
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
            min8 = min(8),
            max5 = max(5),
            pow2 = function pow2(x) {
            return pow(x, 2);
        },
            isValidTangentLen = curry(function (a, b, cSqrd) {
            return pow2(a) + pow2(b) === cSqrd;
        }, 2, 2),
            randomUpTo = curry(function (start, end) {
            return Math.round(Math.random() * end + start);
        }, 0),
            expectedFor = function expectedFor(num) {
            return min8(max5(pow2(num)));
        };

        // Expect functions returned for `curry` calls
        expectFunction(isValidTangentLen);

        // Expect functions returned for `curry` calls
        [min8, max5, pow2].forEach(function (func) {
            return expectFunction(func);
        });

        // Expect `curry`ed functions to work as expected
        expect(isValidTangentLen(8)).to.equal(true);
        expect(isValidTangentLen(21)).to.equal(false);

        // Expect `curry`ed functions to work as expected
        [8, 5, 3, 2, 1, 0, randomUpTo(89), randomUpTo(55), randomUpTo(34)].forEach(function (num) {
            var composed = compose(min8, max5, pow2);
            expect(composed(num)).to.equal(expectedFor(num));
        });

        var add3Items = function add3Items(a, b, c) {
            return a + b + c;
        },
            curriedAdd3Items = curry(add3Items);
    });
});

describe('#functionOps.curryN', function () {

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

    it('should be of type functionOps.', function () {
        expect(curryN).to.be.instanceOf(Function);
    });

    it('should return a functionOps that throws an error when no arguments are passed.', function () {
        var result = curryN();
        expect(result).to.be.instanceOf(Function);
        assert.throws(result, Error);
    });

    it('should pass in any values passed the arity when executing the curried functionOps', function () {
        var add3Nums = curryN(3, addRecursive);

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
        var multiply5Nums = curryN(5, multiplyRecursive),
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
describe('#functionOps.curry_', function () {

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

    it('should be of type functionOps.', function () {
        expect(curry_).to.be.instanceOf(Function);
    });

    it('should return a functionOps when called with or without args.', function () {
        expect(curry_()).to.be.instanceOf(Function);
        expect(curry_(99)).to.be.instanceOf(Function);
        expect(curry_(function () {})).to.be.instanceOf(Function);
        expect(curry_(console.log)).to.be.instanceOf(Function);
    });

    /*it ('should return a functionOps that fails when no functionOps is passed (as it\'s first param).', functionOps () {
     assert.throws(curry_(), Error);
     assert.throws(curry_(99), Error);
     });*/

    it('should return a properly curried functionOps when correct arity for said functionOps is met.', function () {
        var min8 = curry_(Math.min, 8),
            max5 = curry_(Math.max, 5),
            pow2 = curry_(Math.pow, 2);

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
        var min = curry2_(Math.min),
            max = curry2_(Math.max),
            pow = curry2_(Math.pow),
            min8 = curry_(Math.min, 8),
            max5 = curry_(Math.max, 5),
            pow2 = curry_(Math.pow, 2),
            isValidTangentLen = curry_(function (a, b, cSqrd) {
            return pow(a, 2) + pow(b, 2) === cSqrd;
        }, 2, 2),
            random = curry_(function (start, end) {
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
        var add = curry3_(addRecursive),
            multiply = curry5_(multiplyRecursive),
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
        expect(curry_(divideR, 25, 5)).to.be.instanceOf(Function);
        expect(curry_(divideR, __, 625, __)(3125, 5)).to.equal(1);
        expect(curry_(divideR, Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
    });
});

describe('#functionOps.curryN_', function () {

    // Set curry here to use below
    var multiplyRecursive = function multiplyRecursive() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        return args.reduce(function (agg, num) {
            return num * agg;
        }, 1);
    },
        addRecursive = function addRecursive() {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return args.reduce(function (agg, num) {
            return num + agg;
        }, 0);
    },
        divideR = function divideR() {
        for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
        }

        return args.reduce(function (agg, num) {
            return agg / num;
        }, args.shift());
    };

    it('should be of type functionOps.', function () {
        expect(curryN_).to.be.instanceOf(Function);
    });

    it('should return a functionOps that throws an error when no arguments are passed.', function () {
        var result = curryN_();
        expect(result).to.be.instanceOf(Function);
        assert.throws(result, Error);
    });

    it('should enforce `Placeholder` values when currying', function () {
        var add3Nums = curryN_(3, addRecursive),
            multiply5Nums = curryN_(5, multiplyRecursive),
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

    it('should pass in any values passed the arity when executing the curried functionOps', function () {
        var add3Nums = curryN_(3, addRecursive);

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
        var multiply5Nums = curryN_(5, multiplyRecursive),
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
        var divideC = curryN_(3, divideR);

        // Curry divideR to divde 3 or more numbers
        expect(divideC(25, 5)).to.be.instanceOf(Function);
        expect(divideC(__, 625, __)(3125, 5)).to.equal(1);
        expect(divideC(Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
    });
});
/**
 * Created by u067265 on 5/1/17.
 */

describe('#functionOps', function () {

    // @todo implement more extensive tests later
    describe('#call', function () {
        it('should be a functionOps', function () {
            expectFunction(call);
        });
        it('should be curried', function () {
            var adder = call(add);
            expectFunction(adder());
            expectEqual(adder(1, 2, 3, 4, 5), 15);
        });
        it('should call a functionOps passed into it along with passed in arguments', function () {
            expectEqual(call(add, 1, 2, 3, 4, 5), 15);
        });
    });

    // @todo implement more extensive tests later
    describe('#apply', function () {
        it('should be a functionOps', function () {
            expectFunction(apply);
        });
        it('should call a functionOps passed into it with args listOps passed in as second parameter', function () {
            expectEqual(apply(add, [1, 2, 3, 4, 5]), 15);
        });
    });

    describe('#flip', function () {
        it('should be a functionOps', function () {
            expectFunction(flip);
        });
        it('should return a functionOps', function () {
            expectFunction(flip());
            expectFunction(flip(subtract));
        });
        it('should return a functionOps which executes its params in reverse.', function () {
            var subtractor = flip(subtract);
            expectFunction(subtractor);
            expectEqual(subtract(2, 1), subtractor(1, 2));
            expectEqual(subtract(1, 2), subtractor(2, 1));
        });
    });

    describe('#flipN', function () {
        it('should be a functionOps', function () {
            expectFunction(flipN);
        });
        it('should return a functionOps', function () {
            expectFunction(flipN());
            expectFunction(flipN(subtract));
        });
        it('should return a functionOps which executes its params in reverse.', function () {
            var subtractor = flipN(subtract);
            expectFunction(subtractor);
            expectEqual(subtract(3, 2, 1), subtractor(1, 2, 3));
            expectEqual(subtract(1, 2, 3), subtractor(3, 2, 1));
        });
    });

    describe('#until', function () {
        it('should be a functionOps', function () {
            expectFunction(until);
        });

        it('should run while predicate returns `false`', function () {
            var result = until(function (x) {
                return x >= 100;
            }, function (x) {
                return x + x;
            }, 1);
            expectEqual(result, 128);
            // log('Result:', result);
        });

        it('should throw an error when no predicate is passed in', function () {
            assert.throws(function () {
                return until(null, function (x) {
                    return x + x;
                }, 1);
            }, Error);
        });

        it('should throw an error when no operation is passed in', function () {
            assert.throws(function () {
                return until(function (x) {
                    return x >= 100;
                }, null, 1);
            }, Error);
        });
    });

    describe('#id', function () {
        it('should be a functionOps', function () {
            expectFunction(id);
        });
        it('should return whatever you give it', function () {
            expectEqual(id(1), 1);
            expectEqual(id(undefined), undefined);
        });
    });

    describe('#compose', function () {

        it('should be of type functionOps.', function () {
            expect(compose).to.be.instanceOf(Function);
        });

        it('should return a functionOps whether or not any parameters were passed in to it.', function () {
            expect(compose()).to.be.instanceOf(Function);
            expect(compose(console.log)).to.be.instanceOf(Function);
        });

        it('should return a functionOps that when used returns the passed in value if `compose` ' + 'itself didn\'t receive any parameters.', function () {
            var result = compose();
            expect(result(99)).to.equal(99);
        });

        it('should be able to compose an arbitrary numberOps of functions and execute them as expected ' + 'from generated-for-src functionOps.', function () {
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
});
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * Created by elyde on 12/29/2016.
 * @todo ensure we are checking lengths in our operation results (to ensure accuracy of our tests).
 * @todo ensure expected types (either explicitly or implicitly) are being returned where necessary.
 */

describe('#listOps', function () {

    var strToArray = split('');

    describe('#head', function () {
        it('should return the first item in an listOps and/or stringOps.', function () {
            expectEqual(head('Hello'), 'H');
            expectEqual(head(split('', 'Hello')), 'H');
        });
        it('should return `undefined` when an empty listOps and/or stringOps is passed in', function () {
            expectEqual(undefined, head([]));
            expectEqual(undefined, head(''));
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(head, Error);
        });
    });

    describe('#last', function () {
        it('should return the last item in an listOps and/or stringOps.', function () {
            var word = 'Hello';
            compose(expectEqual('o'), last)(word);
            compose(expectEqual('o'), last, strToArray)(word);
        });
        it('should return `undefined` when an empty listOps is passed in', function () {
            expectEqual(undefined, last([]));
            expectEqual(undefined, last(''));
        });
        it('should throw an error when no parameters is passed in', function () {
            assert.throws(last, Error);
        });
    });

    describe('#init', function () {
        it('should return everything except the last item of an listOps and/or stringOps', function () {
            compose(expectEqual('orange'), intercalate(''), init, strToArray)('oranges');
            compose(expectEqual('orange'), init)('oranges');
        });
        it('should return an empty listOps when an empty listOps and/or stringOps is passed in', function () {
            compose(expectEqual(0), length, init)([]);
            compose(expectEqual(0), length, init)('');
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(init, Error);
        });
    });

    describe('#tail', function () {
        it('should return everything except the last item of an listOps', function () {
            compose(expectEqual('ello'), intercalate(''), tail, strToArray)('hello');
            compose(expectEqual('ello'), tail)('hello');
        });
        it('should return an empty listOps when receiving an empty listOps', function () {
            compose(expectEqual(0), length, tail)([]);
            compose(expectEqual(0), length, tail)('');
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe('#uncons', function () {
        it('should return the "head" and "tail" of a list in a two item array.', function () {
            expectShallowEquals(uncons('hello'), ['h', 'ello']);
            expectDeepEquals(uncons(split('', 'hello')), ['h', split('', 'ello')]);
        });
        it('should return an empty tail when there\'s only one item in list.', function () {
            expectShallowEquals(uncons('a'), ['a', '']);
            expectDeepEquals(uncons([0]), [0, []]);
        });
        it('should return `undefined` for empty lists.', function () {
            expectEqual(uncons(''), undefined);
            expectEqual(uncons([]), undefined);
        });
        it('should return `undefined` when no value is passed in or a falsy value is passed in', function () {
            expectEqual(uncons(null), undefined);
            expectEqual(uncons(undefined), undefined);
            expectEqual(uncons(), undefined);
            expectEqual(uncons(0), undefined);
            expectEqual(uncons(false), undefined);
            expectEqual(uncons(''), undefined);
        });
    });

    describe('#isEmpty (a.k.a. #`null`)', function () {
        it('should return `true` when a list is empty.', function () {
            expectTrue(isEmptyList([]));
            expectTrue(isEmptyList(''));
        });
        it('should return `false` when a list is not empty.', function () {
            expectFalse(isEmptyList(['a', 'b', 'c']));
            expectFalse(isEmptyList('abc'));
        });
        it('should throw an error when receiving something that is list like (doesn\'t have a `length` prop', function () {
            assert.throws(function () {
                return isEmptyList(null);
            }, Error);
            assert.throws(function () {
                return isEmptyList(undefined);
            }, Error);
            assert.throws(function () {
                return isEmptyList();
            }, Error);
        });
    });

    describe('#length', function () {
        it('is should return the length of any item that has a `length` property', function () {
            expectTrue(all(function (item) {
                return length(item[0]) === item[1];
            }, [[[], 0], ['abc', 3], [function (a, b, c) {}, 3]]));
        });
        it('should return `undefined` for items that don\'t have a `length` property', function () {
            expectEqual(length({}), undefined);
            expectEqual(length(0), undefined);
            expectEqual(length(false), undefined);
            expectEqual(length(true), undefined);
        });
        it('should throw an error when `undefined` or `null` is passed in', function () {
            assert.throws(length, Error);
            assert.throws(function () {
                return length(null);
            }, Error);
        });
    });

    describe('#map', function () {
        it('should be able to map a function over a list.', function () {
            var word = 'hello',
                op = function op(char) {
                return char + 'a';
            };
            expectEqual(map(op, word), 'haealalaoa');
            expectShallowEquals(map(op, split('', word)), ['ha', 'ea', 'la', 'la', 'oa']);
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(map(function (x) {
                return x;
            }, []), []);
            expectShallowEquals(map(function (x) {
                return x;
            }, ''), '');
        });
        it('should throw an error when incoming value is not a type instance', function () {
            assert.throws(function () {
                return map(function (x) {
                    return x;
                }, null);
            }, Error);
            assert.throws(function () {
                return map(function (x) {
                    return x;
                }, undefined);
            }, Error);
        });
    });

    describe('#reverse', function () {
        it('should reverse a list passed in.', function () {
            var word = 'hello';
            expectEqual(reverse(word), 'olleh');
            expectShallowEquals(reverse(split('', word)), split('', 'olleh'));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(reverse([]), []);
            expectEqual(reverse(''), '');
        });
        it('should throw an error when receiving no value', function () {
            assert.throws(reverse, Error);
            assert.throws(function () {
                return reverse(undefined);
            }, Error);
            assert.throws(function () {
                return reverse(null);
            }, Error);
        });
    });

    describe('#intersperse', function () {
        it('should be able to inject a list (string or array) in-between the items of a list of the same type.', function () {
            var result1 = intersperse(', ', alphabetArray).join(''),
                result2 = intersperse(', ', alphabetString);
            expectEqual(result1, alphabetArray.join(', '));
            expectEqual(result2, alphabetArray.join(', '));
        });
        it('should return a list with the same item when the list has a length of `1`', function () {
            expectEqual(intersperse(', ', 'a'), 'a');
            expectShallowEquals(intersperse(', ', ['a']), ['a']);
            log();
        });
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(intersperse('', ''), '');
            expectShallowEquals(intersperse('', []), []);
        });
    });

    describe('#intercalate', function () {
        it('should intercalate a list within another list and then perform concat on the result', function () {
            var result1 = intercalate(', ', alphabetArray),
                result2 = intercalate(', ', alphabetString);
            expectEqual(result1, alphabetArray.join(', '));
            expectEqual(result2, alphabetArray.join(', '));
        });
        it('should return a list with the same item when the list has a length of `1`', function () {
            expectEqual(intercalate(', ', 'a'), 'a');
            expectShallowEquals(intercalate(', ', ['a']), 'a');
            expectShallowEquals(intercalate(', ', [['a']]), ['a']); // Ensure list is flattened one level
        });
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(intercalate('', ''), '');
            expectShallowEquals(intercalate('', []), []);
            expectShallowEquals(intercalate('', [[]]), []); // Ensures list is flattened one level
        });
    });

    describe('#transpose', function () {
        var result1 = transpose([[1, 2, 3], [4, 5, 6]]),
            result2 = transpose([[10, 11], [20], [], [30, 31, 32]]);
        it('should transpose a list of lists into a rotated list of lists (from columns and rows to rows and' + ' columns and vice versa).', function () {
            expectTrue(all(function (tuple) {
                return all(function (list, ind) {
                    return all(function (x, ind2) {
                        return x === tuple[1][ind][ind2];
                    }, list);
                }, tuple[0]);
            }, [[result1, [[1, 4], [2, 5], [3, 6]]], [result2, [[10, 20, 30], [11, 31], [32]]]]));
        });
        it('should ignore empty lists in the transposition process and not add them to the resulting list.', function () {
            expectTrue(all(length, result1));
            expectTrue(all(length, result2));
        });
        it('should return an empty list when receiving one or when items contained are empty', function () {
            expectShallowEquals(transpose([[], [], []]), []);
            expectShallowEquals(transpose([]), []);
        });
    });

    describe('#subsequences', function () {
        it('should have more tests.');
    });

    describe('#permutations', function () {
        it('should have more tests.');
    });

    describe('#foldl', function () {
        it('should fold a `Foldable` (list, etc.) into some value', function () {
            var phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = function getAppendage(ind) {
                return parseInt(ind, 10) !== phraseIndCount ? '|' : '';
            },
                expectedTransform = map(function (x, ind) {
                return x + getAppendage(ind);
            }, split('', phrase));
            expectEqual(foldl(function (agg, item, ind) {
                agg += item + getAppendage(ind);
                return agg;
            }, '', phrase), expectedTransform.join(''));
            expectEqual(foldl(function (agg, item) {
                return agg + item;
            }, 0, [1, 2, 3, 4, 5]), 15);
            expectEqual(foldl(function (agg, item) {
                return agg * item;
            }, 1, [1, 2, 3, 4, 5]), 120);
            expectShallowEquals(foldl(function (agg, item, ind) {
                agg.push(item + getAppendage(ind));
                return agg;
            }, [], split('', phrase)), expectedTransform);
        });

        it('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldl(function (agg, item) {
                return agg + item;
            }, 'a', ''), 'a');
            expectShallowEquals(foldl(function (agg, item) {
                return agg + item;
            }, [], []), []);
        });

        it('should throw an error when `null` or `undefined` are passed in as the list', function () {
            assert.throws(function () {
                return foldl(function (agg, item) {
                    return agg + item;
                }, 'a', null);
            }, Error);
            assert.throws(function () {
                return foldl(function (agg, item) {
                    return agg + item;
                }, 'a', undefined);
            }, Error);
        });
    });

    describe('#foldl1', function () {
        it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', function () {
            var phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = function getAppendage(ind) {
                return parseInt(ind, 10) < phraseIndCount ? '|' : '';
            },
                expectedTransform = map(function (x, ind) {
                return x + getAppendage(ind);
            }, split('', phrase));
            expectEqual(foldl1(function (agg, item, ind) {
                agg += getAppendage(ind) + item;
                return agg;
            }, phrase), expectedTransform.join(''));
            expectEqual(foldl1(function (agg, item) {
                return agg + item;
            }, [1, 2, 3, 4, 5]), 15);
            expectEqual(foldl1(function (agg, item) {
                return agg * item;
            }, [1, 2, 3, 4, 5]), 120);
            expectShallowEquals(foldl1(function (agg, item, ind) {
                agg += getAppendage(ind) + item;
                return agg;
            }, split('', phrase)), expectedTransform.join(''));
        });
        it('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldl1(function (agg, item) {
                return agg + item;
            }, ''), '');
            expectShallowEquals(foldl1(function (agg, item) {
                return agg + item;
            }, []), []);
        });
        it('should return `undefined` when receiving nothing (`null` or `undefined`)', function () {
            expectEqual(foldl1(function (agg, item) {
                return agg + item;
            }, null), undefined);
            expectEqual(foldl1(function (agg, item) {
                return agg + item;
            }, undefined), undefined);
        });
    });

    describe('#foldr', function () {
        it('should fold a `Foldable` (list, etc.) into some value', function () {
            var phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = function getAppendage(ind) {
                return parseInt(ind, 10) !== phraseIndCount ? '|' : '';
            },
                expectedTransform = reverse(map(function (x, ind) {
                return x + getAppendage(ind);
            }, split('', phrase)));
            expectEqual(foldr(function (agg, item, ind) {
                agg += item + getAppendage(ind);
                return agg;
            }, '', phrase), expectedTransform.join(''));
            expectEqual(foldr(function (agg, item) {
                return agg + item;
            }, 0, [1, 2, 3, 4, 5]), 15);
            expectEqual(foldr(function (agg, item) {
                return agg * item;
            }, 1, [1, 2, 3, 4, 5]), 120);
            expectShallowEquals(foldr(function (agg, item, ind) {
                agg.push(item + getAppendage(ind));
                return agg;
            }, [], split('', phrase)), expectedTransform);
        });
        it('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldr(function (agg, item) {
                return agg + item;
            }, 'a', ''), 'a');
            expectShallowEquals(foldr(function (agg, item) {
                return agg + item;
            }, [], []), []);
        });
        it('should throw an error when `null` or `undefined` are passed in as the list', function () {
            assert.throws(function () {
                return foldr(function (agg, item) {
                    return agg + item;
                }, 'a', null);
            }, Error);
            assert.throws(function () {
                return foldr(function (agg, item) {
                    return agg + item;
                }, 'a', undefined);
            }, Error);
        });
    });

    describe('#foldr1', function () {
        it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', function () {
            var phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = function getAppendage(ind) {
                return ind <= phraseIndCount ? '|' : '';
            },
                expectedTransform = reverse(map(function (x, ind, arr) {
                return x + (ind !== 0 ? getAppendage(ind) : '');
            }, split('', phrase)));
            expectEqual(foldr1(function (agg, item, ind) {
                agg += getAppendage(ind) + item;
                return agg;
            }, phrase), expectedTransform.join(''));
            expectEqual(foldr1(function (agg, item) {
                return agg + item;
            }, [1, 2, 3, 4, 5]), 15);
            expectEqual(foldr1(function (agg, item) {
                return agg * item;
            }, [1, 2, 3, 4, 5]), 120);
            expectShallowEquals(foldr1(function (agg, item, ind) {
                agg += getAppendage(ind) + item;
                return agg;
            }, split('', phrase)), expectedTransform.join(''));
        });
        it('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldr1(function (agg, item) {
                return agg + item;
            }, ''), '');
            expectShallowEquals(foldr1(function (agg, item) {
                return agg + item;
            }, []), []);
        });
        it('should return `undefined` when receiving nothing (`null` or `undefined`)', function () {
            expectEqual(foldr1(function (agg, item) {
                return agg + item;
            }, null), undefined);
            expectEqual(foldr1(function (agg, item) {
                return agg + item;
            }, undefined), undefined);
        });
    });

    describe('#concat', function () {
        it('should concatenate a list of lists into a list.', function () {
            var listOfLists = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
                altListOfLists = ['abc', 'def', 'ghi'];
            expectShallowEquals(concat(listOfLists), listOfLists.reduce(function (agg, item) {
                return agg.concat(item);
            }));
            expectShallowEquals(concat(altListOfLists), altListOfLists.reduce(function (agg, item) {
                return agg + item;
            }));
        });
        it('should return an empty list when receiving an empty list or a list of empty lists', function () {
            expectShallowEquals(concat([]), []);
            expectShallowEquals(concat([[], [], []]), []);
        });
        it('should throw an error when receiving nothing', function () {
            assert.throws(concat, Error);
            assert.throws(function () {
                return concat(null);
            }, Error);
            assert.throws(function () {
                return concat(undefined);
            }, Error);
        });
    });

    describe('#concatMap', function () {
        var id = function id(x) {
            return x;
        };
        it('should map a function on a list and concatenate lists in resulting list into a list.', function () {
            var charCodeToCharOp = function charCodeToCharOp(charCode) {
                return String.fromCharCode(charCode);
            },
                charCodeRange = alphabetCharCodeRange;
            // @investigate is babel shimming String.fromCharCode;
            //  When passing this function direct to `[].map` it returns a weird result (seems like it's returning
            //  an instance of `String` using `new` and it's constructor)?
            // log (alphabetArray);
            expectShallowEquals(concatMap(charCodeToCharOp, charCodeRange), alphabetArray.join(''));
            expectShallowEquals(concatMap(function (charCode) {
                return [String.fromCharCode(charCode)];
            }, charCodeRange), alphabetArray);
        });
        it('should return an empty list when receiving an empty list or a list of empty lists', function () {
            expectShallowEquals(concatMap(id, []), []);
            expectShallowEquals(concatMap(id, [[], [], []]), []);
        });
        it('should throw an error when receiving `undefined` or `null` in it\'s list position', function () {
            assert.throws(function () {
                return concatMap(id, null);
            }, Error);
            assert.throws(function () {
                return concatMap(id, undefined);
            }, Error);
        });
    });

    describe('#and', function () {
        it('should return `true` when all items of a container are "truthy".', function () {
            expectTrue(and(['a', 1, 99, true, function () {
                return null;
            }, {}, []]));
        });
        it('should return `false` when not all items of a container are "truthy".', function () {
            expectFalse(and(['a', 1, 0, true, function () {
                return null;
            }, {}, []]));
        });
        it('should return `false` when receiving an empty list or nothing.', function () {
            expectFalse(and(''));
            expectFalse(and(['']));
            expectFalse(and([null]));
            expectFalse(and([undefined]));
            expectFalse(and([false]));
        });
        it('should an error when receiving nothing', function () {
            assert.throws(function () {
                return and(undefined);
            }, Error);
            assert.throws(function () {
                return and(null);
            }, Error);
        });
    });

    describe('#or', function () {
        it('should return `true` when, at least, one of the items is "truthy".', function () {
            expectTrue(or([0, false, null, 1, undefined]));
        });
        it('should return `false` when all of the items are "falsy".', function () {
            expectFalse(or([0, false, null, undefined, '']));
        });
        it('should return `false` when an empty list is received.', function () {
            expectFalse(or([]));
        });
        it('should throw an error when receiving nothing (`null` or `undefined`).', function () {
            assert.throws(function () {
                return or(null);
            }, Error);
            assert.throws(function () {
                return or(undefined);
            }, Error);
        });
    });

    describe('#any', function () {
        var id = function id(x) {
            return x;
        };
        it('should return `true` when any item matches predicate.', function () {
            expectTrue(any(isTruthy, [0, false, null, 1, undefined]));
            expectTrue(any(isTruthy, ['hello']));
            expectTrue(any(function (x) {
                return x === 'e';
            }, 'hello'));
        });
        it('should return `false` when no item in received items matches predicate.', function () {
            expectFalse(any(isTruthy, [0, false, null, undefined, '']));
            expectFalse(any(isTruthy, [0]));
            expectFalse(any(function (x) {
                return x === 'e';
            }, 'avalon'));
        });
        it('should return `false` when an empty list is received.', function () {
            expectFalse(any(id, []));
        });
        it('should throw an error when receiving nothing (`null` or `undefined`).', function () {
            assert.throws(function () {
                return any(id, null);
            }, Error);
            assert.throws(function () {
                return any(id, undefined);
            }, Error);
        });
    });

    describe('#all', function () {
        it('should return true when predicate returns true for all items in list', function () {
            expectTrue(all(function (item) {
                return item;
            }, [true, true, true]));
            expectTrue(all(function (char) {
                return char !== 'a';
            }, 'bcdefg'));
        });
        it('should return `false` when predicate returns `false` for an item', function () {
            expectFalse(all(function (item) {
                return item;
            }, [true, false, true]));
            expectFalse(all(function (item) {
                return item !== 'a';
            }, 'bcdaefg'));
        });
        it('should return `false` when an empty list is passed in', function () {
            expectFalse(all(function (item) {
                return item;
            }, []));
            expectFalse(all(function (item) {
                return item;
            }, ''));
        });
        it('should throw an error when nothing is passed in', function () {
            assert.throws(function () {
                return all(function (item) {
                    return item;
                }, null);
            }, Error);
            assert.throws(function () {
                return all(function (item) {
                    return item;
                }, undefined);
            }, Error);
        });
    });

    describe('#sum', function () {
        it('should be able sum up any given list of numbers list of numbers', function () {
            expectEqual(sum(range(1, 5)), 15);
            expectEqual(sum(range(-5, -1)), -15);
        });
        it('should return `0` when receiving an empty list', function () {
            expectEqual(sum(range()), 0);
        });
        it('should throw an error when receiving nothing (`null` or `undefined`)', function () {
            assert.throws(function () {
                return sum(null);
            }, Error);
            assert.throws(function () {
                return sum(undefined);
            }, Error);
            assert.throws(function () {
                return sum();
            }, Error);
        });
    });

    describe('#product', function () {
        it('should be able return the product of a given list', function () {
            expectEqual(product(range(1, 5)), 120);
            expectEqual(product(range(-5, -1)), -120);
        });
        it('should return `0` when receiving an empty list', function () {
            expectEqual(product(range()), 1);
        });
        it('should throw an error when receiving nothing (`null` or `undefined`)', function () {
            assert.throws(function () {
                return product(null);
            }, Error);
            assert.throws(function () {
                return product(undefined);
            }, Error);
            assert.throws(function () {
                return product();
            }, Error);
        });
    });

    describe('#maximum', function () {
        it('should be able return the maximum of a given list', function () {
            expectEqual(maximum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 5);
            expectEqual(maximum(range(-5, -1).concat([-3, -5, -7])), -1);
        });
        it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', function () {
            assert.throws(function () {
                return maximum(null);
            }, Error);
            assert.throws(function () {
                return maximum(undefined);
            }, Error);
            // expectEqual(minimum([]), Infinity);
            assert.throws(function () {
                return maximum();
            }, Error);
        });
    });

    describe('#minimum', function () {
        it('should be able return the minimum of a given list', function () {
            expectEqual(minimum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 1);
            expectEqual(minimum(range(-5, -1).concat([-3, -5, -7])), -7);
        });
        it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', function () {
            assert.throws(function () {
                return minimum(null);
            }, Error);
            assert.throws(function () {
                return minimum(undefined);
            }, Error);
            // expectEqual(minimum([]), Infinity);
            assert.throws(function () {
                return minimum();
            }, Error);
        });
    });

    describe('#mapAccumL', function () {
        it('should map a functionOps/operation on every item of a list and it should return a tuple containing the ' + 'accumulated value and the an instance of passed in container with mapped items', function () {
            var xs1 = [],
                xs2 = '',
                xs3 = [];

            var list0 = [1, 2, 3, 4, 5],
                list1 = 'hello world',
                list2 = list1.split(''),
                stringOp = function stringOp(agg, item) {
                return String.fromCharCode(item.charCodeAt(0) + 1);
            },
                numberOp = function numberOp(agg, item) {
                return item * 2;
            },
                result0 = mapAccumL(function (agg, item) {
                var mappedValue = numberOp(agg, item);
                agg += mappedValue;
                xs1.push(mappedValue);
                return [agg, xs1];
            }, 0, list0),
                result1 = mapAccumL(function (agg, item) {
                var mappedValue = stringOp(agg, item);
                agg += mappedValue;
                xs2 += mappedValue;
                return [agg, xs2];
            }, '', list1),
                result2 = mapAccumL(function (agg, item) {
                var mappedValue = stringOp(agg, item);
                agg.push(mappedValue);
                xs3.push(mappedValue);
                return [agg, xs3];
            }, [], list1);

            expectTrue(all(function (tuple) {
                var reducedForCompare = foldl(function (agg, item, ind) {
                    // log(agg, item, tuple[0][1][ind], xs2);
                    if (Array.isArray(agg)) {
                        agg.push(tuple[2](agg, item, ind));
                    } else {
                        agg += tuple[2](agg, item, ind);
                    }
                    return agg;
                }, tuple[3], tuple[1]);
                // log(tuple[0][0], reducedForCompare);
                // Check that mapped have equal length
                return length(tuple[0][1]) === length(tuple[1]) &&
                // Check aggregated are equal
                shallowCompareOnLeft(tuple[0][0], reducedForCompare);
            }, [
            // Result, list, expected accumulation
            [result0, list0, numberOp, 0], [result1, list1, stringOp, ''], [result2, list2, stringOp, []]]));
        });
    });

    describe('#mapAccumR', function () {
        it('should map a functionOps/operation on every item of a list and it should return a tuple containing the ' + 'accumulated value and the an instance of passed in container with mapped items', function () {
            var xs1 = [],
                xs2 = '',
                xs3 = [];

            var list0 = [1, 2, 3, 4, 5],
                list1 = 'hello world',
                list2 = list1.split(''),
                stringOp = function stringOp(agg, item) {
                return String.fromCharCode(item.charCodeAt(0) + 1);
            },
                numberOp = function numberOp(agg, item) {
                return item * 2;
            },
                result0 = mapAccumR(function (agg, item) {
                var mappedValue = numberOp(agg, item);
                agg += mappedValue;
                xs1.push(mappedValue);
                return [agg, xs1];
            }, 0, list0),
                result1 = mapAccumR(function (agg, item) {
                var mappedValue = stringOp(agg, item);
                agg += mappedValue;
                xs2 += mappedValue;
                return [agg, xs2];
            }, '', list1),
                result2 = mapAccumR(function (agg, item) {
                var mappedValue = stringOp(agg, item);
                agg.push(mappedValue);
                xs3.push(mappedValue);
                return [agg, xs3];
            }, [], list1);

            expectTrue(all(function (tuple) {
                var reducedForCompare = foldr(function (agg, item, ind) {
                    // log(agg, item, tuple[0][1][ind], xs2);
                    if (Array.isArray(agg)) {
                        agg.push(tuple[2](agg, item, ind));
                    } else {
                        agg += tuple[2](agg, item, ind);
                    }
                    return agg;
                }, tuple[3], tuple[1]);
                // log(tuple[0][0], reducedForCompare);
                // Check that mapped have equal length
                return length(tuple[0][1]) === length(tuple[1]) &&
                // Check aggregated are equal
                shallowCompareOnLeft(tuple[0][0], reducedForCompare);
            }, [
            // Result, list, expected accumulation
            [result0, list0, numberOp, 0], [result1, list1, stringOp, ''], [result2, list2, stringOp, []]]));
        });
    });

    describe('#unfoldr', function () {
        it('should be able to unfold any value from right to left.', function () {
            expectShallowEquals(unfoldr(function (minuend) {
                var diff = minuend - 1;
                return diff >= 0 ? [minuend, diff] : undefined;
            }, 10), reverse(range(1, 10)));
        });
    });

    describe('#take', function () {
        var hello = 'hello';
        it('should return taken items from listOps and/or stringOps until limit', function () {
            var word = hello;

            // Test `take` on word parts and word (listOps and stringOps)
            strToArray(word).forEach(function (part, ind, wordParts) {
                // Get human index (counting from `1`) and preliminaries
                var humanInd = ind + 1,
                    takenFromArray = take(humanInd, wordParts),
                    takenFromStr = take(humanInd, word),
                    expectedWordPart = word.substring(0, humanInd);

                // Ensure expected length was taken
                compose(expectEqual(humanInd), length)(takenFromArray);
                compose(expectEqual(humanInd), length)(takenFromStr);

                // Ensure correct items at said indices were taken
                expectEqual(expectedWordPart, takenFromArray.join(''));
                expectEqual(expectedWordPart, takenFromStr);
            });
        });
        it('should return an empty listOps and/or stringOps when called with `0` as the first argument', function () {
            compose(expectEqual(0), length, take(0))(split('', hello));
            compose(expectEqual(0), length, take(0))(hello);
        });
        it('should return an empty listOps and/or stringOps when called with with an empty listOps or stringOps', function () {
            var count = 5;
            while (count) {
                compose(expectEqual(0), length, take(count))('');
                compose(expectEqual(0), length, take(count))([]);
                --count;
            }
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe('#drop', function () {
        var hello = 'hello';
        it('should return a new listOps/stringOps with dropped items from original until limit', function () {
            var word = hello,
                wordParts = strToArray(word),
                partsLength = wordParts.length - 1;

            // Test `take` on word parts and word (listOps and stringOps)
            wordParts.forEach(function (part, ind, wordParts) {
                // Get human index (counting from `1`) and preliminaries
                var humanInd = ind + 1,
                    takenFromArray = drop(humanInd, wordParts),
                    takenFromStr = drop(humanInd, word),
                    expectedWordPart = word.substring(humanInd);

                // Ensure expected length was taken
                compose(expectEqual(partsLength - ind), length)(takenFromArray);
                compose(expectEqual(partsLength - ind), length)(takenFromStr);

                // Ensure correct items at said indices were taken
                expectEqual(expectedWordPart, takenFromArray.join(''));
                expectEqual(expectedWordPart, takenFromStr);
            });
        });
        it('should return entire listOps and/or stringOps when called with `0` as the first argument', function () {
            compose(expectEqual(length(hello)), length, drop(0))(split('', hello));
            compose(expectEqual(length(hello)), length, drop(0))(hello);
        });
        it('should return an empty listOps and/or stringOps when called with with an empty listOps or stringOps', function () {
            var count = 5;
            while (count) {
                compose(expectEqual(0), length, drop(count))('');
                compose(expectEqual(0), length, drop(count))([]);
                --count;
            }
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe('#splitAt', function () {
        var word = 'hello',
            phraseAppendage = ' world',
            phrase = '' + word + phraseAppendage,
            phraseLen = length(phrase),
            wordLen = length(word),
            phraseAppendageLen = length(phraseAppendage);

        it('should split an listOps and/or stringOps at given index', function () {
            var result = splitAt(wordLen, phrase),
                result2 = splitAt(wordLen, phrase.split(''));

            // Ensure returned type for stringOps case is correct
            expectTrue(typeof result[0] === 'string');
            expectTrue(typeof result[1] === 'string');

            // Expect returned stringOps parts are equal
            expectEqual(result[0], word);
            expectEqual(result[1], phraseAppendage);

            // Ensure returned type for listOps use case is correct
            expectTrue(Array.isArray(result2[0]));
            expectTrue(Array.isArray(result2[1]));

            // Ensure returned listOps parts are equal
            expectEqual(length(result2[0]), wordLen);
            expectEqual(length(result2[1]), phraseAppendageLen);

            // Check each char/element in returned parts for listOps use case
            [word, phraseAppendage].forEach(function (str, ind) {
                return expectTrue(str.split('').every(function (char, ind2) {
                    return result2[ind][ind2] === char;
                }));
            });
        });
        it('should return an listOps of empty listOps and/or stringOps when receiving an empty one of either', function () {
            splitAt(3, []).concat(splitAt(2, '')).forEach(expectLength(0));
        });
        it('should return entirely, passed in, listOps and/or stringOps as second part of ' + 'split in return when `0` is passed in as the first param', function () {
            var splitPhrase = phrase.split('');
            expectTrue(splitAt(0, phrase).concat(splitAt(0, splitPhrase)).every(function (retVal, ind) {
                return (
                    // Only check even indices (due to concat above empty side of split is an
                    //  `odd` numberOps index)
                    (ind + 1) % 2 === 0 ?

                    // Length of left hand side split result
                    length(retVal) === phraseLen &&

                    // Left hand side split result
                    // Log results and do
                    // "Else is empty right hand side split result" (empty result)
                    splitPhrase.every(function (char, ind2) {
                        return retVal[ind2] === char;
                    }) /* && !log(ind, retVal) */ : true
                );
            }));
        });
    });

    describe('#takeWhile', function () {
        it('should take elements while predicate is fulfilled', function () {
            var word = 'abcdefg',
                expectedResult = word.split('e')[0],
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct length of items in returned element
                    /*!log(result) && */
                    length(expectedResult) === length(result) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === expectedResult[ind];
                    }, result)
                );
            },
            // Use cases (one with stringOps other with listOps)
            [takeWhile(predicate, word.split('')), takeWhile(predicate, word)]));
        });
        it('should return an empty type instance if predicate is not matched at all', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return x === 'z';
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure no items returned
                    /*!log(result) && */
                    length(result) === 0
                );
            }, [takeWhile(pred, word.split('')), takeWhile(pred, word)]));
        });
        it('should return a copy of type instance if predicate is matched all the way through', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return x !== 'z';
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure no items returned
                    /*!log(result) && */
                    length(result) === length(word)
                );
            }, [takeWhile(pred, word.split('')), takeWhile(pred, word)]));
        });
    });

    describe('#dropWhile', function () {
        it('should drop elements while predicate is fulfilled', function () {
            var word = 'abcdefg',
                expectedResult = word.substring(word.indexOf('e'), length(word)),
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct length of items in returned element
                    /*!log(result, expectedResult) &&*/
                    length(expectedResult) === length(result) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === expectedResult[ind];
                    }, result)
                );
            },
            // Use cases (one with stringOps other with listOps)
            [dropWhile(predicate, word.split('')), dropWhile(predicate, word)]));
        });
        it('should return an empty type instance if predicate is matched all the way through', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return word.indexOf(x) > -1;
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure no items returned
                    /*!log(result) && */
                    length(result) === 0
                );
            }, [dropWhile(pred, word.split('')), dropWhile(pred, word)]));
        });
        it('should return an a copy of the passed in type instance if predicate doesn\'t match any elements', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return x === 'z' > -1;
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct lengths returned
                    /*!log(result) && */
                    length(result) === length(word) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === word[ind];
                    }, result)
                );
            },
            // Use cases
            [dropWhile(pred, word.split('')), dropWhile(pred, word)]));
        });
    });

    describe('#dropWhileEnd', function () {
        it('should drop elements while predicate is fulfilled', function () {
            var word = 'abcdefg',
                expectedResult = word.substring(0, word.indexOf('e')),
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct length of items in returned element
                    // !log(result, expectedResult) &&
                    length(expectedResult) === length(result) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === expectedResult[ind];
                    }, result)
                );
            },
            // Use cases (one with stringOps other with listOps)
            [dropWhileEnd(predicate, word.split('')), dropWhileEnd(predicate, word)]));
        });
        it('should return an empty type instance if predicate is matched all the way through', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return word.indexOf(x) > -1;
            },
                lenWord = length(word);

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure all items returned
                    // !log(result) &&
                    length(result) === lenWord
                );
            }, [dropWhileEnd(pred, word.split('')), dropWhileEnd(pred, word)]));
        });
        it('should return an a copy of the passed in type instance if predicate doesn\'t match any elements', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return x === 'z' > -1;
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct lengths returned
                    // /!*!log(result) && *!/
                    length(result) === length(word) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === word[ind];
                    }, result)
                );
            },
            // Use cases
            [dropWhileEnd(pred, word.split('')), dropWhileEnd(pred, word)]));
        });
    });

    describe('#span', function () {
        it('should take elements into first listOps while predicate is fulfilled and elements ' + 'that didn\'t match into second listOps', function () {
            var word = 'abcdefg',
                expectedResults = [word.substring(0, 4), word.substring(4)],
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (tuple) {
                return length(expectedResults) === length(tuple) && all(function (tuplePart, ind) {
                    return (
                        // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                        // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all(function (x, ind2) {
                            return x === expectedResults[ind][ind2];
                        }, tuplePart)
                    );
                }, tuple);
            },
            // Use cases (one with stringOps other with listOps)
            [span(predicate, word.split('')), span(predicate, word)]));
        });
        it('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(all(function (tuple) {
                return length(tuple) === 2 && all(function (tuplePart, ind) {
                    return (isString(tuplePart) || isArray(tuplePart)) && length(tuplePart) === 0;
                }, tuple);
            }, [span(function (a) {
                return a;
            }, ""), span(function (x) {
                return x;
            }, [])]));
        });
    });

    describe('#breakOnList', function () {
        it('should take elements into first listOps while !predicate is fulfilled and elements ' + 'that didn\'t match into second listOps', function () {
            var word = 'abcdefg',
                expectedResults = [word.substring(0, 4), word.substring(4)],
                predicate = function predicate(x) {
                return x === 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (tuple) {
                return length(expectedResults) === length(tuple) && all(function (tuplePart, ind) {
                    return (
                        // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                        // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all(function (x, ind2) {
                            return x === expectedResults[ind][ind2];
                        }, tuplePart)
                    );
                }, tuple);
            },
            // Use cases (one with stringOps other with listOps)
            [breakOnList(predicate, word.split('')), breakOnList(predicate, word)]));
        });
        it('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(all(function (tuple) {
                return length(tuple) === 2 && all(function (tuplePart, ind) {
                    return (isString(tuplePart) || isArray(tuplePart)) && length(tuplePart) === 0;
                }, tuple);
            }, [breakOnList(function (a) {
                return a;
            }, ""), breakOnList(function (x) {
                return x;
            }, [])]));
        });
    });

    describe('#stripPrefix', function () {
        it('should be able to strip a prefix from a list', function () {
            expectShallowEquals(stripPrefix('abc', alphabetArray.slice(0, 10)), alphabetArray.slice(3, 10));

            expectShallowEquals(stripPrefix('abc', alphabetString.substring(0, 10)), alphabetString.substring(3, 10));
        });
        it('should return a copy of the passed in list when prefix is not found', function () {
            expectShallowEquals(stripPrefix('!*&', alphabetArray), alphabetArray);
            expectEqual(stripPrefix('!*&', alphabetString), alphabetString);
            expectEqual(stripPrefix('!*&', ''), '');
            expectShallowEquals(stripPrefix('!*&', []), []);
        });
        it('should throw an error when receiving nothing in either position', function () {
            assert.throws(function () {
                return stripPrefix(null, 'abc');
            }, Error);
            assert.throws(function () {
                return stripPrefix(null, null);
            }, Error);
            assert.throws(function () {
                return stripPrefix('abc', null);
            }, Error);
        });
    });

    describe('#group', function () {
        it('should return a list of lists which contain the (sequential) matches', function () {
            var expectedResultFlattened = ['M', 'i', 'ss', 'i', 'ss', 'i', 'pp', 'i'];
            expectShallowEquals(group('Mississippi'), expectedResultFlattened);
            expectShallowEquals(
            // Flatten results first
            group('Mississippi'.split('')).map(function (item) {
                return item.join('');
            }), expectedResultFlattened);
        });
        it('should return a list of lists containing individual ungrouped items', function () {
            expectShallowEquals(group(alphabetString), alphabetArray);
            expectShallowEquals(
            // Flatten result first
            group(alphabetArray).map(function (item) {
                return item.join('');
            }), alphabetArray);
        });
    });

    describe('#inits', function () {
        it('should unfold a list into list of all possible ' + 'non-omitting sequential sets that start with initial item', function () {
            expectTrue(all(function (item, ind, original) {
                return length(item) === ind;
            }, inits(alphabetString)));
            expectTrue(all(function (item, ind, original) {
                return length(item) === ind;
            }, inits(alphabetArray)));
        });
    });

    describe('#tails', function () {
        it('should unfold a list into list of all possible ' + 'non-omitting sequential sets that start with the last item', function () {
            var limit = length(alphabetString);
            expectTrue(all(function (item, ind) {
                var headOfLast = head(item);
                // log (headOfLast, alphabetString[ind]);//, resultList);
                return length(item) ? length(item) === limit - ind && headOfLast === alphabetString[ind] : true;
            }, tails(alphabetString)));
            expectTrue(all(function (item, ind) {
                var headOfLast = head(item);
                //log (headOfLast, alphabetString[ind]);
                return length(item) ? length(item) === limit - ind && headOfLast === alphabetArray[ind] : true;
            }, tails(alphabetArray)));
        });
    });

    describe('#isPrefixOf', function () {
        it('should return `true` when a list is a prefix of another', function () {
            expectTrue(all(isPrefixOf('abc'), splitAt(3, inits(alphabetString))[1]));
            expectTrue(all(isPrefixOf('abc'.split('')), splitAt(3, inits(alphabetArray))[1]));
        });
        it('should return `false` when a list is not prefix of second list', function () {
            expectTrue(all(negateP(isPrefixOf('!@#')), splitAt(3, inits(alphabetString))[1]));
            expectTrue(all(negateP(isPrefixOf('!@#'.split(''))), splitAt(3, inits(alphabetArray))[1]));
        });
    });

    describe('#isSuffixOf', function () {
        it('should return `true` when a list is a suffix of another', function () {
            var candidateString = splitAt(length(alphabetString) - 2, tails(alphabetString))[0];
            // log (candidateString);
            expectTrue(all(isSuffixOf('xyz'), candidateString));
            expectTrue(all(isSuffixOf('xyz'.split('')), splitAt(length(alphabetArray) - 2, tails(alphabetArray))[0]));
        });
        it('should return `false` when a list is not suffix of second list', function () {
            expectTrue(all(negateP(isSuffixOf('!@#')), splitAt(length(alphabetString) - 2, tails(alphabetString))[0]));
            expectTrue(all(negateP(isSuffixOf('!@#'.split(''))), splitAt(length(alphabetString) - 2, tails(alphabetArray))[0]));
        });
    });

    describe('#isInfixOf', function () {
        it('should return `true` when a list is infixed with another', function () {
            var results = concatMap(function (candidate) {
                return [isInfixOf(candidate, alphabetString), isInfixOf(candidate, alphabetArray)];
            }, ['abc', 'efg', 'xyz']);
            //log(results);
            expectTrue(and(results));
        });
        it('should return `false` when a list is not infix of second list', function () {
            expectTrue(and([negateP(isInfixOf('!@#'))(alphabetString), negateP(isInfixOf('!@#'.split(''))(alphabetArray))]));
        });
    });

    describe('#isSubsequenceOf', function () {
        it('should return true a list is sub-sequence of another.', function () {
            var listToSearchIn = take(6, alphabetString);
            expectTrue(all(function (listToSearchFor) {
                return isSubsequenceOf(listToSearchFor, listToSearchIn);
            }, ['bdf', 'ace', 'abc', 'def']));
        });
        it('should return false a list is not sub-sequence of another.', function () {
            var listToSearchIn = take(6, drop(6, alphabetString));
            expectTrue(all(function (listToSearchFor) {
                return !isSubsequenceOf(listToSearchFor, listToSearchIn);
            }, ['bdf', 'ace', 'abc', 'def']));
        });
    });

    describe('#elem', function () {
        it('should return `true` when the element is found in given list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return !!elem(elm2, arr);
                }, word);
            }, [word.split(''), word]));
        });
        it('should return `false` when element is not found in given list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return !elem('z', arr);
                }, elm);
            }, [word.split(''), word]));
        });
    });

    describe('#notElem', function () {
        it('should return `false` when the element is found in given list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return !notElem(elm2, arr);
                }, word);
            }, [word.split(''), word]));
        });
        it('should return `true` when element is not found in given list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return notElem('z', arr);
                }, elm);
            }, [word.split(''), word]));
        });
    });

    describe('#lookup', function () {
        it('should return found value when key is set on type instance', function () {
            var word = 'hello world',
                obj = word.split('').reduce(function (agg, item) {
                agg[item] = item + ' value';
                return agg;
            }, {});
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2) {
                    return lookup(elm2, obj) === elm2 + ' value';
                }, word);
            }, [word.split(''), word]));
        });
        it('should return `undefined` when element is not found in given list', function () {
            var word = 'hello world',
                obj = word.split('').reduce(function (agg, item) {
                agg[item] = item + ' value';
                return agg;
            }, {});
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return lookup('z', obj) === undefined;
                }, elm);
            }, [word.split(''), word]));
        });
    });

    describe('#find', function () {
        it('should should find element that matches predicate when element is in given list', function () {
            var word = 'word',
                pred = function pred(x) {
                return x === 'o';
            };
            expectEqual(find(pred, word), 'o');
            expectEqual(find(pred, word.split('')), 'o');
        });
        // @todo add more tests
    });

    describe('#filter', function () {
        it('should be able to filter a list by a predicate.', function () {
            var pred = function pred(_, ind) {
                return ind % 2 === 0;
            };
            expectShallowEquals(filter(pred, alphabetString), alphabetString.split('').filter(pred));
            expectShallowEquals(filter(pred, alphabetArray), alphabetString.split('').filter(pred));
        });
        it('should return an empty list when no items match predicate', function () {
            var pred = function pred(char) {
                return char === '#';
            };
            expectShallowEquals(filter(pred, alphabetString), '');
            expectShallowEquals(filter(pred, alphabetArray), []);
        });
    });

    describe('#partition', function () {
        it('should take elements into first listOps while predicate is fulfilled and elements ' + 'that didn\'t match into second listOps', function () {
            var word = 'abcdefg',
                expectedResults = ['abcdfg', 'e'],
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (tuple) {
                return length(expectedResults) === length(tuple) && all(function (tuplePart, ind) {
                    return (
                        // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                        // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all(function (x, ind2) {
                            return x === expectedResults[ind][ind2];
                        }, tuplePart)
                    );
                }, tuple);
            },
            // Use cases (one with stringOps other with listOps)
            [partition(predicate, word.split('')), partition(predicate, word)]));
        });
        it('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(all(function (tuple) {
                return length(tuple) === 2 && all(function (tuplePart, ind) {
                    return (isString(tuplePart) || isArray(tuplePart)) && length(tuplePart) === 0;
                }, tuple);
            }, [partition(function (a) {
                return a;
            }, ""), partition(function (x) {
                return x;
            }, [])]));
        });
    });

    describe('#at', function () {
        it('should return an item at a given key/index.', function () {
            [alphabetString, alphabetArray].forEach(function (subject) {
                var subjectLastInd = length(subject) - 1;
                expectEqual(at(0, subject), subject[0]);
                expectEqual(at(5, subject), subject[5]);
                expectEqual(at(subjectLastInd, subject), subject[subjectLastInd]);
            });
        });
        it('should return `undefined` when list has no length.', function () {
            expectEqual(at(0, ''), undefined);
            expectEqual(at(0, []), undefined);
        });
    });

    describe('#elemIndex', function () {
        it('should return the index where the element is found', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return elemIndex(elm2, arr) === word.indexOf(elm2);
                }, elm);
            }, [word.split(''), word]));
        });
        it('should return `undefined` when element is not in list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return elemIndex('z', arr) === undefined;
                }, elm);
            }, [word.split(''), word]));
        });
    });

    describe('#elemIndices', function () {
        it('should return all found element indices in a list', function () {
            var nums = range(0, 22),
                word = nums.join(''),
                predicate = function predicate(x) {
                return x.indexOf('1') > -1;
            },
                indices = word.split('').reduce(function (agg, item, ind) {
                if (predicate(item)) {
                    agg.push(ind);
                }
                return agg;
            }, []);

            expectTrue(
            // Ensure cases for each use case
            all(function (list) {
                return all(function (item, ind) {
                    return list[ind] === item;
                }, indices);
            }, [elemIndices('1', word), elemIndices('1', word.split(''))]));
        });
        // @todo add more tests
    });

    describe('#findIndex', function () {
        var word = 'abcdefg';
        it('should find an index where predicate is satisfied', function () {
            expectTrue(word.split('').every(function (char, ind, arr) {
                return findIndex(function (x, ind2) {
                    return ind === ind2 && x === word[ind];
                }, arr) === ind;
            }));
        });
    });

    describe('#findIndices', function () {
        it('should', function () {
            var token = 'aecedegefehea',
                tokenParts = token.split(''),
                eIndices = [1, 3, 5, 7, 9, 11],
                notEIndices = [0, 2, 4, 6, 8, 10, 12],
                aIndices = [0, 12],
                noIndices = [],
                indiceTests = [[findIndices(function (x) {
                return x === 'e';
            }), eIndices], [findIndices(function (x) {
                return x !== 'e';
            }), notEIndices], [findIndices(function (x) {
                return x === 'a';
            }), aIndices], [findIndices(function (x) {
                return false;
            }), noIndices]];
            // expectTrue(
            //     all(xs =>
            //         all((key, ind2) => key === args[1][ind2], args[0](xs)),
            //         [token, tokenParts])
            // );
            // @todo add tests
        });
    });

    describe('#zip', function () {
        it('should be able to zip two lists into a list of tuples (list of two items).', function () {
            var _splitAt = splitAt(length(alphabetArray) / 2, alphabetArray),
                _splitAt2 = _slicedToArray(_splitAt, 2),
                list1 = _splitAt2[0],
                list2 = _splitAt2[1],
                result = zip(list1, list2),
                expectedResult = foldl(function (agg, item, ind) {
                agg.push([item, list2[ind]]);
                return agg;
            }, [], list1);
            // log (list1, list2); // two halves of alphabet array


            expectTrue(all(function (x) {
                return 13;
            }, [length(list1), length(list2)]));
            expectEqual(length(result), length(expectedResult));
            expectTrue(all(function (tuple, ind) {
                return tuple[0] === expectedResult[ind][0] && tuple[1] === expectedResult[ind][1];
            }, result));
        });
        it('should return an empty list when empty lists are passed', function () {
            expectShallowEquals(zip([], []), []);
        });
        it('should return a copy of the passed in populated list when one of them is not populated.', function () {
            expectShallowEquals(zip([], alphabetArray), alphabetArray);
            expectShallowEquals(zip(alphabetArray, []), alphabetArray);
        });
    });

    describe('#zipN', function () {
        it('should be able to zip the given number of lists.', function () {
            // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
            var subj = unfoldr(function (remainder) {
                return !length(remainder) ? undefined : splitAt(5, remainder);
            }, take(25, alphabetArray)),
                subj2 = [range(1, 5), range(8, 13), [], range(13, 21), []],
                subj3 = [[], range(21, 34), range(34, 55)],
                zipNResult = zipN.apply(null, subj),
                zipNResult2 = zipN.apply(null, subj2);

            // log(zipNResult, zipNResult2);

            expectTrue(all(function (tuple) {
                return all(function (list, ind) {
                    return all(function (item, ind2) {
                        return (
                            // !log(item, tuple[1][ind2][ind]) &&
                            item === tuple[1][ind2][ind]
                        );
                    }, list);
                }, tuple[0]);
            }, [[zipNResult, filter(length, subj)], [zipNResult2, filter(length, subj2)]]));
        });
        it('should return an empty list when empty lists are passed in', function () {
            expectShallowEquals(zipN([], []), []);
        });
        it('should return a copy of the left or right populated list when the other(s) is/are empty.', function () {
            expectShallowEquals(zipN([], alphabetArray), alphabetArray);
            expectShallowEquals(zipN(alphabetArray, []), alphabetArray);
        });
    });

    describe('#zipWith', function () {
        var tuplize = function tuplize(a, b) {
            return [a, b];
        };
        it('should be able to zip the given number of lists.', function () {
            // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
            var subj = unfoldr(function (remainder) {
                return !length(remainder) ? undefined : splitAt(5, remainder);
            }, take(25, alphabetArray)),
                subj2 = [range(1, 5), range(8, 13), [], range(13, 21), []],
                subj3 = [[], range(21, 34), range(34, 55)],
                zipWithResult = zipWith.apply(undefined, [tuplize].concat(_toConsumableArray(subj))),
                zipWithResult2 = zipWith.apply(undefined, [tuplize].concat(subj2));

            // log(zipWithResult, zipWithResult2);

            expectTrue(all(function (tuple) {
                return all(function (list, ind) {
                    return all(function (item, ind2) {
                        return (
                            // !log(item, tuple[1][ind2][ind]) &&
                            item === tuple[1][ind2][ind]
                        );
                    }, list);
                }, tuple[0]);
            }, [[zipWithResult, filter(length, subj)], [zipWithResult2, filter(length, subj2)]]));
        });
        it('should return an empty list when empty lists are passed', function () {
            expectShallowEquals(zipWith(tuplize, [], []), []);
        });
        it('should return a copy of the passed in populated list when one of them is not populated.', function () {
            expectShallowEquals(zipWith(tuplize, [], alphabetArray), alphabetArray);
            expectShallowEquals(zipWith(tuplize, alphabetArray, []), alphabetArray);
        });
    });

    describe('#unzip', function () {
        it('should be able to unzip a list of tuples of two.', function () {
            var subj = unfoldr(function (remainder) {
                return !length(remainder) ? undefined : splitAt(2, remainder);
            }, alphabetArray),
                lenAlphaArray = length(alphabetArray),
                result = unzip(subj);

            // First ensure our subject is valid
            // --------------------------------------
            // Check that we have tuples of two (list of two in javascript's/our case)
            expectTrue(all(function (tuple) {
                return length(tuple) === 2;
            }, subj));

            // Ensure subject has expected length of items (tuples)
            expectEqual(length(subj), lenAlphaArray / 2);

            // Test result
            // ----------------
            // Ensure we have two lists (one for each part of tuple in `subj`).
            expectEqual(length(result), 2);

            // Ensure both lists in result have the expected length
            expectTrue(all(function (list) {
                return length(list) === lenAlphaArray / 2;
            }, result));

            // log (subj, result);

            // Ensure resulting lists contain expected items
            expectTrue(all(function (list, i) {
                return all(function (item, j) {
                    return item === subj[j][i];
                }, list);
            }, result));
        });
        // @todo Add more tests
    });

    describe('#unzipN', function () {
        it('should be able to unzip a list of tuples of any number.', function () {
            var subj = unfoldr(function (remainder) {
                return !length(remainder) ? undefined : splitAt(2, remainder);
            }, alphabetArray),
                lenAlphaArray = length(alphabetArray),
                result = unzipN(subj);

            log(subj, result);

            // First ensure our subject is valid
            // --------------------------------------
            // Check that we have tuples of two (list of two in javascript's/our case)
            expectTrue(all(function (tuple) {
                return length(tuple) === 2;
            }, subj));

            // Ensure subject has expected length of items (tuples)
            expectEqual(length(subj), lenAlphaArray / 2);

            // Test result
            // ----------------
            // Ensure we have two lists (one for each part of tuple in `subj`).
            expectEqual(length(result), 2);

            // Ensure both lists in result have the expected length
            expectTrue(all(function (list) {
                return length(list) === lenAlphaArray / 2;
            }, result));

            // Ensure resulting lists contain expected items
            expectTrue(all(function (list, i) {
                return all(function (item, j) {
                    return item === subj[j][i];
                }, list);
            }, result));
        });
        // @todo Add more tests
    });

    describe('#lines', function () {
        it('should split a string on all new line characters.', function () {
            var subj = intercalate('\n', alphabetArray),
                result = lines(subj);

            // log(length(subj), subj, result);

            // Ensure subject is valid first:
            // ------------------------------------
            // Expect new line char before every char except the first
            expectLength(length(alphabetArray) * 2 - 1, subj);

            // Check split string
            expectShallowEquals(alphabetArray, result);
        });
        it('should return original string when no new lines are found in string', function () {
            expectShallowEquals(lines('hello world'), ['hello world']);
            expectShallowEquals(lines(''), ['']);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return lines(null);
            }, Error);
            assert.throws(function () {
                return lines(undefined);
            }, Error);
        });
    });

    describe('#words', function () {
        it('should split a string on all whitespace characters.', function () {
            // subject | expectedLength | shallowEqualsTo
            var subjectsAndExpLens = [[intercalate(' ', alphabetArray), length(alphabetArray), alphabetArray], ['hello world', 2, ['hello', 'world']]];

            subjectsAndExpLens.forEach(function (tuple) {
                var _tuple = _slicedToArray(tuple, 3),
                    subj = _tuple[0],
                    expectedLen = _tuple[1],
                    shallowEqualsTo = _tuple[2],
                    result = words(subj);

                // log(expectedLen, subj, result);

                // Check length of result


                expectLength(expectedLen, result);

                // Check split string
                expectShallowEquals(shallowEqualsTo, result);
            });
        });
        it('should return a copy of original list when no whitespace characters are found.', function () {
            // subject | expectedLength | shallowEqualsTo
            var subjectsAndExpLens = [[alphabetString, 1, [alphabetString]], ['helloworld', 1, ['helloworld']]];

            subjectsAndExpLens.forEach(function (tuple) {
                var _tuple2 = _slicedToArray(tuple, 3),
                    subj = _tuple2[0],
                    expectedLen = _tuple2[1],
                    shallowEqualsTo = _tuple2[2],
                    result = words(subj);

                // log(expectedLen, subj, result);

                // Check length of result


                expectLength(expectedLen, result);

                // Check split string
                expectShallowEquals(shallowEqualsTo, result);
            });
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return words(null);
            }, Error);
            assert.throws(function () {
                return words(undefined);
            }, Error);
        });
    });

    describe('#unlines', function () {
        it('should join a list with new lines.', function () {
            ['hello world', alphabetString, alphabetArray].forEach(function (subj) {
                var result = unlines(subj);

                // check expected length
                expectLength(subj.length * 2 - 1, result);

                // Check items in resulted list
                expectShallowEquals(intersperse('\n', subj), result);
            });
        });
        it('should return empty lists when receiving empty lists', function () {
            expectEqual(unlines(''), '');
            expectShallowEquals(unlines([]), []);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return unlines(null);
            }, Error);
            assert.throws(function () {
                return unlines(undefined);
            }, Error);
        });
    });

    describe('#unwords', function () {
        it('should join a list of words with spaces.', function () {
            ['hello world', alphabetString, alphabetArray].forEach(function (subj) {
                var result = unwords(subj);

                // console.log('unwords', result);

                // check expected length
                expectLength(subj.length * 2 - 1, result);

                // Check items in resulted list
                expectShallowEquals(intersperse(' ', subj), result);
            });
        });
        it('should return empty lists when receiving empty lists', function () {
            expectEqual(unwords(''), '');
            expectShallowEquals(unwords([]), []);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return unwords(null);
            }, Error);
            assert.throws(function () {
                return unwords(undefined);
            }, Error);
        });
    });

    describe('#nub', function () {
        it('should remove all but first occurrences of repeat items in a list.', function () {
            expectEqual(nub('conundrum'), 'conudrm');
            expectEqual(nub(map(function (char) {
                return char + char;
            }, alphabetString)), alphabetString);
            expectShallowEquals(nub(concatMap(function (char) {
                return char + char;
            }, alphabetString).split('')), alphabetArray);
        });
        it('should return a copy of the passed in list with items intact if there ' + 'aren\'t any repeat items', function () {
            expectEqual(nub(alphabetString), alphabetString);
            expectShallowEquals(nub(alphabetArray), alphabetArray);
        });
        it('should return empty lists when receiving empty lists', function () {
            expectEqual(nub(''), '');
            expectShallowEquals(nub([]), []);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return nub(null);
            }, Error);
            assert.throws(function () {
                return nub(undefined);
            }, Error);
        });
    });

    describe('#remove', function () {
        // same as `delete` (in haskell)
        it('should remove the first occurrence of an item in a list.', function () {
            expectEqual(remove('l', 'hello world'), 'helo world');
            expectEqual(remove('l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(remove('a', alphabetString), tail(alphabetString));
            expectEqual(remove('z', alphabetString), init(alphabetString));
            expectShallowEquals(remove('a', alphabetArray), tail(alphabetArray));
            expectShallowEquals(remove('z', alphabetArray), init(alphabetArray));
            // log(remove('d', alphabetString));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(remove('a', ''), '');
            expectShallowEquals(remove('a', []), []);
        });
        it('should throw Errors when receiving nothing in the list position', function () {
            assert.throws(function () {
                return remove(null, null);
            }, Error);
            assert.throws(function () {
                return remove(undefined, undefined);
            }, Error);
            assert.throws(function () {
                return remove(null, null);
            }, Error);
            assert.throws(function () {
                return remove(undefined, undefined);
            }, Error);
        });
    });

    describe('#complement', function () {
        it('should return an empty listOps when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, complement)();
        });
        it('should return an empty listOps if only one listOps is passed in', function () {
            compose(expectEqual(__, 0), length, complement)([1, 2, 3]);
        });
        it('should return elements not in first listOps passed to it', function () {
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
        it('should return an empty list when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, difference)();
        });
        it('should return an empty list when first list passed in is empty', function () {
            compose(expectEqual(__, 0), length)(difference([], alphabetArray));
            compose(expectEqual(__, 0), length)(difference('', alphabetString));
        });
        it('should return an empty list when there are no differences between the lists passed in', function () {
            compose(expectEqual(__, 0), length)(difference(alphabetArray, alphabetArray));
            compose(expectEqual(__, 0), length)(difference(alphabetString, alphabetString));
        });
        it('should return the difference between two arrays passed in', function () {
            var testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 0, []], [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 5, [4, 5, 6, 7, 8]], [[1, 2, 3, 4, 5], [1, 2, 3], 2, [4, 5]]];
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
        it('should return an empty listOps when receiving an empty listOps as parameter 1', function () {
            compose(expectEqual(__, 0), length, intersect)([]);
            compose(expectEqual(__, 0), length, intersect([]))([1, 2, 3]);
        });
        it('should return an empty listOps when receiving an empty listOps as parameter 2', function () {
            compose(expectEqual(__, 0), length, intersect([1, 2, 3]))([]);
        });
        it('should return an empty listOps when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, intersect([]))([]);
        });
        it('should return an empty listOps when no arrays are passed in', function () {
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
        // @todo Add more tests
    });

    describe('#sort', function () {
        it('should sort a list in ascending order', function () {
            expectShallowEquals(sort(range(10, 0, -1)), range(0, 10, 1));
            expectShallowEquals(sort(range(0, 10)), range(0, 10));
            compose(expectShallowEquals(__, alphabetArray), sort, reverse)(alphabetArray);
            compose(log, sort, reverse)(alphabetArray);
        });
        it('should return a copy of original list when said list is already sorted', function () {
            compose(expectShallowEquals(__, ['a', 'b', 'c']), sort, take(3))(alphabetArray);
            compose(expectShallowEquals(__, ['a', 'b', 'c']), sort, take(3))(alphabetArray);
            compose(expectShallowEquals(__, alphabetArray), sort)(alphabetArray);
            compose(expectShallowEquals(__, range(0, 10)), sort)(range(0, 10));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(sort([]), []);
        });
    });

    describe('#sortOn', function () {
        var identity = function identity(x) {
            return x;
        },
            sortOnIdentity = sortOn(identity),
            range0To10 = range(0, 10),
            range10To0 = range(10, 0, -1);
        it('should sort a list in ascending order', function () {
            expectShallowEquals(sortOnIdentity(range10To0), range0To10);
            expectShallowEquals(sortOnIdentity(range0To10), range0To10);
            compose(expectShallowEquals(__, alphabetArray), sortOnIdentity, reverse)(alphabetArray);
            compose(log, sortOnIdentity, reverse)(alphabetArray);
        });
        it('should return a copy of original list when said list is already sorted', function () {
            compose(expectShallowEquals(__, ['a', 'b', 'c']), sortOnIdentity, take(3))(alphabetArray);
            compose(expectShallowEquals(__, alphabetArray), sortOnIdentity)(alphabetArray);
            compose(expectShallowEquals(__, range0To10), sortOnIdentity)(range0To10);
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(sortOnIdentity([]), []);
        });
    });

    describe('#insert', function () {
        var injectValueAtIndex = function injectValueAtIndex(x, ind, list) {
            if (ind <= 0) {
                return [x].concat(list);
            } else if (ind > list.length - 1) {
                return list.concat([x]);
            }
            return list.slice(0, ind).concat([x], list.slice(ind));
        };
        it('Should insert a value directly before the first value that is less than or equal to it', function () {
            // expectShallowEquals(insert(99, range(0, 144, 5))
            var range0To145 = range(0, 145, 5),
                expectedResult = injectValueAtIndex(99, 20, range0To145),
                result = insert(99, range0To145),
                result1 = insert(99, reverse(range0To145)),
                result2 = insert('x', alphabetArray),
                result3 = insert('x', reverse(alphabetArray));
            // log (result1, result, expectedResult);
            expectShallowEquals(result, expectedResult);
            expectShallowEquals(result1, [99].concat(reverse(range0To145)));
            expectShallowEquals(result2, injectValueAtIndex('x', 24, alphabetArray));
            expectShallowEquals(result3, ['x'].concat(reverse(alphabetArray)));
        });
        it('should insert value even if passed in list is empty', function () {
            expectShallowEquals(insert(99, []), [99]);
            expectShallowEquals(insert('a', []), ['a']);
            expectShallowEquals(insert('a', ''), 'a');
        });
    });

    describe('#nubBy', function () {
        it('should remove all but first occurrences of repeat items in a list.', function () {
            expectEqual(nubBy(equal, 'conundrum'), 'conudrm');
            expectEqual(nubBy(equal, map(function (char) {
                return char + char;
            }, alphabetString)), alphabetString);
            expectShallowEquals(nubBy(equal, concatMap(function (char) {
                return char + char;
            }, alphabetString).split('')), alphabetArray);
        });
        it('should return a copy of the passed in list with items intact if there ' + 'aren\'t any repeat items', function () {
            expectEqual(nubBy(equal, alphabetString), alphabetString);
            expectShallowEquals(nubBy(equal, alphabetArray), alphabetArray);
        });
        it('should return empty lists when receiving empty lists', function () {
            expectEqual(nubBy(equal, ''), '');
            expectShallowEquals(nubBy(equal, []), []);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return nubBy(equal, null);
            }, Error);
            assert.throws(function () {
                return nubBy(equal, undefined);
            }, Error);
        });
    });

    describe('#removeBy', function () {
        it('should remove the first occurrence of an item in a list.', function () {
            expectEqual(removeBy(equal, 'l', 'hello world'), 'helo world');
            expectEqual(removeBy(equal, 'l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(removeBy(equal, 'a', alphabetString), tail(alphabetString));
            expectEqual(removeBy(equal, 'z', alphabetString), init(alphabetString));
            expectShallowEquals(removeBy(equal, 'a', alphabetArray), tail(alphabetArray));
            expectShallowEquals(removeBy(equal, 'z', alphabetArray), init(alphabetArray));
            // log(removeBy('d', alphabetString));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(removeBy(equal, 'a', ''), '');
            expectShallowEquals(removeBy(equal, 'a', []), []);
        });
        it('should throw Errors when receiving nothing in the list position', function () {
            assert.throws(function () {
                return removeBy(equal, null, null);
            }, Error);
            assert.throws(function () {
                return removeBy(equal, undefined, undefined);
            }, Error);
            assert.throws(function () {
                return removeBy(equal, null, null);
            }, Error);
            assert.throws(function () {
                return removeBy(equal, undefined, undefined);
            }, Error);
        });
    });

    describe('#removeFirstsBy', function () {
        var vowels = 'aeiou',
            vowelsArray = vowels.split(''),
            consonants = removeFirstsBy(equal, alphabetString, vowels),
            consonantsArray = consonants.split('');
        it('should remove all first occurrences of all items in second list by passed in ' + 'equality operation.', function () {
            // Remove first occurrences of `vowels` in `alphabet * 3`
            var subj1 = iterate(length(vowels), function (value, ind) {
                var foundInd = value.indexOf(vowels[ind]);
                if (foundInd > -1) {
                    var parts = splitAt(foundInd, value);
                    return concat([parts[0], tail(parts[1])]);
                }
                return value;
            }, concat([alphabetArray, alphabetArray, alphabetArray]));

            // Expect vowels removed from the same places in both lists
            expectTrue(all(function (tuple) {
                return !log(tuple) && tuple[0] === tuple[1];
            }, [[removeFirstsBy(equal, cycle(3, alphabetString), vowels), concat(subj1)]]));

            // Expect vowels removed from the same places in both lists
            expectShallowEquals(removeFirstsBy(equal, cycle(3, alphabetArray), vowelsArray), subj1);

            // log(removeFirstsBy(equal, cycle(3, alphabetArray), 'aeiou'.split('')));
            // log(removeFirstsBy(equal, cycle(3, alphabetString), 'aeiou'));
        });
        it('should return copy of original list when no items from second list are found in it.', function () {
            expectEqual(removeFirstsBy(equal, consonants, vowels), consonants);
            expectShallowEquals(removeFirstsBy(equal, consonantsArray, vowelsArray), consonantsArray);
        });
    });

    describe('#unionBy', function () {
        it('should have more tests written');
        // @todo Add more tests
    });

    describe('#intersectBy', function () {
        it('should have more tests written');
        // @todo Add more tests
    });

    describe('#groupBy', function () {
        it('should have more tests written');
        // @todo Add more tests
    });

    describe('#sortBy', function () {
        it('should have more tests written');
        // @todo Add more tests
    });

    describe('#insertBy', function () {
        it('should have more tests written');
        // @todo Add more tests
    });

    describe('#maximumBy', function () {
        it('should have more tests written');
        // @todo Add more tests
    });

    describe('#minimumBy', function () {
        it('should have more tests written');
        // @todo Add more tests
    });
});
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint global: describe:true,it:true */
/**
 * Created by elyde on 12/29/2016.
 * @todo ensure we are checking lengths in our operation results (to ensure accuracy of our tests).
 * @todo ensure expected types (either explicitly or implicitly) are being returned where necessary.
 * @todo Clean up 'test-listOpsUncurried' to look more like code that was written expecting uncurried functions not curried ones (code was copied from the tests for the curried version of 'listOps' package).
 */

describe('#listOpsUncurried', function () {

    var strToArray = split(''),
        generalEqualityCheck = function generalEqualityCheck(a, b) {
        return a === b;
    },
        genericOrdering = function genericOrdering(a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    };

    describe('#append', function () {
        it('should have more tests.');
    });

    describe('#appendMany', function () {
        it('should have more tests.');
    });

    describe('#head', function () {
        it('should return the first item in an listOps and/or stringOps.', function () {
            expectEqual(head('Hello'), 'H');
            expectEqual(head(split('', 'Hello')), 'H');
        });
        it('should return `undefined` when an empty listOps and/or stringOps is passed in', function () {
            expectEqual(undefined, head([]));
            expectEqual(undefined, head(''));
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(head, Error);
        });
    });

    describe('#last', function () {
        it('should return the last item in an listOps and/or stringOps.', function () {
            var word = 'Hello';
            compose(expectEqual('o'), last)(word);
            compose(expectEqual('o'), last, strToArray)(word);
        });
        it('should return `undefined` when an empty listOps is passed in', function () {
            expectEqual(undefined, last([]));
            expectEqual(undefined, last(''));
        });
        it('should throw an error when no parameters is passed in', function () {
            assert.throws(last, Error);
        });
    });

    describe('#init', function () {
        it('should return everything except the last item of an listOps and/or stringOps', function () {
            compose(expectEqual('orange'), function (xs) {
                return intercalate('', xs);
            }, init, strToArray)('oranges');
            compose(expectEqual('orange'), init)('oranges');
        });
        it('should return an empty listOps when an empty listOps and/or stringOps is passed in', function () {
            compose(expectEqual(0), length, init)([]);
            compose(expectEqual(0), length, init)('');
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(init, Error);
        });
    });

    describe('#tail', function () {
        it('should return everything except the last item of an listOps', function () {
            compose(expectEqual('ello'), function (xs) {
                return intercalate('', xs);
            }, tail, strToArray)('hello');
            compose(expectEqual('ello'), tail)('hello');
        });
        it('should return an empty listOps when receiving an empty listOps', function () {
            compose(expectEqual(0), length, tail)([]);
            compose(expectEqual(0), length, tail)('');
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe('#uncons', function () {
        it('should return the "head" and "tail" of a list in a two item array.', function () {
            expectShallowEquals(uncons('hello'), ['h', 'ello']);
            expectDeepEquals(uncons(split('', 'hello')), ['h', split('', 'ello')]);
        });
        it('should return an empty tail when there\'s only one item in list.', function () {
            expectShallowEquals(uncons('a'), ['a', '']);
            expectDeepEquals(uncons([0]), [0, []]);
        });
        it('should return `undefined` for empty lists.', function () {
            expectEqual(uncons(''), undefined);
            expectEqual(uncons([]), undefined);
        });
        it('should return `undefined` when no value is passed in or a falsy value is passed in', function () {
            expectEqual(uncons(null), undefined);
            expectEqual(uncons(undefined), undefined);
            expectEqual(uncons(), undefined);
            expectEqual(uncons(0), undefined);
            expectEqual(uncons(false), undefined);
            expectEqual(uncons(''), undefined);
        });
    });

    describe('#isEmpty (a.k.a. #`null`)', function () {
        it('should return `true` when a list is empty.', function () {
            expectTrue(isEmptyList([]));
            expectTrue(isEmptyList(''));
        });
        it('should return `false` when a list is not empty.', function () {
            expectFalse(isEmptyList(['a', 'b', 'c']));
            expectFalse(isEmptyList('abc'));
        });
        it('should throw an error when receiving something that is list like (doesn\'t have a `length` prop', function () {
            assert.throws(function () {
                return isEmptyList(null);
            }, Error);
            assert.throws(function () {
                return isEmptyList(undefined);
            }, Error);
            assert.throws(function () {
                return isEmptyList();
            }, Error);
        });
    });

    describe('#length', function () {
        it('is should return the length of any item that has a `length` property', function () {
            expectTrue(all(function (item) {
                return length(item[0]) === item[1];
            }, [[[], 0], ['abc', 3], [function (a, b, c) {}, 3]]));
        });
        it('should return `undefined` for items that don\'t have a `length` property', function () {
            expectEqual(length({}), undefined);
            expectEqual(length(0), undefined);
            expectEqual(length(false), undefined);
            expectEqual(length(true), undefined);
        });
        it('should throw an error when `undefined` or `null` is passed in', function () {
            assert.throws(length, Error);
            assert.throws(function () {
                return length(null);
            }, Error);
        });
    });

    describe('#map', function () {
        it('should be able to map a function over a list.', function () {
            var word = 'hello',
                op = function op(char) {
                return char + 'a';
            };
            expectEqual(map(op, word), 'haealalaoa');
            expectShallowEquals(map(op, split('', word)), ['ha', 'ea', 'la', 'la', 'oa']);
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(map(function (x) {
                return x;
            }, []), []);
            expectShallowEquals(map(function (x) {
                return x;
            }, ''), '');
        });
        it('should throw an error when incoming value is not a type instance', function () {
            assert.throws(function () {
                return map(function (x) {
                    return x;
                }, null);
            }, Error);
            assert.throws(function () {
                return map(function (x) {
                    return x;
                }, undefined);
            }, Error);
        });
    });

    describe('#reverse', function () {
        it('should reverse a list passed in.', function () {
            var word = 'hello';
            expectEqual(reverse(word), 'olleh');
            expectShallowEquals(reverse(split('', word)), split('', 'olleh'));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(reverse([]), []);
            expectEqual(reverse(''), '');
        });
        it('should throw an error when receiving no value', function () {
            assert.throws(reverse, Error);
            assert.throws(function () {
                return reverse(undefined);
            }, Error);
            assert.throws(function () {
                return reverse(null);
            }, Error);
        });
    });

    describe('#intersperse', function () {
        it('should be able to inject a list (string or array) in-between the items of a list of the same type.', function () {
            var result1 = intersperse(', ', alphabetArray).join(''),
                result2 = intersperse(', ', alphabetString);
            expectEqual(result1, alphabetArray.join(', '));
            expectEqual(result2, alphabetArray.join(', '));
        });
        it('should return a list with the same item when the list has a length of `1`', function () {
            expectEqual(intersperse(', ', 'a'), 'a');
            expectShallowEquals(intersperse(', ', ['a']), ['a']);
        });
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(intersperse('', ''), '');
            expectShallowEquals(intersperse('', []), []);
        });
    });

    describe('#intercalate', function () {
        it('should intercalate a list within another list and then perform concat on the result', function () {
            var result1 = intercalate(', ', alphabetArray),
                result2 = intercalate(', ', alphabetString);
            expectEqual(result1, alphabetArray.join(', '));
            expectEqual(result2, alphabetArray.join(', '));
        });
        it('should return a list with the same item when the list has a length of `1`', function () {
            expectEqual(intercalate(', ', 'a'), 'a');
            expectShallowEquals(intercalate(', ', ['a']), 'a');
            expectShallowEquals(intercalate(', ', [['a']]), ['a']); // Ensure list is flattened one level
        });
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(intercalate('', ''), '');
            expectShallowEquals(intercalate('', []), []);
            expectShallowEquals(intercalate('', [[]]), []); // Ensures list is flattened one level
        });
    });

    describe('#transpose', function () {
        var result1 = transpose([[1, 2, 3], [4, 5, 6]]),
            result2 = transpose([[10, 11], [20], [], [30, 31, 32]]);
        it('should transpose a list of lists into a rotated list of lists (from columns and rows to rows and' + ' columns and vice versa).', function () {
            expectTrue(all(function (tuple) {
                return all(function (list, ind) {
                    return all(function (x, ind2) {
                        return x === tuple[1][ind][ind2];
                    }, list);
                }, tuple[0]);
            }, [[result1, [[1, 4], [2, 5], [3, 6]]], [result2, [[10, 20, 30], [11, 31], [32]]]]));
        });
        it('should ignore empty lists in the transposition process and not add them to the resulting list.', function () {
            expectTrue(all(length, result1));
            expectTrue(all(length, result2));
        });
        it('should return an empty list when receiving one or when items contained are empty', function () {
            expectShallowEquals(transpose([[], [], []]), []);
            expectShallowEquals(transpose([]), []);
        });
    });

    describe('#subsequences', function () {
        it('should have more tests.');
    });

    describe('#permutations', function () {
        it('should have more tests.');
    });

    describe('#foldl', function () {
        it('should fold a `Foldable` (list, etc.) into some value', function () {
            var phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = function getAppendage(ind) {
                return parseInt(ind, 10) !== phraseIndCount ? '|' : '';
            },
                expectedTransform = map(function (x, ind) {
                return x + getAppendage(ind);
            }, split('', phrase));
            expectEqual(foldl(function (agg, item, ind) {
                agg += item + getAppendage(ind);
                return agg;
            }, '', phrase), expectedTransform.join(''));
            expectEqual(foldl(function (agg, item) {
                return agg + item;
            }, 0, [1, 2, 3, 4, 5]), 15);
            expectEqual(foldl(function (agg, item) {
                return agg * item;
            }, 1, [1, 2, 3, 4, 5]), 120);
            expectShallowEquals(foldl(function (agg, item, ind) {
                agg.push(item + getAppendage(ind));
                return agg;
            }, [], split('', phrase)), expectedTransform);
        });

        it('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldl(function (agg, item) {
                return agg + item;
            }, 'a', ''), 'a');
            expectShallowEquals(foldl(function (agg, item) {
                return agg + item;
            }, [], []), []);
        });

        it('should throw an error when `null` or `undefined` are passed in as the list', function () {
            assert.throws(function () {
                return foldl(function (agg, item) {
                    return agg + item;
                }, 'a', null);
            }, Error);
            assert.throws(function () {
                return foldl(function (agg, item) {
                    return agg + item;
                }, 'a', undefined);
            }, Error);
        });
    });

    describe('#foldl1', function () {
        it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', function () {
            var phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = function getAppendage(ind) {
                return parseInt(ind, 10) < phraseIndCount ? '|' : '';
            },
                expectedTransform = map(function (x, ind) {
                return x + getAppendage(ind);
            }, split('', phrase));
            expectEqual(foldl1(function (agg, item, ind) {
                agg += getAppendage(ind) + item;
                return agg;
            }, phrase), expectedTransform.join(''));
            expectEqual(foldl1(function (agg, item) {
                return agg + item;
            }, [1, 2, 3, 4, 5]), 15);
            expectEqual(foldl1(function (agg, item) {
                return agg * item;
            }, [1, 2, 3, 4, 5]), 120);
            expectShallowEquals(foldl1(function (agg, item, ind) {
                agg += getAppendage(ind) + item;
                return agg;
            }, split('', phrase)), expectedTransform.join(''));
        });
        it('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldl1(function (agg, item) {
                return agg + item;
            }, ''), '');
            expectShallowEquals(foldl1(function (agg, item) {
                return agg + item;
            }, []), []);
        });
        it('should return `undefined` when receiving nothing (`null` or `undefined`)', function () {
            expectEqual(foldl1(function (agg, item) {
                return agg + item;
            }, null), undefined);
            expectEqual(foldl1(function (agg, item) {
                return agg + item;
            }, undefined), undefined);
        });
    });

    describe('#foldr', function () {
        it('should fold a `Foldable` (list, etc.) into some value', function () {
            var phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = function getAppendage(ind) {
                return parseInt(ind, 10) !== phraseIndCount ? '|' : '';
            },
                expectedTransform = reverse(map(function (x, ind) {
                return x + getAppendage(ind);
            }, split('', phrase)));
            expectEqual(foldr(function (agg, item, ind) {
                agg += item + getAppendage(ind);
                return agg;
            }, '', phrase), expectedTransform.join(''));
            expectEqual(foldr(function (agg, item) {
                return agg + item;
            }, 0, [1, 2, 3, 4, 5]), 15);
            expectEqual(foldr(function (agg, item) {
                return agg * item;
            }, 1, [1, 2, 3, 4, 5]), 120);
            expectShallowEquals(foldr(function (agg, item, ind) {
                agg.push(item + getAppendage(ind));
                return agg;
            }, [], split('', phrase)), expectedTransform);
        });
        it('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldr(function (agg, item) {
                return agg + item;
            }, 'a', ''), 'a');
            expectShallowEquals(foldr(function (agg, item) {
                return agg + item;
            }, [], []), []);
        });
        it('should throw an error when `null` or `undefined` are passed in as the list', function () {
            assert.throws(function () {
                return foldr(function (agg, item) {
                    return agg + item;
                }, 'a', null);
            }, Error);
            assert.throws(function () {
                return foldr(function (agg, item) {
                    return agg + item;
                }, 'a', undefined);
            }, Error);
        });
    });

    describe('#foldr1', function () {
        it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', function () {
            var phrase = 'hello world',
                phraseLen = length(phrase),
                phraseIndCount = phraseLen - 1,
                getAppendage = function getAppendage(ind) {
                return ind <= phraseIndCount ? '|' : '';
            },
                expectedTransform = reverse(map(function (x, ind, arr) {
                return x + (ind !== 0 ? getAppendage(ind) : '');
            }, split('', phrase)));
            expectEqual(foldr1(function (agg, item, ind) {
                agg += getAppendage(ind) + item;
                return agg;
            }, phrase), expectedTransform.join(''));
            expectEqual(foldr1(function (agg, item) {
                return agg + item;
            }, [1, 2, 3, 4, 5]), 15);
            expectEqual(foldr1(function (agg, item) {
                return agg * item;
            }, [1, 2, 3, 4, 5]), 120);
            expectShallowEquals(foldr1(function (agg, item, ind) {
                agg += getAppendage(ind) + item;
                return agg;
            }, split('', phrase)), expectedTransform.join(''));
        });
        it('should return the zero value when an empty list is passed in', function () {
            expectEqual(foldr1(function (agg, item) {
                return agg + item;
            }, ''), '');
            expectShallowEquals(foldr1(function (agg, item) {
                return agg + item;
            }, []), []);
        });
        it('should return `undefined` when receiving nothing (`null` or `undefined`)', function () {
            expectEqual(foldr1(function (agg, item) {
                return agg + item;
            }, null), undefined);
            expectEqual(foldr1(function (agg, item) {
                return agg + item;
            }, undefined), undefined);
        });
    });

    describe('#concat', function () {
        it('should concatenate a list of lists into a list.', function () {
            var listOfLists = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']],
                altListOfLists = ['abc', 'def', 'ghi'];
            expectShallowEquals(concat(listOfLists), listOfLists.reduce(function (agg, item) {
                return agg.concat(item);
            }));
            expectShallowEquals(concat(altListOfLists), altListOfLists.reduce(function (agg, item) {
                return agg + item;
            }));
        });
        it('should return an empty list when receiving an empty list or a list of empty lists', function () {
            expectShallowEquals(concat([]), []);
            expectShallowEquals(concat([[], [], []]), []);
        });
        it('should throw an error when receiving nothing', function () {
            assert.throws(concat, Error);
            assert.throws(function () {
                return concat(null);
            }, Error);
            assert.throws(function () {
                return concat(undefined);
            }, Error);
        });
    });

    describe('#concatMap', function () {
        var id = function id(x) {
            return x;
        };
        it('should map a function on a list and concatenate lists in resulting list into a list.', function () {
            var charCodeToCharOp = function charCodeToCharOp(charCode) {
                return String.fromCharCode(charCode);
            },
                charCodeRange = alphabetCharCodeRange;
            // @investigate is babel shimming String.fromCharCode;
            //  When passing this function direct to `[].map` it returns a weird result (seems like it's returning
            //  an instance of `String` using `new` and it's constructor)?
            // log (alphabetArray);
            expectShallowEquals(concatMap(charCodeToCharOp, charCodeRange), alphabetArray.join(''));
            expectShallowEquals(concatMap(function (charCode) {
                return [String.fromCharCode(charCode)];
            }, charCodeRange), alphabetArray);
        });
        it('should return an empty list when receiving an empty list or a list of empty lists', function () {
            expectShallowEquals(concatMap(id, []), []);
            expectShallowEquals(concatMap(id, [[], [], []]), []);
        });
        it('should throw an error when receiving `undefined` or `null` in it\'s list position', function () {
            assert.throws(function () {
                return concatMap(id, null);
            }, Error);
            assert.throws(function () {
                return concatMap(id, undefined);
            }, Error);
        });
    });

    describe('#and', function () {
        it('should return `true` when all items of a container are "truthy".', function () {
            expectTrue(and(['a', 1, 99, true, function () {
                return null;
            }, {}, []]));
        });
        it('should return `false` when not all items of a container are "truthy".', function () {
            expectFalse(and(['a', 1, 0, true, function () {
                return null;
            }, {}, []]));
        });
        it('should return `false` when receiving an empty list or nothing.', function () {
            expectFalse(and(''));
            expectFalse(and(['']));
            expectFalse(and([null]));
            expectFalse(and([undefined]));
            expectFalse(and([false]));
        });
        it('should an error when receiving nothing', function () {
            assert.throws(function () {
                return and(undefined);
            }, Error);
            assert.throws(function () {
                return and(null);
            }, Error);
        });
    });

    describe('#or', function () {
        it('should return `true` when, at least, one of the items is "truthy".', function () {
            expectTrue(or([0, false, null, 1, undefined]));
        });
        it('should return `false` when all of the items are "falsy".', function () {
            expectFalse(or([0, false, null, undefined, '']));
        });
        it('should return `false` when an empty list is received.', function () {
            expectFalse(or([]));
        });
        it('should throw an error when receiving nothing (`null` or `undefined`).', function () {
            assert.throws(function () {
                return or(null);
            }, Error);
            assert.throws(function () {
                return or(undefined);
            }, Error);
        });
    });

    describe('#any', function () {
        var id = function id(x) {
            return x;
        };
        it('should return `true` when any item matches predicate.', function () {
            expectTrue(any(isTruthy, [0, false, null, 1, undefined]));
            expectTrue(any(isTruthy, ['hello']));
            expectTrue(any(function (x) {
                return x === 'e';
            }, 'hello'));
        });
        it('should return `false` when no item in received items matches predicate.', function () {
            expectFalse(any(isTruthy, [0, false, null, undefined, '']));
            expectFalse(any(isTruthy, [0]));
            expectFalse(any(function (x) {
                return x === 'e';
            }, 'avalon'));
        });
        it('should return `false` when an empty list is received.', function () {
            expectFalse(any(id, []));
        });
        it('should throw an error when receiving nothing (`null` or `undefined`).', function () {
            assert.throws(function () {
                return any(id, null);
            }, Error);
            assert.throws(function () {
                return any(id, undefined);
            }, Error);
        });
    });

    describe('#all', function () {
        it('should return true when predicate returns true for all items in list', function () {
            expectTrue(all(function (item) {
                return item;
            }, [true, true, true]));
            expectTrue(all(function (char) {
                return char !== 'a';
            }, 'bcdefg'));
        });
        it('should return `false` when predicate returns `false` for an item', function () {
            expectFalse(all(function (item) {
                return item;
            }, [true, false, true]));
            expectFalse(all(function (item) {
                return item !== 'a';
            }, 'bcdaefg'));
        });
        it('should return `false` when an empty list is passed in', function () {
            expectFalse(all(function (item) {
                return item;
            }, []));
            expectFalse(all(function (item) {
                return item;
            }, ''));
        });
        it('should throw an error when nothing is passed in', function () {
            assert.throws(function () {
                return all(function (item) {
                    return item;
                }, null);
            }, Error);
            assert.throws(function () {
                return all(function (item) {
                    return item;
                }, undefined);
            }, Error);
        });
    });

    describe('#sum', function () {
        it('should be able sum up any given list of numbers list of numbers', function () {
            expectEqual(sum(range(1, 5)), 15);
            expectEqual(sum(range(-5, -1)), -15);
        });
        it('should return `0` when receiving an empty list', function () {
            expectEqual(sum(range()), 0);
        });
        it('should throw an error when receiving nothing (`null` or `undefined`)', function () {
            assert.throws(function () {
                return sum(null);
            }, Error);
            assert.throws(function () {
                return sum(undefined);
            }, Error);
            assert.throws(function () {
                return sum();
            }, Error);
        });
    });

    describe('#product', function () {
        it('should be able return the product of a given list', function () {
            expectEqual(product(range(1, 5)), 120);
            expectEqual(product(range(-5, -1)), -120);
        });
        it('should return `0` when receiving an empty list', function () {
            expectEqual(product(range()), 1);
        });
        it('should throw an error when receiving nothing (`null` or `undefined`)', function () {
            assert.throws(function () {
                return product(null);
            }, Error);
            assert.throws(function () {
                return product(undefined);
            }, Error);
            assert.throws(function () {
                return product();
            }, Error);
        });
    });

    describe('#maximum', function () {
        it('should be able return the maximum of a given list', function () {
            expectEqual(maximum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 5);
            expectEqual(maximum(range(-5, -1).concat([-3, -5, -7])), -1);
        });
        it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', function () {
            assert.throws(function () {
                return maximum(null);
            }, Error);
            assert.throws(function () {
                return maximum(undefined);
            }, Error);
            // expectEqual(minimum([]), Infinity);
            assert.throws(function () {
                return maximum();
            }, Error);
        });
    });

    describe('#minimum', function () {
        it('should be able return the minimum of a given list', function () {
            expectEqual(minimum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 1);
            expectEqual(minimum(range(-5, -1).concat([-3, -5, -7])), -7);
        });
        it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', function () {
            assert.throws(function () {
                return minimum(null);
            }, Error);
            assert.throws(function () {
                return minimum(undefined);
            }, Error);
            // expectEqual(minimum([]), Infinity);
            assert.throws(function () {
                return minimum();
            }, Error);
        });
    });

    describe('#mapAccumL', function () {
        it('should map a functionOps/operation on every item of a list and it should return a tuple containing the ' + 'accumulated value and the an instance of passed in container with mapped items', function () {
            var xs1 = [],
                xs2 = '',
                xs3 = [];

            var list0 = [1, 2, 3, 4, 5],
                list1 = 'hello world',
                list2 = list1.split(''),
                stringOp = function stringOp(agg, item) {
                return String.fromCharCode(item.charCodeAt(0) + 1);
            },
                numberOp = function numberOp(agg, item) {
                return item * 2;
            },
                result0 = mapAccumL(function (agg, item) {
                var mappedValue = numberOp(agg, item);
                agg += mappedValue;
                xs1.push(mappedValue);
                return [agg, xs1];
            }, 0, list0),
                result1 = mapAccumL(function (agg, item) {
                var mappedValue = stringOp(agg, item);
                agg += mappedValue;
                xs2 += mappedValue;
                return [agg, xs2];
            }, '', list1),
                result2 = mapAccumL(function (agg, item) {
                var mappedValue = stringOp(agg, item);
                agg.push(mappedValue);
                xs3.push(mappedValue);
                return [agg, xs3];
            }, [], list1);

            expectTrue(all(function (tuple) {
                var reducedForCompare = foldl(function (agg, item, ind) {
                    // log(agg, item, tuple[0][1][ind], xs2);
                    if (Array.isArray(agg)) {
                        agg.push(tuple[2](agg, item, ind));
                    } else {
                        agg += tuple[2](agg, item, ind);
                    }
                    return agg;
                }, tuple[3], tuple[1]);
                // log(tuple[0][0], reducedForCompare);
                // Check that mapped have equal length
                return length(tuple[0][1]) === length(tuple[1]) &&
                // Check aggregated are equal
                shallowCompareOnLeft(tuple[0][0], reducedForCompare);
            }, [
            // Result, list, expected accumulation
            [result0, list0, numberOp, 0], [result1, list1, stringOp, ''], [result2, list2, stringOp, []]]));
        });
    });

    describe('#mapAccumR', function () {
        it('should map a functionOps/operation on every item of a list and it should return a tuple containing the ' + 'accumulated value and the an instance of passed in container with mapped items', function () {
            var xs1 = [],
                xs2 = '',
                xs3 = [];

            var list0 = [1, 2, 3, 4, 5],
                list1 = 'hello world',
                list2 = list1.split(''),
                stringOp = function stringOp(agg, item) {
                return String.fromCharCode(item.charCodeAt(0) + 1);
            },
                numberOp = function numberOp(agg, item) {
                return item * 2;
            },
                result0 = mapAccumR(function (agg, item) {
                var mappedValue = numberOp(agg, item);
                agg += mappedValue;
                xs1.push(mappedValue);
                return [agg, xs1];
            }, 0, list0),
                result1 = mapAccumR(function (agg, item) {
                var mappedValue = stringOp(agg, item);
                agg += mappedValue;
                xs2 += mappedValue;
                return [agg, xs2];
            }, '', list1),
                result2 = mapAccumR(function (agg, item) {
                var mappedValue = stringOp(agg, item);
                agg.push(mappedValue);
                xs3.push(mappedValue);
                return [agg, xs3];
            }, [], list1);

            expectTrue(all(function (tuple) {
                var reducedForCompare = foldr(function (agg, item, ind) {
                    // log(agg, item, tuple[0][1][ind], xs2);
                    if (Array.isArray(agg)) {
                        agg.push(tuple[2](agg, item, ind));
                    } else {
                        agg += tuple[2](agg, item, ind);
                    }
                    return agg;
                }, tuple[3], tuple[1]);
                // log(tuple[0][0], reducedForCompare);
                // Check that mapped have equal length
                return length(tuple[0][1]) === length(tuple[1]) &&
                // Check aggregated are equal
                shallowCompareOnLeft(tuple[0][0], reducedForCompare);
            }, [
            // Result, list, expected accumulation
            [result0, list0, numberOp, 0], [result1, list1, stringOp, ''], [result2, list2, stringOp, []]]));
        });
    });

    describe('#unfoldr', function () {
        it('should be able to unfold any value from right to left.', function () {
            expectShallowEquals(unfoldr(function (minuend) {
                var diff = minuend - 1;
                return diff >= 0 ? [minuend, diff] : undefined;
            }, 10), reverse(range(1, 10)));
        });
    });

    describe('#take', function () {
        var hello = 'hello';
        it('should return taken items from listOps and/or stringOps until limit', function () {
            var word = hello;

            // Test `take` on word parts and word (listOps and stringOps)
            strToArray(word).forEach(function (part, ind, wordParts) {
                // Get human index (counting from `1`) and preliminaries
                var humanInd = ind + 1,
                    takenFromArray = take(humanInd, wordParts),
                    takenFromStr = take(humanInd, word),
                    expectedWordPart = word.substring(0, humanInd);

                // Ensure expected length was taken
                compose(expectEqual(humanInd), length)(takenFromArray);
                compose(expectEqual(humanInd), length)(takenFromStr);

                // Ensure correct items at said indices were taken
                expectEqual(expectedWordPart, takenFromArray.join(''));
                expectEqual(expectedWordPart, takenFromStr);
            });
        });
        it('should return an empty listOps and/or stringOps when called with `0` as the first argument', function () {
            compose(expectEqual(0), length, function (xs) {
                return take(0, xs);
            })(split('', hello));
            compose(expectEqual(0), length, function (xs) {
                return take(0, xs);
            })(hello);
        });
        it('should return an empty listOps and/or stringOps when called with with an empty listOps or stringOps', function () {
            var count = 5;
            while (count) {
                compose(expectEqual(0), length, function (xs) {
                    return take(count, xs);
                })('');
                compose(expectEqual(0), length, function (xs) {
                    return take(count, xs);
                })([]);
                --count;
            }
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe('#drop', function () {
        var hello = 'hello';
        it('should return a new listOps/stringOps with dropped items from original until limit', function () {
            var word = hello,
                wordParts = strToArray(word),
                partsLength = wordParts.length - 1;

            // Test `take` on word parts and word (listOps and stringOps)
            wordParts.forEach(function (part, ind, wordParts) {
                // Get human index (counting from `1`) and preliminaries
                var humanInd = ind + 1,
                    takenFromArray = drop(humanInd, wordParts),
                    takenFromStr = drop(humanInd, word),
                    expectedWordPart = word.substring(humanInd);

                // Ensure expected length was taken
                compose(expectEqual(partsLength - ind), length)(takenFromArray);
                compose(expectEqual(partsLength - ind), length)(takenFromStr);

                // Ensure correct items at said indices were taken
                expectEqual(expectedWordPart, takenFromArray.join(''));
                expectEqual(expectedWordPart, takenFromStr);
            });
        });
        it('should return entire listOps and/or stringOps when called with `0` as the first argument', function () {
            compose(expectEqual(length(hello)), length)(drop(0, split('', hello)));
            compose(expectEqual(length(hello)), length)(drop(0, hello));
        });
        it('should return an empty listOps and/or stringOps when called with with an empty listOps or stringOps', function () {
            var count = 5;
            while (count) {
                compose(expectEqual(0), length)(drop(count, ''));
                compose(expectEqual(0), length)(drop(count, []));
                --count;
            }
        });
        it('should throw an error when no parameter is passed in', function () {
            assert.throws(tail, Error);
        });
    });

    describe('#splitAt', function () {
        var word = 'hello',
            phraseAppendage = ' world',
            phrase = '' + word + phraseAppendage,
            phraseLen = length(phrase),
            wordLen = length(word),
            phraseAppendageLen = length(phraseAppendage);

        it('should split an listOps and/or stringOps at given index', function () {
            var result = splitAt(wordLen, phrase),
                result2 = splitAt(wordLen, phrase.split(''));

            // Ensure returned type for stringOps case is correct
            expectTrue(typeof result[0] === 'string');
            expectTrue(typeof result[1] === 'string');

            // Expect returned stringOps parts are equal
            expectEqual(result[0], word);
            expectEqual(result[1], phraseAppendage);

            // Ensure returned type for listOps use case is correct
            expectTrue(Array.isArray(result2[0]));
            expectTrue(Array.isArray(result2[1]));

            // Ensure returned listOps parts are equal
            expectEqual(length(result2[0]), wordLen);
            expectEqual(length(result2[1]), phraseAppendageLen);

            // Check each char/element in returned parts for listOps use case
            [word, phraseAppendage].forEach(function (str, ind) {
                return expectTrue(str.split('').every(function (char, ind2) {
                    return result2[ind][ind2] === char;
                }));
            });
        });
        it('should return an listOps of empty listOps and/or stringOps when receiving an empty one of either', function () {
            splitAt(3, []).concat(splitAt(2, '')).forEach(expectLength(0));
        });
        it('should return entirely, passed in, listOps and/or stringOps as second part of ' + 'split in return when `0` is passed in as the first param', function () {
            var splitPhrase = phrase.split('');
            expectTrue(splitAt(0, phrase).concat(splitAt(0, splitPhrase)).every(function (retVal, ind) {
                return (
                    // Only check even indices (due to concat above empty side of split is an
                    //  `odd` numberOps index)
                    (ind + 1) % 2 === 0 ?

                    // Length of left hand side split result
                    length(retVal) === phraseLen &&

                    // Left hand side split result
                    // Log results and do
                    // "Else is empty right hand side split result" (empty result)
                    splitPhrase.every(function (char, ind2) {
                        return retVal[ind2] === char;
                    }) /* && !log(ind, retVal) */ : true
                );
            }));
        });
    });

    describe('#takeWhile', function () {
        it('should take elements while predicate is fulfilled', function () {
            var word = 'abcdefg',
                expectedResult = word.split('e')[0],
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct length of items in returned element
                    /*!log(result) && */
                    length(expectedResult) === length(result) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === expectedResult[ind];
                    }, result)
                );
            },
            // Use cases (one with stringOps other with listOps)
            [takeWhile(predicate, word.split('')), takeWhile(predicate, word)]));
        });
        it('should return an empty type instance if predicate is not matched at all', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return x === 'z';
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure no items returned
                    /*!log(result) && */
                    length(result) === 0
                );
            }, [takeWhile(pred, word.split('')), takeWhile(pred, word)]));
        });
        it('should return a copy of type instance if predicate is matched all the way through', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return x !== 'z';
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure no items returned
                    /*!log(result) && */
                    length(result) === length(word)
                );
            }, [takeWhile(pred, word.split('')), takeWhile(pred, word)]));
        });
    });

    describe('#dropWhile', function () {
        it('should drop elements while predicate is fulfilled', function () {
            var word = 'abcdefg',
                expectedResult = word.substring(word.indexOf('e'), length(word)),
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct length of items in returned element
                    /*!log(result, expectedResult) &&*/
                    length(expectedResult) === length(result) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === expectedResult[ind];
                    }, result)
                );
            },
            // Use cases (one with stringOps other with listOps)
            [dropWhile(predicate, word.split('')), dropWhile(predicate, word)]));
        });
        it('should return an empty type instance if predicate is matched all the way through', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return word.indexOf(x) > -1;
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure no items returned
                    /*!log(result) && */
                    length(result) === 0
                );
            }, [dropWhile(pred, word.split('')), dropWhile(pred, word)]));
        });
        it('should return an a copy of the passed in type instance if predicate doesn\'t match any elements', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return x === 'z' > -1;
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct lengths returned
                    /*!log(result) && */
                    length(result) === length(word) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === word[ind];
                    }, result)
                );
            },
            // Use cases
            [dropWhile(pred, word.split('')), dropWhile(pred, word)]));
        });
    });

    describe('#dropWhileEnd', function () {
        it('should drop elements while predicate is fulfilled', function () {
            var word = 'abcdefg',
                expectedResult = word.substring(0, word.indexOf('e')),
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct length of items in returned element
                    // !log(result, expectedResult) &&
                    length(expectedResult) === length(result) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === expectedResult[ind];
                    }, result)
                );
            },
            // Use cases (one with stringOps other with listOps)
            [dropWhileEnd(predicate, word.split('')), dropWhileEnd(predicate, word)]));
        });
        it('should return an empty type instance if predicate is matched all the way through', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return word.indexOf(x) > -1;
            },
                lenWord = length(word);

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure all items returned
                    // !log(result) &&
                    length(result) === lenWord
                );
            }, [dropWhileEnd(pred, word.split('')), dropWhileEnd(pred, word)]));
        });
        it('should return an a copy of the passed in type instance if predicate doesn\'t match any elements', function () {
            var word = 'abcdefg',
                pred = function pred(x) {
                return x === 'z' > -1;
            };

            // Expect empty type instance
            expectTrue(
            // Ensure cases for each use case
            all(function (result) {
                return (
                    // Ensure correct lengths returned
                    // /!*!log(result) && *!/
                    length(result) === length(word) &&
                    // Ensure elements where matched
                    all(function (x, ind) {
                        return x === word[ind];
                    }, result)
                );
            },
            // Use cases
            [dropWhileEnd(pred, word.split('')), dropWhileEnd(pred, word)]));
        });
    });

    describe('#span', function () {
        it('should take elements into first listOps while predicate is fulfilled and elements ' + 'that didn\'t match into second listOps', function () {
            var word = 'abcdefg',
                expectedResults = [word.substring(0, 4), word.substring(4)],
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (tuple) {
                return length(expectedResults) === length(tuple) && all(function (tuplePart, ind) {
                    return (
                        // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                        // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all(function (x, ind2) {
                            return x === expectedResults[ind][ind2];
                        }, tuplePart)
                    );
                }, tuple);
            },
            // Use cases (one with stringOps other with listOps)
            [span(predicate, word.split('')), span(predicate, word)]));
        });
        it('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(all(function (tuple) {
                return length(tuple) === 2 && all(function (tuplePart, ind) {
                    return (isString(tuplePart) || isArray(tuplePart)) && length(tuplePart) === 0;
                }, tuple);
            }, [span(function (a) {
                return a;
            }, ""), span(function (x) {
                return x;
            }, [])]));
        });
    });

    describe('#breakOnList', function () {
        it('should take elements into first listOps while !predicate is fulfilled and elements ' + 'that didn\'t match into second listOps', function () {
            var word = 'abcdefg',
                expectedResults = [word.substring(0, 4), word.substring(4)],
                predicate = function predicate(x) {
                return x === 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (tuple) {
                return length(expectedResults) === length(tuple) && all(function (tuplePart, ind) {
                    return (
                        // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                        // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all(function (x, ind2) {
                            return x === expectedResults[ind][ind2];
                        }, tuplePart)
                    );
                }, tuple);
            },
            // Use cases (one with stringOps other with listOps)
            [breakOnList(predicate, word.split('')), breakOnList(predicate, word)]));
        });
        it('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(all(function (tuple) {
                return length(tuple) === 2 && all(function (tuplePart, ind) {
                    return (isString(tuplePart) || isArray(tuplePart)) && length(tuplePart) === 0;
                }, tuple);
            }, [breakOnList(function (a) {
                return a;
            }, ""), breakOnList(function (x) {
                return x;
            }, [])]));
        });
    });

    describe('#stripPrefix', function () {
        it('should be able to strip a prefix from a list', function () {
            expectShallowEquals(stripPrefix('abc', alphabetArray.slice(0, 10)), alphabetArray.slice(3, 10));

            expectShallowEquals(stripPrefix('abc', alphabetString.substring(0, 10)), alphabetString.substring(3, 10));
        });
        it('should return a copy of the passed in list when prefix is not found', function () {
            expectShallowEquals(stripPrefix('!*&', alphabetArray), alphabetArray);
            expectEqual(stripPrefix('!*&', alphabetString), alphabetString);
            expectEqual(stripPrefix('!*&', ''), '');
            expectShallowEquals(stripPrefix('!*&', []), []);
        });
        it('should throw an error when receiving nothing in either position', function () {
            assert.throws(function () {
                return stripPrefix(null, 'abc');
            }, Error);
            assert.throws(function () {
                return stripPrefix(null, null);
            }, Error);
            assert.throws(function () {
                return stripPrefix('abc', null);
            }, Error);
        });
    });

    describe('#group', function () {
        it('should return a list of lists which contain the (sequential) matches', function () {
            var expectedResultFlattened = ['M', 'i', 'ss', 'i', 'ss', 'i', 'pp', 'i'];
            expectShallowEquals(group('Mississippi'), expectedResultFlattened);
            expectShallowEquals(
            // Flatten results first
            group('Mississippi'.split('')).map(function (item) {
                return item.join('');
            }), expectedResultFlattened);
        });
        it('should return a list of lists containing individual ungrouped items', function () {
            expectShallowEquals(group(alphabetString), alphabetArray);
            expectShallowEquals(
            // Flatten result first
            group(alphabetArray).map(function (item) {
                return item.join('');
            }), alphabetArray);
        });
    });

    describe('#inits', function () {
        it('should unfold a list into list of all possible ' + 'non-omitting sequential sets that start with initial item', function () {
            expectTrue(all(function (item, ind, original) {
                return length(item) === ind;
            }, inits(alphabetString)));
            expectTrue(all(function (item, ind, original) {
                return length(item) === ind;
            }, inits(alphabetArray)));
        });
    });

    describe('#tails', function () {
        it('should unfold a list into list of all possible ' + 'non-omitting sequential sets that start with the last item', function () {
            var limit = length(alphabetString);
            expectTrue(all(function (item, ind) {
                var headOfLast = head(item);
                // log (headOfLast, alphabetString[ind]);//, resultList);
                return length(item) ? length(item) === limit - ind && headOfLast === alphabetString[ind] : true;
            }, tails(alphabetString)));
            expectTrue(all(function (item, ind) {
                var headOfLast = head(item);
                //log (headOfLast, alphabetString[ind]);
                return length(item) ? length(item) === limit - ind && headOfLast === alphabetArray[ind] : true;
            }, tails(alphabetArray)));
        });
    });

    describe('#isPrefixOf', function () {
        it('should return `true` when a list is a prefix of another', function () {
            expectTrue(all(function (xs) {
                return isPrefixOf('abc', xs);
            }, splitAt(3, inits(alphabetString))[1]));
            expectTrue(all(function (xs) {
                return isPrefixOf('abc'.split(''), xs);
            }, splitAt(3, inits(alphabetArray))[1]));
        });
        it('should return `false` when a list is not prefix of second list', function () {
            expectTrue(all(function (xs) {
                return !isPrefixOf('!@#', xs);
            }, splitAt(3, inits(alphabetString))[1]));
            expectTrue(all(function (xs) {
                return !isPrefixOf('!@#'.split(''), xs);
            }, splitAt(3, inits(alphabetArray))[1]));
        });
    });

    describe('#isSuffixOf', function () {
        it('should return `true` when a list is a suffix of another', function () {
            var candidateString = splitAt(length(alphabetString) - 2, tails(alphabetString))[0];
            // log (candidateString);
            expectTrue(all(function (xs) {
                return isSuffixOf('xyz', xs);
            }, candidateString));
            expectTrue(all(function (xs) {
                return isSuffixOf('xyz'.split(''), xs);
            }, splitAt(length(alphabetArray) - 2, tails(alphabetArray))[0]));
        });
        it('should return `false` when a list is not suffix of second list', function () {
            expectTrue(all(function (xs) {
                return !isSuffixOf('!@#', xs);
            }, splitAt(length(alphabetString) - 2, tails(alphabetString))[0]));
            expectTrue(all(function (xs) {
                return !isSuffixOf('!@#'.split(''), xs);
            }, splitAt(length(alphabetString) - 2, tails(alphabetArray))[0]));
        });
    });

    describe('#isInfixOf', function () {
        it('should return `true` when a list is infixed with another', function () {
            var results = concatMap(function (candidate) {
                return [isInfixOf(candidate, alphabetString), isInfixOf(candidate, alphabetArray)];
            }, ['abc', 'efg', 'xyz']);
            //log(results);
            expectTrue(and(results));
        });
        it('should return `false` when a list is not infix of second list', function () {
            expectTrue(and([function (xs) {
                return !isInfixOf('!@#', xs);
            }(alphabetString), function (xs) {
                return !isInfixOf('!@#'.split(''), xs)(alphabetArray);
            }]));
        });
    });

    describe('#isSubsequenceOf', function () {
        it('should return true a list is sub-sequence of another.', function () {
            var listToSearchIn = take(6, alphabetString);
            expectTrue(all(function (listToSearchFor) {
                return isSubsequenceOf(listToSearchFor, listToSearchIn);
            }, ['bdf', 'ace', 'abc', 'def']));
        });
        it('should return false a list is not sub-sequence of another.', function () {
            var listToSearchIn = take(6, drop(6, alphabetString));
            expectTrue(all(function (listToSearchFor) {
                return !isSubsequenceOf(listToSearchFor, listToSearchIn);
            }, ['bdf', 'ace', 'abc', 'def']));
        });
    });

    describe('#elem', function () {
        it('should return `true` when the element is found in given list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return !!elem(elm2, arr);
                }, word);
            }, [word.split(''), word]));
        });
        it('should return `false` when element is not found in given list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return !elem('z', arr);
                }, elm);
            }, [word.split(''), word]));
        });
    });

    describe('#notElem', function () {
        it('should return `false` when the element is found in given list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return !notElem(elm2, arr);
                }, word);
            }, [word.split(''), word]));
        });
        it('should return `true` when element is not found in given list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return notElem('z', arr);
                }, elm);
            }, [word.split(''), word]));
        });
    });

    describe('#lookup', function () {
        it('should return found value when key is set on type instance', function () {
            var word = 'hello world',
                obj = word.split('').reduce(function (agg, item) {
                agg[item] = item + ' value';
                return agg;
            }, {});
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2) {
                    return lookup(elm2, obj) === elm2 + ' value';
                }, word);
            }, [word.split(''), word]));
        });
        it('should return `undefined` when element is not found in given list', function () {
            var word = 'hello world',
                obj = word.split('').reduce(function (agg, item) {
                agg[item] = item + ' value';
                return agg;
            }, {});
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return lookup('z', obj) === undefined;
                }, elm);
            }, [word.split(''), word]));
        });
    });

    describe('#find', function () {
        it('should should find element that matches predicate when element is in given list', function () {
            var word = 'word',
                pred = function pred(x) {
                return x === 'o';
            };
            expectEqual(find(pred, word), 'o');
            expectEqual(find(pred, word.split('')), 'o');
        });
        // @todo add more tests
    });

    describe('#filter', function () {
        it('should be able to filter a list by a predicate.', function () {
            var pred = function pred(_, ind) {
                return ind % 2 === 0;
            };
            expectShallowEquals(filter(pred, alphabetString), alphabetString.split('').filter(pred));
            expectShallowEquals(filter(pred, alphabetArray), alphabetString.split('').filter(pred));
        });
        it('should return an empty list when no items match predicate', function () {
            var pred = function pred(char) {
                return char === '#';
            };
            expectShallowEquals(filter(pred, alphabetString), '');
            expectShallowEquals(filter(pred, alphabetArray), []);
        });
    });

    describe('#partition', function () {
        it('should take elements into first listOps while predicate is fulfilled and elements ' + 'that didn\'t match into second listOps', function () {
            var word = 'abcdefg',
                expectedResults = ['abcdfg', 'e'],
                predicate = function predicate(x) {
                return x !== 'e';
            };

            // Expect matched length and matched elements
            expectTrue(
            // Ensure cases for each use case
            all(function (tuple) {
                return length(expectedResults) === length(tuple) && all(function (tuplePart, ind) {
                    return (
                        // !log(tuple, tuplePart, expectedResults, expectedResults[ind]) &&
                        // Ensure tuple part is of allowed type
                        (isString(tuplePart) || isArray(tuplePart)) &&
                        // Ensure correct length of items in returned element
                        length(expectedResults[ind]) === length(tuplePart) &&
                        // Ensure elements where matched
                        all(function (x, ind2) {
                            return x === expectedResults[ind][ind2];
                        }, tuplePart)
                    );
                }, tuple);
            },
            // Use cases (one with stringOps other with listOps)
            [partition(predicate, word.split('')), partition(predicate, word)]));
        });
        it('should return an listOps of empty arrays and/or strings when an empty list is passed in', function () {
            expectTrue(all(function (tuple) {
                return length(tuple) === 2 && all(function (tuplePart, ind) {
                    return (isString(tuplePart) || isArray(tuplePart)) && length(tuplePart) === 0;
                }, tuple);
            }, [partition(function (a) {
                return a;
            }, ""), partition(function (x) {
                return x;
            }, [])]));
        });
    });

    describe('#at', function () {
        it('should return an item at a given key/index.', function () {
            [alphabetString, alphabetArray].forEach(function (subject) {
                var subjectLastInd = length(subject) - 1;
                expectEqual(at(0, subject), subject[0]);
                expectEqual(at(5, subject), subject[5]);
                expectEqual(at(subjectLastInd, subject), subject[subjectLastInd]);
            });
        });
        it('should return `undefined` when list has no length.', function () {
            expectEqual(at(0, ''), undefined);
            expectEqual(at(0, []), undefined);
        });
    });

    describe('#elemIndex', function () {
        it('should return the index where the element is found', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return elemIndex(elm2, arr) === word.indexOf(elm2);
                }, elm);
            }, [word.split(''), word]));
        });
        it('should return `undefined` when element is not in list', function () {
            var word = 'hello world';
            expectTrue(all(function (elm, ind) {
                return all(function (elm2, ind2, arr) {
                    return elemIndex('z', arr) === undefined;
                }, elm);
            }, [word.split(''), word]));
        });
    });

    describe('#elemIndices', function () {
        it('should return all found element indices in a list', function () {
            var nums = range(0, 22),
                word = nums.join(''),
                predicate = function predicate(x) {
                return x.indexOf('1') > -1;
            },
                indices = word.split('').reduce(function (agg, item, ind) {
                if (predicate(item)) {
                    agg.push(ind);
                }
                return agg;
            }, []);

            expectTrue(
            // Ensure cases for each use case
            all(function (list) {
                return all(function (item, ind) {
                    return list[ind] === item;
                }, indices);
            }, [elemIndices('1', word), elemIndices('1', word.split(''))]));
        });
        // @todo add more tests
    });

    describe('#findIndex', function () {
        var word = 'abcdefg';
        it('should find an index where predicate is satisfied', function () {
            expectTrue(word.split('').every(function (char, ind, arr) {
                return findIndex(function (x, ind2) {
                    return ind === ind2 && x === word[ind];
                }, arr) === ind;
            }));
        });
    });

    describe('#findIndices', function () {
        it('should have more tests');
        // it ('should', function () {
        //     const token = 'aecedegefehea',
        //         tokenParts = token.split(''),
        //         eIndices = [1, 3, 5, 7, 9, 11],
        //         notEIndices = [0, 2, 4, 6, 8, 10, 12],
        //         aIndices = [0, 12],
        //         noIndices = [],
        //         indiceTests = [
        //             [findIndices(x => x === 'e'), eIndices],
        //             [findIndices(x => x !== 'e'), notEIndices],
        //             [findIndices(x => x === 'a'), aIndices],
        //             [findIndices(x => false), noIndices]
        //         ];
        //     // expectTrue(
        //     //     all(xs =>
        //     //         all((key, ind2) => key === args[1][ind2], args[0](xs)),
        //     //         [token, tokenParts])
        //     // );
        //     // @todo add tests
        // });
    });

    describe('#zip', function () {
        it('should be able to zip two lists into a list of tuples (list of two items).', function () {
            var _splitAt = splitAt(length(alphabetArray) / 2, alphabetArray),
                _splitAt2 = _slicedToArray(_splitAt, 2),
                list1 = _splitAt2[0],
                list2 = _splitAt2[1],
                result = zip(list1, list2),
                expectedResult = foldl(function (agg, item, ind) {
                agg.push([item, list2[ind]]);
                return agg;
            }, [], list1);
            // log (list1, list2); // two halves of alphabet array


            expectTrue(all(function (x) {
                return 13;
            }, [length(list1), length(list2)]));
            expectEqual(length(result), length(expectedResult));
            expectTrue(all(function (tuple, ind) {
                return tuple[0] === expectedResult[ind][0] && tuple[1] === expectedResult[ind][1];
            }, result));
        });
        it('should return an empty list when empty lists are passed', function () {
            expectShallowEquals(zip([], []), []);
        });
        it('should return a copy of the passed in populated list when one of them is not populated.', function () {
            expectShallowEquals(zip([], alphabetArray), alphabetArray);
            expectShallowEquals(zip(alphabetArray, []), alphabetArray);
        });
    });

    describe('#zipN', function () {
        it('should be able to zip the given number of lists.', function () {
            // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
            var subj = unfoldr(function (remainder) {
                return !length(remainder) ? undefined : splitAt(5, remainder);
            }, take(25, alphabetArray)),
                subj2 = [range(1, 5), range(8, 13), [], range(13, 21), []],
                subj3 = [[], range(21, 34), range(34, 55)],
                zipNResult = zipN.apply(null, subj),
                zipNResult2 = zipN.apply(null, subj2);

            // log(zipNResult, zipNResult2);

            expectTrue(all(function (tuple) {
                return all(function (list, ind) {
                    return all(function (item, ind2) {
                        return (
                            // !log(item, tuple[1][ind2][ind]) &&
                            item === tuple[1][ind2][ind]
                        );
                    }, list);
                }, tuple[0]);
            }, [[zipNResult, filter(length, subj)], [zipNResult2, filter(length, subj2)]]));
        });
        it('should return an empty list when empty lists are passed in', function () {
            expectShallowEquals(zipN([], []), []);
        });
        it('should return a copy of the left or right populated list when the other(s) is/are empty.', function () {
            expectShallowEquals(zipN([], alphabetArray), alphabetArray);
            expectShallowEquals(zipN(alphabetArray, []), alphabetArray);
        });
    });

    describe('#zipWith', function () {
        var tuplize = function tuplize(a, b) {
            return [a, b];
        };
        it('should be able to zip the given number of lists.', function () {
            // Unfold alphabet array into an array with arrays of 5 items (as our initial subject).
            var subj = unfoldr(function (remainder) {
                return !length(remainder) ? undefined : splitAt(5, remainder);
            }, take(25, alphabetArray)),
                subj2 = [range(1, 5), range(8, 13), [], range(13, 21), []],
                subj3 = [[], range(21, 34), range(34, 55)],
                zipWithResult = zipWith.apply(undefined, [tuplize].concat(_toConsumableArray(subj))),
                zipWithResult2 = zipWith.apply(undefined, [tuplize].concat(subj2));

            // log(zipWithResult, zipWithResult2);

            expectTrue(all(function (tuple) {
                return all(function (list, ind) {
                    return all(function (item, ind2) {
                        return (
                            // !log(item, tuple[1][ind2][ind]) &&
                            item === tuple[1][ind2][ind]
                        );
                    }, list);
                }, tuple[0]);
            }, [[zipWithResult, filter(length, subj)], [zipWithResult2, filter(length, subj2)]]));
        });
        it('should return an empty list when empty lists are passed', function () {
            expectShallowEquals(zipWith(tuplize, [], []), []);
        });
        it('should return a copy of the passed in populated list when one of them is not populated.', function () {
            expectShallowEquals(zipWith(tuplize, [], alphabetArray), alphabetArray);
            expectShallowEquals(zipWith(tuplize, alphabetArray, []), alphabetArray);
        });
    });

    describe('#unzip', function () {
        it('should be able to unzip a list of tuples of two.', function () {
            var subj = unfoldr(function (remainder) {
                return !length(remainder) ? undefined : splitAt(2, remainder);
            }, alphabetArray),
                lenAlphaArray = length(alphabetArray),
                result = unzip(subj);

            // First ensure our subject is valid
            // --------------------------------------
            // Check that we have tuples of two (list of two in javascript's/our case)
            expectTrue(all(function (tuple) {
                return length(tuple) === 2;
            }, subj));

            // Ensure subject has expected length of items (tuples)
            expectEqual(length(subj), lenAlphaArray / 2);

            // Test result
            // ----------------
            // Ensure we have two lists (one for each part of tuple in `subj`).
            expectEqual(length(result), 2);

            // Ensure both lists in result have the expected length
            expectTrue(all(function (list) {
                return length(list) === lenAlphaArray / 2;
            }, result));

            // log (subj, result);

            // Ensure resulting lists contain expected items
            expectTrue(all(function (list, i) {
                return all(function (item, j) {
                    return item === subj[j][i];
                }, list);
            }, result));
        });
        // @todo Add more tests
    });

    describe('#unzipN', function () {
        it('should be able to unzip a list of tuples of any number.', function () {
            var subj = unfoldr(function (remainder) {
                return !length(remainder) ? undefined : splitAt(2, remainder);
            }, alphabetArray),
                lenAlphaArray = length(alphabetArray),
                result = unzipN(subj);

            // log (subj, result);

            // First ensure our subject is valid
            // --------------------------------------
            // Check that we have tuples of two (list of two in javascript's/our case)
            expectTrue(all(function (tuple) {
                return length(tuple) === 2;
            }, subj));

            // Ensure subject has expected length of items (tuples)
            expectEqual(length(subj), lenAlphaArray / 2);

            // Test result
            // ----------------
            // Ensure we have two lists (one for each part of tuple in `subj`).
            expectEqual(length(result), 2);

            // Ensure both lists in result have the expected length
            expectTrue(all(function (list) {
                return length(list) === lenAlphaArray / 2;
            }, result));

            // Ensure resulting lists contain expected items
            expectTrue(all(function (list, i) {
                return all(function (item, j) {
                    return item === subj[j][i];
                }, list);
            }, result));
        });
        // @todo Add more tests
    });

    describe('#lines', function () {
        it('should split a string on all new line characters.', function () {
            var subj = intercalate('\n', alphabetArray),
                result = lines(subj);

            // log(length(subj), subj, result);

            // Ensure subject is valid first:
            // ------------------------------------
            // Expect new line char before every char except the first
            expectLength(length(alphabetArray) * 2 - 1, subj);

            // Check split string
            expectShallowEquals(alphabetArray, result);
        });
        it('should return original string when no new lines are found in string', function () {
            expectShallowEquals(lines('hello world'), ['hello world']);
            expectShallowEquals(lines(''), ['']);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return lines(null);
            }, Error);
            assert.throws(function () {
                return lines(undefined);
            }, Error);
        });
    });

    describe('#words', function () {
        it('should split a string on all whitespace characters.', function () {
            // subject | expectedLength | shallowEqualsTo
            var subjectsAndExpLens = [[intercalate(' ', alphabetArray), length(alphabetArray), alphabetArray], ['hello world', 2, ['hello', 'world']]];

            subjectsAndExpLens.forEach(function (tuple) {
                var _tuple = _slicedToArray(tuple, 3),
                    subj = _tuple[0],
                    expectedLen = _tuple[1],
                    shallowEqualsTo = _tuple[2],
                    result = words(subj);

                // log(expectedLen, subj, result);

                // Check length of result


                expectLength(expectedLen, result);

                // Check split string
                expectShallowEquals(shallowEqualsTo, result);
            });
        });
        it('should return a copy of original list when no whitespace characters are found.', function () {
            // subject | expectedLength | shallowEqualsTo
            var subjectsAndExpLens = [[alphabetString, 1, [alphabetString]], ['helloworld', 1, ['helloworld']]];

            subjectsAndExpLens.forEach(function (tuple) {
                var _tuple2 = _slicedToArray(tuple, 3),
                    subj = _tuple2[0],
                    expectedLen = _tuple2[1],
                    shallowEqualsTo = _tuple2[2],
                    result = words(subj);

                // log(expectedLen, subj, result);

                // Check length of result


                expectLength(expectedLen, result);

                // Check split string
                expectShallowEquals(shallowEqualsTo, result);
            });
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return words(null);
            }, Error);
            assert.throws(function () {
                return words(undefined);
            }, Error);
        });
    });

    describe('#unlines', function () {
        it('should join a list with new lines.', function () {
            ['hello world', alphabetString, alphabetArray].forEach(function (subj) {
                var result = unlines(subj);

                // check expected length
                expectLength(subj.length * 2 - 1, result);

                // Check items in resulted list
                expectShallowEquals(intersperse('\n', subj), result);
            });
        });
        it('should return empty lists when receiving empty lists', function () {
            expectEqual(unlines(''), '');
            expectShallowEquals(unlines([]), []);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return unlines(null);
            }, Error);
            assert.throws(function () {
                return unlines(undefined);
            }, Error);
        });
    });

    describe('#unwords', function () {
        it('should join a list of words with spaces.', function () {
            ['hello world', alphabetString, alphabetArray].forEach(function (subj) {
                var result = unwords(subj);

                // console.log('unwords', result);

                // check expected length
                expectLength(subj.length * 2 - 1, result);

                // Check items in resulted list
                expectShallowEquals(intersperse(' ', subj), result);
            });
        });
        it('should return empty lists when receiving empty lists', function () {
            expectEqual(unwords(''), '');
            expectShallowEquals(unwords([]), []);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return unwords(null);
            }, Error);
            assert.throws(function () {
                return unwords(undefined);
            }, Error);
        });
    });

    describe('#nub', function () {
        it('should remove all but first occurrences of repeat items in a list.', function () {
            expectEqual(nub('conundrum'), 'conudrm');
            expectEqual(nub(map(function (char) {
                return char + char;
            }, alphabetString)), alphabetString);
            expectShallowEquals(nub(concatMap(function (char) {
                return char + char;
            }, alphabetString).split('')), alphabetArray);
        });
        it('should return a copy of the passed in list with items intact if there ' + 'aren\'t any repeat items', function () {
            expectEqual(nub(alphabetString), alphabetString);
            expectShallowEquals(nub(alphabetArray), alphabetArray);
        });
        it('should return empty lists when receiving empty lists', function () {
            expectEqual(nub(''), '');
            expectShallowEquals(nub([]), []);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return nub(null);
            }, Error);
            assert.throws(function () {
                return nub(undefined);
            }, Error);
        });
    });

    describe('#remove', function () {
        // same as `delete` (in haskell)
        it('should remove the first occurrence of an item in a list.', function () {
            expectEqual(remove('l', 'hello world'), 'helo world');
            expectEqual(remove('l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(remove('a', alphabetString), tail(alphabetString));
            expectEqual(remove('z', alphabetString), init(alphabetString));
            expectShallowEquals(remove('a', alphabetArray), tail(alphabetArray));
            expectShallowEquals(remove('z', alphabetArray), init(alphabetArray));
            // log(remove('d', alphabetString));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(remove('a', ''), '');
            expectShallowEquals(remove('a', []), []);
        });
        it('should throw Errors when receiving nothing in the list position', function () {
            assert.throws(function () {
                return remove(null, null);
            }, Error);
            assert.throws(function () {
                return remove(undefined, undefined);
            }, Error);
            assert.throws(function () {
                return remove(null, null);
            }, Error);
            assert.throws(function () {
                return remove(undefined, undefined);
            }, Error);
        });
    });

    describe('#complement', function () {
        it('should return an empty list when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, complement)();
        });
        it('should return an empty list if only one list is passed in', function () {
            compose(expectEqual(__, 0), length, complement)([1, 2, 3]);
        });
        it('should return elements not in first list passed to it', function () {
            var testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[[1, 2, 3], [1, 2, 3, 4, 5]], 2, [4, 5]], [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6, 7, 8]], 7, [4, 5, 4, 5, 6, 7, 8]], [[[1, 2, 3], [1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 1, 2, 3]], 4, [4, 5, 4, 5]]];
            testCases.forEach(function (testCase) {
                var _testCase = _slicedToArray(testCase, 3),
                    subjects = _testCase[0],
                    expectedLen = _testCase[1],
                    expectedElms = _testCase[2],
                    result = complement.apply(null, subjects);
                // log(result);


                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#difference', function () {
        it('should return an empty list when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, difference)();
        });
        it('should return an empty list when first list passed in is empty', function () {
            compose(expectEqual(__, 0), length)(difference([], alphabetArray));
            compose(expectEqual(__, 0), length)(difference('', alphabetString));
        });
        it('should return an empty list when there are no differences between the lists passed in', function () {
            compose(expectEqual(__, 0), length)(difference(alphabetArray, alphabetArray));
            compose(expectEqual(__, 0), length)(difference(alphabetString, alphabetString));
        });
        it('should return the difference between two arrays passed in', function () {
            var testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 0, []], [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 5, [4, 5, 6, 7, 8]], [[1, 2, 3, 4, 5], [1, 2, 3], 2, [4, 5]]];
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
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(length(intersect([])), 0);
            expectEqual(length(intersect([], [1, 2, 3])), 0);
        });
        it('should return an empty list when receiving an empty list as parameter 2', function () {
            expectEqual(length(intersect([1, 2, 3], [])), 0);
        });
        it('should return an empty list when both arrays passed are empty', function () {
            expectEqual(length(intersect([], [])), 0);
        });
        it('should return an empty list when no arrays are passed in', function () {
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
        var mixedMatchRange = append(range(13, 8, -1), range(1, 3));
        // ascRangeArgs = [[1, 2], [3, 5], [8, 13], [21, 24]],
        // descRangeArgs = reverse(map(tuple => append(reverse(tuple), [-1]), ascRangeArgs)),
        // [ascRanges, descRanges] =
        //     map(argsSet =>
        //         map(rangeArgs => apply(range, rangeArgs), argsSet),
        //         [ascRangeArgs, descRangeArgs]
        //     ),
        // [rl1, rl2, rl3, rl4] = ascRanges,
        // [lr1, lr2, lr3, lr4] = descRanges;
        it('should return a union on list 1 with list two', function () {
            [// subj1, subj2, expectResultLen, expectedResultElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]], [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4, 5]], [mixedMatchRange, range(18, 21), 13, mixedMatchRange.concat(range(18, 21))]].forEach(function (testCase) {
                var _testCase4 = _slicedToArray(testCase, 4),
                    subj1 = _testCase4[0],
                    subj2 = _testCase4[1],
                    expectedLen = _testCase4[2],
                    expectedElms = _testCase4[3],
                    result = union(subj1, subj2);
                // log('union', result);


                expectEqual(result.length, expectedLen);
                expectShallowEquals(result, expectedElms);
            });
        });
        it('should return a copy of left-most array when right-most list is empty', function () {
            [// subj1, subj2, expectResultLen, expectedResultElements
            [range(1, 5), [], 5, range(1, 5)], [range(1, 8), [], 8, range(1, 8)], [range(1, 13), [], 13, range(1, 13)], [mixedMatchRange, [], 9, mixedMatchRange]].forEach(function (testCase) {
                var _testCase5 = _slicedToArray(testCase, 4),
                    subj1 = _testCase5[0],
                    subj2 = _testCase5[1],
                    expectedLen = _testCase5[2],
                    expectedElms = _testCase5[3],
                    result = union(subj1, subj2);
                // log('union', result);


                expectEqual(result.length, expectedLen);
                expectShallowEquals(result, expectedElms);
            });
        });
        it('should return a copy of right-most list when left-most list is empty', function () {
            [// subj1, subj2, expectResultLen, expectedResultElements
            [range(1, 5), [], 5, range(1, 5)], [range(1, 8), [], 8, range(1, 8)], [range(1, 13), [], 13, range(1, 13)], [mixedMatchRange, [], 9, mixedMatchRange]].forEach(function (testCase) {
                var _testCase6 = _slicedToArray(testCase, 4),
                    subj1 = _testCase6[0],
                    subj2 = _testCase6[1],
                    expectedLen = _testCase6[2],
                    expectedElms = _testCase6[3],
                    result = union(subj1, subj2);
                // log('union', result);


                expectEqual(result.length, expectedLen);
                expectShallowEquals(result, expectedElms);
            });
        });
        it('should return an empty list when receiving empty lists', function () {
            expectEqual(union('', ''), '');
            expectShallowEquals(union([], []), []);
        });
    });

    describe('#sort', function () {
        it('should sort a list in ascending order', function () {
            expectShallowEquals(sort(range(10, 0, -1)), range(0, 10, 1));
            expectShallowEquals(sort(range(0, 10)), range(0, 10));
            compose(expectShallowEquals(__, alphabetArray), sort, reverse)(alphabetArray);
            compose( /*log,*/sort, reverse)(alphabetArray);
        });
        it('should return a copy of original list when said list is already sorted', function () {
            compose(expectShallowEquals(__, ['a', 'b', 'c']), sort)(take(3, alphabetArray));
            compose(expectShallowEquals(__, ['a', 'b', 'c']), sort)(take(3, alphabetArray));
            compose(expectShallowEquals(__, alphabetArray), sort)(alphabetArray);
            compose(expectShallowEquals(__, range(0, 10)), sort)(range(0, 10));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(sort([]), []);
        });
    });

    describe('#sortOn', function () {
        var identity = function identity(x) {
            return x;
        },
            sortOnIdentity = function sortOnIdentity(xs) {
            return sortOn(identity, xs);
        },
            range0To10 = range(0, 10),
            range10To0 = range(10, 0, -1);
        it('should sort a list in ascending order', function () {
            expectShallowEquals(sortOnIdentity(range10To0), range0To10);
            expectShallowEquals(sortOnIdentity(range0To10), range0To10);
            compose(expectShallowEquals(__, alphabetArray), sortOnIdentity, reverse)(alphabetArray);
            compose( /*log,*/sortOnIdentity, reverse)(alphabetArray);
        });
        it('should return a copy of original list when said list is already sorted', function () {
            compose(expectShallowEquals(__, ['a', 'b', 'c']), sortOnIdentity)(take(3, alphabetArray));
            compose(expectShallowEquals(__, alphabetArray), sortOnIdentity)(alphabetArray);
            compose(expectShallowEquals(__, range0To10), sortOnIdentity)(range0To10);
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(sortOnIdentity([]), []);
        });
    });

    describe('#insert', function () {
        var injectValueAtIndex = function injectValueAtIndex(x, ind, list) {
            if (ind <= 0) {
                return [x].concat(list);
            } else if (ind > list.length - 1) {
                return list.concat([x]);
            }
            return list.slice(0, ind).concat([x], list.slice(ind));
        };
        it('Should insert a value directly before the first value that is less than or equal to it', function () {
            // expectShallowEquals(insert(99, range(0, 144, 5))
            var range0To145 = range(0, 145, 5),
                expectedResult = injectValueAtIndex(99, 20, range0To145),
                result = insert(99, range0To145),
                result1 = insert(99, reverse(range0To145)),
                result2 = insert('x', alphabetArray),
                result3 = insert('x', reverse(alphabetArray));
            // log (result1, result, expectedResult);
            expectShallowEquals(result, expectedResult);
            expectShallowEquals(result1, [99].concat(reverse(range0To145)));
            expectShallowEquals(result2, injectValueAtIndex('x', 24, alphabetArray));
            expectShallowEquals(result3, ['x'].concat(reverse(alphabetArray)));
        });
        it('should insert value even if passed in list is empty', function () {
            expectShallowEquals(insert(99, []), [99]);
            expectShallowEquals(insert('a', []), ['a']);
            expectShallowEquals(insert('a', ''), 'a');
        });
    });

    describe('#nubBy', function () {
        it('should remove all but first occurrences of repeat items in a list.', function () {
            expectEqual(nubBy(equal, 'conundrum'), 'conudrm');
            expectEqual(nubBy(equal, map(function (char) {
                return char + char;
            }, alphabetString)), alphabetString);
            expectShallowEquals(nubBy(equal, concatMap(function (char) {
                return char + char;
            }, alphabetString).split('')), alphabetArray);
        });
        it('should return a copy of the passed in list with items intact if there ' + 'aren\'t any repeat items', function () {
            expectEqual(nubBy(equal, alphabetString), alphabetString);
            expectShallowEquals(nubBy(equal, alphabetArray), alphabetArray);
        });
        it('should return empty lists when receiving empty lists', function () {
            expectEqual(nubBy(equal, ''), '');
            expectShallowEquals(nubBy(equal, []), []);
        });
        it('should throw Errors when receiving nothing', function () {
            assert.throws(function () {
                return nubBy(equal, null);
            }, Error);
            assert.throws(function () {
                return nubBy(equal, undefined);
            }, Error);
        });
    });

    describe('#removeBy', function () {
        it('should remove the first occurrence of an item in a list.', function () {
            expectEqual(removeBy(equal, 'l', 'hello world'), 'helo world');
            expectEqual(removeBy(equal, 'l', 'hello world'.split('')).join(''), 'helo world');
            expectEqual(removeBy(equal, 'a', alphabetString), tail(alphabetString));
            expectEqual(removeBy(equal, 'z', alphabetString), init(alphabetString));
            expectShallowEquals(removeBy(equal, 'a', alphabetArray), tail(alphabetArray));
            expectShallowEquals(removeBy(equal, 'z', alphabetArray), init(alphabetArray));
            // log(removeBy('d', alphabetString));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(removeBy(equal, 'a', ''), '');
            expectShallowEquals(removeBy(equal, 'a', []), []);
        });
        it('should throw Errors when receiving nothing in the list position', function () {
            assert.throws(function () {
                return removeBy(equal, null, null);
            }, Error);
            assert.throws(function () {
                return removeBy(equal, undefined, undefined);
            }, Error);
            assert.throws(function () {
                return removeBy(equal, null, null);
            }, Error);
            assert.throws(function () {
                return removeBy(equal, undefined, undefined);
            }, Error);
        });
    });

    describe('#removeFirstsBy', function () {
        var vowels = 'aeiou',
            vowelsArray = vowels.split(''),
            consonants = removeFirstsBy(equal, alphabetString, vowels),
            consonantsArray = consonants.split('');
        it('should remove all first occurrences of all items in second list by passed in ' + 'equality operation.', function () {
            // Remove first occurrences of `vowels` in `alphabet * 3`
            var subj1 = iterate(length(vowels), function (value, ind) {
                var foundInd = value.indexOf(vowels[ind]);
                // log(value, foundInd);
                if (foundInd > -1) {
                    var parts = splitAt(foundInd, value);
                    // log(parts);
                    return concat([parts[0], tail(parts[1])]);
                }
                return value;
            }, concat([alphabetArray, alphabetArray, alphabetArray]));

            // log(subj1);

            // Expect vowels removed from the same places in both lists
            expectTrue(all(function (tuple) {
                return (/*!log(tuple) &&*/tuple[0] === tuple[1]
                );
            }, [[removeFirstsBy(equal, cycle(3, alphabetString), vowels), concat(subj1)]]));

            // Expect vowels removed from the same places in both lists
            expectShallowEquals(removeFirstsBy(equal, cycle(3, alphabetArray), vowelsArray), subj1);

            // log(removeFirstsBy(equal, cycle(3, alphabetArray), 'aeiou'.split('')));
            // log(removeFirstsBy(equal, cycle(3, alphabetString), 'aeiou'));
        });
        it('should return copy of original list when no items from second list are found in it.', function () {
            expectEqual(removeFirstsBy(equal, consonants, vowels), consonants);
            expectShallowEquals(removeFirstsBy(equal, consonantsArray, vowelsArray), consonantsArray);
        });
    });

    describe('#unionBy', function () {
        var mixedMatchRange = append(range(13, 8, -1), range(1, 3)),

        // ascRangeArgs = [[1, 2], [3, 5], [8, 13], [21, 24]],
        // descRangeArgs = reverse(map(tuple => append(reverse(tuple), [-1]), ascRangeArgs)),
        equalityCheck = function equalityCheck(a, b) {
            return a === b;
        };
        // [ascRanges, descRanges] =
        //     map(argsSet =>
        //         map(rangeArgs => apply(range, rangeArgs), argsSet),
        //         [ascRangeArgs, descRangeArgs]
        //     ),
        // [rl1, rl2, rl3, rl4] = ascRanges,
        // [lr1, lr2, lr3, lr4] = descRanges;
        it('should return a union on list 1 with list two', function () {
            [// subj1, subj2, expectResultLen, expectedResultElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 5, [1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 8, [1, 2, 3, 4, 5, 6, 7, 8]], [[1, 2, 3, 4, 5], [1, 2, 3], 5, [1, 2, 3, 4, 5]], [mixedMatchRange, range(18, 21), 13, mixedMatchRange.concat(range(18, 21))]].forEach(function (testCase) {
                var _testCase7 = _slicedToArray(testCase, 4),
                    subj1 = _testCase7[0],
                    subj2 = _testCase7[1],
                    expectedLen = _testCase7[2],
                    expectedElms = _testCase7[3],
                    result = unionBy(equalityCheck, subj1, subj2);
                // log('unionBy', result);


                expectEqual(result.length, expectedLen);
                expectShallowEquals(result, expectedElms);
            });
        });
        it('should return a copy of left-most array when right-most list is empty', function () {
            [// subj1, subj2, expectResultLen, expectedResultElements
            [range(1, 5), [], 5, range(1, 5)], [range(1, 8), [], 8, range(1, 8)], [range(1, 13), [], 13, range(1, 13)], [mixedMatchRange, [], 9, mixedMatchRange]].forEach(function (testCase) {
                var _testCase8 = _slicedToArray(testCase, 4),
                    subj1 = _testCase8[0],
                    subj2 = _testCase8[1],
                    expectedLen = _testCase8[2],
                    expectedElms = _testCase8[3],
                    result = unionBy(equalityCheck, subj1, subj2);
                // log('unionBy', result);


                expectEqual(result.length, expectedLen);
                expectShallowEquals(result, expectedElms);
            });
        });
        it('should return a copy of right-most list when left-most list is empty', function () {
            [// subj1, subj2, expectResultLen, expectedResultElements
            [range(1, 5), [], 5, range(1, 5)], [range(1, 8), [], 8, range(1, 8)], [range(1, 13), [], 13, range(1, 13)], [mixedMatchRange, [], 9, mixedMatchRange]].forEach(function (testCase) {
                var _testCase9 = _slicedToArray(testCase, 4),
                    subj1 = _testCase9[0],
                    subj2 = _testCase9[1],
                    expectedLen = _testCase9[2],
                    expectedElms = _testCase9[3],
                    result = unionBy(equalityCheck, subj1, subj2);
                // log('unionBy', result);


                expectEqual(result.length, expectedLen);
                expectShallowEquals(result, expectedElms);
            });
        });
        it('should return an empty list when receiving empty lists', function () {
            expectEqual(unionBy(equalityCheck, '', ''), '');
            expectShallowEquals(unionBy(equalityCheck, [], []), []);
        });
    });

    describe('#intersectBy', function () {
        var equality = function equality(a, b) {
            return a === b;
        };
        // it ('should have more tests written');
        it('should return an empty list when receiving an empty list', function () {
            expectEqual(length(intersectBy(equality, [], [1, 2, 3])), 0);
        });
        it('should return an empty list when receiving an empty list as parameter 2', function () {
            expectEqual(length(intersectBy(equality, [1, 2, 3], [])), 0);
        });
        it('should return an empty list when both arrays passed are empty', function () {
            expectEqual(length(intersectBy(equality, [], [])), 0);
        });
        it('should return an intersection of the two arrays on equality function', function () {
            var testCases = [
            // subj1, subj2, expectLen, expectedElements
            [[1, 2, 3], [1, 2, 3, 4, 5], 3, [1, 2, 3]], [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3], 3, [1, 2, 3]], [[1, 2, 3, 4, 5], [1, 2, 3], 3, [1, 2, 3]]];
            testCases.forEach(function (testCase) {
                var _testCase10 = _slicedToArray(testCase, 4),
                    subj1 = _testCase10[0],
                    subj2 = _testCase10[1],
                    expectedLen = _testCase10[2],
                    expectedElms = _testCase10[3],
                    result = intersectBy(equality, subj1, subj2);

                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#groupBy', function () {
        it('should return a list of lists which contain the (sequential) matches on equality function', function () {
            var expectedResultFlattened = ['M', 'i', 'ss', 'i', 'ss', 'i', 'pp', 'i'];
            expectShallowEquals(groupBy(generalEqualityCheck, 'Mississippi'), expectedResultFlattened);
            expectShallowEquals(
            // Flatten results first
            groupBy(generalEqualityCheck, 'Mississippi'.split('')).map(function (item) {
                return item.join('');
            }), expectedResultFlattened);
        });
        it('should return a list of lists containing individual un-grouped items or items that do not match equality function', function () {
            expectShallowEquals(groupBy(generalEqualityCheck, alphabetString), alphabetArray);
            expectShallowEquals(
            // Flatten result first
            groupBy(generalEqualityCheck, alphabetArray).map(function (item) {
                return item.join('');
            }), alphabetArray);
        });
    });

    describe('#sortBy', function () {
        it('should sort a list by ordering function', function () {
            expectShallowEquals(sortBy(genericOrdering, range(10, 0, -1)), range(0, 10, 1));
            expectShallowEquals(sortBy(genericOrdering, range(0, 10)), range(0, 10));
            compose(expectShallowEquals(__, alphabetArray), function (value) {
                return sortBy(genericOrdering, value);
            }, reverse)(alphabetArray);
            compose( /*log,*/function (value) {
                return sortBy(genericOrdering, value);
            }, reverse)(alphabetArray);
        });
        it('should return a copy of original list when said list is already sorted', function () {
            compose(expectShallowEquals(__, ['a', 'b', 'c']), function (xs) {
                return sortBy(genericOrdering, xs);
            })(take(3, alphabetArray));
            compose(expectShallowEquals(__, ['a', 'b', 'c']), function (xs) {
                return sortBy(genericOrdering, xs);
            })(take(3, alphabetArray));
            compose(expectShallowEquals(__, alphabetArray), function (xs) {
                return sortBy(genericOrdering, xs);
            })(alphabetArray);
            compose(expectShallowEquals(__, range(0, 10)), function (xs) {
                return sortBy(genericOrdering, xs);
            })(range(0, 10));
        });
        it('should return an empty list when receiving an empty list', function () {
            expectShallowEquals(sortBy(genericOrdering, []), []);
        });
    });

    describe('#insertBy', function () {
        var injectValueAtIndex = function injectValueAtIndex(x, ind, list) {
            if (ind <= 0) {
                return [x].concat(list);
            } else if (ind > list.length - 1) {
                return list.concat([x]);
            }
            return list.slice(0, ind).concat([x], list.slice(ind));
        },
            genericInsert = function genericInsert(x, xs) {
            return insertBy(genericOrdering, x, xs);
        };
        it('Should insert a value before value that matches equality check', function () {
            // expectShallowEquals(genericInsert(99, range(0, 144, 5))
            var range0To145 = range(0, 145, 5),
                expectedResult = injectValueAtIndex(99, 20, range0To145),
                result = genericInsert(99, range0To145),
                result1 = genericInsert(99, reverse(range0To145)),
                result2 = genericInsert('x', alphabetArray),
                result3 = genericInsert('x', reverse(alphabetArray));
            // log (result1, result, expectedResult);
            expectShallowEquals(result, expectedResult);
            expectShallowEquals(result1, [99].concat(reverse(range0To145)));
            expectShallowEquals(result2, injectValueAtIndex('x', 24, alphabetArray));
            expectShallowEquals(result3, ['x'].concat(reverse(alphabetArray)));
        });
        it('should insert value even if passed in list is empty', function () {
            expectShallowEquals(genericInsert(99, []), [99]);
            expectShallowEquals(genericInsert('a', []), ['a']);
            expectShallowEquals(genericInsert('a', ''), 'a');
        });
    });

    describe('#maximumBy', function () {
        var genericMaximum = function genericMaximum(xs) {
            return maximumBy(genericOrdering, xs);
        };
        it('should be able return the maximum of a given list', function () {
            expectEqual(genericMaximum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 5);
            expectEqual(genericMaximum(range(-5, -1).concat([-3, -5, -7])), -1);
        });
        it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', function () {
            assert.throws(function () {
                return genericMaximum(null);
            }, Error);
            assert.throws(function () {
                return genericMaximum(undefined);
            }, Error);
            // assert.throws(() => genericMaximum([]), Error);
            assert.throws(function () {
                return genericMaximum();
            }, Error);
        });
    });

    describe('#minimumBy', function () {
        var genericMinimum = function genericMinimum(xs) {
            return minimumBy(genericOrdering, xs);
        };
        it('should be able return the minimum of a given list', function () {
            expectEqual(genericMinimum(range(1, 5).concat([1, 3, 4, 3, 2, 3])), 1);
            expectEqual(genericMinimum(range(-5, -1).concat([-3, -7, -5])), -7);
        });
        it('should throw an error when no value is passed in (empty list, `null`, or `undefined`)', function () {
            assert.throws(function () {
                return genericMinimum(null);
            }, Error);
            assert.throws(function () {
                return genericMinimum(undefined);
            }, Error);
            // expectEqual(genericMinimum([]), Infinity);
            assert.throws(function () {
                return genericMinimum();
            }, Error);
        });
    });
});
/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by elyde on 11/25/2016.
 * @todo add more extensive tests for `hasOwnProperty`
 */

describe('#objectOps', function () {

    describe('#hasOwnProperty', function () {
        it('should be a functionOps', function () {
            expectFunction(hasOwnProperty);
        });
        it('should return true when passed in objectOps has the passed in property name', function () {
            var obj = { hello: 'ola', ola: 'mambo' };
            expectTrue(hasOwnProperty('hello', obj));
            expectTrue(hasOwnProperty('ola', obj));
        });
        it('should return false when passed in objectOps doesn\'t have the passed in property name', function () {
            expectFalse(hasOwnProperty('hello', {}));
            expectFalse(hasOwnProperty('mambo', {}));
        });
    });

    describe('#typeOf', function () {
        it('should be a functionOps', function () {
            expectFunction(typeOf);
        });
        it('should return a functionOps when no value is passed in (is curried)', function () {
            expectEqual(typeOf(), 'Undefined');
        });
        it('should return the passed type\'s name', function () {
            [['Array', []], ['Object', {}], ['String', ''], ['Function', function () {}], ['Number', 99], ['Boolean', true], ['Boolean', false], ['Null', null], ['Undefined', undefined]].forEach(function (tuple) {
                return expectEqual(apply(typeOf, tuple));
            });
        });
    });

    describe('#isType', function () {
        it('should be a functionOps', function () {
            expectFunction(isType);
        });
        it('should return `true` when passed in value is of passed in type name/stringOps', function () {
            [['Array', []], ['Object', {}], ['String', ''], ['Function', function () {}], ['Number', 99], ['Boolean', true], ['Boolean', false], ['Null', null], ['Undefined', undefined]].forEach(function (tuple) {
                return expectTrue(apply(isType, tuple));
            });
        });
        it('should return `true` when passed in value is of passed in type constructor', function () {
            [[Array, []], [Object, {}], [String, ''], [Function, function () {}], [Number, 99], [Boolean, true], [Boolean, false]].forEach(function (tuple) {
                return expectTrue(apply(isType, tuple));
            });
        });
        it('should return `false` when passed in value is not of passed in type name/stringOps', function () {
            [['Object', []], ['Array', {}], ['NaN', ''], ['Number', function () {}], ['Function', 99], ['NaN', true], ['Number', false]].forEach(function (tuple) {
                return expectFalse(apply(isType, tuple));
            });
        });
        it('should return `false` when passed in value is not of passed in type constructor', function () {
            [[Object, []], [Array, {}], [NaN, ''], [Number, function () {}], [Function, 99], [NaN, true], [Number, undefined], [Array, false]].forEach(function (tuple) {
                return expectFalse(apply(isType, tuple));
            });
        });
    });

    describe('#isFunction', function () {
        it('should return true if value is a functionOps', function () {
            [function () {}, Math.pow, console.log, function () {}].forEach(function (value) {
                return expectTrue(isFunction(value));
            });
        });
        it('should return `false` when value is not a functionOps', function () {
            [-1, 0, 1, [], {}, 'abc'].forEach(function (value) {
                return expectFalse(isFunction(value));
            });
        });
    });

    describe('#isArray', function () {
        it('should return `true` when given value is an listOps', function () {
            expectTrue(isArray([]));
        });
        it('should return `false` when given value is not an listOps', function () {
            expectFalse(isArray(function () {}));
        });
    });

    describe('#isObject', function () {
        it('should return `true` when given value is a direct instance of `Object`', function () {
            expectTrue(isObject({}));
        });
        it('should return `false` when given value is not a direct instance of `Object`', function () {
            expectFalse(isObject(function () {}));
        });
    });

    describe('#isBoolean', function () {
        it('should return `true` when given value is a booleanOps', function () {
            expectTrue(isBoolean(true));
            expectTrue(isBoolean(false));
        });
        it('should return `false` when given value is not a booleanOps', function () {
            expectFalse(isBoolean(function () {}));
        });
    });

    describe('#isNumber', function () {
        it('should return `true` when given value is a numberOps', function () {
            expectTrue(isNumber(99));
            expectTrue(isNumber(-1.0));
            expectTrue(isNumber(Number('1e-3')));
        });
        it('should return `false` when given value is not a numberOps', function () {
            expectFalse(isNumber(function () {}));
            expectFalse(isNumber(NaN));
        });
    });

    describe('#isString', function () {
        it('should return `true` when given value is a stringOps', function () {
            expectTrue(isString('hello'));
            expectTrue(isString(String('hello')));
        });
        it('should return `false` when given value is not a stringOps', function () {
            expectFalse(isString(function () {}));
            expectFalse(isString(NaN));
        });
    });

    if (typeof Map !== 'undefined') {
        describe('#isMap', function () {
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
        describe('#isSet', function () {
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
        describe('#isWeakMap', function () {
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
        describe('#isWeakSet', function () {
            it('should return `true` when given value is a weak set', function () {
                expectTrue(isWeakSet(new WeakSet()));
            });
            it('should return `false` when given value is not a weak set', function () {
                expectFalse(isWeakSet(function () {}));
                expectFalse(isWeakSet(NaN));
            });
        });
    }

    describe('#isUndefined', function () {
        it('should return `true` when given value is a undefined', function () {
            expectTrue(isUndefined(undefined));
        });
        it('should return `false` when given value is not a undefined', function () {
            expectFalse(isUndefined(function () {}));
            expectFalse(isUndefined(NaN));
        });
    });

    describe('#isNull', function () {
        it('should return `true` when given value is a null', function () {
            expectTrue(isNull(null));
        });
        it('should return `false` when given value is not a null', function () {
            expectFalse(isNull(function () {}));
            expectFalse(isNull(NaN));
        });
    });

    describe('#isSymbol', function () {
        it('should return `true` when given value is a symbol', function () {
            expectTrue(isSymbol(Symbol('hello123')));
        });
        it('should return `false` when given value is not a symbol', function () {
            expectFalse(isSymbol(function () {}));
            expectFalse(isSymbol(NaN));
        });
    });

    describe('#instanceOf', function () {
        it('should return true when parameter two is of type parameter one', function () {
            expectTrue(instanceOf(Function, function () {}));
        });
        it('should return false when parameters two is not of type parameter one', function () {
            expectFalse(instanceOf(Function, {}));
        });
    });

    describe('#objComplement', function () {
        it('should be a functionOps', function () {
            expectFunction(objComplement);
        });
        it('should return an objectOps with only properties not found in the first obj', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { d: 4 },
                subj3 = { e: 5, f: 6, g: 7 },
                result = objComplement(subj1, subj2, subj3);
            [subj2, subj3].forEach(function (subj) {
                keys(subj).forEach(function (key) {
                    expectEqual(result[key], subj[key]);
                });
            });
            keys(subj1).forEach(function (key) {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('#objDifference', function () {

        it('should be a functionOps', function () {
            expectFunction(objDifference);
        });

        it('should return all the props from obj1 that aren\'t in obj2', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { d: 4 },
                result = objDifference(subj1, subj2);
            Object.keys(subj1).forEach(function (key) {
                expectEqual(result[key], subj1[key]);
            });
            Object.keys(subj2).forEach(function (key) {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('#objUnion', function () {
        it('should be a functionOps', function () {
            expectFunction(objUnion);
        });
        it('should return an objectOps containing all properties from the two objects passed in', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { e: 5, f: 6, g: 7 },
                result = objUnion(subj1, subj2);
            [subj2, subj1].forEach(function (subj) {
                Object.keys(subj).forEach(function (key) {
                    expectEqual(result[key], subj[key]);
                });
            });
        });
    });

    describe('#objIntersect', function () {
        it('should be a functionOps', function () {
            expectFunction(objUnion);
        });
        it('should return an objectOps that contains values from both passed in objects', function () {
            var subj1 = { a: 1, b: 2, c: 3, e: 4, f: 8 },
                subj2 = { a: 5, b: 6, c: 7, g: 9 },
                sharedKeys = ['a', 'b', 'c'],
                result = objIntersect(subj1, subj2);
            sharedKeys.forEach(function (key) {
                expectEqual(result[key], subj2[key]);
            });
        });
    });
});
/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by elyde on 11/25/2016.
 * @todo add more extensive tests for `hasOwnProperty`
 */

describe('#objectOpsUncurried', function () {

    describe('#hasOwnProperty', function () {
        it('should be a functionOps', function () {
            expectFunction(hasOwnProperty);
        });
        it('should return true when passed in objectOps has the passed in property name', function () {
            var obj = { hello: 'ola', ola: 'mambo' };
            expectTrue(hasOwnProperty('hello', obj));
            expectTrue(hasOwnProperty('ola', obj));
        });
        it('should return false when passed in objectOps doesn\'t have the passed in property name', function () {
            expectFalse(hasOwnProperty('hello', {}));
            expectFalse(hasOwnProperty('mambo', {}));
        });
    });

    describe('#typeOf', function () {
        it('should be a functionOps', function () {
            expectFunction(typeOf);
        });
        it('should return a functionOps when no value is passed in (is curried)', function () {
            expectEqual(typeOf(), 'Undefined');
        });
        it('should return the passed type\'s name', function () {
            [['Array', []], ['Object', {}], ['String', ''], ['Function', function () {}], ['Number', 99], ['Boolean', true], ['Boolean', false], ['Null', null], ['Undefined', undefined]].forEach(function (tuple) {
                return expectEqual(apply(typeOf, tuple));
            });
        });
    });

    describe('#isType', function () {
        it('should be a functionOps', function () {
            expectFunction(isType);
        });
        it('should return `true` when passed in value is of passed in type name/stringOps', function () {
            [['Array', []], ['Object', {}], ['String', ''], ['Function', function () {}], ['Number', 99], ['Boolean', true], ['Boolean', false], ['Null', null], ['Undefined', undefined]].forEach(function (tuple) {
                return expectTrue(apply(isType, tuple));
            });
        });
        it('should return `true` when passed in value is of passed in type constructor', function () {
            [[Array, []], [Object, {}], [String, ''], [Function, function () {}], [Number, 99], [Boolean, true], [Boolean, false]].forEach(function (tuple) {
                return expectTrue(apply(isType, tuple));
            });
        });
        it('should return `false` when passed in value is not of passed in type name/stringOps', function () {
            [['Object', []], ['Array', {}], ['NaN', ''], ['Number', function () {}], ['Function', 99], ['NaN', true], ['Number', false]].forEach(function (tuple) {
                return expectFalse(apply(isType, tuple));
            });
        });
        it('should return `false` when passed in value is not of passed in type constructor', function () {
            [[Object, []], [Array, {}], [NaN, ''], [Number, function () {}], [Function, 99], [NaN, true], [Number, undefined], [Array, false]].forEach(function (tuple) {
                return expectFalse(apply(isType, tuple));
            });
        });
    });

    describe('#isFunction', function () {
        it('should return true if value is a functionOps', function () {
            [function () {}, Math.pow, console.log, function () {}].forEach(function (value) {
                return expectTrue(isFunction(value));
            });
        });
        it('should return `false` when value is not a functionOps', function () {
            [-1, 0, 1, [], {}, 'abc'].forEach(function (value) {
                return expectFalse(isFunction(value));
            });
        });
    });

    describe('#isArray', function () {
        it('should return `true` when given value is an listOps', function () {
            expectTrue(isArray([]));
        });
        it('should return `false` when given value is not an listOps', function () {
            expectFalse(isArray(function () {}));
        });
    });

    describe('#isObject', function () {
        it('should return `true` when given value is a direct instance of `Object`', function () {
            expectTrue(isObject({}));
        });
        it('should return `false` when given value is not a direct instance of `Object`', function () {
            expectFalse(isObject(function () {}));
        });
    });

    describe('#isBoolean', function () {
        it('should return `true` when given value is a booleanOps', function () {
            expectTrue(isBoolean(true));
            expectTrue(isBoolean(false));
        });
        it('should return `false` when given value is not a booleanOps', function () {
            expectFalse(isBoolean(function () {}));
        });
    });

    describe('#isNumber', function () {
        it('should return `true` when given value is a numberOps', function () {
            expectTrue(isNumber(99));
            expectTrue(isNumber(-1.0));
            expectTrue(isNumber(Number('1e-3')));
        });
        it('should return `false` when given value is not a numberOps', function () {
            expectFalse(isNumber(function () {}));
            expectFalse(isNumber(NaN));
        });
    });

    describe('#isString', function () {
        it('should return `true` when given value is a stringOps', function () {
            expectTrue(isString('hello'));
            expectTrue(isString(String('hello')));
        });
        it('should return `false` when given value is not a stringOps', function () {
            expectFalse(isString(function () {}));
            expectFalse(isString(NaN));
        });
    });

    if (typeof Map !== 'undefined') {
        describe('#isMap', function () {
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
        describe('#isSet', function () {
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
        describe('#isWeakMap', function () {
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
        describe('#isWeakSet', function () {
            it('should return `true` when given value is a weak set', function () {
                expectTrue(isWeakSet(new WeakSet()));
            });
            it('should return `false` when given value is not a weak set', function () {
                expectFalse(isWeakSet(function () {}));
                expectFalse(isWeakSet(NaN));
            });
        });
    }

    describe('#isUndefined', function () {
        it('should return `true` when given value is a undefined', function () {
            expectTrue(isUndefined(undefined));
        });
        it('should return `false` when given value is not a undefined', function () {
            expectFalse(isUndefined(function () {}));
            expectFalse(isUndefined(NaN));
        });
    });

    describe('#isNull', function () {
        it('should return `true` when given value is a null', function () {
            expectTrue(isNull(null));
        });
        it('should return `false` when given value is not a null', function () {
            expectFalse(isNull(function () {}));
            expectFalse(isNull(NaN));
        });
    });

    describe('#isSymbol', function () {
        it('should return `true` when given value is a symbol', function () {
            expectTrue(isSymbol(Symbol('hello123')));
        });
        it('should return `false` when given value is not a symbol', function () {
            expectFalse(isSymbol(function () {}));
            expectFalse(isSymbol(NaN));
        });
    });

    describe('#instanceOf', function () {
        it('should return true when parameter two is of type parameter one', function () {
            expectTrue(instanceOf(Function, function () {}));
        });
        it('should return false when parameters two is not of type parameter one', function () {
            expectFalse(instanceOf(Function, {}));
        });
    });

    describe('#assignDeep', function () {
        it('should have tests written');
    });

    describe('#objComplement', function () {
        it('should be a functionOps', function () {
            expectFunction(objComplement);
        });
        it('should return an objectOps with only properties not found in the first obj', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { d: 4 },
                subj3 = { e: 5, f: 6, g: 7 },
                result = objComplement(subj1, subj2, subj3);
            [subj2, subj3].forEach(function (subj) {
                keys(subj).forEach(function (key) {
                    expectEqual(result[key], subj[key]);
                });
            });
            keys(subj1).forEach(function (key) {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('#objDifference', function () {

        it('should be a functionOps', function () {
            expectFunction(objDifference);
        });

        it('should return all the props from obj1 that aren\'t in obj2', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { d: 4 },
                result = objDifference(subj1, subj2);
            Object.keys(subj1).forEach(function (key) {
                expectEqual(result[key], subj1[key]);
            });
            Object.keys(subj2).forEach(function (key) {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('#objUnion', function () {
        it('should be a functionOps', function () {
            expectFunction(objUnion);
        });
        it('should return an objectOps containing all properties from the two objects passed in', function () {
            var subj1 = { a: 1, b: 2, c: 3 },
                subj2 = { e: 5, f: 6, g: 7 },
                result = objUnion(subj1, subj2);
            [subj2, subj1].forEach(function (subj) {
                Object.keys(subj).forEach(function (key) {
                    expectEqual(result[key], subj[key]);
                });
            });
        });
    });

    describe('#objIntersect', function () {
        it('should be a functionOps', function () {
            expectFunction(objUnion);
        });
        it('should return an objectOps that contains values from both passed in objects', function () {
            var subj1 = { a: 1, b: 2, c: 3, e: 4, f: 8 },
                subj2 = { a: 5, b: 6, c: 7, g: 9 },
                sharedKeys = ['a', 'b', 'c'],
                result = objIntersect(subj1, subj2);
            sharedKeys.forEach(function (key) {
                expectEqual(result[key], subj2[key]);
            });
        });
    });
});

Object.defineProperty(exports, '__esModule', { value: true });

});
