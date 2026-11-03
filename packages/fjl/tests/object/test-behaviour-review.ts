/**
 * Behaviours pinned by the #122 review, for methods whose edge cases weren't covered elsewhere.
 */
import {
  $lookup, $searchObj, containsEnumerables, copy, instanceOfSome, isBigInt, isCallable, isClass,
  isConstructablePrimitive, isGeneratorFunction, isNullish, isOfType, isPrimitive, lookup, mapObj,
  notNullish, of, searchObj, toTypeRefNames, toTypeRefs
} from "../../src/object";

describe('object/ behaviour review', () => {
  class Foo {
    a = 1;
  }

  describe('#of', () => {
    (<[string, unknown, unknown][]>[
      ['array', [1], []],
      ['string', 'a', ''],
      ['number', 1, 0],
      ['boolean', true, false],
      ['plain object', {a: 1}, {}],
      ['class instance', new Foo(), new Foo()],
      ['Map', new Map([[1, 2]]), new Map()],
      ['null', null, undefined],
      ['undefined', undefined, undefined],
    ]).forEach(([name, x, expected]) => {
      it(`should create an empty value for ${name}`, () => {
        expect(of(x)).toEqual(expected);
      });
    });

    it('should return `undefined` when there is no constructor', () => {
      expect(of(Object.create(null))).toEqual(undefined);
    });
  });

  describe('#copy', () => {
    it('should copy plain objects, and class instances', () => {
      const obj = {a: 1},
        foo = Object.assign(new Foo(), {a: 2}),
        fooCopy = copy(foo);
      expect(copy(obj)).toEqual(obj);
      expect(copy(obj)).not.toBe(obj);
      expect(fooCopy).toBeInstanceOf(Foo);
      expect(fooCopy.a).toEqual(2);
      expect(fooCopy).not.toBe(foo);
    });

    it('should copy into `out` when given', () => {
      expect(copy({a: 1} as object, {b: 2})).toEqual({a: 1, b: 2});
      expect(copy([2], [1])).toEqual([1, 2]);
      expect(copy(new Map([[2, 2]]), new Map([[1, 1]]))).toEqual(new Map([[1, 1], [2, 2]]));
      expect(copy(new Set([2]), new Set([1]))).toEqual(new Set([1, 2]));
    });

    it('should copy collections, and dates', () => {
      const map = new Map([[1, 2]]),
        set = new Set([1]),
        date = new Date(1000),
        regex = /a/g;
      (<unknown[]>[map, set, date, regex, [1], new Int8Array([1, 2])]).forEach(x => {
        const result = copy(x);
        expect(result).toEqual(x);
        expect(result).not.toBe(x);
        expect((result as object).constructor).toBe((x as object).constructor);
      });
    });

    it('should return immutable values, and weak collections as is', () => {
      const weakMap = new WeakMap(),
        weakSet = new WeakSet();
      (<unknown[]>[null, undefined, 0, 1, '', 'a', true, BigInt(1), Symbol.iterator, NaN, weakMap, weakSet])
        .forEach(x => expect(copy(x)).toBe(x));
    });

    it('should copy functions', () => {
      const fn = Object.assign((x: number) => x + 1, {meta: 1}),
        result = copy(fn);
      expect(result).not.toBe(fn);
      expect(result(1)).toEqual(2);
      expect(result.meta).toEqual(1);
    });
  });

  describe('#mapObj', () => {
    it('should map values, and keep keys', () => {
      const obj = {a: 1, b: 2};
      expect(mapObj((x: number, k, o) => `${k}${x + o.a}`, obj)).toEqual({a: 'a2', b: 'b3'});
      expect(obj).toEqual({a: 1, b: 2});
    });

    it('should return empty object for an empty one', () => {
      expect(mapObj(x => x, {})).toEqual({});
    });
  });

  describe('#lookup', () => {
    it('should get values, and be null safe', () => {
      expect(lookup('a', {a: 1})).toEqual(1);
      expect($lookup('b')({a: 1})).toEqual(undefined);
      expect(lookup('a', null)).toEqual(undefined);
      expect(lookup('a', undefined)).toEqual(undefined);
    });
  });

  describe('#searchObj', () => {
    const obj = {all: {your: {base: 99, none: null, zero: 0}}, top: 1};

    (<[string, unknown, unknown][]>[
      ['all.your.base', obj, 99],
      ['all.your.zero', obj, 0],
      ['all.your.none', obj, null],
      ['all.your.nope', obj, undefined],
      ['all.your.none.deeper', obj, undefined],
      ['nope.your.base', obj, undefined],
      ['top', obj, 1],
      ['nope', obj, undefined],
      ['a.b', null, null],
    ]).forEach(([ns, target, expected]) => {
      it(`should give ${expected} for '${ns}'`, () => {
        expect(searchObj(ns, target)).toEqual(expected);
        expect($searchObj(ns)(target)).toEqual(expected);
      });
    });
  });

  describe('`is*` methods', () => {
    const genFn = function* () { yield 1; },
      fn = () => 1;

    it('#isNullish, #notNullish', () => {
      [null, undefined].forEach(x => {
        expect(isNullish(x)).toEqual(true);
        expect(notNullish(x)).toEqual(false);
      });
      [0, '', false, NaN, {}].forEach(x => {
        expect(isNullish(x)).toEqual(false);
        expect(notNullish(x)).toEqual(true);
      });
    });

    it('#isPrimitive', () => {
      [null, undefined, 0, '', 'a', true, BigInt(1), Symbol.iterator].forEach(x =>
        expect(isPrimitive(x)).toEqual(true));
      [{}, [], fn, Foo, new Foo()].forEach(x =>
        expect(isPrimitive(x)).toEqual(false));
    });

    it('#isConstructablePrimitive', () => {
      [0, 'a', true, BigInt(1), Symbol.iterator].forEach(x =>
        expect(isConstructablePrimitive(x)).toEqual(true));
      [null, undefined, {}, [], fn].forEach(x =>
        expect(isConstructablePrimitive(x)).toEqual(false));
    });

    it('#isBigInt', () => {
      expect(isBigInt(BigInt(1))).toEqual(true);
      [1, null, undefined, NaN, '1'].forEach(x => expect(isBigInt(x)).toEqual(false));
    });

    it('#isClass, #isCallable', () => {
      expect(isClass(Foo)).toEqual(true);
      expect(isClass(fn)).toEqual(false);
      expect(isCallable(fn)).toEqual(true);
      expect(isCallable(Foo)).toEqual(false);
      expect(isCallable({})).toEqual(false);
    });

    it('#isGeneratorFunction', () => {
      expect(isGeneratorFunction(genFn)).toEqual(true);
      expect(isGeneratorFunction(fn)).toEqual(false);
    });

    it('#instanceOfSome', () => {
      expect(instanceOfSome(new Map(), Set, Map)).toEqual(true);
      expect(instanceOfSome(new Foo(), Set, Map)).toEqual(false);
      expect(instanceOfSome(new Foo())).toEqual(false);
    });

    it('#isOfType', () => {
      expect(isOfType(Number, 1)).toEqual(true);
      expect(isOfType(Object, new Foo())).toEqual(true);
      expect(isOfType(String, 1)).toEqual(false);
    });

    it('#containsEnumerables', () => {
      expect(containsEnumerables({a: 1})).toEqual(true);
      expect(containsEnumerables({})).toEqual(false);
    });

    it('#toTypeRefs, #toTypeRefNames', () => {
      expect(toTypeRefs(Number, 'String', 1)).toEqual([Number, 'String', 'Number']);
      expect(toTypeRefNames(Number, 'String', 1)).toEqual(['Number', 'String', 'Number']);
    });
  });
});
