import {just, isJust, Just, Nothing, nothing, isNothing, Maybe} from './maybe';
import {all} from '../list/all';
import {map} from '../list/map';
import {falsyList} from "../utils/test-utils";
import {left, Left} from "./either";
import {join} from './monad';

const methodNames = ['ap', 'map', 'flatMap', 'join'];

const containsMethods = <T>(x: Maybe<T>, methodNames_: string[]): void => {
    methodNames_.forEach(methodName => {
        it(`#${x.constructor.name}.${methodName} instanceof Function === true`, function () {
            expect(left[methodName]).toBeInstanceOf(Function);
        });
    });
}

describe('#just', () => {
    it('should be a method', () => {
        expect(just).toBeInstanceOf(Function);
    });
    it('should always return an `Just` which should contain passed in value', () => {
        [null, undefined, false, 0, (): void => undefined, [], {}, '']
            .forEach(x => {
                const result = just(x);
                expect(result).toBeInstanceOf(Just);
                expect(result.value).toEqual(x);
            });
    });
});

describe('#isJust', () => {
    [
        [new Just(), true],
        [Just.of(), true],
        ...(falsyList.map(x => ([x, false])))
    ]
        .forEach(([x, expected]) => {
            expect(isJust(x)).toEqual(expected);
        });
});

describe('#Just', () => {

    test('Should be constructable', () => {
        expect(new Just()).toBeInstanceOf(Just);
    });

    test('Should contain passed in value on construction', () => {
        expect(new Just(99).valueOf()).toEqual(99);
    });

    test('should be extendable', () => {
        class Hello<T> extends Just<T> {
        }

        expect(new Hello()).toBeInstanceOf(Just);
    });

    containsMethods(new Just(99), methodNames);
});

describe('#Just.of', () => {
    test('should be a static method', () => {
        expect(Just.of instanceof Function).toEqual(true);
    });
    test('should return an instance when called', () => {
        expect(Just.of() instanceof Just).toEqual(true);
    });
    test('should return an instance with passed in value captured in returned instance', () => {
        expect((Just.of(99)).valueOf()).toEqual(99);
    });
});

describe('#Just.valueOf', () => {
    test('should return contained value of container (`undefined` or whatever was passed ' +
        'on construction of container)', () => {
        [new Just(99), Just.of(99)].forEach(x => {
            expect(x.valueOf()).toEqual(99);
        });
        [new Just(), Just.of()].forEach(x => {
            expect(x.valueOf()).toEqual(undefined);
        });
        console.log(new Just(new Just(99)));
    });
});

describe('#Just.join', () => {
    test('should remove one layer of monadic structure from container', () => {
        (<[Maybe<any>, any][]>[
            [just(), undefined],
            [just(null), null],
            [just(false), false],
            [just(''), ''],
            [just(99), 99],
            [just(just(99)), just(99)],
            [just(just(just(99))), just(just(99))],
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
            justResult = Just.of(control).map(op);
        expect(justResult instanceof Just).toEqual(true);
        map(
            x => expect(x).toEqual(op(control)),
            justResult
        );
    });
    test('should throw an error when receiving anything other than a function as it\'s parameter', () => {
        expect(() => Just.of(99).map(null)).toThrow(Error);
    });
});

describe('#Just.flatMap', () => {
    test('should return an instance of `Just` after `flatMap` operation', () => {
        const control = 99,
            op = x => x * 2,
            justResult = Just.of(control).flatMap(op);
        expect(justResult instanceof Just).toEqual(true);
        map(
            x => expect(x).toEqual(op(control)),
            justResult
        );
    });
    test('should throw an error when receiving anything other than a function as it\'s parameter', () => {
        expect(() => Just.of(99).flatMap(null)).toThrow(Error);
    });
});

describe('#Just.ap', () => {
    test('should map contained value over passed in functor', () => {
        const op = x => x * 2;
        Just.of(op)
            .ap(Just.of(() => 2))
            .map(x => expect(x).toEqual(op(2)));
    });
    test('should be able to map contained value over functor even if it is not a ' +
        'function (call should internally wrap non-function values in functions', () => {
        Just.of()
            .ap(Just.of(99))
            .map(x => expect(x).toEqual(undefined));
    });
});

describe('#isNothing', () => {
    test('should return `true` when a value is of type `Nothing`', () => {
        [nothing(), new Nothing(), Nothing.of()].forEach(x => {
            expect(isNothing(x)).toEqual(true);
        });
    });
    test('should return `false` when a value is not a `Nothing`', () => {
        [false, 0, (): {} => ({}), [], {}].forEach(x => {
            expect(isNothing(x)).toEqual(false);
        });
    });
});

describe('#Nothing', () => {
    test('Should return singleton instance of `Nothing` whenever called with `new`', () => {
        expect(new Nothing() === new Nothing()).toEqual(true);
    });

    test('Should return singleton instance when called as a function', () => {
        expect(nothing() === nothing() && nothing() === new Nothing())
            .toEqual(true);
    });

    test('Should return singleton instance when called with via static factory (`of`)', () => {
        expect(Nothing.of() === Nothing.of() && Nothing.of() === new Nothing())
            .toEqual(true);
    });

    test('Expect calling `Nothing` as a function, with `new` keyword, or via static `of` method, to all ' +
        'equate to same singleton instance of `Nothing`', () => {
        const instance = nothing();
        [nothing(), new Nothing(), Nothing.of()]
            .forEach(naught => expect(naught).toEqual(instance));
    });

    test('Expect it to be extendable via es6 `class` syntax', () => {
        class Hello extends Nothing {
            constructor(something?: any) {
                super(something);
            }
        }

        expect(new Hello() === new Nothing()).toEqual(true);
    });

    test('Expect `map`, `ap`, `flatMap`, and `join` methods to exist', () => {
        const instance = nothing();
        methodNames.forEach(name => expect(instance[name]).toBeInstanceOf(Function));
    });

    test('Expect `map`, `ap`, `flatMap`, and `join` methods to all return same singleton instance of `Nothing`', () => {
        const instance = nothing();
        expect(
            all(
                result => result === instance,
                map(methodName => instance[methodName](), methodNames)
            )
        )
            .toEqual(true);
    });
});
