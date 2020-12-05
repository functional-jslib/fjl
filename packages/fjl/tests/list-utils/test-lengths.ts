import {alphabetArray, alphabetString, vowelsArray, vowelsString} from "../helpers";
import {lengths} from "../../src/list/utils";
import {SliceOf} from "../../src/platform/slice";

describe('#lengths', () => {
    (<[SliceOf<any>[], number[]][]>[
        (vowelsArray.reduce((agg, c, i) => {
            agg[0].push(vowelsArray.slice(0, i + 1))
            agg[1].push(i + 1);
            return agg;
        }, [[[]], [0]])),
    ])
        .forEach(([xss, expected]) => {
            it(`lengths(${JSON.stringify(xss)} === ${JSON.stringify(expected)}`, () => {
                const rslt = lengths(...xss);
                expect(rslt).toEqual(expected);
            });
        });
});
