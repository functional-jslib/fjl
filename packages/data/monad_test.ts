import {just} from "./maybe";
import {Monad, join, valueOf} from "./monad";
import {left, right} from "./either";

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
