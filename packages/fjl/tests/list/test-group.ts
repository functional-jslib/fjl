import {group} from "../../src/list/group";
import {vowelsArray, vowelsString} from "../helpers";

describe(`#group`, () => {
  const mississippi = 'Mississippi',
    mississippiArray = mississippi.split(''),
    mississippiResult = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];
    (<[Parameters<typeof group>, ReturnType<typeof group>][]>[
      [[vowelsArray], vowelsArray.map(x => [x])],
      [[vowelsString], vowelsArray],
      [[mississippi], mississippiResult.map(xs => xs.join(''))],
      [[mississippiArray], mississippiResult]
    ]).forEach(([[xs], expected]) => {
        it(`group(${JSON.stringify(xs.valueOf())}) === ${JSON.stringify(expected)}`, () => {
            expect(group(xs)).toEqual(expected);
        });
    });
});
