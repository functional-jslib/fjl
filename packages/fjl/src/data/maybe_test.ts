import {isJust, isMaybe, isNothing, Just, Maybe, maybe, Nothing} from './maybe';
import {join} from './monad';
import {falsyList} from "../../tests/helpers";
import {Nameable, Unary} from "../types";

const methodNames = ['ap', 'map', 'flatMap', 'join'] as Array<keyof Maybe<any>>;

const containsMethods = <T>(x: Maybe<T>, methodNames_: string[]): void => {
  methodNames_.forEach(methodName => {
    it(`#${x.constructor.name}.${methodName} instanceof Function === true`, function () {
      expect(x[methodName]).toBeInstanceOf(Function);
    });
  });
}

describe('#isJust', () => {
  [
    [Just(1), true],
    // @ts-ignore
    [new Just(1), true],
    ...(falsyList.map(x => ([x, false]))),
    [Just(), false],
    // @ts-ignore
    [new Just(), false],
  ]
    .forEach(([x, expected]) => {
      it(`${isJust.name}(${x}) === ${expected}`, function () {
        expect(isJust(x)).toEqual(expected);
      });
    });
});

describe('#Just', () => {
  test('Should be constructable', () => {
    // @ts-ignore
    expect(new Just(1)).toBeInstanceOf(Just);
  });

  test('Should contain passed in value on construction', () => {
    // @ts-ignore
    expect(new Just(99).valueOf()).toEqual(99);
  });

  test('should be extendable', () => {
    // @ts-ignore
    class Hello<T> extends Just<T> {
      constructor(x = null) {
        super(x);
      }
    }

    expect(new Hello(1)).toBeInstanceOf(Just);
  });

  // @ts-ignore
  containsMethods(new Just(99), methodNames);
});

describe('#Just.valueOf', () => {
  test('should return contained value of container (`undefined` or whatever was passed ' +
    'on construction of container)', () => {
    // @ts-ignore
    [new Just(99), Just(99)].forEach(x => {
      expect(x.valueOf()).toEqual(99);
    });
    // @ts-ignore
    [new Just(), Just()].forEach(x => {
      expect(x.valueOf()).toEqual(undefined);
    });
  });
});

describe('#Just.join', () => {
  test('should remove one layer of monadic structure from container', () => {
    (<[Maybe<any>, any][]>[
      [Just(), undefined],
      [Just(null), undefined],
      [Just(false), false],
      [Just(''), ''],
      [Just(99), 99],
      [Just(Just(99)), Just(99)],
      [Just(Just(Just(99))), Just(Just(99))],
    ])
      .forEach(([arg, expected]) => {
        expect(join(arg)).toEqual(expected); // does deep equality check here
      });
  });
});

describe('#Just.map', () => {
  test('should return an instance of `Just` after map operation', () => {
    const control = 99,
      op = x => x * 2,
      justResult = Just(control).map(op);
    expect(justResult instanceof Just).toEqual(true);
    justResult.map(x => expect(x).toEqual(op(control)));
  });
  test('should throw an error when receiving anything other than a function as it\'s parameter', () => {
    expect(() => Just(99).map(null)).toThrow(Error);
  });
});

describe('#Just.flatMap', () => {
  test('should return an instance of `Just` after `flatMap` operation', () => {
    const control = 99,
      op = x => x * 2,
      justResult = Just(control).flatMap(op);
    expect(justResult instanceof Just).toEqual(true);
    justResult.map(x => expect(x).toEqual(op(control)));
  });
  test('should throw an error when receiving anything other than a function as it\'s parameter', () => {
    expect(() => Just(99).flatMap(null)).toThrow(Error);
  });
});

describe('#Just.ap', () => {
  test('should map contained value over passed in functor', () => {
    const op = x => x * 2;
    Just(op)
      .ap(Just(2))
      .map(x => expect(x).toEqual(op(2)));
  });
  test('should be able to map contained value over functor even if it is not a ' +
    'function (call should internally wrap non-function values in functions', () => {
    Just()
      .ap(Just(99))
      .map(x => expect(x).toEqual(undefined));
  });
});

describe('#isNothing', () => {
  test('should return `true` when a value is of type `Nothing`', () => {
    [Nothing, Nothing()].forEach(x => {
      expect(isNothing(x)).toEqual(true);
    });
  });
  test('should return `false` when a value is not a `Nothing`', () => {
    [false, 0, (): object => ({}), [], {}].forEach(x => {
      expect(isNothing(x)).toEqual(false);
    });
  });
});

describe('#Nothing', () => {
  test('Should return singleton instance when called as a function, or with the `new` keyword', () => {
    [[Nothing(), Nothing],
      // @ts-ignore
      [new Nothing(), Nothing]]
      .forEach(([a, b]) => {
        expect(a).toEqual(b);
      });
  });

  test('Expect `map`, `ap`, `flatMap`, and `join` methods to exist', () => {
    methodNames.forEach(name => expect(Nothing[name]).toBeInstanceOf(Function));
  });

  test('Expect `map`, `ap`, `flatMap`, and `join` methods to all return same singleton instance of `Nothing`', () => {
    methodNames.forEach(x => expect((Nothing[x] as Unary)(undefined)).toEqual(x === 'join' || x === 'valueOf' ? undefined : Nothing));
  });
});

describe('Maybe', () => {
  describe('Constructor', () => {
    // @todo should we include `NaN` as a value that gives you a `Nothing` (probably but for simplicities sake (for now)...)
    test('Should return a `Nothing` when receiving `null` or `undefined`', () => {
      [null, undefined].forEach(value => {
        const result = Just(value);
        expect(result).toEqual(Nothing);
        result.map(x => expect(x).toEqual(undefined));
      });
    });
    test('Should return a `Just` when receiving anything other than `null` or `undefined`', () => {
      [false, 0, () => ({}), [], {}].forEach(value => {
        const result = Just(value);
        expect(result).toBeInstanceOf(Just);
        result.map(x => expect(x).toEqual(value));
      });
    });
  });
  describe('`isMaybe`', () => {
    test('should return `true` when a value is of type `Maybe`', () => {
      [].concat([99, undefined].map(Just))
        .forEach(x => {
          expect(isMaybe(x)).toEqual(true);
        });
    });
    test('should return `false` when a value is not a `Maybe`', () => {
      [false, 0, () => ({}), [], {}].forEach(x => {
        expect(isMaybe(x)).toEqual(false);
      });
    });
  });
  describe('`maybe`', () => {
    const caseValue = 99,
      squareX = x => x * 2,
      replacementVal = 27;

    (<[Parameters<typeof maybe>, ReturnType<typeof maybe>][]>[
      [[replacementVal, squareX, Just(caseValue)], squareX(caseValue)],
      [[replacementVal, squareX, caseValue], squareX(caseValue)],
      [[replacementVal, squareX, Nothing], replacementVal],
      [[replacementVal, squareX, null], replacementVal],
      [[replacementVal, squareX, undefined], replacementVal],
    ])
      .forEach(([args, expected], i) => {
        test(`iter.: ${i}; maybe(${args.map(arg => typeof arg === 'function' ?
            (arg as Nameable).name : JSON.stringify(arg)).join(', ')}) === ` +
          ` ${JSON.stringify(expected)}`, () => {
          expect(maybe(...args)).toEqual(expected);
        });
      });
  });
});
