import {elemIndex} from "../../src/list/elemIndex";
import {vowelsArray} from "../helpers";

describe('#elemIndex', () => {
  type ElemIndex = typeof elemIndex;

  (<[Parameters<ElemIndex>, ReturnType<ElemIndex>][]>[
    [[vowelsArray, ''], undefined],
    [[vowelsArray, 'x'], undefined],
  ])
    .forEach(([args, expected]) => {
      it(`elemIndex("${args.join('", "')}") === ${expected}`, () => {
        expect(elemIndex(...args)).toEqual(expected);
      });
    })
});
