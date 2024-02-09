/**
 * Tests for '../src/object'.
 * Created by elyde on 11/25/2016.
 * @todo Continue tests refactor (from `isEmpty` tests downward).
 */
import {
  $defineEnumProp,
  $defineProp,
  assign,
  assignDeep,
  createTypedDescriptor,
  defineEnumProp,
  defineEnumProps,
  defineProp,
  defineProps, DefinePropsArgsTuple,
  error,
  fromAssocList,
  fromAssocListDeep,
  hasOwnProperty,
  instanceOf,
  isArray,
  isBoolean,
  isEmpty,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isset,
  isString,
  isSymbol,
  isType,
  isUndefined,
  jsonClone,
  keys,
  log,
  lookup,
  native,
  objComplement,
  objDifference,
  objIntersect,
  objUnion,
  peek,
  toArray,
  toAssocList,
  toAssocListDeep,
  toEnumerableDescriptor,
  toTypeRef,
  toTypeRefName,
  typeOf
} from '../../src/object';

import {all, subsequences, unfoldr} from '../../src/list';

import {
  allYourBase,
  alphabetArray,
  alphabetString,
  expectEqual,
  expectError,
  expectFalse,
  expectFunction,
  expectTrue,
  vowelsArray,
  vowelsString
} from '../helpers';

import {Nameable, TypeRef, TypeConstructor} from '../../src/types';
import {noop} from "../../src";

const {stringify} = JSON;

describe('#object', function () {
  type LetterNumbersObj = { [index: string]: number };

  const charCodeToCharMap = (() => {
      let i = -1;
      const charCode = 'a'.charCodeAt(0),
        out = {};
      while (++i < 26) {
        out[charCode] = String.fromCharCode(charCode);
      }
      return out;
    })(),
    charCodeToCharArrayMap = Object.entries(charCodeToCharMap);

  describe('#hasOwnProperty', function () {
    it('should be a function', function () {
      expect(hasOwnProperty).toBeInstanceOf(Function);
    });
    it('should return true when passed in object has the passed in property name', function () {
      const obj = {hello: 'ola', ola: 'mambo'};
      expect(hasOwnProperty('hello', obj)).toEqual(true);
      expect(hasOwnProperty('ola', obj)).toEqual(true);
    });
    it('should return false when passed in object doesn\'t have the passed in property name', function () {
      expect(hasOwnProperty('hello', {})).toEqual(false);
      expect(hasOwnProperty('mambo', {})).toEqual(false);
    });
  });

  describe('#typeOf', function () {
    it('should return the passed in type\'s name', function () {
      [
        ['Array', []],
        ['Object', {}],
        ['String', ''],
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        ['Function', console.log],
        ['Function', () => undefined],
        ['Number', 99],
        ['Boolean', true],
        ['Boolean', false],
        ['Null', null],
        ['Undefined', undefined],
        ['Symbol', Symbol('hello')],
        ['Promise', Promise.resolve('hello')]
      ]
        .forEach(([expectedName, arg]) => {
          expect(typeOf(arg)).toEqual(expectedName)
        });
    });
  });

  describe('#toTypeRef', () => {
    it('should return given string when receiving a string.', () => {
      ['Undefined', 'Null', 'NaN', 'String'].forEach(xs => {
        const result = toTypeRef(xs);
        expect(result.constructor).toEqual(String);
        expect(result).toEqual(xs);
      });
    });
    it('should return given function/constructor when receiving a function/constructor.', () => {
      [String, Function, Promise, Map].forEach(x => {
        const result = toTypeRef(x);
        expect(result).toEqual(x);
      });
    });
    it('should return a string for all values that are not a string or a function', () => {
      [
        null,
        undefined,
        NaN,
        Symbol('abc'),
        Promise.resolve(),
        99,
        [],
        {}
      ]
        .forEach(x =>
          expect((toTypeRef(x as TypeRef)).constructor).toEqual(String)
        );
    });
  });

  describe('#toTypeRefName', () => {
    it('should return a string for all values given', () => {
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
    it('should return expected result for given values', function () {
      type ConstructorTestCase = [Nameable, any, boolean];
      type NameTestCase = [string, any, boolean];
      type ConstructorOrNameTestCase = [string | Nameable | NumberConstructor, any, boolean];

      // [`TypeRef`, `arg`, `expected`]
      const truthySetWithCtors: Array<ConstructorTestCase> = [
          [Array, [], true],
          [Object, {}, true],
          [String, '', true],
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          [Function, function () {
          }, true],
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
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          [Number, function () {
          }, false],
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
      [[NaN, '', false],
        [NaN, true, false],
        ['Undefined', undefined, true],
        ['Null', null, true],
      ]
        .concat(truthySet, falsySet)
        .forEach(([type, arg, expected]) => {
          expect(isType(type, arg)).toEqual(expected);
        });
    });
    it('should be able to match NaN', () => {
      expect(isType(NaN, 0 / 0)).toEqual(true);
      expect(isType(NaN, 99)).toEqual(false);
    });
  });

  describe('#isFunction', function () {
    (<[any, boolean][]>[
      [() => undefined, true],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      [function () {
      }, true],
      [-1, false],
      [0, false],
      [1, false],
      [true, false],
      [false, false],
      [undefined, false],
      [null, false],
      [[], false],
      [{}, false],
    ])
      .forEach(([x, expected]: [any, boolean]) => {
        it(`isFunction(${x}) === ${expected}`, function () {
          expect(isFunction(x)).toEqual(expected);
        });
      });
  });

  describe('#isArray', function () {
    it('should return expected result for given value', function () {
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
    it('should return expected result for given value', function () {
      class A {
      }

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
    it('should return expected result for given value', function () {
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

    it('should return expected result for given value', function () {
      // [`arg`, `expected`]
      [
        [99, true],
        [-1.0, true],
        [Number('1e-3'), true],
        [new Number(99), true],
        [0 / 0, false],
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
    it('should return expected result for given value', function () {
      // [`arg`, `expected`]
      [
        [alphabetString, true],
        [vowelsString, true],
        [new String(vowelsString), true],
        [0 / 0, false],
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

  describe('#isUndefined', function () {
    it('should return expected result for given value', function () {
      // [`arg`, `expected`]
      [
        ['', false],
        [undefined, true],
        [vowelsString, false],
        [0 / 0, false],
        [() => undefined, false],
        [false, false],
        [0, false],
        [null, false],
      ]
        .forEach(([arg, expected]) => expect(isUndefined(arg)).toEqual(expected));
    });
  });

  describe('#isNull', function () {
    it('should return expected result for given value', function () {
      // [`arg`, `expected`]
      [
        ['', false],
        [null, true],
        [undefined, false],
        [vowelsString, false],
        [0 / 0, false],
        [() => undefined, false],
        [false, false],
        [0, false],
      ]
        .forEach(([arg, expected]) => expect(isNull(arg)).toEqual(expected));
    });
  });

  describe('#isSymbol', function () {
    it('should return expected result for given value', function () {
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
        [0 / 0, false],
        [() => undefined, false],
        [false, false],
        [0, false],
      ]
        .forEach(([arg, expected]) => expect(isSymbol(arg)).toEqual(expected));
    });
  });

  describe('#isEmpty', () => {
    (<[Parameters<typeof isEmpty>[0], ReturnType<typeof isEmpty>][]>[
        // Empties
        [null, true],
        [undefined, true],
        ['', true],
        [0, true],
        [0 / 0, true],
        [false, true],
        [[], true],
        [{}, true],
        [new Map(), true],
        [new Set(), true],
        [() => undefined, true],          // Has no enumerable properties, and `length` equal to `0`.

        // Non-empties
        [vowelsString, false],
        [vowelsArray, false],
        [new Set(vowelsArray), false],
        [new Map(vowelsArray.map(c => [c, c.charCodeAt(0)])), false],
        [Symbol('x'), false],
        [Object.defineProperties, false], // Has truthy `length`
        [Object, false],                  // Has `length` of `1`
        [true, false],
        [-1, false],
        [1, false],
      ])
        .forEach(([arg, expected]) => {
          it(`isEmpty(${(isset(arg) && arg instanceof Function) || arg === null ? arg + '' : stringify(arg)}) === ${expected}`, function () {
            expect(isEmpty(arg)).toEqual(expected);
          });
        });
  });

  describe(`#${isset.name}`, () => {
    [
      ['', true],
      [0, true],
      [false, true],
      [{}, true],
      [[], true],
      [new Map(), true],
      [null, false],
      [undefined, false]
    ]
      .forEach(([value, expected]) => {
        it(`${isset.name}(${stringify(value)}) === ${expected}`, () => {
          expect(isset(value)).toEqual(expected);
        });
      });
  });

  describe(`#${instanceOf.name}`, function () {
    (<[[TypeConstructor, any], boolean][]>[
      [[noop, Function], true],
      [[{}, Function], false],
    ])
      .forEach(([args, expected]) => {
        it(`${instanceOf.name}(${args[0].name}, ${args[1].toString()}) === ${expected}`, function () {
          expect(instanceOf(...args)).toEqual(expected);
        });
      });
  });

  describe('#assignDeep', function () {
    const sentence = 'all your base are belong to us',
      words = sentence.split(' '),
      wordsLen = words.length,
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

      clonedObj = jsonClone(allYourBase),

      originalObjects = {
        obj2: jsonClone(obj2),
        clonedObj: jsonClone(clonedObj)
      },

      result1 = assignDeep(randomObj, obj2, clonedObj);

    it('should assign all props from one object to another recursively', () => {
      // Check all top level properties
      expect(words
        .map(word => hasOwnProperty(word, result1) && result1[word])
        .every(result => result)).toEqual(true);

      // Expect true that all results (head of return) of accumalated value are `true`
      // and checks container of booleans
      // `head` pulls item at index `0` of list
      const check1 = words.reduce(
        ([_results, _obj, _lastObj], word) => [
          (_results.push(hasOwnProperty(word, _obj) && hasOwnProperty(word, _lastObj)), _results),
          _obj[word],
          _lastObj[word]
        ],
        // [checks, result-of-op, test-against-obj]
        [[], result1, clonedObj], // clone object so we don't destroy/alter it
      );

      // Expect original object and resulting objects to both have the same nested properties
      expect(check1[0].every(Boolean)).toEqual(true);

      // Ensure both objects checked don't have any remaining keys
      expect(check1.slice(1).map(x => !Object.keys(x).length).every(Boolean)).toEqual(true);
    });

    it('should not modify objects other than the first object passed in', () => {
      expect(clonedObj).toEqual(originalObjects.clonedObj);
      expect(obj2).toEqual(originalObjects.obj2);
    });

    it ('should work on arrays', () => {
      (<[Parameters<typeof assignDeep>, ReturnType<typeof assignDeep>][]>[
        [[[], []], []],
        [[[], [1, 2, 3]], [1, 2, 3]],
        [[[2, 1, 2, 4, 5], [1, 2, 3]], [1, 2, 3, 4, 5]]
      ])
        .forEach(([args, expected]) => {
          const rslt = assignDeep(...args);
          expect(rslt).toEqual(expected);
        })
    })
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

    it('should assign all props from one object to another recursively', () => {
      // Check all top level properties
      expectTrue(words
        .map(word => hasOwnProperty(word, result1) && result1[word])
        .every(result => result));

      expect(obj2).toEqual({hair: result1.hair}); // jest does deep check

      expect(clonedObj).toEqual({all: result1.all});
    });

    it('should not modify objects other than the first object passed in', () => {
      expect(clonedObj).toEqual(originalObjects.clonedObj);
      expect(obj2).toEqual(originalObjects.obj2);
    });
  });

  describe('#objComplement', function () {
    it('should be a function', function () {
      expectFunction(objComplement);
    });
    it('should return an object with only properties not found in the first obj', function () {

      const subj1 = {a: 1, b: 2, c: 3} as LetterNumbersObj,
        subj2 = {d: 4} as LetterNumbersObj,
        subj3 = {e: 5, f: 6, g: 7} as LetterNumbersObj,
        result = objComplement(subj1, subj2, subj3);
      [subj2, subj3].forEach(function (subj) {
        keys(subj).forEach(key => {
          expectEqual(result[key], subj[key]);
        });
      });
      keys(subj1).forEach(key => {
        expectFalse(hasOwnProperty(key, result));
      });
    });
  });

  describe('#objDifference', function () {

    it('should be a function', function () {
      expectFunction(objDifference);
    });

    it('should return all the props from obj1 that aren\'t in obj2', function () {
      const subj1 = {a: 1, b: 2, c: 3} as LetterNumbersObj,
        subj2 = {d: 4} as LetterNumbersObj,
        result = objDifference(subj1, subj2);
      Object.keys(subj1).forEach(key => {
        expectEqual(result[key], subj1[key]);
      });
      Object.keys(subj2).forEach(key => {
        expectFalse(hasOwnProperty(key, result));
      });
    });

  });

  describe('#objUnion', function () {
    it('should be a function', function () {
      expectFunction(objUnion);
    });
    it('should return an object containing all properties from the two objects passed in', function () {
      const subj1 = {a: 1, b: 2, c: 3} as LetterNumbersObj,
        subj2 = {e: 5, f: 6, g: 7} as LetterNumbersObj,
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
    it('should return an object that contains values from both passed in objects', function () {
      const subj1 = {a: 1, b: 2, c: 3, e: 4, f: 8} as LetterNumbersObj,
        subj2 = {a: 5, b: 6, c: 7, g: 9} as LetterNumbersObj,
        sharedKeys = ['a', 'b', 'c'],
        result = objIntersect(subj1, subj2);
      sharedKeys.forEach(key => {
        expectEqual(result[key], subj2[key]);
      });
    });
  });

  describe('#jsonClone', function () {
    it('should be a function', function () {
      expect(jsonClone).toBeInstanceOf(Function);
    });
    it('should clone a an object to a json object (no functions just primitives)', () => {
      expect(jsonClone(allYourBase)).toEqual(allYourBase);
    });
  });

  describe('#toArray', function () {
    test('should be a function', function () {
      expect(toArray).toBeInstanceOf(Function);
    });
    test('should return an empty array for `null` and/or `undefined`', () => {
      [null, undefined].forEach(x => expect(toArray(x)).toBeInstanceOf(Array));
    });
    test('should return an array for values that can be converted to an array', () => {
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

  describe('#log', function () {
    it('should be a function', function () {
      expect(typeof log).toEqual('function');
    });
  });

  describe('#error', function () {
    it('should be a function', function () {
      expect(typeof error).toEqual('function');
    });
  });

  describe('#peek', function () {
    it('should be a function', function () {
      expect(peek).toBeInstanceOf(Function);
    });
    it('should return last arg passed in when being called with one or more args.', function () {
      log('testing-peek');
      (subsequences('abc').concat([
        [99], [true], [undefined], [null], ['Output tested from `peek`']
      ] as any[])).forEach((xs) => {
        const isArray = Array.isArray(xs);
        expect(peek(...(!isArray ? [xs] : xs)))
          .toEqual(!isArray ? xs : xs[xs.length - 1]);
      });
    });
  });

  describe('#toAssocList, #toAssocList', function () {
    test('should convert an object to an array map', () => {
      // Ensure map was converted to array map properly
      expect(all(([charCode, char], ind) => {
          const [charCode1, char1] = charCodeToCharArrayMap[ind];
          return `${charCode1}` === charCode && char1 === char;
        }, toAssocList(charCodeToCharMap)
      ))
        .toEqual(true);
    });
    test('should return an empty array when receiving `{}`, `null`, or `undefined`', () => {
      const result = toAssocList({});
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toEqual(0);
    });
  });

  describe('#toAssocListDeep', () => {
    it('should be able to turn an object into an associated list', () => {
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
        result = toAssocListDeep(allYourBase, allYourBase.constructor as ObjectConstructor),
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
    it('should throw an error when receiving `null`, or `undefined`.', () => {
      [null, undefined].forEach(x => expectError(() => toAssocListDeep(x)));
    });
  });

  describe('#fromAssocList, #fromAssocList', function () {
    test('should return an object from an array map', () => {
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
    test('should throw an error when receiving `null`, or `undefined`', () => {
      [null, undefined].forEach(x => expectError(() => fromAssocList(x)));
    });
  });

  describe('#fromAssocListDeep', () => {
    it('should be able to convert an associated list to a deeply converted object of given type', () => {
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
    it('should throw an error when receiving anything other than an array or reducible', () => {
      expectError(fromAssocListDeep);
      [null, undefined, 99, true, Symbol('99'), 'hello'].forEach(x =>
        expectError(() => fromAssocListDeep(x))
      );
    });
  });

  describe('#lookup', function () {
    it('should return found value when key is set on type instance', function () {
      charCodeToCharArrayMap.forEach(([charCode]) => {
        expect(lookup(charCode + '', charCodeToCharMap)).toEqual(charCodeToCharMap[charCode]);
      });
    });
    it('should return `undefined` when element is not found in given list', function () {
      charCodeToCharArrayMap.forEach(([charCode]) => {
        expect(lookup(charCode + '', {})).toEqual(undefined);
      });
    });
  });

  describe('#native', () => {
    describe('#functions-on-native', () => {
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
        // it(`\`native.${key}\` should have same arity as \`Object[key]\``, () => {
        //   expect(foundOnNative.length).toEqual(foundOnObj.length);
        // });
      });
    });
  });

  describe('#createTypedDescriptor', function () {
    const someTarget = {},
      exampleNumberDescriptor = createTypedDescriptor(Number, someTarget, 'someNum'),
      result = exampleNumberDescriptor;

    it('should return a descriptor with a setter and a getter', function () {
      const ks = keys(result);
      expect(ks.length).toEqual(2);
      expect(hasOwnProperty('get', result)).toEqual(true);
      expect(hasOwnProperty('set', result)).toEqual(true);
    });

    it('should return a descriptor whose getters and setters ' +
      'work as expected.', function () {
      expect(result.set(99)).toEqual(undefined);
      expect(result.get()).toEqual(99);
    });

    it('should return a descriptor with a setter that throws an `Error` when ' +
      'passed in value doesn\'t fulfill type constraing.', function () {
      expect(() => result.set('not expected type')).toThrow(Error);
    });

    it('should return a descriptor that retains it\'s value even after ' +
      'throwing a `setter` error (for incorrect type being passed in to `set`).', function () {
      expect(() => result.set('not expected type')).toThrow(Error);
      expect(result.get()).toEqual(99);
    });

    it('should return a descriptor that doesn\'t expose internally stored value for ' +
      'it\'s defined property.', function () {
      const ks = keys(result);
      expect(ks.length).toEqual(2);
      expect(hasOwnProperty('get', result)).toEqual(true);
      expect(hasOwnProperty('set', result)).toEqual(true);
    });
  });

  describe('#toEnumerableDescriptor', function () {
    const descriptor = toEnumerableDescriptor([{}, {}])[1];

    it('should return an object with an `enumerable` property set to `true`', function () {
      expect(hasOwnProperty('enumerable', descriptor)).toEqual(true);
      expect(descriptor.enumerable).toEqual(true);
    });

    it('should throw an error when no descriptor is passed in `TargetDescriptorPair`', function () {
      expect(() => toEnumerableDescriptor([] as unknown as [any, PropertyDescriptor])).toThrow(Error);
      expect(() => toEnumerableDescriptor([1] as unknown as [any, PropertyDescriptor])).toThrow(Error);
    });
  });

  describe('#defineProp, #$defineProp', function () {
    const someTarget = {},
      someTarget2 = {},
      propName = 'someNum';
    (<[any, [any, PropertyDescriptor]][]>[
      [someTarget, defineProp(Number, [someTarget], propName)],
      [someTarget2, $defineProp(Number)([someTarget2])(propName)]
    ])
      .forEach(([originalTrgt, [target, descriptor]]) => {
        it('should return a `target` and `descriptor` pair (tuple)', function () {
          expect(target).toEqual(originalTrgt);
          expect(!!descriptor).toEqual(true);
        });

        it('should define property `propName` on `target`', function () {
          expect(hasOwnProperty(propName, target)).toEqual(true);
        });

        it('should return a target whose defined `propName` throws an error when ' +
          'the wrong type is passed in', function () {
          expect(() => {
            target[propName] = 'some value';
          }).toThrow(Error);
        });

        it('should return a target whose defined `propName` doesn\'t throw' +
          'an error when the correct type of value is passed in', function () {
          target[propName] = 99;
          expect(target[propName]).toEqual(99);
        });

        it('should allow the user to pass in his/her own `descriptor`', function () {
          const somePropName = 'somePropName',
            someValue = (new Date()).getTime(),
            customDescriptor = {
              value: someValue,
              enumerable: true
            },
            [target2, descriptor2] = defineProp(Number, [originalTrgt, customDescriptor], somePropName);
          expect(() => {
            target2[somePropName] = 99;
          }).toThrow(Error);
          expect(target2[somePropName]).toEqual(someValue);
          expect(descriptor2).toEqual(customDescriptor);
          expect(descriptor2.enumerable).toEqual(true);
        });
      });
  });

  describe('#defineEnumProp, #$defineEnumProp', function () {
    const someTarget = {},
      someTarget2 = {},
      propName = 'someNum';

    (<[any, [any, PropertyDescriptor]][]>[
      [someTarget, defineEnumProp(Number, [someTarget], propName)],
      [someTarget2, $defineEnumProp(Number)([someTarget2])(propName)],
    ])
      .forEach(([originalTrgt, [target, descriptor]]) => {
        it('should return a `target` and `descriptor` pair (tuple)', function () {
          expect(target).toEqual(originalTrgt);
          expect(!!descriptor).toEqual(true);
        });

        it('should define property `propName` on `target`', function () {
          expect(hasOwnProperty(propName, target)).toEqual(true);
        });

        it('should set `enumerable` to `true` on returned descriptor', function () {
          expect(descriptor.enumerable).toEqual(true);
          expect(Object.getOwnPropertyDescriptor(target, propName).enumerable).toEqual(true);
        });

        it('should return a target whose defined `propName` throws an error when ' +
          'the wrong type is passed in', function () {
          expect(() => {
            target[propName] = 'some value';
          }).toThrow(Error);
        });

        it('should return a target whose defined `propName` doesn\'t throw' +
          'an error when the correct type of value is passed in', function () {
          target[propName] = 99;
          expect(target[propName]).toEqual(99);
        });

        it('should allow the user to pass in his/her own `descriptor`', function () {
          const somePropName = 'somePropName',
            someValue = (new Date()).getTime(),
            customDescriptor = {
              value: someValue,
              enumerable: false
            },
            [target2, descriptor2] = defineEnumProp(Number, [originalTrgt, customDescriptor], somePropName);
          expect(() => {
            target2[somePropName] = 99;
          }).toThrow(Error);
          expect(target2[somePropName]).toEqual(someValue);
          expect(descriptor2).toEqual(customDescriptor);
          expect(descriptor2.enumerable).toEqual(true);
        });
      });
  });

  describe('#defineProps, #$defineProps', function () {
    const
      seedArgTuples = [
        [String, 'someStringProp'],
        [Number, 'someNumberProp'],
        [Boolean, 'someBooleanProp'],
        [Function, 'someFunctionProp'],
        [Array, 'someArrayProp']
      ] as DefinePropsArgsTuple[],
      seedArgTupleCorrectIncorrectValues = [
        ['99 bottles..', 99],
        [99, 'should-be-number'],
        [false, 1],
        [console.log, 99, 99],
        [[1, 2, 3, 4, 5], console.log]
      ],
      seedTarget = seedArgTuples.reduce((agg, tuple) => {
        agg[tuple[1] + ''] = null;
        return agg;
      }, {}),
      seedPropNames = keys(seedTarget),
      generateTargetData = () => seedArgTuples.reduceRight((agg, argTuple,  ind: number) => {
            agg.push([seedArgTuples.slice(0, ind + 1), {}]);
            return agg;
        }, [] as [DefinePropsArgsTuple[], any][]);

    it('data for tests should be in correct format', function () {
      // Test our test parameters
      expect(seedPropNames.length).toEqual(seedArgTuples.length);
      seedPropNames.forEach((name, ind) => {
        expect(seedArgTuples[ind][1]).toEqual(name);
      });
      expect(seedPropNames.length).toEqual(seedArgTuples.length);
    });

    it('should be able to define many props on given target with only argTuples of length `2`', function () {
      generateTargetData().forEach(args => {
        // log(args);
        const target = defineProps(...args),
          propNames = args[0].map(x => x[1]);

        // log(propNames, '\n', target);

        // Ensure targets have props set
        propNames.forEach(name => {
          expect(hasOwnProperty(name, target)).toEqual(true);
        });
      });
    });

    it('should have defined properties that throw errors when they are set to the wrong type' +
      'and no errors when set to the correct type', function () {
      generateTargetData().forEach(args => {
        // log(args);
        const target = defineProps(...args),
          propNames = args[0].map(x => x[1]);

        // log(propNames, '\n', target);

        // Ensure targets have props set
        propNames.forEach((name, ind) => {
          const [correct, inCorrect] = seedArgTupleCorrectIncorrectValues[ind];

          // Ensure prop exists
          expect(hasOwnProperty(name, target)).toEqual(true);

          // Ensure setter obeys type rule
          expect(() => {
            target[name] = inCorrect;
          }).toThrow(Error);

          // Ensure setter obeys type rule
          expect(target[name] = correct).toEqual(correct);
        });
      });
    });

    it('should return target with defined properties from operation', function () {
      generateTargetData().forEach(args => {
        // log(args);
        const target = defineProps(...args as Parameters<typeof defineProps>),
          argKeyNames = args[0].map(pair => pair[1]);
        expect(target).toBeInstanceOf(Object);
        argKeyNames.forEach(key => {
          const propDescriptor = Object.getOwnPropertyDescriptor(target, key);
          expect(['set', 'get'].every(k => propDescriptor[k] instanceof Function));
        });
      });
    });

    it('should be able to set types with argTuples of length of `3` (containing a `defaultValue`)', function () {
      generateTargetData().map(argTuple => {
        const [args, target] = argTuple;
        // log(argTuple);
        // Return new version of `argTuple` (seeded with `defaultValue`)
        return [
          // Add `defaultValue` to arg lists
          args.map((argSet, ind) => {
            const [TypeRef, propName] = argSet,
              [correct] = seedArgTupleCorrectIncorrectValues[ind];
            return [TypeRef, propName, correct];
          }),
          target
        ];
      }).forEach(args => {
        // log(args);
        const target = defineProps(...args as Parameters<typeof defineProps>),
          argKeyNames = args[0].map(([_, key]) => key);
        expect(target).toBeInstanceOf(Object);
        argKeyNames.forEach(key => {
          const propDescriptor = Object.getOwnPropertyDescriptor(target, key);
          expect(['set', 'get'].every(k => propDescriptor[k] instanceof Function));
        });
      });
    });

  });

  describe('#defineEnumProps, #$defineEnumProps', function () {
    type ArgTuple = [TypeConstructor, string]
    const seedArgTuples = [
        [String, 'someStringProp'],
        [Number, 'someNumberProp'],
        [Boolean, 'someBooleanProp'],
        [Function, 'someFunctionProp'],
        [Array, 'someArrayProp']
      ] as ArgTuple[],
      seedArgTupleCorrectIncorrectValues = [
        ['99 bottles..', 99],
        [99, 'should-be-number'],
        [false, 1],
        [console.log, 99, 99],
        [[1, 2, 3, 4, 5], console.log]
      ],
      seedTarget = seedArgTuples.reduce((agg, tuple) => {
        agg[tuple[1] + ''] = null;
        return agg;
      }, {}),
      seedPropNames = keys(seedTarget),
      generateTargetData = (): [ArgTuple[], any][] => unfoldr((argTuples: ArgTuple[], ind: number, _out: any[]): [[ArgTuple[], any], ArgTuple[]] => {
          const _argTuples = argTuples.slice(0),
            out = [_argTuples.slice(0), {}] as [ArgTuple[], any];
          if (!_out.length) {
            return [out, _argTuples];
          } else if (_argTuples.length) {
            _argTuples.pop();
            return [out, _argTuples];
          }
          return undefined;
        },
        seedArgTuples);

    it('data for tests should be in correct format', function () {
      // Test our test parameters
      expect(seedPropNames.length).toEqual(seedArgTuples.length);
      seedPropNames.forEach((name, ind) => {
        expect(seedArgTuples[ind][1]).toEqual(name);
      });
      expect(seedPropNames.length).toEqual(seedArgTuples.length);
    });

    it('should be able to define many enum props on given target with only argTuples of length `2`', function () {
      generateTargetData().forEach((args: any[]) => {
        // log(args);
        const target = defineEnumProps(...args as Parameters<typeof defineEnumProps>) as object,
          propNames = args[0].map(([_, name]) => name);

        // log(propNames, '\n', target);

        // Ensure targets have enumerable props set
        propNames.forEach(name => {
          expect(hasOwnProperty(name, target)).toEqual(true);
          expect(Object.getOwnPropertyDescriptor(target, name).enumerable)
            .toEqual(true);
        });
      });
    });

    it('should have defined properties that throw errors when they are set to the wrong type' +
      'and no errors when set to the correct type', function () {
      generateTargetData().forEach((args: any[]) => {
        // log(args);
        const target = defineEnumProps(...args as Parameters<typeof defineEnumProps>) as object,
          propNames = args[0].map(([_, name]) => name);

        // log(propNames, '\n', target);

        // Ensure targets have enumerable props set
        propNames.forEach((name, ind) => {
          const [correct, inCorrect] = seedArgTupleCorrectIncorrectValues[ind];

          // Ensure prop exists
          expect(hasOwnProperty(name, target)).toEqual(true);

          // Ensure prop is enumerable
          expect(Object.getOwnPropertyDescriptor(target, name).enumerable)
            .toEqual(true);

          // Ensure setter obeys type rule
          expect(() => {
            target[name] = inCorrect;
          }).toThrow(Error);

          // Ensure setter obeys type rule
          expect(target[name] = correct).toEqual(correct);
        });
      });
    });

    it('should return target and descriptor tuples from operation', function () {
      generateTargetData().forEach((args: Parameters<typeof defineEnumProps>) => {
        // log(args);
        const target = defineEnumProps(...args),
          propNames = args[0].map(([_, name]) => name);
        expect(target).toBeInstanceOf(Object);
        propNames.forEach(name => {
          const propDescript = Object.getOwnPropertyDescriptor(target, name);
          expect(propDescript.enumerable).toEqual(true);
          expect(['set', 'get'].every(key => propDescript[key] instanceof Function));
        });
      });
    });

    it('should be able to set types with argTuples of length of `3`(with [target, descriptor] tuple) ' +
      'and `4` (with defaultValue)', function () {
      generateTargetData().map((argTuple): [any[], any] => {
        const [argTuples, target] = argTuple;
        // log(argTuple);
        // Return new version of `argTuple` seeded `defaultValue`
        return [
          // Add `defaultValue` to arg lists
          argTuples.map((argSet, ind) => {
            const [correct, _] = seedArgTupleCorrectIncorrectValues[ind];
            return argSet.concat([correct] as any[]);
          }),
          target
        ];

      }).forEach(args => {
        // log(args);

        const target = defineEnumProps(...args),
          propNames = args[0].map(([_, name]) => name);
        expect(target).toBeInstanceOf(Object);

        // log(propNames, '\n', target);

        // Ensure targets have enumerable props set
        propNames.forEach((name, ind) => {
          const [correct, inCorrect] = seedArgTupleCorrectIncorrectValues[ind];

          // Ensure prop exists
          expect(hasOwnProperty(name, target)).toEqual(true);

          // Ensure prop is enumerable
          expect(Object.getOwnPropertyDescriptor(target, name).enumerable)
            .toEqual(true);

          // Ensure setter obeys type rule
          expect(() => {
            target[name] = inCorrect;
          }).toThrow(Error);

          // Ensure setter obeys type rule
          expect(target[name] = correct).toEqual(correct);
        });
      });
    });

  });
});
