import {elemIndex} from "../../list/elemIndex";
import {SliceOf} from "../../platform/slice";
import {vowelsArray, vowelsString} from "../helpers";

type TestCaseTuple = [[string, SliceOf<string>], number | undefined];
describe('#elemIndex', () => {
    (<TestCaseTuple[]>[
        [['', vowelsArray], undefined],
        [['x', vowelsArray], undefined],
        [['y', vowelsString], undefined],
        [['z', vowelsString], undefined],
    ].concat(
        vowelsArray.map((x, i, xs): [[string, string], any] => {
            const revIndex: number = xs.length - (i + 1),
                searchStr = xs.slice(revIndex, xs.length).join('');
            return [[searchStr, vowelsString], revIndex];
        })
    ))
        .forEach(([args, expected]) => {
            it(`elemIndex("${args.join('", "')}") === ${expected}`, () => {
                expect(elemIndex(...args)).toEqual(expected);
            });
        })
});
