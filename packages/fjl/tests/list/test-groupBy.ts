import {alphabetArray, equal, vowelsArray, vowelsString} from "../helpers";
import {GroupBy, groupBy} from "../../src";

describe('#groupBy', () => {
  const mississippi = 'Mississippi',
    mississippiArray = mississippi.split(''),
    mississippiResult = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];
  (<[Parameters<GroupBy>, ReturnType<GroupBy>][]>[
    [[equal, ''], []],
    [[equal, []], []],
    [[equal, null], []],
    [[equal, undefined], []],
    [[equal, vowelsArray], vowelsArray.map(x => [x])],
    [[equal, vowelsString], vowelsArray],
    [[equal, mississippi], mississippiResult.map(xs => xs.join(''))],
    [[equal, mississippiArray], mississippiResult],
    [[equal, alphabetArray], alphabetArray.map(char => [char])]
  ]).forEach(([[pred, xs], expected]) => {
    it(`groupBy(${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
      expect(groupBy(pred, xs)).toEqual(expected);
    });
  });
});

describe('#groupBy - Haskell parity', () => {
  const range = (a: number, b: number) => Array.from({length: b - a + 1}, (_, i) => a + i);

  it('should check items against the first item of the group, not the previous item', () => {
    expect(groupBy((a: number, b: number) => b - a < 5, range(0, 19)))
      .toEqual([range(0, 4), range(5, 9), range(10, 14), range(15, 19)]);
    expect(groupBy((a: number, b: number) => a !== b, [1, 1, 1, 2, 3, 1, 4, 4, 5]))
      .toEqual([[1], [1], [1, 2, 3], [1, 4, 4, 5]]);
    expect(groupBy((a: number, b: number) => a > b, [1, 3, 5, 1, 4, 2, 6, 5, 4]))
      .toEqual([[1], [3], [5, 1, 4, 2], [6, 5, 4]]);
    expect(groupBy((_: boolean, b: boolean) => !b, [true, false, true, false, false, false, true]))
      .toEqual([[true, false], [true, false, false, false], [true]]);
  });
});
