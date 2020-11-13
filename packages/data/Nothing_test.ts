import Nothing, {nothing, isNothing} from './Nothing';
import {all} from '../list/all';
import {map} from '../list/map';

const methodNames = ['ap', 'map', 'flatMap', 'join'];

describe('`isNothing`', () => {
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
        expect(
            all(
                nothing1 => instance === nothing1,
                [nothing(), new Nothing(), Nothing.of()]
            )
        )
            .toEqual(true);
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
        expect(
            all(methodName =>
                    (instance[methodName] instanceof Function),
                methodNames
            )
        )
            .toEqual(true);
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