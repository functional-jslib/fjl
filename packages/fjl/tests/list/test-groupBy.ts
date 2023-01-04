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
