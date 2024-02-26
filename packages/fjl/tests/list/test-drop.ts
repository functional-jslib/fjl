import {vowelsArray} from "../helpers";
import {drop, $drop} from "../../src";

const {stringify} = JSON;

describe('#drop, #$drop', () => {
  (<[Parameters<typeof drop>, any[]][]>[
    [[0, []], []],
    [[1, []], []],
  ].concat(
    vowelsArray
      .map((_, ind) => [
        [ind, vowelsArray],
        vowelsArray.slice(ind)
      ])
  ))
    .forEach(([args, expected]) => {
      it(`drop(${stringify(args)}) === ${stringify(expected)}`, () => {
        expect(drop(...args)).toEqual(expected);
        expect($drop(args[0])(args[1])).toEqual(expected);
      });
    });

  (<any[]>[null, undefined, 0, {}]).forEach(xs => {
    it(`should throw when: drop(3, ${xs + ''})`, () => {
      expect(() => drop(3, xs)).toThrow();
      expect(() => $drop(3)(xs)).toThrow();
    });
  });
});
