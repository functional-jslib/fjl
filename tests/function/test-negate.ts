import {negateF, negateF2, negateF3, negateFN} from '../../src/function/negate';

type Predicate = (x: any) => boolean;

describe('#negateF', () => {
    it('should negate predicate handed to it at an arity of `1`', () => {
        (<Array<[Predicate, any, boolean]>>[
            [x => x > 1, 1, true],      // negated
            [x => x === 1, 1, false],   // ""
            [x => x < 1, 1, true]       // ""
        ])
            .forEach(([fn, arg, expected]) => {
                const negated = negateF(fn);
                expect(negated(arg)).toEqual(expected);
            });
    });
});

describe('#negateF2', () => {
    it('should negate predicates handed to it with an arity of `2`', () => {
        (<Array<[Predicate, [number, number], boolean]>>[
            [(a, b) => a > b, [1, 2], true],    // negated
            [(a, b) => a === b, [1, 2], true],  // negated
            [(a, b) => a < b, [1, 2], false],   // negated
        ])
            .forEach(([fn, [a, b], expected]) => {
                const negated = negateF2(fn);
                expect(negated(a, b)).toEqual(expected);
            });
    });
});

describe('#negateF3', () => {
    it('should negate predicates handed to it with an arity of `3`', () => {
        (<Array<[Predicate, [number, number, number], boolean]>>[
            [(a, b, c) => a > b && c === 0, [1, 2, 1], true],      // negated
            [(a, b, c) => a === b && c === 0, [1, 2, 1], true],    // negated
            [(a, b, c) => a < b && c === 0, [1, 2, 1], true],      // negated
        ])
            .forEach(([fn, [a, b, c], expected]) => {
                const negated = negateF3(fn);
                expect(negated(a, b, c)).toEqual(expected);
            });
    });
});

describe('#negateFN', () => {
    (<Array<[Predicate, [number, number, number], boolean]>>[
        [x => x > 1, [1, 0, 0], true],                      // negated
        [(a, b) => a === b, [1, 2, 1], true],               // negated
        [(a, b, c) => a < b && c === 0, [1, 2, 1], true],   // negated
    ])
        .forEach(([fn, [a, b, c], expected]) => {
            const fnLen = fn.length,
                negated = negateFN(fn);
            it(`should negate predicates handed to it with an arity of ${fnLen}`, () => {
                expect(negated(a, b, c)).toEqual(expected);
            });
            it('should return a variadic function', () => {
                expect(negated.length).toEqual(0);
            });
        });
});
