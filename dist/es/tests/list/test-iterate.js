import { iterate } from "../../packages/list/iterate";
describe('#iterate', () => {
    it('should have expected results for given argument sets', () => {
        [
            [5, (a) => a + 1, 5, [5, 6, 7, 8, 9]],
            [5, (a) => a * 2, 5, [5, 10, 20, 40, 80]],
        ]
            .forEach(([numRepeat, op, startValue, expectedResult]) => {
            const result = iterate(numRepeat, op, startValue);
            expect(result[0]).toEqual(startValue); // startValue should be inserted first
            expect(result).toEqual(expectedResult);
        });
    });
});
//# sourceMappingURL=test-iterate.js.map