import {group} from "../../src/list/group";
import {vowelsArray, vowelsString} from "../helpers";

const {stringify} = JSON;

describe(`#group`, () => {
  const mississippi = 'Mississippi',
    mississippiArray = mississippi.split(''),
    mississippiResult = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];

  // Run tests
  (<[Parameters<typeof group>, ReturnType<typeof group>][]>[
    [[''], []],
    [[[]], []],
    [[null], []],
    [[undefined], []],
    [[vowelsArray], vowelsArray.map(x => [x])],
    [[vowelsString], vowelsArray],
    [[mississippi], mississippiResult.map(xs => xs.join(''))],
    [[mississippiArray], mississippiResult]
  ]).forEach(([[xs], expected]) => {
    it(`group(${stringify(xs?.valueOf())}) === ${stringify(expected)}`, () => {
      expect(group(xs)).toEqual(expected);
    });
  });
});
