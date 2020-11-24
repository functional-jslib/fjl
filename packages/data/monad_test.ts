import {just, nothing} from "./maybe";
import {Monad, join, valueOf, fmap} from "./monad";
import {left, right} from "./either";
import {FunctorMapFn} from "./types";
import {id} from "../function";

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
        [just(null), id, nothing()],
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
    it('should have more tests', function () {
        expect(false).toEqual(true);
    });
});
