import {isLeft, isRight, Left, Right, either, toLeft, toRight} from './either';

const methodNames = ['ap', 'map', 'flatMap', 'join'];

describe('#Left', () => {
    test('should return an instance of `Left`', () => {
        expect(new Left() instanceof Left).toEqual(true);
    });

    test('should be extendable', () => {
        class Hello<T> extends Left<T> {
            constructor(something?: T) {
                super(something);
            }
        }

        expect(new Hello()).toBeInstanceOf(Left);
    });

    ((): void => {
        const left = Left.of();
        methodNames.forEach(methodName => {
            it(`#Left.${methodName} instanceof Function === true`, function () {
                expect(left[methodName]).toBeInstanceOf(Function);
            });
        });
    })();

    test('Expect `map` and `flatMap` should return instances of `Left`', () => {
        expect(Left.of('something').map(x => x)).toBeInstanceOf(Left);
        expect(Left.of('something-else').flatMap(x => Left.of(x))).toBeInstanceOf(Left);
    });

    test('Expect calling `ap` on a `#Left` to return containing value of `Left`', () => {
        const value = 'Hello World',
            left = Left.of(value);
        left.ap(Right.of('99')).map(x => expect(x).toEqual(value));
    });

    test('#join should return whatever is contained within `Left`', () => {
        expect(Left.of(99).join()).toEqual(99);
    });
});

describe('`isLeft`', () => {
    test('should return `true` when value is a `Left`', () => {
        [Left.of(), new Left(), Left.of()].forEach(x => {
            expect(isLeft(x)).toEqual(true);
        });
    });
    test('should return `false` when a value is not a `Left`', () => {
        [false, 0, (): void => null, [], {}].forEach(x => {
            expect(isLeft(x)).toEqual(false);
        });
    });
});

describe('#Right', () => {
    test('should return an instance of `Right`', () => {
        expect(new Right() instanceof Right).toEqual(true);
    });
    test('should be extendable', () => {
        class Hello<T> extends Right<T> {
        }

        expect(new Hello()).toBeInstanceOf(Right);
    });

    ((): void => {
        const right = Right.of();
        methodNames.forEach(methodName => {
            it(`#Left.${methodName} instanceof Function === true`, function () {
                expect(right[methodName]).toBeInstanceOf(Function);
            });
        });
    })();

    test('Expect `map`, `flatMap`, and `join` methods to return a new instance of `Right`', () => {
        const right = Right.of('Only right');
        // expect(Right.of(right).join()).toBeInstanceOf(Right);
        expect(right.map(x => x)).toBeInstanceOf(Right);
        expect(right.flatMap(x => Right.of(x))).toBeInstanceOf(Right);
    });
    test('Expect calling `ap` on a `#Right` to return containing value of `Right`', () => {
        const value = 'Hello World',
            right = Right.of(value);
        right.ap(Right.of('99')).map(x => expect(x).toEqual(value));
    });
});

describe('`isRight`', () => {
    test('should return `true` when value is a `Right`', () => {
        [Right.of(), new Right(), Right.of()].forEach(x => {
            expect(isRight(x)).toEqual(true);
        });
    });
    test('should return `false` when a value is not a `Right`', () => {
        [false, 0, (): void => null, [], {}].forEach(x => {
            expect(isRight(x)).toEqual(false);
        });
    });
});

describe('#either', () => {
    const successMessage = 'Success message.',
        errorMessage = 'Error message.',
        testCaseValues = [null, undefined, 0, '', false,
            'a', 99, true, {}, [], (): void => undefined],
        testCases = [].concat(
            testCaseValues.map(x => [toRight(x), successMessage]),
            testCaseValues.map(x => [toLeft(x), errorMessage]),
            [
                [toRight(), successMessage],
                [toLeft(), errorMessage]
            ]);
    test('should return an `Either`', () => {
        testCases.forEach(([arg, expected]) => {
            const result = either(() => errorMessage, () => successMessage, arg),
                result2 = either(x => x, x => x, arg);
            expect(result).toEqual(expected);
            return [arg, expected, result, result2];
        });
    });
});

