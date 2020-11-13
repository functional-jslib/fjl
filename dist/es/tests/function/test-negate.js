import { negateF, negateF2, negateF3, negateFN } from '../../packages/function/negate';
describe('#negateF', () => {
    it('should negate predicate handed to it at an arity of `1`', () => {
        [
            [x => x > 1, 1, true],
            [x => x === 1, 1, false],
            [x => x < 1, 1, true] // ""
        ]
            .forEach(([fn, arg, expected]) => {
            const negated = negateF(fn);
            expect(negated(arg)).toEqual(expected);
        });
    });
});
describe('#negateF2', () => {
    it('should negate predicates handed to it with an arity of `2`', () => {
        [
            [(a, b) => a > b, [1, 2], true],
            [(a, b) => a === b, [1, 2], true],
            [(a, b) => a < b, [1, 2], false],
        ]
            .forEach(([fn, [a, b], expected]) => {
            const negated = negateF2(fn);
            expect(negated(a, b)).toEqual(expected);
        });
    });
});
describe('#negateF3', () => {
    it('should negate predicates handed to it with an arity of `3`', () => {
        [
            [(a, b, c) => a > b && c === 0, [1, 2, 1], true],
            [(a, b, c) => a === b && c === 0, [1, 2, 1], true],
            [(a, b, c) => a < b && c === 0, [1, 2, 1], true],
        ]
            .forEach(([fn, [a, b, c], expected]) => {
            const negated = negateF3(fn);
            expect(negated(a, b, c)).toEqual(expected);
        });
    });
});
describe('#negateFN', () => {
    [
        [x => x > 1, [1, 0, 0], true],
        [(a, b) => a === b, [1, 2, 1], true],
        [(a, b, c) => a < b && c === 0, [1, 2, 1], true],
    ]
        .forEach(([fn, [a, b, c], expected]) => {
        const fnLen = fn.length, negated = negateFN(fn);
        it(`should negate predicates handed to it with an arity of ${fnLen}`, () => {
            expect(negated(a, b, c)).toEqual(expected);
        });
        it('should return a variadic function', () => {
            expect(negated.length).toEqual(0);
        });
    });
});
//# sourceMappingURL=test-negate.js.map