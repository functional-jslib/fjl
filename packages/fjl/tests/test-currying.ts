/**
 * Asserts that every `$`-prefixed export (the library's "curried sibling"
 * convention) is *actually* curried.
 *
 * The list of methods under test is derived from the package's public export
 * surface at runtime - `curriedRegistry` only supplies the argument fixtures.
 * Two "meta" tests keep the two in sync, so a curried method added later fails
 * this suite until it gets coverage here.
 *
 * @see https://github.com/functional-jslib/fjl/issues/124
 */
import * as fjl from '../src';
import {defaultErrorMessageCall} from '../src/errorThrowing';
import {
  AnyFn,
  CurryRegistry,
  assertCurriedCase,
  curriedCallSignature,
  defaultGroups
} from './curry-helpers';

const

  // Fixture helpers
  // ---------------
  /** Static (never mutated) argument list. */
  fixed = (...xs: any[]) => () => xs,

  add = (a: number, b: number): number => a + b,
  isEven = (x: number): boolean => x % 2 === 0,
  lt3 = (x: number): boolean => x < 3,
  eq = (a: any, b: any): boolean => a === b,
  asc = (a: any, b: any): number => a > b ? 1 : (a < b ? -1 : 0),
  incr = (x: number): number => x + 1,
  tuple2 = (a: any, b: any): [any, any] => [a, b],
  tuple3 = (a: any, b: any, c: any): [any, any, any] => [a, b, c],

  nums = [1, 2, 3, 4, 5],
  alphabet = 'abcdefghijklmnopqrstuvwxyz',

  /** Collects the first `n` (copied) yields of a generator. */
  takeFromGen = (n: number) => (gen: Generator<any>): any[] => {
    const out: any[] = [];
    for (const x of gen) {
      out.push(Array.isArray(x) ? x.slice(0) : x);
      if (out.length >= n) break;
    }
    return out;
  },

  /** `forEach`-style fixture - the operation records what it was called with. */
  recorderArgs = (xs: any[]) => (): any[] => {
    const calls: any[] = [],
      op: any = (x: any) => calls.push(x);
    op.calls = calls;
    return [op, xs];
  },

  recorded = (_result: any, args: any[]): any => args[0].calls,

  /** Applies the returned function - for methods that return functions. */
  callWith = (...args: any[]) => (f: AnyFn): any => f(...args),

  factorialProcess = (n: number, agg = 1): any =>
    n > 1 ? () => factorialProcess(n - 1, agg * n) : agg,

  // Registry
  // --------
  curriedRegistry: CurryRegistry = {

    // boolean
    $equal: {cases: [{args: fixed(99, 99)}, {args: fixed(1, 2)}]},

    // function
    $apply: {cases: [{args: fixed(add, [1, 2])}]},

    $bind: {
      cases: [{
        args: fixed(tuple3, 1, 2),
        groups: [1, 2],
        finalize: callWith(3)
      }]
    },

    $fnOrError: {cases: [{args: fixed('someName', add)}]},

    $trampoline: {
      notCurried: '`$trampoline` takes the same argument tuple as `trampoline` ' +
        '(`(fn, fnName?)`), so it is an alias, not an idiomatically curried sibling',
      cases: [{args: fixed(factorialProcess), finalize: callWith(5)}]
    },

    $until: {cases: [{args: fixed((x: number) => x >= 5, incr, 0)}]},

    // errorThrowing
    $errorIfNotType: {
      cases: [{
        args: fixed(Number, 'someContext', 'someValue', 99, 'suffix'),
        groups: [1, 1, 1, 2]
      }]
    },

    $errorIfNotTypes: {
      cases: [{
        args: fixed([Number, String], 'someContext', 'someValue', 'abc', 'suffix'),
        groups: [1, 1, 1, 2]
      }]
    },

    $getErrorIfNotTypeThrower: {
      // The un-curried counterpart returns an un-curried thrower, hence the
      // "assembly" here - `$`-version returns the curried thrower.
      uncurried: (cb, Type, ctx, name, value) =>
        fjl.getErrorIfNotTypeThrower(cb)(Type, ctx, name, value),
      cases: [{
        args: fixed(defaultErrorMessageCall, Number, 'someContext', 'someValue', 99)
      }]
    },

    $getErrorIfNotTypesThrower: {
      uncurried: (cb, Types, ctx, name, value) =>
        fjl.getErrorIfNotTypesThrower(cb)(Types, ctx, name, value),
      cases: [{
        args: fixed(defaultErrorMessageCall, [Number, String], 'someContext', 'someValue', 99)
      }]
    },

    // number
    $normalizeStep: {
      sibling: 'normalizeStepOrThrow',
      cases: [{args: fixed(1, 10, 2)}, {args: fixed(10, 1, 2)}]
    },

    // string / _platform.string
    $split: {cases: [{args: fixed(',', 'a,b,c')}]},

    // _platform.object
    $hasOwnProperty: {cases: [{args: fixed({a: 1}, 'a')}, {args: fixed({a: 1}, 'b')}]},
    $instanceOf: {cases: [{args: fixed([], Array)}, {args: fixed('', String)}]},

    // _platform.slice
    $at: {cases: [{args: fixed(1, nums)}, {args: fixed(-1, nums)}]},
    $includes: {cases: [{args: fixed(nums, 3)}]},
    $indexOf: {cases: [{args: fixed(nums, 3)}]},
    $lastIndexOf: {cases: [{args: fixed([1, 2, 1], 1)}]},
    $slice: {cases: [{args: fixed(1, 3, nums)}]},

    // object
    $assignDeep: {
      knownFailure: '`$assignDeep` forwards its rest-args as a single array ' +
        '(`assignDeep(obj0, objs)` instead of `assignDeep(obj0, ...objs)`), so ' +
        'the curried form merges an *array* into `obj0` - see PR for #124',
      reusablePartial: false,
      cases: [{
        args: () => [{a: 1}, {b: 2}, {c: 3}],
        groups: [1, 2]
      }]
    },

    $defineEnumProp: {
      cases: [{
        args: () => [Number, {}, 'someProp', 99],
        groups: [1, 1, 2],
        finalize: ([target, descriptor]: [any, PropertyDescriptor]) =>
          [target.someProp, descriptor.enumerable, typeof descriptor.get]
      }]
    },

    $defineEnumProps: {
      cases: [{
        args: () => [[[Number, 'a', 1], [String, 'b', 'x']], {}],
        finalize: (target: any) => ({...target})
      }]
    },

    $defineProp: {
      cases: [{
        args: () => [Number, {}, 'someProp', 99],
        groups: [1, 1, 2],
        finalize: ([target, descriptor]: [any, PropertyDescriptor]) =>
          [target.someProp, descriptor.enumerable, typeof descriptor.get]
      }]
    },

    $defineProps: {
      cases: [{
        args: () => [[[Number, 'a', 1], [String, 'b', 'x']], {}],
        finalize: (target: any) => [target.a, target.b]
      }]
    },

    $lookup: {cases: [{args: fixed('a', {a: 1, b: 2})}]},

    $objComplement: {
      cases: [{args: fixed({a: 1}, {a: 1, b: 2}, {a: 1, c: 3}), groups: [1, 2]}]
    },

    $objDifference: {cases: [{args: fixed({a: 1, b: 2}, {a: 1})}]},

    $objIntersect: {cases: [{args: fixed({a: 1, b: 2}, {b: 3})}]},

    $objUnion: {
      knownFailure: '`$objUnion` is `$assignDeep` - see the `$assignDeep` entry',
      reusablePartial: false,
      cases: [{args: () => [{a: 1}, {b: 2}], groups: [1, 1]}]
    },

    $searchObj: {
      cases: [
        {args: fixed('a', {a: {b: 2}})},
        {args: fixed('a.b', {a: {b: 2}})}
      ]
    },

    // list
    $all: {cases: [{args: fixed(isEven, [2, 4, 6])}, {args: fixed(isEven, nums)}]},
    $any: {cases: [{args: fixed(isEven, nums)}]},
    $append: {cases: [{args: fixed([1], [2], [3]), groups: [1, 2]}]},
    $breakOnList: {cases: [{args: fixed(lt3, nums)}]},
    $complement: {cases: [{args: fixed([1, 2, 3], [2, 4], [3, 5]), groups: [1, 2]}]},
    $concatMap: {cases: [{args: fixed((x: number) => [x, x], [[1], [2]])}]},
    $difference: {cases: [{args: fixed([1, 2, 3], [2])}]},
    $drop: {cases: [{args: fixed(2, nums)}]},
    $dropWhile: {cases: [{args: fixed(lt3, nums)}]},
    $dropWhileEnd: {cases: [{args: fixed((x: number) => x > 3, nums)}]},
    $elem: {cases: [{args: fixed(nums, 3)}]},
    $elemIndex: {cases: [{args: fixed(nums, 3)}]},
    $elemIndices: {cases: [{args: fixed(2, [1, 2, 2, 3])}]},
    $filter: {cases: [{args: fixed(isEven, nums)}]},
    $find: {cases: [{args: fixed(isEven, nums)}]},
    $findIndex: {cases: [{args: fixed(isEven, nums)}]},
    $findIndexWhere: {cases: [{args: fixed(isEven, nums)}]},
    $findIndexWhereRight: {cases: [{args: fixed(isEven, nums)}]},
    $findIndices: {cases: [{args: fixed(isEven, nums)}]},
    $findIndicesWhere: {cases: [{args: fixed(isEven, nums)}]},
    $findWhere: {cases: [{args: fixed(isEven, nums)}]},
    $foldl: {cases: [{args: fixed(add, 0, nums)}]},
    $foldl1: {cases: [{args: fixed(add, nums)}]},
    $foldr: {cases: [{args: fixed(add, 0, nums)}]},
    $foldr1: {cases: [{args: fixed(add, nums)}]},

    $forEach: {
      reusablePartial: false, // Operation records its calls (is stateful)
      cases: [{args: recorderArgs(nums), finalize: recorded}]
    },

    $genericAscOrdering: {cases: [{args: fixed(1, 2)}, {args: fixed(2, 1)}]},
    $groupBy: {cases: [{args: fixed(eq, [1, 1, 2, 3, 3])}]},
    $insert: {cases: [{args: fixed(3, [1, 2, 4, 5])}]},
    $insertBy: {cases: [{args: fixed(asc, 3, [1, 2, 4, 5])}]},
    $intercalate: {cases: [{args: fixed([0], [[1], [2], [3]])}]},
    $intersect: {cases: [{args: fixed([1, 2, 3], [2, 3, 4])}]},
    $intersectBy: {cases: [{args: fixed(eq, [1, 2, 3], [2, 3, 4])}]},
    $intersperse: {cases: [{args: fixed(0, [1, 2, 3])}]},
    $isInfixOf: {cases: [{args: fixed('bcd', alphabet)}]},
    $isPrefixOf: {cases: [{args: fixed('abc', alphabet)}]},
    $isSubsequenceOf: {cases: [{args: fixed('ace', 'abcde')}]},
    $isSuffixOf: {cases: [{args: fixed(alphabet, 'xyz')}]},

    $iterate: {cases: [{args: fixed(incr, 5), finalize: takeFromGen(3)}]},

    $map: {cases: [{args: fixed(incr, nums)}]},
    $mapAccumL: {
      cases: [{args: fixed((agg: number, x: number) => [agg + x, agg + x], 0, nums)}]
    },
    $mapAccumR: {
      cases: [{args: fixed((agg: number, x: number) => [agg + x, agg + x], 0, nums)}]
    },
    $nubBy: {cases: [{args: fixed(eq, [1, 1, 2, 3, 3])}]},
    $partition: {cases: [{args: fixed(isEven, nums)}]},

    $push: {cases: [{args: () => [6, nums.slice(0)]}]},

    $pushN: {
      reusablePartial: false, // Mutates its first argument
      cases: [{args: () => [nums.slice(0), 6, 7], groups: [1, 2]}]
    },

    $range: {
      cases: [
        {args: fixed(0, 5, 1), groups: [1, 2]},
        {args: fixed(0, 5), groups: [1, 1]}
      ]
    },

    $reduce: {cases: [{args: fixed(add, 0, nums)}]},
    $reduceRight: {cases: [{args: fixed(add, 0, nums)}]},
    $reduceUntil: {cases: [{args: fixed((x: number) => x > 3, add, 0, nums)}]},
    $reduceUntilRight: {cases: [{args: fixed((x: number) => x < 3, add, 0, nums)}]},
    $remove: {cases: [{args: fixed(3, nums)}]},
    $removeBy: {cases: [{args: fixed(eq, 3, nums)}]},
    $removeFirstsBy: {cases: [{args: fixed(eq, nums, [2, 4])}]},
    $replicate: {cases: [{args: fixed(3, 'a')}]},
    $scanl: {cases: [{args: fixed(add, 0, nums)}]},
    $scanl1: {cases: [{args: fixed(add, nums)}]},
    $scanr: {cases: [{args: fixed(add, 0, nums)}]},
    $scanr1: {cases: [{args: fixed(add, nums)}]},
    $sliceFrom: {cases: [{args: fixed(2, nums)}]},
    $sliceTo: {cases: [{args: fixed(2, nums)}]},
    $sortBy: {cases: [{args: fixed(asc, [3, 1, 2])}]},
    $sortOn: {cases: [{args: fixed((x: number[]) => x[0], [[2, 'b'], [1, 'a']])}]},
    $span: {cases: [{args: fixed(lt3, nums)}]},
    $splitAt: {cases: [{args: fixed(2, nums)}]},
    $stripPrefix: {cases: [{args: fixed('abc', alphabet)}]},
    $swap: {cases: [{args: fixed(0, 2, nums)}]},
    $take: {cases: [{args: fixed(2, nums)}]},
    $takeWhile: {cases: [{args: fixed(lt3, nums)}]},
    $toShortest: {cases: [{args: fixed([1, 2, 3], [4, 5], [6, 7, 8]), groups: [1, 2]}]},

    $unfoldr: {
      cases: [{
        args: fixed((b: number) => b < 5 ? [b, b + 1] : undefined, 0)
      }]
    },

    $union: {cases: [{args: fixed([1, 2], [2, 3])}]},
    $unionBy: {
      cases: [{args: fixed((xs: number[], x: number) => !xs.includes(x), [1, 2], [2, 3])}]
    },
    $zip: {cases: [{args: fixed([1, 2], ['a', 'b'])}]},
    $zip3: {cases: [{args: fixed([1, 2], ['a', 'b'], [true, false])}]},
    $zipN: {cases: [{args: fixed([1, 2], ['a', 'b'], [true, false]), groups: [1, 2]}]},
    $zipWith: {cases: [{args: fixed(tuple2, [1, 2], ['a', 'b'])}]},
    $zipWith3: {cases: [{args: fixed(tuple3, [1, 2], ['a', 'b'], [true, false])}]},
    $zipWithN: {
      cases: [{args: fixed(tuple2, [1, 2], ['a', 'b']), groups: [1, 2]}]
    }
  },

  /**
   * `Object.*` statics are re-exported, flipped and curried, on `fjl.native`;
   * They follow the same `$`-prefix convention, so they get the same treatment.
   */
  nativeRegistry: CurryRegistry = {
    $assign: {cases: [{args: () => [{b: 2}, {a: 1}]}]},

    $create: {
      cases: [{
        args: fixed({a: {value: 1, enumerable: true}}, {protoProp: 1}),
        finalize: (o: any) => [o.a, o.protoProp, Object.keys(o)]
      }]
    },

    $defineProperties: {
      cases: [{
        args: () => [{a: {value: 1, enumerable: true}}, {}],
        finalize: (o: any) => ({...o})
      }]
    },

    $defineProperty: {
      cases: [{
        args: () => [{value: 1, enumerable: true}, 'a', {}],
        finalize: (o: any) => ({...o})
      }]
    },

    $getOwnPropertyDescriptor: {cases: [{args: fixed('a', {a: 1})}]},

    $groupBy: {
      cases: [{
        args: fixed((x: number) => isEven(x) ? 'even' : 'odd', nums),
        finalize: (o: any) => ({...o})
      }]
    },

    $hasOwn: {cases: [{args: fixed('a', {a: 1})}, {args: fixed('b', {a: 1})}]},

    $is: {cases: [{args: fixed(1, 1)}, {args: fixed(NaN, NaN)}, {args: fixed(1, 2)}]},

    $setPrototypeOf: {
      cases: [{
        args: () => [{protoProp: 1}, {}],
        finalize: (o: any, args: any[]) => Object.getPrototypeOf(o) === args[0]
      }]
    }
  }

;

/**
 * Generates the `describe`/`it` blocks for one `$`-prefixed method.
 */
const describeCurried = (
  name: string,
  siblingName: string,
  curried: AnyFn,
  uncurried: AnyFn,
  spec: CurryRegistry[string]
): void => {
  describe(`#${name}`, () => {
    it(`\`${name}\` is exported as a function`, () => {
      expect(typeof curried).toEqual('function');
    });

    it(`\`${name}\` has an un-curried sibling (\`${siblingName}\`)`, () => {
      expect(typeof uncurried).toEqual('function');
    });

    if (spec.notCurried) {
      it(`\`${name}\` is NOT curried - ${spec.notCurried}`, () => {
        expect(curried.length).toBeGreaterThan(1);
      });
    }

    spec.cases.forEach((_case, ind) => {
      const groups = _case.groups ?? defaultGroups(_case.args().length),
        suffix = spec.cases.length > 1 ? ` [case ${ind}]` : '',
        title = `${_case.label ?? curriedCallSignature(name, groups)}` +
          ` is curried, and agrees with \`${siblingName}\`${suffix}`,
        register = spec.knownFailure ? it.failing : it;

      register(
        spec.knownFailure ? `${title} (known failure: ${spec.knownFailure})` : title,
        () => assertCurriedCase(curried, uncurried, _case, spec.reusablePartial !== false)
      );
    });
  });
};

describe('curried methods (`$`-prefixed exports)', () => {
  const exported = fjl as unknown as Record<string, any>,
    dollarNames = Object.keys(exported).filter(k => k.startsWith('$')).sort();

  describe('#registry', () => {
    it('covers every `$`-prefixed export', () => {
      expect(dollarNames.filter(name => !curriedRegistry[name])).toEqual([]);
    });

    it('contains no entries for non-existent exports', () => {
      expect(Object.keys(curriedRegistry).filter(name => !(name in exported))).toEqual([]);
    });

    it('found the expected number of curried methods', () => {
      // Sanity check - update when curried methods are added/removed
      expect(dollarNames.length).toBeGreaterThanOrEqual(109);
    });
  });

  dollarNames.forEach(name => {
    const spec = curriedRegistry[name];
    if (!spec) return; // Reported by the `#registry` tests above
    const siblingName = spec.sibling ?? name.slice(1);
    describeCurried(
      name,
      spec.uncurried ? `<assembled from \`${siblingName}\`>` : siblingName,
      exported[name],
      spec.uncurried ?? exported[siblingName],
      spec
    );
  });
});

describe('curried methods (`fjl.native` `$`-prefixed statics)', () => {
  const {native} = fjl as unknown as { native: Record<string, any> },
    dollarNames = Object.keys(native).filter(k => k.startsWith('$')).sort();

  describe('#registry', () => {
    it('covers every `$`-prefixed `native` static', () => {
      expect(dollarNames.filter(name => !nativeRegistry[name])).toEqual([]);
    });
  });

  dollarNames.forEach(name => {
    const spec = nativeRegistry[name];
    if (!spec) return;
    const siblingName = spec.sibling ?? name.slice(1);
    describeCurried(
      name,
      `native.${siblingName}`,
      native[name],
      spec.uncurried ?? native[siblingName],
      spec
    );
  });
});
