import {Just, Maybe, Nothing} from "../../src/data/maybe";
import {Monad, join, valueOf, fmap, ap, flatMap, Boxed} from "../../src/data/monad";
import {Applicative, FunctorMapOp, Nary, UnitNary} from "../../src/types";
import {id} from "../../src/function";
import {falsyList, truthyList} from "../helpers";
import {Left, Right} from "../../src";

describe('#valueOf()', () => {
  (<[Monad<any>, any][]>[
    [Just(20), 20],
    [Just(null), undefined],
    [Right(20), 20],
    [Left('Oh no ... an error occurred.'), 'Oh no ... an error occurred.'],
  ])
    .forEach(([monad, expectedValue]) => {
      it(`valueOf(${monad}) === ${expectedValue}`, () => {
        expect(valueOf(monad)).toEqual(expectedValue);
      });
    })
});

describe('#join()', () => {
  it(`join === valueOf`, () => {
    expect(join).toEqual(valueOf);
  });
});

describe('#fmap()', () => {
  (<[Monad<any>, FunctorMapOp<any, any>, Monad<any>][]>[
    [Nothing, id, Nothing],
    [Just(null), id, Just(null)],
    [Just(2), x => x * 2, Just(4)],
    [[1, 2, 3], x => x * 2, [2, 4, 6]]
  ])
    .forEach(([monad, mapper, monad2]) => {
      it(`fmap(${mapper}, ${monad}).valueOf() == ${monad2}.valueOf()`, function () {
        const rslt = fmap(mapper, monad) as Monad<any>;
        expect(rslt.valueOf()).toEqual(monad2.valueOf());
      });
    })
});

describe('#ap', () => {
  (<[Applicative<<T>(x: T) => T>, Monad<any>, Monad<any>][]>[
    [Just((x: number) => x * 2), Just(4), Just(8)],
    [Just((x: number) => x * 3), Just(2), Just(6)],
    [Just(x => x), Just(null), Nothing],
    [Just(x => x), Just(), Nothing],
    [Just(x => x), Nothing, Nothing],
  ])
    .forEach(([applicative, functor, expected]) => {
      it(`ap(${applicative}, ${functor}) === ${expected}`, function () {
        const rslt = ap(applicative, functor) as Maybe;
        expect(rslt.join()).toEqual(expected.join());
      });
    });
});

describe('#flatMap', () => {
  (<[Monad<any>, FunctorMapOp<any, any>, Monad<any>][]>[
    [Nothing, id, Nothing],
    [Just(null), id, Just(null)],
    [Just(2), x => x * 2, Just(4)],
    [[1, 2, 3], x => x * 2, [2, 4, 6]]
  ])
    .forEach(([monad, mapper, monad2]) => {
      it(`flatMap(${mapper}, ${monad}).valueOf() == ${monad2}.valueOf()`, function () {
        const rslt = flatMap(mapper, monad) as Monad<any>;
        expect(rslt.valueOf()).toEqual(monad2.valueOf());
      });
    })
});

describe('#Monad.of', () => {
  (<[string, any][]>
    [].concat(
      falsyList.map(x => [`Monad.of(${x}) instanceof MonadBase`, x]),
      truthyList.map(x => [`Monad.of(${x}) instanceof MonadBase`, x]),
    ))
    .forEach(([testName, control]) => {
      it(testName, function () {
        const result = Boxed.of(control);
        expect(result).toBeInstanceOf(Boxed);
        expect(result.valueOf()).toEqual(control);
      });
    });
});

describe('#Monad.liftA2', () => {
  it('Should be a static function', () => {
    expect(Boxed.liftA2).toBeInstanceOf(Function);
    expect(Boxed.liftA2.length).toEqual(3);
  });

  type ShouldThrow = boolean;
  const shouldThrow = true;

  (<[string, UnitNary, Boxed, Boxed, ShouldThrow?][]>[
    ['Boxed.liftA2(Math.pow, Boxed.of(() => 3), Boxed.of(() => 6)).valueOf() === ' +
    'Math.pow(3, 6)',
      Math.pow.bind(Math),
      Boxed.of(() => 3),
      Boxed.of(() => 6)
    ],
    ['Boxed.liftA2(null, a, b) Should throw',
      null,
      Boxed.of(() => 3),
      Boxed.of(() => 6),
      shouldThrow
    ]
  ])
    .forEach(([testName, f, fOfA, fOfB, throwExpected]) => {
      it(testName, function () {
        if (throwExpected) {
          expect(() => Boxed.liftA2(f, fOfA, fOfB)).toThrow();
          return;
        }
        const result = Boxed.liftA2(f, fOfA, fOfB),
          a = fOfA.ap(Boxed.of()),
          b = fOfB.ap(Boxed.of());
        expect(result).toBeInstanceOf(Boxed);
        expect(result.valueOf()).toEqual(f(a, b));
      });
    });
});

describe('#Monad.apRight', () => {
  it('Should be a static function', () => {
    expect(Boxed.apRight).toBeInstanceOf(Function);
    expect(Boxed.apRight.length).toEqual(2);
  });

  type ShouldThrow = boolean;
  type Expected = number;
  const shouldThrow = true;

  (<[string, Boxed<Nary<number>>, Boxed<Nary<number>>, Expected, ShouldThrow?][]>[
    ['Boxed.apRight(Boxed.of(() => 3), Boxed.of(() => 6)).valueOf() === 6',
      Boxed.of(() => 3),
      Boxed.of(() => 6),
      6,
    ],
    ['Boxed.apRight(null, a, b) Should throw',
      null,
      null,
      null,
      shouldThrow
    ]
  ])
    .forEach(([testName, fOfA, fOfB, expected, throwExpected]) => {
      it(testName, function () {
        if (throwExpected) {
          expect(() => Boxed.apRight(fOfA, fOfB)).toThrow();
          return;
        }
        const result = Boxed.apRight(fOfA, fOfB);
        expect(result).toBeInstanceOf(Boxed);
        expect(result.valueOf()).toEqual(expected);
      });
    });
});

describe('#Monad.apLeft', () => {
  it('Should be a static function', () => {
    expect(Boxed.apLeft).toBeInstanceOf(Function);
    expect(Boxed.apLeft.length).toEqual(2);
  });

  type ShouldThrow = boolean;
  type Expected = number;
  const shouldThrow = true;

  (<[string, Boxed<Nary<number>>, Boxed<Nary<number>>, Expected, ShouldThrow?][]>[
    ['Boxed.apLeft(Boxed.of(() => 3), Boxed.of(() => 6)).valueOf() === 3',
      Boxed.of(() => 3),
      Boxed.of(() => 6),
      3,
    ],
    ['Boxed.apLeft(null, a, b) Should throw',
      null,
      null,
      null,
      shouldThrow
    ]
  ])
    .forEach(([testName, fOfA, fOfB, expected, throwExpected]) => {
      it(testName, function () {
        if (throwExpected) {
          expect(() => Boxed.apLeft(fOfA, fOfB)).toThrow();
          return;
        }
        const result = Boxed.apLeft(fOfA, fOfB);
        expect(result).toBeInstanceOf(Boxed);
        expect(result.valueOf()).toEqual(expected);
      });
    });
});
