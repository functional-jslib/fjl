import {alphabetArray} from "../helpers";
import {intersperse} from "../../src/list/intersperse";

describe('#intersperse', () => {
  type Intersperse = typeof intersperse;
  (<[Parameters<Intersperse>, ReturnType<Intersperse>][]>[
    [[',', alphabetArray], alphabetArray.join(',').split('')],
    [[',', ['a']], ['a']],
    [['', []], []]
  ])
    .forEach(([args, expected]) => {
      it('', () => {
        const rslt = intersperse(...args);
        expect(rslt).toEqual(expected);
      });
    });
});
