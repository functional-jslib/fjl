define('testSuite', ['exports'], function (exports) { 'use strict';

/**
 * Created by elyde on 12/10/2016.
 */
Object.defineProperty(exports, "__esModule", {
    value: true
});
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
    return compose(expectEqual(len), length)(element);
});
var hasOwnProperty = exports.hasOwnProperty = function hasOwnProperty(instance, key) {
    return Object.prototype.hasOwnProperty.call(instance, key);
};
var length = exports.length = function length(something) {
    return something.length;
};
var add = exports.add = curry2_(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.reduce(function (agg, num) {
        return num + agg;
    }, 0);
});
var multiply = exports.multiply = curry2_(function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return args.reduce(function (agg, num) {
        return num * agg;
    }, 1);
});
var divide = exports.divide = curry2_(function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return args.reduce(function (agg, num) {
        return agg / num;
    }, args.shift());
});
var subtract = exports.subtract = curry2_(function (arg0) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
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
var expectShallowEquals = exports.expectShallowEquals = curry2_(function (a, b) {
    return expectTrue(shallowCompareOnLeft(a, b));
});
var range = exports.range = curry2_(function (from, to) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var inc = from;
    var out = [];
    for (; inc <= to; inc += step) {
        out.push(inc);
    }
    return out;
});
var log = exports.log = console.log.bind(console);

exports.default = {
    expectFunction: expectFunction,
    expectInstanceOf: expectInstanceOf,
    expectEqual: expectEqual,
    expectFalse: expectFalse,
    expectTrue: expectTrue,
    expectLength: expectLength,
    expectShallowEquals: expectShallowEquals,
    hasOwnProperty: hasOwnProperty,
    length: length,
    add: add,
    multiply: multiply,
    divide: divide,
    shallowCompareArraysLeft: shallowCompareArraysLeft,
    shallowCompareObjectsLeft: shallowCompareObjectsLeft,
    shallowCompareOnLeft: shallowCompareOnLeft,
    range: range
};
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Created by elyde on 12/29/2016.
 */

describe('#arrayOps', function () {

    var strToArray = split('');

    describe('#all', function () {
        it('should return true when predicate returns true for all items in list', function () {
            expectTrue(all(function (item) {
                return item;
            }, [true, true, true]));
        });
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
            compose(expectEqual('orange'), join(''), init, strToArray)('oranges');
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
            compose(expectEqual('ello'), join(''), tail, strToArray)('hello');
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
        it('should have more tests.');
    });

    describe('#null', function () {
        it('is defined by `module:is.isEmpty` and is defined in another package.');
    });

    describe('#length', function () {
        it('is defined in another package');
    });

    describe('#map', function () {
        it('should have more tests.');
    });

    describe('#reverse', function () {
        it('should have more tests.');
    });

    describe('#intersperse', function () {
        it('should have more tests.');
    });

    describe('#intercalate', function () {
        it('should have more tests.');
    });

    describe('#transpose', function () {
        it('should have more tests.');
    });

    describe('#subsequences', function () {
        it('should have more tests.');
    });

    describe('#permutations', function () {
        it('should have more tests.');
    });

    describe('#foldl', function () {
        it('should have more tests.');
    });

    describe('#foldl1', function () {
        it('should have more tests.');
    });

    describe('#foldr', function () {
        it('should have more tests.');
    });

    describe('#foldr1', function () {
        it('should have more tests.');
    });

    describe('#concat', function () {
        it('should have more tests.');
    });

    describe('#concatMap', function () {
        it('should have more tests.');
    });

    describe('#and', function () {
        it('should have more tests.');
    });

    describe('#or', function () {
        it('should have more tests.');
    });

    describe('#any', function () {
        it('should have more tests.');
    });

    describe('#all', function () {
        it('should have more tests.');
    });

    describe('#sum', function () {
        it('should have more tests.');
    });

    describe('#product', function () {
        it('should have more tests.');
    });

    describe('#maximum', function () {
        it('should have more tests.');
    });

    describe('#minimum', function () {
        it('should have more tests.');
    });

    describe('#mapAccumL', function () {
        it('should map a functionOps/operation on every item of a list and it should return a tuple containing the accumulated value and the an instance of passed in container with mapped items', function () {
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
                var reducedForCompare = reduce(function (agg, item, ind) {
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
        it('should map a functionOps/operation on every item of a list and it should return a tuple containing the accumulated value and the an instance of passed in container with mapped items', function () {
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
                var reducedForCompare = reduceRight(function (agg, item, ind) {
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
        it('should have more tests.');
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
        it('should have more tests.');
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
        it('should...');
        log(stripPrefix('hello', 'hello world'));
    });

    describe('#group', function () {
        it('should have more tests');
    });

    describe('#inits', function () {
        it('should have more tests');
    });

    describe('#tails', function () {
        it('should have more tests');
    });

    describe('#isPrefixOf', function () {
        it('should have more tests');
    });

    describe('#isSuffixOf', function () {
        it('should have more tests');
    });

    describe('#isInfixOf', function () {
        it('should have more tests');
    });

    describe('#isSubsequenceOf', function () {
        it('should have more tests');
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
    });

    describe('#filter', function () {
        it('should have more tests.');
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
        it('should have more tests');
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
        });
    });

    describe('#zip', function () {
        it('should have more tests.');
    });

    describe('#zipN', function () {
        it('should have more tests.');
    });

    describe('#zipWith', function () {
        it('should have more tests.');
    });

    describe('#unzip', function () {
        it('should have more tests.');
    });

    describe('#unzipN', function () {
        it('should have more tests.');
    });

    describe('#lines', function () {
        it('should have more tests.');
    });

    describe('#words', function () {
        it('should have more tests.');
    });

    describe('#unlines', function () {
        it('should have more tests.');
    });

    describe('#unwords', function () {
        it('should have more tests.');
    });

    describe('#nub', function () {
        it('should have more tests.');
    });

    describe('#remove', function () {
        // same as `delete`
        it('should have more tests.');
    });

    describe('#complement', function () {
        it('should return an empty listOps when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, arrayComplement)();
        });
        it('should return an empty listOps if only one listOps is passed in', function () {
            compose(expectEqual(__, 0), length, arrayComplement)([1, 2, 3]);
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
                    result = arrayComplement.apply(null, subjects);

                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#difference', function () {
        it('should return an empty listOps when no parameters are passed in', function () {
            compose(expectEqual(__, 0), length, arrayDifference)();
        });
        it('should return a clone of the passed in listOps if it is only the first listOps that is passed in', function () {
            compose(expectEqual(__, 3), length, arrayDifference([]))([1, 2, 3]);
        });
        it('should return an empty listOps when there are no differences between the two arrays passed in', function () {
            compose(expectEqual(__, 0), length, arrayDifference([1, 2, 3]))([1, 2, 3]);
        });
        it('should return a clone of the passed in listOps if it is only the first listOps that is passed in', function () {
            compose(expectEqual(__, 3), length, arrayDifference([]))([1, 2, 3]);
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
                    result = arrayDifference(subj1, subj2);

                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#intersect', function () {
        it('should return an empty listOps when receiving an empty listOps as parameter 1', function () {
            compose(expectEqual(__, 0), length, arrayIntersect)([]);
            compose(expectEqual(__, 0), length, arrayIntersect([]))([1, 2, 3]);
        });
        it('should return an empty listOps when receiving an empty listOps as parameter 2', function () {
            compose(expectEqual(__, 0), length, arrayIntersect([1, 2, 3]))([]);
        });
        it('should return an empty listOps when both arrays passed are empty', function () {
            compose(expectEqual(__, 0), length, arrayIntersect([]))([]);
        });
        it('should return an empty listOps when no arrays are passed in', function () {
            compose(expectEqual(__, 0), length, arrayIntersect)();
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
                    result = arrayIntersect(subj1, subj2);

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
                    result = arrayUnion(subj1, subj2);

                expectEqual(result.length, expectedLen);
                result.forEach(function (elm, ind) {
                    expectEqual(elm, expectedElms[ind]);
                });
            });
        });
    });

    describe('#sort', function () {
        it('should have more tests written');
    });

    describe('#sortOn', function () {
        it('should have more tests written');
    });

    describe('#insert', function () {
        it('should have more tests written');
    });

    describe('#nubBy', function () {
        it('should have more tests written');
    });

    describe('#removeBy', function () {
        it('should have more tests written');
    });

    describe('#removeFirstBy', function () {
        it('should have more tests written');
    });

    describe('#unionBy', function () {
        it('should have more tests written');
    });

    describe('#intersectBy', function () {
        it('should have more tests written');
    });

    describe('#groupBy', function () {
        it('should have more tests written');
    });

    describe('#sortBy', function () {
        it('should have more tests written');
    });

    describe('#insertBy', function () {
        it('should have more tests written');
    });

    describe('#maximumBy', function () {
        it('should have more tests written');
    });

    describe('#minimumBy', function () {
        it('should have more tests written');
    });

    describe('#flatten', function () {
        it('should return an listOps when receiving an listOps', function () {
            expectInstanceOf(flatten([]), Array);
        });

        it('should flatten an listOps', function () {
            var expected = [1, 2, 3],
                subject = [[1], [[2]], [[[3]]]],
                testData = [[subject, expected], [[[[[1]]], [[2]], [3]], expected], [[1, [2, 3, [4, 5, 6, [7, 8, 9, 10, [11, 12, 13, 14, 15]]]]], range(1, 15)]];
            testData.forEach(function (args) {
                return expectShallowEquals(flatten.apply(undefined, _toConsumableArray(args)));
            });
        });
    });

    describe('#flattenMulti', function () {
        it('should return an listOps when receiving many arrays', function () {
            var result = flattenMulti([], [[]], [[[]]], [[[[]]]]);
            expectInstanceOf(result, Array);
            expectShallowEquals(result, []);
        });

        it('should flatten all passed in arrays into one listOps no matter their dimensions', function () {
            // [[ args ], expected] - args is the args to spread on the call of `flattenMulti`
            [[[[[1], [2, [3], range(4, 9)]], range(10, 21)], range(1, 21)], [[[[[1]]], [[2]], [3]], [1, 2, 3]], [[[1, [2, 3, [4, 5, 6, [7, 8, 9, 10, [11, 12, 13, 14, 15]]]], range(16, 34)]], range(1, 34)]].map(function (args) {
                return expectShallowEquals(flattenMulti.apply(undefined, _toConsumableArray(args[0])), args[1]);
            });
        });
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
            var add3Nums = curryN(addRecursive, 3);

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
            var multiply5Nums = curryN(multiplyRecursive, 5),
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
            var add3Nums = curryN_(addRecursive, 3),
                multiply5Nums = curryN_(multiplyRecursive, 5),
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
            var add3Nums = curryN_(addRecursive, 3);

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
            var multiply5Nums = curryN_(multiplyRecursive, 5),
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
            var divideC = curryN_(divideR, 3);

            // Curry divideR to divde 3 or more numbers
            expect(divideC(25, 5)).to.be.instanceOf(Function);
            expect(divideC(__, 625, __)(3125, 5)).to.equal(1);
            expect(divideC(Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
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

Object.defineProperty(exports, '__esModule', { value: true });

});
