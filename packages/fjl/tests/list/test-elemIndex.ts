import {elemIndex} from "../../src/list/elemIndex";
import {Slice} from "../../src/platform/slice";
import {vowelsArray, vowelsString} from "../helpers";

type TestCaseTuple = [[string, Slice<string>], number | undefined];
describe('#elemIndex', () => {
  (<TestCaseTuple[]>[
    [[vowelsArray, ''], undefined],
    [[vowelsArray, 'x'], undefined],
    [[vowelsString, 'y'], undefined],
    [[vowelsString, 'z'], undefined],
  ].concat(
    vowelsArray.map((x, i, xs): [[string, string], any] => {
      const revIndex: number = xs.length - (i + 1),
        searchStr = xs.slice(revIndex, xs.length).join('');
      return [[vowelsString, searchStr], revIndex];
    })
  ))
    .forEach(([args, expected]) => {
      it(`elemIndex("${args.join('", "')}") === ${expected}`, () => {
        expect(elemIndex(...args)).toEqual(expected);
      });
    })
});
