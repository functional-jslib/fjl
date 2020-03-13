import {UnaryOf} from "../../src/types";
import {iterate} from "../../src/list/iterate";

type Num = number;

describe('#iterate', () => {
    it('should have expected results for given argument sets', () => {
        (<[Num, UnaryOf<Num, Num>, Num, Num[]][]>[
            [5, (a): Num => a + 1, 5, [5, 6, 7, 8, 9]],
            [5, (a): Num => a * 2, 5, [5, 10, 20, 40, 80]],
        ])
            .forEach(([numRepeat, op, startValue, expectedResult]) => {
                const result = iterate(numRepeat, op, startValue);
                expect(result[0]).toEqual(startValue); // startValue should be inserted first
                expect(result).toEqual(expectedResult);
            });
    });
});
