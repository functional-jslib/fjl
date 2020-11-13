import {SliceOf} from "../../packages/platform/slice";
import {indexOf} from "../../packages/platform/slice";
import {vowelsArray, vowelsString} from "../helpers";

describe(`#list.indexOf`, () => {
    (<[[any, SliceOf<any>], number][]>[
        [['', vowelsArray], -1],
        [['', vowelsString], 0], // @todo add this use case to docs
        [['z', vowelsArray], -1],
        [['z', vowelsString], -1]
    ].concat(
        vowelsArray.flatMap((x, i) => [
            [[x, vowelsString], i],
            [[x, vowelsArray], i]
        ])
    ))
        .forEach(([args, expected]) => {
            it(`indexOf(${args[0]}, ${args[1]}) === ${expected}`, () => {
                expect(indexOf(...args)).toEqual(expected);
            });
        });
});
