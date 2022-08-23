import {group} from "../../src/list/group";
import {vowelsArray, vowelsString} from "../helpers";
import {Slice} from "../../src/types/data";

describe(`#group`, () => {
  const mississippi = 'Mississippi',
    mississippiArray = mississippi.split(''),
    mississippiResult = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];
    (<[Slice<any>, Slice<any>[]][]>[
        [vowelsArray, vowelsArray.map(x => [x])],
        [vowelsString, vowelsArray.map(x => [x])],
        [mississippi, mississippiResult],
        [mississippiArray, mississippiResult]
    ]).forEach(([xs, expected]) => {
        it(`group(${JSON.stringify(xs)}) === ${JSON.stringify(expected)}`, () => {
            expect(group(xs)).toEqual(expected);
        });
    });
});

