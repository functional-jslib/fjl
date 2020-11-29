import {expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";
import {take} from "../../list/take";

describe('#take', () => {
    it('should return taken items from list and/or string until limit', () => {
        type TakeTest = [[number, string | any[]], string | any[]];
        type TakeTestCases = Array<TakeTest>;
        (<TakeTestCases>[
            [[0, ''], ''],
            [[0, []], []],
            [[1, ''], ''],
            [[1, []], []],
        ]).concat(
            (<TakeTestCases>vowelsArray
                .map((_, ind) => [
                    [ind, vowelsArray],
                    vowelsArray.slice(0, ind)
                ])),
            (<TakeTestCases>vowelsString.split('')
                .map((_, ind) => [
                    [ind, vowelsString],
                    vowelsString.slice(0, ind)
                ]))
        )
            .forEach(([args, expected]) => {
                expectEqual(take(...args), expected);
            });
    });
    it('should throw an error when no parameter is passed in', () => {
        [null, undefined, 0, {}].forEach(x =>
            expectError(() => take(3, x))
        );
    });
});
