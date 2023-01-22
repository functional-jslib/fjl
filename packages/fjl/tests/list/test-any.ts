import {$any, any} from "../../src/list/any";

describe('#any,$any', () => {
  const predicateToTest = <T>(x: T): boolean => !!x;

  (<[boolean[], ReturnType<typeof any>][]>[
    [[], false],
    [[false], false],
    [[true], true],
    [[false, false], false],
    [[true, false], true],
    [[false, true], true],
    [[true, true], true],
  ])
    .forEach(([xs, expected]) => {
      it(`any(${predicateToTest}, ${JSON.stringify(xs)}) === ${expected}`, () => {
        const rslt = any(predicateToTest, xs);
        const rslt2 = $any(predicateToTest)(xs);
        expect(rslt).toEqual(expected);
        expect(rslt2).toEqual(expected);
      });
    });
});
