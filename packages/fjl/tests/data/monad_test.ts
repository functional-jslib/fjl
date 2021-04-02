import {just, nothing} from "../../src/data/maybe";
import {Monad, join, valueOf, fmap, ap, flatMap} from "../../src/data/monad";
import {left, right} from "../../src/data/either";
import {Applicative, FunctorMapFn} from "../../src/types";
import {id} from "../../src/function";

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
    (<[Monad<any>, FunctorMapFn<any>, Monad<any>][]>[
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
