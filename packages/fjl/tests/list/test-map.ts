import {expectError, vowelsArray} from "../helpers";
import {map} from "../../src/list/map";
import {ConstructableType} from "../../src/types";

describe('#map', () => {
  const addCharA = char => char + 'a',

    _id = <T>(x: T): T => x,

    newFilledArrType = (Type: ConstructableType, len = 0, fillWith = null) =>
      new Type(len).fill(0, len, fillWith),

    {stringify} = JSON;

  (<[Parameters<typeof map>, ReturnType<typeof map>][]>[
    [[addCharA, vowelsArray], vowelsArray.map(addCharA)],
    [[_id, newFilledArrType(Uint8Array, 5)], newFilledArrType(Uint8Array, 5)],
    [[_id, []], []],
    [[_id, newFilledArrType(Uint8Array, 0)], newFilledArrType(Uint8Array, 0)],
    [_id, [undefined], [undefined]]
  ])
    .forEach(([args, expected]) => {
      it(`map(${args.map(arg => stringify(arg)).join(', ')}) == ${stringify(expected)}`, function () {
        expect(map(...args)).toEqual(expected);
      });
    })

  it('should throw an error when array like parameters is not set', () => {
    expectError(() => map(x => x, null));
    expectError(() => map(x => x, undefined));
  });
});
