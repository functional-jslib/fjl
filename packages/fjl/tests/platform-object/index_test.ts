import {TypeConstructor} from "../../src/types";
import {instanceOf} from "../../src/_platform/object";

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
            it( `instanceOf(${JSON.stringify(x)}, ${Type.name}) === ${expected}`, () => {
                expect(instanceOf(x, Type)).toEqual(expected);
            });
        });
});
