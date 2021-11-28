import {just, nothing} from "../../src/data/maybe";
import {Monad, join, valueOf, fmap, ap, flatMap, MonadBase} from "../../src/data/monad";
import {left, right} from "../../src/data/either";
import {Applicative, FunctorMapFn, Nary, Unary, UnitNary} from "../../src/types";
import {id} from "../../src/function";
import {falsyList, truthyList} from "../helpers";
import {randomNatNumber} from "../../src";

describe('#valueOf()', () => {
  (<[Monad<any>, any][]>[
    [just(20), 20],
    [just(null), null],
    [right(20), 20],
    [left('Oh no ... an error occurred.'), 'Oh no ... an error occurred.'],
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
  (<[Monad<any>, FunctorMapFn<any>, Monad<any>][]>[
    [nothing(), id, nothing()],
    [just(null), id, just(null)],
    [just(2), x => x * 2, just(4)],
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
    [just((x: number) => x * 2), just(4), just(8)],
    [just((x: number) => x * 3), just(2), just(6)],
    [just(x => x), nothing(), nothing()],
    [just(x => x), just(null), just(null)]
  ])
    .forEach(([applicative, functor, expected]) => {
      it(`${applicative}`, function () {
        const rslt = ap(applicative, functor) as Monad<any>;
        expect(rslt.join()).toEqual(expected.join());
      });
    });
});

describe('#flatMap', () => {
  (<[Monad, FunctorMapFn<any>, Monad][]>[
    [nothing(), id, nothing()],
    [just(null), id, just(null)],
    [just(2), x => x * 2, just(4)],
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
        const result = MonadBase.of(control);
        expect(result).toBeInstanceOf(MonadBase);
        expect(result.valueOf()).toEqual(control);
      });
    });
});

describe('#Monad.liftA2', () => {
  it('Should be a static function', () => {
    expect(MonadBase.liftA2).toBeInstanceOf(Function);
    expect(MonadBase.liftA2.length).toEqual(3);
  });

  type ShouldThrow = boolean;
  const shouldThrow = true;

  (<[string, UnitNary, MonadBase, MonadBase, ShouldThrow?][]>[
    ['MonadBase.liftA2(Math.pow, MonadBase.of(() => 3), MonadBase.of(() => 6)).valueOf() === Math.pow(3, 6)',
      Math.pow.bind(Math),
      MonadBase.of(() => 3),
      MonadBase.of(() => 6)
    ],
    ['MonadBase.liftA2(null, a, b) Should throw',
      null,
      MonadBase.of(() => 3),
      MonadBase.of(() => 6),
      shouldThrow
    ]
  ])
    .forEach(([testName, f, fOfA, fOfB, throwExpected]) => {
      it(testName, function () {
        if (throwExpected) {
            expect(() => MonadBase.liftA2(f, fOfA, fOfB)).toThrow();
          return;
        }
        const result = MonadBase.liftA2(f, fOfA, fOfB),
        a = fOfA.ap(just()),
        b = fOfB.ap(just());
        expect(result).toBeInstanceOf(MonadBase);
        expect(result.valueOf()).toEqual(f(a, b));
      });
    });
});

describe('#Monad.apRight', () => {
  it('Should be a static function', () => {
    expect(MonadBase.apRight).toBeInstanceOf(Function);
    expect(MonadBase.apRight.length).toEqual(2);
  });

  type ShouldThrow = boolean;
  type Expected = number;
  const shouldThrow = true;

  (<[string, MonadBase<Nary<number>>, MonadBase<Nary<number>>, Expected, ShouldThrow?][]>[
    ['MonadBase.apRight(MonadBase.of(() => 3), MonadBase.of(() => 6)).valueOf() === 6',
      MonadBase.of(() => 3),
      MonadBase.of(() => 6),
      6,
    ],
    ['MonadBase.apRight(null, a, b) Should throw',
      null,
      null,
      null,
      shouldThrow
    ]
  ])
    .forEach(([testName, fOfA, fOfB, expected, throwExpected]) => {
      it(testName, function () {
        if (throwExpected) {
          expect(() => MonadBase.apRight(fOfA, fOfB)).toThrow();
          return;
        }
        const result = MonadBase.apRight(fOfA, fOfB);
        expect(result).toBeInstanceOf(MonadBase);
        expect(result.valueOf()).toEqual(expected);
      });
    });
});

describe('#Monad.apLeft', () => {
  it('Should be a static function', () => {
    expect(MonadBase.apLeft).toBeInstanceOf(Function);
    expect(MonadBase.apLeft.length).toEqual(2);
  });

  type ShouldThrow = boolean;
  type Expected = number;
  const shouldThrow = true;

  (<[string, MonadBase<Nary<number>>, MonadBase<Nary<number>>, Expected, ShouldThrow?][]>[
    ['MonadBase.apLeft(MonadBase.of(() => 3), MonadBase.of(() => 6)).valueOf() === 3',
      MonadBase.of(() => 3),
      MonadBase.of(() => 6),
      3,
    ],
    ['MonadBase.apLeft(null, a, b) Should throw',
      null,
      null,
      null,
      shouldThrow
    ]
  ])
    .forEach(([testName, fOfA, fOfB, expected, throwExpected]) => {
      it(testName, function () {
        if (throwExpected) {
          expect(() => MonadBase.apLeft(fOfA, fOfB)).toThrow();
          return;
        }
        const result = MonadBase.apLeft(fOfA, fOfB);
        expect(result).toBeInstanceOf(MonadBase);
        expect(result.valueOf()).toEqual(expected);
      });
    });
});
