import {vowelsArray} from "../helpers";
import {$take, take} from "../../src/list/take";

const {stringify} = JSON;

describe('#take, #$take', () => {
  type TakeTest = [[number, string | any[]], string | any[]];
  type TakeTestCases = Array<TakeTest>;
  (<TakeTestCases>[
    [[0, []], []],
    [[1, []], []],
  ]).concat(
    (<TakeTestCases>vowelsArray.map((_, ind) => [
      [ind, vowelsArray],
      vowelsArray.slice(0, ind)
    ])),
  )
    .forEach(([args, expected]) => {
      it(`take(${stringify(args)}) === ${stringify(expected)}`, () => {
        expect(take(...args)).toEqual(expected);
        expect($take(args[0])(args[1])).toEqual(expected);
      });
    });

  [null, undefined, 0, {}].forEach(x => {
    it(`should throw an error when: \`take(3, ${x + ''})\``, () => {
      expect(() => take(3, x as Iterable<any>)).toThrow()
      expect(() => $take(3)(x as Iterable<any>)).toThrow()
    })
  });
});
