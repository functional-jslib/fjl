import {Slice} from "../../src/platform/slice";
import {indexOf} from "../../src/platform/slice";
import {vowelsArray, vowelsString} from "../helpers";

describe(`#list.indexOf`, () => {
  (<[[any, Slice<any>], number][]>[
    [[vowelsArray, ''], -1],
    [[vowelsString, ''], 0], // @todo add this use case to docs
    [[vowelsArray, 'z'], -1],
    [[vowelsString, 'z'], -1]
  ].concat(
    vowelsArray.flatMap((x, i) => [
      [[vowelsString, x], i],
      [[vowelsArray, x], i]
    ])
  ))
    .forEach(([args, expected]) => {
      it(`indexOf(${args[0]}, ${args[1]}) === ${expected}`, () => {
        expect(indexOf(...args)).toEqual(expected);
      });
    });
});
