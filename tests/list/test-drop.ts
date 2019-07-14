import {expectEqual, expectError, vowelsArray, vowelsString} from "../helpers";
import {drop} from "../../src/list";

describe('#drop', () => {
    it('should return a new list/string with dropped items from original until limit', () => {
        type DropTest = [[number, string | any[]], string | any[]];
        type DropTestCases = Array<DropTest>;
        (<Array<[[number, string | any[]], string | any[]]>>[
            [[0, ''], ''],
            [[0, []], []],
            [[1, ''], ''],
            [[1, []], []],
        ]).concat(
            (<DropTestCases>vowelsArray
                .map((_, ind) => [
                    [ind, vowelsArray],
                    vowelsArray.slice(ind)
                ])),
            (<DropTestCases>vowelsString.split('')
                .map((_, ind) => [
                    [ind, vowelsString],
                    vowelsString.slice(ind)
                ]))
        )
            .forEach(([args, expected]) => {
                expectEqual(drop(...args), expected);
            });
    });
    it('should throw an error when no parameter is passed in', () => {
        [null, undefined, 0, {}].forEach(x =>
            expectError(() => drop(3, x))
        );
    });
});
