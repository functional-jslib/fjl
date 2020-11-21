import instanceOf from "../../../packages/platform/object/instanceOf";
describe('#instanceOf', () => {
    it('should have more tests', () => {
        [
            [() => undefined, Function, true],
            [[], Array, true],
            [{}, Object, true],
            ['', String, false],
            [0, Number, false],
            [true, Boolean, false],
        ]
            .forEach(([x, Type, expected]) => {
            expect(instanceOf(Type, x)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-instanceOf.js.map