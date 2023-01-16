import {TypeConstructor} from "../../src/types";
import {instanceOf} from "../../src/platform/object";

describe('#instanceOf', () => {
    (<[any, TypeConstructor, boolean][]>[
        [() => undefined, Function, true],
        [[], Array, true],
        [{}, Object, true],
        ['', String, true],
        [new String('hello'), String, true],
        [0, Number, true],
        [new Number(0), Number, true],
        [true, Boolean, true],
        [99, Boolean, false],
    ])
        .forEach(([x, Type, expected]) => {
            it( `instanceOf(${Type.name}, ${JSON.stringify(x)}) === ${expected}`, () => {
                expect(instanceOf(Type, x)).toEqual(expected);
            });
        });
});
