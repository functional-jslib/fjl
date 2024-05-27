import {numRange} from "./numRange";

const {stringify} = JSON;

describe('#numRange', () => {
  (<[Parameters<typeof numRange>, number[]][]>[
    [[], [0, 1]],
    [[-3, 0], [-3, -2, -1, 0]],
    [[-4, 2, 2], [-4, -2, 0, 2]]
  ])
    .forEach(([args, expectedCollected]) => {
      it(`numRange(${stringify(args)}) collects to ${stringify(expectedCollected)}`, () => {
          expect(Array.from(numRange(...args))).toEqual(expectedCollected);
      });
    });
});
