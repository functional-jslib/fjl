import {TypeConstructor} from "../../src/types";
import {instanceOf} from "../../src/platform/object";

describe('#instanceOf', () => {
    (<[any, TypeConstructor, boolean][]>[
        [() => undefined, Function, true],
        [[], Array, true],
        [{}, Object, true],
        ['', String, false],
        [0, Number, false],
        [true, Boolean, false],
    ])
        .forEach(([x, Type, expected]) => {
            it( `instanceOf(${Type.name}, ${JSON.stringify(x)}) === ${expected}`, () => {
                expect(instanceOf(Type, x)).toEqual(expected);
            });
        });
});
