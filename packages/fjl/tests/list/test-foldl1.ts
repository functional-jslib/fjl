import {foldl1} from "../../src/list/foldl1";
import {nums1To10} from "../helpers";

describe('#foldl1', () => {
  const add = (a, b) => a + b;

  (<[string, Parameters<typeof foldl1>, ReturnType<typeof foldl1>][]>[
    ['Empty string', [add, ''], undefined],
    ['Empty array', [add, []], undefined],
    ['Non empty string', [add, nums1To10.join('')], nums1To10.join('')],
    ['Non empty array', [add, nums1To10], nums1To10.reduce(add)],
  ])
    .forEach(([testName, args, expected]) => {
      it(`${testName}\nfoldl1(${JSON.stringify(args)}) === ${JSON.stringify(expected)}`, () => {
        const rslt = foldl1(...args);
        expect(rslt).toEqual(expected);
      });
    });
});
