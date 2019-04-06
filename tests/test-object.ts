/**
 * Tests for '../src/object'.
 * Created by elyde on 11/25/2016.
 * @todo Continue tests refactor (from `isEmpty` tests downward).
 */
import {
    objComplement, objDifference, objUnion, objIntersect,
    typeOf, instanceOf, hasOwnProperty, keys,
    isType, isNumber, isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isMap, isSet, isEmpty, isset, jsonClone,
    fromAssocList, toAssocList, toArray, log, peek, error,
    isWeakMap, isWeakSet, assignDeep, assign,
    toAssocListDeep, fromAssocListDeep,
    toTypeRef, toTypeRefName, lookup, native
} from '../src/object';
import {foldl, map, and, head, tail, subsequences, unfoldr, all} from '../src/list';
import {
    expectTrue,
    expectFalse,
    expectEqual,
    expectError,
    expectFunction,
    allYourBase,
    alphabetString,
    alphabetArray,
    vowelsString, vowelsArray
} from './helpers';

import {Nameable} from '../types';

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
        it ('should return the passed in type\'s name', function () {
            [
                ['Array', []],
                ['Object', {}],
                ['String', ''],
                ['Function', function () {}],
                ['Function', () => undefined],
                ['Number', 99],
                ['Boolean', true],
                ['Boolean', false],
                ['Null', null],
                ['Undefined', undefined],
                ['Symbol', Symbol('hello')],
                ['Promise', Promise.resolve('hello')]
            ]
                .forEach(([expectedName, arg]) => expect(typeOf(arg)).toEqual(expectedName));
        });
    });

    describe('#toTypeRef', () => {
        it ('should return given string when receiving a string.', () => {
            ['Undefined', 'Null', 'NaN', 'String'].forEach(xs => {
                const result = toTypeRef(xs);
                expect(result.constructor).toEqual(String);
                expect(result).toEqual(xs);
            });
        });
        it ('should return given function/constructor when receiving a function/constructor.', () => {
            [String, Function, Promise, Map].forEach(x => {
                const result = toTypeRef(x);
                expect(result).toEqual(x);
            });
        });
        it ('should return a string for all values that are not a string or a function', () => {
            [null, undefined, NaN, Symbol('abc'), Promise.resolve(), 99, [], {}].forEach(
                    x => expect((toTypeRef(x)).constructor).toEqual(String)
                );
        });
    });

    describe('#toTypeRefName', () => {
        it ('should return a string for all values given', () => {
            [
                ['Null', null],
                ['Undefined', undefined],
                ['NaN', NaN],
                ['Symbol', Symbol('abc')],
                ['Promise', Promise.resolve()],
                ['Number', 99],
                ['Array', []],
                ['Object', {}]
            ]
                .concat([Array, Boolean, Function, String, Number].map(Type => [Type.name, Type]))
                .forEach(([expected, control]) => {
                    const result = toTypeRefName(control);
                    expect(result).toEqual(expected);
                });
        });
    });

    describe('#isType', function () {
        it ('should return expected result for given values', function () {
            type ConstructorTestCase = [Nameable, any, boolean];
            type NameTestCase = [string, any, boolean];
            type ConstructorOrNameTestCase = [string | Nameable | Number, any, boolean];

            // [`TypeRef`, `arg`, `expected`]
            const truthySetWithCtors: Array<ConstructorTestCase> = [
                    [Array, [], true],
                    [Object, {}, true],
                    [String, '', true],
                    [Function, function () {}, true],
                    [Number, 99, true],
                    [Boolean, true, true],
                    [Boolean, false, true],
                ],

                truthySet: Array<ConstructorTestCase> =
                    truthySetWithCtors.concat(
                        (<ConstructorTestCase>truthySetWithCtors.map(
                            ([Ctor, arg, exp]) => [Ctor.name, arg, exp]
                        ))
                    ),

                falsySetWithCtors: Array<ConstructorTestCase> = [
                    [Object, [], false],
                    [Array, {}, false],
                    [Number, function () {}, false],
                    [Function, 99, false],
                    [Number, undefined, false],
                    [Array, false, false]
                ],
                falsySet: Array<ConstructorOrNameTestCase> =
                    (falsySetWithCtors as Array<ConstructorOrNameTestCase>).concat(
                        (<Array<NameTestCase>>falsySetWithCtors.map(
                            ([Ctor, arg, exp]) => [Ctor.name, arg, exp]
                        ))
                    )
            ;
            [   [NaN, '', false],
                [NaN, true, false],
                ['Undefined', undefined, true],
                ['Null', null, true],
            ]
            .concat(truthySet, falsySet)
            .forEach(([type, arg, expected]) => {
                expect(isType(type, arg)).toEqual(expected);
            });
        });
        it ('should be able to match NaN', () => {
            expect(isType(NaN, 0/0)).toEqual(true);
            expect(isType(NaN, 99)).toEqual(false);
        });
    });

    describe('#isFunction', function () {
        it('should return expected result for given value', function () {
            // [`arg`, `expected`]
            [
                [() => undefined, true],
                [function () {}, true],
                [-1, false],
                [0, false],
                [1, false],
                [true, false],
                [false, false],
                [undefined, false],
                [null, false],
                [[], false],
                [{}, false],
            ]
                .forEach(([x, expected]) => expect(isFunction(x)).toEqual(expected));
        });
    });

    describe('#isArray', function () {
        it ('should return expected result for given value', function () {
            // [`arg`, `expected`]
            [
                [[], true],
                [() => undefined, false],
                [0, false],
                [true, false],
                [false, false],
                [undefined, false],
                [null, false],
            ]
                .forEach(([arg, expected]) => expect(isArray(arg)).toEqual(expected));
        });
    });

    describe('#isObject', function () {
        it ('should return expected result for given value', function () {
            class A {}
            // [`arg`, `expected`]
            [
                [[], false],
                [{}, true],
                [() => undefined, false],
                [new A(), false],
                [true, false],
                [false, false],
                [0, false],
                [undefined, false],
                [null, false],
            ]
                .forEach(([arg, expected]) => expect(isObject(arg)).toEqual(expected));
        });
    });

    describe('#isBoolean', function () {
        it ('should return expected result for given value', function () {
            [
                [[], false],
                [{}, false],
                [() => undefined, false],
                [true, true],
                [false, true],
                [undefined, false],
                [null, false],
            ]
                .forEach(([arg, expected]) => expect(isBoolean(arg)).toEqual(expected));
        });
    });

    describe('#isNumber', function () {

        it ('should return expected result for given value', function () {
            // [`arg`, `expected`]
            [
                [99, true],
                [-1.0, true],
                [Number('1e-3'), true],
                [0/0, false],
                [() => undefined, false],
                [true, false],
                [false, false],
                [undefined, false],
                [null, false],
            ]
                .forEach(([arg, expected]) => expect(isNumber(arg)).toEqual(expected));
        });
    });

    describe('#isString', function () {
        it ('should return expected result for given value', function () {
            // [`arg`, `expected`]
            [
                [alphabetString, true],
                [vowelsString, true],
                [0/0, false],
                [() => undefined, false],
                [true, false],
                [false, false],
                [0, false],
                [undefined, false],
                [null, false],
            ]
                .forEach(([arg, expected]) => expect(isString(arg)).toEqual(expected));
        });
    });

    if (typeof Map !== 'undefined') {
        describe('#isMap', function () {
            it ('should return expected result for given value', function () {
                // [`arg`, `expected`]
                [
                    ['', false],
                    [vowelsString, false],
                    [0/0, false],
                    [() => undefined, false],
                    [new Map(), true],
                    [new Map(vowelsArray.map(c => [c, c.charCodeAt(0)])), true],
                    [false, false],
                    [0, false],
                    [undefined, false],
                    [null, false],
                ]
                    .forEach(([arg, expected]) => expect(isMap(arg)).toEqual(expected));
            });
        });
    }

    if (typeof Set !== 'undefined') {
        describe('#isSet', function () {
            it ('should return expected result for given value', function () {
                // [`arg`, `expected`]
                [
                    ['', false],
                    [vowelsString, false],
                    [0/0, false],
                    [() => undefined, false],
                    [new Set(), true],
                    [new Set(vowelsArray), true],
                    [false, false],
                    [0, false],
                    [undefined, false],
                    [null, false],
                ]
                    .forEach(([arg, expected]) => expect(isSet(arg)).toEqual(expected));
            });
        });
    }

    if (typeof WeakMap !== 'undefined') {
        describe('#isWeakMap', function () {
            it ('should return expected result for given value', function () {
                // [`arg`, `expected`]
                [
                    ['', false],
                    [vowelsString, false],
                    [0/0, false],
                    [() => undefined, false],
                    [new WeakMap(), true],
                    [false, false],
                    [0, false],
                    [undefined, false],
                    [null, false],
                ]
                    .forEach(([arg, expected]) => expect(isWeakMap(arg)).toEqual(expected));
            });
        });
    }

    if (typeof WeakSet !== 'undefined') {
        describe('#isWeakSet', function () {
            it ('should return expected result for given value', function () {
                // [`arg`, `expected`]
                [
                    ['', false],
                    [vowelsString, false],
                    [0/0, false],
                    [() => undefined, false],
                    [new WeakSet(), true],
                    [false, false],
                    [0, false],
                    [undefined, false],
                    [null, false],
                ]
                    .forEach(([arg, expected]) => expect(isWeakSet(arg)).toEqual(expected));
            });
        });
    }

    describe('#isUndefined', function () {
        it ('should return expected result for given value', function () {
            // [`arg`, `expected`]
            [
                ['', false],
                [undefined, true],
                [vowelsString, false],
                [0/0, false],
                [() => undefined, false],
                [false, false],
                [0, false],
                [null, false],
            ]
                .forEach(([arg, expected]) => expect(isUndefined(arg)).toEqual(expected));
        });
    });

    describe('#isNull', function () {
        it ('should return expected result for given value', function () {
            // [`arg`, `expected`]
            [
                ['', false],
                [null, true],
                [undefined, false],
                [vowelsString, false],
                [0/0, false],
                [() => undefined, false],
                [false, false],
                [0, false],
            ]
                .forEach(([arg, expected]) => expect(isNull(arg)).toEqual(expected));
        });
    });

    describe('#isSymbol', function () {
        it ('should return expected result for given value', function () {
            // [`arg`, `expected`]
            [
                ['', false],
                [Symbol(vowelsString), true],
                [Symbol(99), true],
                [Symbol(), true],
                [null, false],
                [undefined, false],
                [vowelsString, false],
                [{}, false],
                [[], false],
                [0/0, false],
                [() => undefined, false],
                [false, false],
                [0, false],
            ]
                .forEach(([arg, expected]) => expect(isSymbol(arg)).toEqual(expected));
        });
    });

    describe('#isEmpty', () => {
        it ('should return expected result for given value', function () {
            // [`arg`, `expected`]
            [
                // Empties
                [null, true],
                [undefined, true],
                ['', true],
                [0, true],
                [0/0, true],
                [false, true],
                [[], true],
                [{}, true],
                [new Map(), true],
                [new Set(), true],

                // Non-empties
                [() => undefined, false],
                [vowelsString, false],
                [vowelsArray, false],
                [new Set(vowelsArray), false],
                // @ts-ignore
                [new Map((<ReadonlyArray<[string, string]>>vowelsArray.map(c => [c, c.charCodeAt(0)]))), false],
                [Object.defineProperties, false],
                [Object, false],
                [Symbol(), false],
                [true, false],
                [-1, false],
                [1, false],
            ]
                .forEach(([arg, expected]) => {
                    expect(isEmpty(arg)).toEqual(expected);
                });
        });
    });

    describe('#isset', () => {
        it ('should return `true` if value is set (I.e., if value is not `null` or `undefined`).', () => {
            ['', 0, false, {}, [], new Map()].forEach(x => {
                expect(isset(x)).toEqual(true);
            });
        });
        it ('should return `false` if value is not set (I.e., if value is `null` or `undefined`).', () => {
            [null, undefined].forEach(x => {
                expect(isset(x)).toEqual(false);
            });
        });
    });

    describe('#instanceOf', function () {
        it ('should return true when parameter two is of type parameter one', function () {
            expectTrue(instanceOf(Function, function () {}));
        });
        it ('should return false when parameters two is not of type parameter one', function () {
            expectFalse(instanceOf(Function, {}));
        });
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

            originalObjects = {
                obj2: jsonClone(obj2),
                clonedObj: jsonClone(clonedObj)
            },

            result1 = assignDeep(randomObj, obj2, clonedObj);

        it ('should assign all props from one object to another recursively', () => {
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

        it ('should not modify objects other than the first object passed in', () => {
            expect(clonedObj).toEqual(originalObjects.clonedObj);
            expect(obj2).toEqual(originalObjects.obj2);
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

            originalObjects = {
                obj2: jsonClone(obj2),
                clonedObj: jsonClone(clonedObj)
            },

            result1 = assign(randomObj, obj2, clonedObj);

        it ('should assign all props from one object to another recursively', () => {
            // Check all top level properties
            expectTrue(words
                .map(word => result1.hasOwnProperty(word) && result1[word])
                .every(result => result));

            expect(obj2).toEqual({hair: result1.hair}); // jest does deep check

            expect(clonedObj).toEqual({all: result1.all});
        });

        it ('should not modify objects other than the first object passed in', () => {
            expect(clonedObj).toEqual(originalObjects.clonedObj);
            expect(obj2).toEqual(originalObjects.obj2);
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
            expect(jsonClone).toBeInstanceOf(Function);
        });
        it ('should clone a an object to a json object (no functions just primitives)', () => {
            expect(jsonClone(allYourBase)).toEqual(allYourBase);
        });
    });

    describe ('#toArray', function () {
        test ('should be a function', function () {
            expect(toArray).toBeInstanceOf(Function);
        });
        test ('should return an empty array for `null` and/or `undefined`', () => {
            [null, undefined].forEach(x => expect(toArray(x)).toBeInstanceOf(Array));
        });
        test ('should return an array for values that can be converted to an array', () => {
            [
                [null, []],
                [undefined, []],
                [alphabetString, alphabetArray],
                [new Set(alphabetArray), alphabetArray],
                [new Map(toArray(allYourBase) as Array<[any, any]>), toArray(allYourBase)] // map and object test
            ]
                .forEach(([given, expected]) =>
                    expect(toArray(given)).toEqual(expected)
                );
        });
    });

    describe ('#log', function () {
        it ('should be a function', function () {
            expect(typeof log).toEqual('function');
        });
    });

    describe ('#error', function () {
        it ('should be a function', function () {
            expect(typeof error).toEqual('function');
        });
    });

    describe ('#peek', function () {
        it ('should be a function', function () {
            expect(peek).toBeInstanceOf(Function);
        });
        it ('should return last arg passed in when being called with one or more args.', function () {
            subsequences('abc').concat([
                [99], [true], [undefined], [null], ['Output tested from `peek`']
            ]).forEach(xs => {
                log('testing-peek');
                expect(peek.apply(null, xs)).toEqual(xs.pop());
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
                .toEqual(true);
        });
        test ('should return an empty array when receiving `{}`, `null`, or `undefined`', () => {
            const result = toAssocList({});
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toEqual(0);
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
                        expect(value).toBeInstanceOf(Array);
                        return verifyResult(value, obj[key]);
                    }
                    switch (obj[key].constructor) {
                        case Array:
                        case Object:
                            expect(value).toEqual(obj[key]);
                            break;
                        default:
                            expect(value).toEqual(obj[key]);
                            break;
                    }
                });
            };
            verifyResult(result, allYourBase);
            expect(result).toBeInstanceOf(Array);
            expect(result).toEqual(expected);
        });
        it ('should throw an error when receiving `null`, or `undefined`.', () => {
            [null, undefined].forEach(x => expectError(() => toAssocListDeep(x)));
        });
    });

    describe ('#fromAssocList, #fromAssocList', function () {
        test ('should return an object from an array map', () => {
            const result = fromAssocList(charCodeToCharArrayMap);
            expect(isObject(result)).toEqual(true);
            expect(
                all(([charCode, char]) =>
                    result[charCode] === char,
                    charCodeToCharArrayMap
                )
            )
                .toEqual(true);
        });
        test ('should throw an error when receiving `null`, or `undefined`', () => {
            [null, undefined].forEach(x => expectError(() => fromAssocList(x)));
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
            expect(result).toEqual(allYourBase);
        });
        it ('should throw an error when receiving anything other than an array or reducible', () => {
            expectError(fromAssocListDeep);
            [null, undefined, 99, true, Symbol('99'), 'hello'].forEach(x =>
                expectError(() => fromAssocListDeep(x))
            );
        });
    });

    describe ('#lookup', function () {
        it ('should return found value when key is set on type instance', function () {
            const word = 'hello world',
                obj = word.split('').reduce((agg, item) => {
                    agg[item] = item + ' value';
                    return agg;
                }, {});
            expectTrue(
                all(() =>
                        all(elm2 => lookup(elm2, obj) === elm2 + ' value', word),
                    [word.split(''), word]));
        });
        it ('should return `undefined` when element is not found in given list', function () {
            const word = 'hello world',
                obj = word.split('').reduce((agg, item) => {
                    agg[item] = item + ' value';
                    return agg;
                }, {});
            expectTrue(
                all(elm =>
                        all(() => lookup('z', obj) === undefined, elm),
                    [word.split(''), word]));
        });
    });

    describe ('#native', () => {
        describe ('#functions-on-native', () => {
            Object.getOwnPropertyNames(Object).forEach(key => {
                const foundOnNative = native[key],
                    foundOnObj = Object[key];

                // Test functions only
                if (typeof foundOnNative !== 'function') {
                    return;
                }

                it(`should have a "${key}" property whose value is of same type as \`Object[key]\``, () => {
                    expect(typeof foundOnNative).toEqual(typeof foundOnObj);
                });
                it(`\`native.${key}\` should have same arity as \`Object[key]\``, () => {
                    expect(foundOnNative.length).toEqual(foundOnObj.length);
                });
            });
        });
    });

});
