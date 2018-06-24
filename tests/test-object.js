/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by elyde on 11/25/2016.
 */
import {assert, expect} from 'chai';
import {apply} from '../src/function';
import {
    objComplement, objDifference, objUnion, objIntersect,
    typeOf, instanceOf, hasOwnProperty, keys,
    isType, isNumber, isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isMap, isSet, jsonClone,
    fromAssocList, toAssocList, toArray, log, peek, error,
    isWeakMap, isWeakSet, assignDeep, assign,
    toAssocListDeep, fromAssocListDeep
} from '../src/object';
import {foldl, map, and, head, tail, subsequences, unfoldr, all} from '../src/list';
import {
    expectTrue, expectFalse, expectEqual, expectFunction,
    deepCompareObjectsLeft, allYourBase
} from './helpers';

describe ('#object', function () {
    const charCodeToCharArrayMap = unfoldr(
        (charCode, ind) => ind === 26 ? undefined :
            [[charCode, String.fromCharCode(charCode)], ++charCode],
        'a'.charCodeAt(0)
        ),
        charCodeToCharMap = charCodeToCharArrayMap.reduce((agg, [charCode, char]) => {
            agg[charCode] = char;
            return agg;
        }, {});

    // log (charCodeToCharArrayMap, charCodeToCharMap);

    describe('#hasOwnProperty', function () {
        it ('should be a function', function () {
            expectFunction(hasOwnProperty);
        });
        it ('should return true when passed in object has the passed in property name', function () {
            const obj = {hello: 'ola', ola: 'mambo'};
            expectTrue(hasOwnProperty('hello', obj));
            expectTrue(hasOwnProperty('ola', obj));
        });
        it ('should return false when passed in object doesn\'t have the passed in property name', function () {
            expectFalse(hasOwnProperty('hello', {}));
            expectFalse(hasOwnProperty('mambo', {}));
        });
    });

    describe('#typeOf', function () {
        it ('should be a function', function () {
            expectFunction(typeOf);
        });
        it ('should return a function when no value is passed in (is curried)', function () {
            expectEqual(typeOf(), 'Undefined');
        });
        it ('should return the passed type\'s name', function () {
            [
                ['Array', []],
                ['Object', {}],
                ['String', ''],
                ['Function', function () {}],
                ['Number', 99],
                ['Boolean', true],
                ['Boolean', false],
                ['Null', null],
                ['Undefined', undefined],
                ['Symbol', Symbol('hello')]
            ]
                .forEach(tuple => expectEqual(apply(typeOf, tuple)));
        });
    });

    describe('#isType', function () {
        it ('should be a function', function () {
            expectFunction(isType);
        });
        it ('should return `true` when passed in value is of passed in type name/string', function () {
            [
                ['Array', []],
                ['Object', {}],
                ['String', ''],
                ['Function', function () {}],
                ['Number', 99],
                ['Boolean', true],
                ['Boolean', false],
                ['Null', null],
                ['Undefined', undefined]
            ]
                .forEach(tuple => expectTrue(apply(isType, tuple)));
        });
        it ('should return `true` when passed in value is of passed in type constructor', function () {
            [
                [Array, []],
                [Object, {}],
                [String, ''],
                [Function, function () {}],
                [Number, 99],
                [Boolean, true],
                [Boolean , false]
            ]
                .forEach(tuple => expectTrue(apply(isType, tuple)));
        });
        it ('should return `false` when passed in value is not of passed in type name/string', function () {
            [
                ['Object', []],
                ['Array', {}],
                ['NaN', ''],
                ['Number', function () {}],
                ['Function', 99],
                ['NaN', true],
                ['Number', false]
            ]
                .forEach(tuple => expectFalse(apply(isType, tuple)));
        });
        it ('should return `false` when passed in value is not of passed in type constructor', function () {
            [
                [Object, []],
                [Array, {}],
                [NaN, ''],
                [Number, function () {}],
                [Function, 99],
                [NaN, true],
                [Number, undefined],
                [Array, false]
            ]
                .forEach(tuple => expectFalse(apply(isType, tuple)));
        });
    });

    describe('#isFunction', function () {
        it('should return true if value is a function', function () {
            [(() => undefined), function () {}]
                .forEach(value => expect(value).to.be.instanceOf(Function));
        });
        it('should return `false` when value is not a function', function () {
            [-1, 0, 1, [], {}, 'abc']
                .forEach(value => expectFalse(isFunction(value)));
        });
    });

    describe('#isArray', function () {
        it ('should return `true` when given value is an list', function () {
            expectTrue(isArray([]));
        });
        it ('should return `false` when given value is not an list', function () {
            expectFalse(isArray(function () {}));
        });
    });

    describe('#isObject', function () {
        it ('should return `true` when given value is a direct instance of `Object`', function () {
            expectTrue(isObject({}));
        });
        it ('should return `false` when given value is not a direct instance of `Object`', function () {
            expectFalse(isObject(function () {}));
        });
    });

    describe('#isBoolean', function () {
        it ('should return `true` when given value is a boolean', function () {
            expectTrue(isBoolean(true));
            expectTrue(isBoolean(false));
        });
        it ('should return `false` when given value is not a boolean', function () {
            expectFalse(isBoolean(function () {}));
        });
    });

    describe('#isNumber', function () {
        it ('should return `true` when given value is a numberOps', function () {
            expectTrue(isNumber(99));
            expectTrue(isNumber(-1.0));
            expectTrue(isNumber(Number('1e-3')));
        });
        it ('should return `false` when given value is not a numberOps', function () {
            expectFalse(isNumber(function () {}));
            expectFalse(isNumber(NaN));
        });
    });

    describe('#isString', function () {
        it ('should return `true` when given value is a string', () => {
            expectTrue(isString('hello'));
            expectTrue(isString(String('hello')));
        });
        it ('should return `false` when given value is not a string', () => {
            expect(isString(function () {})).to.equal(false);
            expect(isString(NaN)).to.equal(false);
        });
    });

    if (typeof Map !== 'undefined') {
        describe('#isMap', function () {
            it ('should return `true` when given value is a map', function () {
                expectTrue(isMap(new Map()));
            });
            it ('should return `false` when given value is not a map', function () {
                expectFalse(isMap(function () {}));
                expectFalse(isMap(NaN));
            });
        });
    }

    if (typeof Set !== 'undefined') {
        describe('#isSet', function () {
            it ('should return `true` when given value is a set', function () {
                expectTrue(isSet(new Set()));
            });
            it ('should return `false` when given value is not a set', function () {
                expectFalse(isSet(function () {}));
                expectFalse(isSet(NaN));
            });
        });
    }

    if (typeof WeakMap !== 'undefined') {
        describe('#isWeakMap', function () {
            it ('should return `true` when given value is a weak map', function () {
                expectTrue(isWeakMap(new WeakMap()));
            });
            it ('should return `false` when given value is not a weak map', function () {
                expectFalse(isWeakMap(function () {}));
                expectFalse(isWeakMap(NaN));
            });
        });
    }

    if (typeof WeakSet !== 'undefined') {
        describe('#isWeakSet', function () {
            it ('should return `true` when given value is a weak set', function () {
                expectTrue(isWeakSet(new WeakSet()));
            });
            it ('should return `false` when given value is not a weak set', function () {
                expectFalse(isWeakSet(function () {}));
                expectFalse(isWeakSet(NaN));
            });
        });
    }

    describe('#isUndefined', function () {
        it ('should return `true` when given value is a undefined', function () {
            expectTrue(isUndefined(undefined));
        });
        it ('should return `false` when given value is not a undefined', function () {
            expectFalse(isUndefined(function () {}));
            expectFalse(isUndefined(NaN));
        });
    });

    describe('#isNull', function () {
        it ('should return `true` when given value is a null', function () {
            expectTrue(isNull(null));
        });
        it ('should return `false` when given value is not a null', function () {
            expectFalse(isNull(function () {}));
            expectFalse(isNull(NaN));
        });
    });

    describe('#isSymbol', function () {
        it ('should return `true` when given value is a symbol', function () {
            expectTrue(isSymbol(Symbol('hello123')));
        });
        it ('should return `false` when given value is not a symbol', function () {
            expectFalse(isSymbol(function () {}));
            expectFalse(isSymbol(NaN));
        });
    });

    describe('#instanceOf', function () {
        it ('should return true when parameter two is of type parameter one', function () {
            expectTrue(instanceOf(Function, function () {}));
        });
        it ('should return false when parameters two is not of type parameter one', function () {
            expectFalse(instanceOf(Function, {}));
        })
    });

    describe('#assignDeep', function () {
        const sentence = 'all your base are belong to us',
            words = sentence.split(' '),
            wordsLen = words.length,
            obj = {all: {your: {base: {are: {belong: {to: {us: {}}}}}}}},
            obj2 = {hair: {cut: {and: {shampoo: 1}}}},

            // Create an object with some random props
            randomObj = words.reduce((agg, word, ind) => {
                // quasi tree-like obj
                agg[word] = {
                    left: ind ? words[ind - 1] : undefined,
                    right: ind < wordsLen ? words[ind + 1] : undefined
                };
                return agg;
            }, {}),

            clonedObj = jsonClone(obj),

            // expectTrue(words.map())
            result1 = assignDeep(randomObj, obj2, clonedObj);

        it ('should assign all props from one object to another recursively', function () {
            // Check all top level properties
            expectTrue(words
                .map(word => result1.hasOwnProperty(word) && result1[word])
                .every(result => result));

            // Expect true that all results (head of return) of accumalated value are `true`
            // and checks container of booleans
            // `head` pulls item at index `0` of list
            const check1 = foldl(
                ([_results, _obj, _lastObj], word) => [
                    (_results.push(_obj.hasOwnProperty(word) && _lastObj.hasOwnProperty(word)), _results),
                    _obj[word],
                    _lastObj[word]
                ],
                // [checks, result-of-op, test-against-obj]
                [[], result1, clonedObj], // clone object so we don't destroy/alter it
                words
            );

            // log(check1);

            // Expect original object and resulting objects to both have the same nested properties
            expectTrue(and(head(check1)));

            // Ensure both objects checked don't have any remaining keys
            expectTrue(and(map(x => !Object.keys(x).length, tail(check1))));
        });

        it ('should not modify objects other than the first object passed in', function () {
            expectTrue(deepCompareObjectsLeft(clonedObj, obj));
            // @todo do a more full proof check here
        });
    });

    describe('#assign', function () {
        const sentence = 'all your base are belong to us',
            words = sentence.split(' '),
            wordsLen = words.length,
            obj = {all: {your: {base: {are: {belong: {to: {us: {}}}}}}}},
            obj2 = {hair: {cut: {and: {shampoo: 1}}}},

            // Create an object with some random props
            randomObj = words.reduce((agg, word, ind) => {
                // quasi tree-like obj
                agg[word] = {
                    left: ind ? words[ind - 1] : undefined,
                    right: ind < wordsLen ? words[ind + 1] : undefined
                };
                return agg;
            }, {}),

            clonedObj = jsonClone(obj),

            // expectTrue(words.map())
            result1 = assign(randomObj, obj2, clonedObj);

        it ('should assign all props from one object to another recursively', function () {
            // Check all top level properties
            expectTrue(words
                .map(word => result1.hasOwnProperty(word) && result1[word])
                .every(result => result));

            expectTrue(deepCompareObjectsLeft(obj2, result1));

            expectTrue(deepCompareObjectsLeft(clonedObj, result1));
        });

        it ('should not modify objects other than the first object passed in', function () {
            expectTrue(deepCompareObjectsLeft(clonedObj, obj));
            // @todo do a more full proof check here
        });
    });

    describe('#objComplement', function () {
        it('should be a function', function () {
            expectFunction(objComplement);
        });
        it('should return an object with only properties not found in the first obj', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {d: 4},
                subj3 = {e: 5, f: 6, g: 7},
                result = objComplement(subj1, subj2, subj3);
            [subj2, subj3].forEach(function (subj) {
                keys(subj).forEach(key => {
                    expectEqual(result[key], subj[key]);
                });
            });
            keys(subj1).forEach(key => {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('#objDifference', function () {

        it('should be a function', function () {
            expectFunction(objDifference);
        });

        it('should return all the props from obj1 that aren\'t in obj2', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {d: 4},
                result = objDifference(subj1, subj2);
            Object.keys(subj1).forEach(key => {
                expectEqual(result[key], subj1[key]);
            });
            Object.keys(subj2).forEach(key => {
                expectFalse(result.hasOwnProperty(key));
            });
        });

    });

    describe('#objUnion', function () {
        it('should be a function', function () {
            expectFunction(objUnion);
        });
        it ('should return an object containing all properties from the two objects passed in', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {e: 5, f: 6, g: 7},
                result = objUnion(subj1, subj2);
            [subj2, subj1].forEach(function (subj) {
                Object.keys(subj).forEach(key => {
                    expectEqual(result[key], subj[key]);
                });
            });
        });
    });

    describe('#objIntersect', function () {
        it('should be a function', function () {
            expectFunction(objUnion);
        });
        it ('should return an object that contains values from both passed in objects', function () {
            let subj1 = {a: 1, b: 2, c: 3, e: 4, f: 8},
                subj2 = {a: 5, b: 6, c: 7, g: 9},
                sharedKeys = ['a', 'b', 'c'],
                result = objIntersect(subj1, subj2);
            sharedKeys.forEach(key => {
                expectEqual(result[key], subj2[key]);
            });
        });
    });

    describe ('#jsonClone', function () {
        it ('should be a function', function () {
            expect(jsonClone).to.be.instanceOf(Function);
        });
        // it ('should return results the same as `JSON.parse(JSON.stringify(...))`', () => {
            // expect(expectDeepEquals(jsonClone(allYourBase), allYourBase)).to.equal(true);
        // });
    });

    describe ('#toArray', function () {
        test ('should be a function', function () {
            expect(toArray).to.be.instanceOf(Function);
        });
        test ('should return an empty array for `null` and/or `undefined`', () => {
            [null, undefined].forEach(x => expect(toArray(x)).to.be.instanceOf(Array));
        });
        // @todo add more extensive tests here
    });

    describe ('#log', function () {
        it ('should be a function', function () {
            expect(typeof log).to.equal('function');
        });
        // it ('should have more tests');
        // @todo add more extensive tests here
    });

    describe ('#error', function () {
        it ('should be a function', function () {
            expect(typeof error).to.equal('function');
        });
        // it ('should have more tests');
        // @todo add more extensive tests here
    });

    describe ('#peek', function () {
        it ('should be a function', function () {
            expect(peek).to.be.instanceOf(Function);
        });
        it ('should return last arg passed in when being called with one or more args.', function () {
            subsequences('abcde').concat([
                [99], [true], [undefined], [null], ['Output tested from `peek`']
            ]).forEach(xs => {
                expect(peek.apply(null, xs)).to.equal(xs.pop());
            });
        });
    });

    describe ('#toAssocList, #toAssocList', function () {
        test ('should convert an object to an array map', () => {
            // Ensure map was converted to array map properly
            expect(all(([charCode, char], ind) => {
                    const [charCode1, char1] = charCodeToCharArrayMap[ind];
                    return `${charCode1}` === charCode && char1 === char;
                }, toAssocList(charCodeToCharMap)
            ))
                .to.equal(true);
        });
        test ('should return an empty array when receiving `{}`, `null`, or `undefined`', () => {
            const result = toAssocList({});
            expect(result).to.be.instanceOf(Array);
            expect(result.length).to.equal(0);
        });
    });

    describe ('#toAssocListDeep', () => {
        it ('should be able to turn an object into an associated list', () => {
            const expected = [[
                    'all', [[
                        'your', [[
                            'base', [[
                                'are', [[
                                    'belong', [[
                                        'to', [[
                                            'us', 0
                                        ]]
                                    ]]
                                ]]
                            ]]
                        ]]
                    ]]
                ]],
                result = toAssocListDeep(allYourBase, allYourBase.constructor),
            verifyResult = (assocList, obj) => {
                assocList.forEach(([key, value]) => {
                    if (obj[key].constructor === obj.constructor) {
                        expect(value).to.be.instanceOf(Array);
                        return verifyResult(value, obj[key]);
                    }
                    switch (obj[key].constructor) {
                        case Array:
                        case Object:
                            expect(value).to.deep.equal(obj[key]);
                            break;
                        default:
                            expect(value).to.equal(obj[key]);
                            break;
                    }
                });
            };
            verifyResult(result, allYourBase);
            expect(result).to.be.instanceOf(Array);
            expect(result).to.deep.equal(expected);
        });
        it ('should throw an error when receiving `null`, or `undefined`.', () => {
            [null, undefined].forEach(x => assert.throws(() => toAssocListDeep(x), Error));
        });
    });

    describe ('#fromAssocList, #fromAssocList', function () {
        test ('should return an object from an array map', () => {
            const result = fromAssocList(charCodeToCharArrayMap);
            expect(isObject(result)).to.equal(true);
            expect(
                all(([charCode, char]) =>
                    result[charCode] === char,
                    charCodeToCharArrayMap
                )
            )
                .to.equal(true);
        });
        test ('should throw an error when receiving `null`, or `undefined`', () => {
            [null, undefined].forEach(x => assert.throws(() => fromAssocList(x), Error));
        });
    });

    describe ('#fromAssocListDeep', () => {
        it ('should be able to convert an associated list to a deeply converted object of given type', () => {
            const assocList = [[
                    'all', [[
                        'your', [[
                            'base', [[
                                'are', [[
                                    'belong', [[
                                        'to', [[
                                            'us', 0
                                        ]]
                                    ]]
                                ]]
                            ]]
                        ]]
                    ]]
                ]],
            result = fromAssocListDeep(assocList);
            // log(inspect(result, {depth: 11}));
            expect(result).to.deep.equal(allYourBase);
        });
        it ('should throw an error when receiving anything other than an array or reducible', () => {
            assert.throws(fromAssocListDeep, Error);
            [null, undefined, 99, true, Symbol('99'), 'hello'].forEach(x =>
                assert.throws(() => fromAssocListDeep(x), Error)
            );
        });
    });

});
