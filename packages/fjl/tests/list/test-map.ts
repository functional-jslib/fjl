import {expectError, vowelsArray, vowelsString} from "../helpers";
import {map} from "../../src/list/map";
import {Indexable, FunctorMapFn, Slice} from "../../src/types";

describe('#map', () => {
  const addCharA = char => char + 'a';

  it('should be able to map a function over a list.', () => {
    const vowelsObj = vowelsArray.reduce((agg, x, ind) => {
        agg[ind] = x;
        return agg;
      }, {} as Indexable),

      augmentedVowelsObj = vowelsArray.reduce((agg, x, ind) => {
        agg[ind] = x + 'a';
        return agg;
      }, {} as Indexable),

      _id = <T>(x: T): T => x;

    (<[FunctorMapFn<any>, Slice<any>, Slice<any>][]>[
      [addCharA, vowelsArray, vowelsArray.map(addCharA)],
      [addCharA, vowelsString, vowelsString.split('').map(addCharA).join('')],
      [addCharA, vowelsObj, augmentedVowelsObj],
      [_id, [], []],
      [_id, '', ''],
      [_id, {}, {}],
      [_id, [undefined], [undefined]]
    ])
      .forEach(([fn, list, expected]) => {
        expect(map(fn, list)).toEqual(expected);
      });
  });

  it('should throw an error when incoming value is not a functor instance', () => {
    expectError(() => map(x => x, null as unknown as Slice));
    expectError(() => map(x => x, undefined as unknown as Slice)); // curried so requires second parameter (even if undefined).
  });
});
