import {alphabetArray, alphabetCharCodeRange, vowelCharCodes, vowelsArray} from "../helpers";
import {concatMap} from "../../src/list/concatMap";
import {id} from "../../src";

describe('#concatMap', () => {
  const charCodeToCharOp = (charCode: number) => String.fromCharCode(charCode);

  (<[Parameters<typeof concatMap>, ReturnType<typeof concatMap>][]>[
    [[id, []], []],
    [[id, [], [], []], []],
    [[charCodeToCharOp, vowelCharCodes.map(c => [c])], vowelsArray]
  ])
    .forEach(([args, expected]) => {
      it(`concatMap(${args[0].name}, ${JSON.stringify(args[1])}) === ` +
        `${JSON.stringify(expected)}`, function () {
        const result = concatMap(...args);
        expect(result).toEqual(expected);
      });
    });

  it('should throw an error when receiving `undefined` or `null` in it\'s list position', () => {
    expect(() => concatMap(id, null)).toThrow();
    expect(() => concatMap(id, undefined)).toThrow();
  });
});
