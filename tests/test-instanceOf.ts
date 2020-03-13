import {TypeConstructor} from "../src/types";
import instanceOf from "../src/jsPlatform/object/instanceOf";

describe('#instanceOf', () => {
    it('should have more tests', () => {
        (<[any, TypeConstructor, boolean][]>[
            [() => undefined, Function, true],
            [[], Array, true],
            [{}, Object, true],
            ['', String, false],
            [0, Number, false],
            [true, Boolean, false],
        ])
            .forEach(([x, Type, expected]) => {
                expect(instanceOf(Type, x)).toEqual(expected);
            });
    });
});
