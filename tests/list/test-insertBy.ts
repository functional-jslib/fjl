import {genericOrdering, vowelsArray, vowelsString} from "../helpers";
import {SliceOf} from "../../src/jsPlatform/slice";
import {insertBy} from "../../src/list/insertBy";
import {OrderingFunc} from "../../src/list/utils";

const toJson = JSON.stringify;

describe(`#list.insertBy`, () => {
    (<[[OrderingFunc<any>, any, SliceOf<any>], SliceOf<any>][]>[
        [[genericOrdering, 'a', ''], 'a'],
        [[genericOrdering, 'a', []], ['a']]
    ]
        .concat(
            vowelsArray.flatMap((x, i) => [
                    [[genericOrdering, x, vowelsArray],
                        vowelsArray
                            .slice(0, i)
                            .concat([x], vowelsArray.slice(i))
                    ],
                    [[genericOrdering, x, vowelsString],
                        vowelsString.substring(0, i) +
                        x + vowelsString.substring(i, vowelsString.length)
                    ],
                ]
            )
        ))
        .forEach(([args, expected]) => {
            it(`insert(${toJson(args)}) === ${toJson(expected)}`, () => {
                expect(insertBy(...args)).toEqual(expected);
            });
        });
});
