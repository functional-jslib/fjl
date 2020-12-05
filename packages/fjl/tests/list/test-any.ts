import {any} from "../../src/list/any";

describe('#any', () => {
  const predicateToTest = <T>(x: T): boolean => !!x;

  (<[boolean[], boolean][]>[
    [[], false],
    [[false, false], false],
    [[true, false], true],
    [[false, true], true],
    [[true, true], true],
  ])
    .forEach(([xs, expected]) => {
      it(`any(${predicateToTest}, ${JSON.stringify(xs)}) === ${expected}`, () => {
        const rslt = any(predicateToTest, xs);
        expect(rslt).toEqual(expected);
      });
    });
});
