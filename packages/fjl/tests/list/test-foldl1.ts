import {length} from "../../src/platform/object";
import {expectEqual} from "../helpers";
import {foldl1} from "../../src/list/foldl1";
import {Slice} from "../../src/platform/slice";

describe('#foldl1', () => {
  it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', () => {
    const phrase = 'hello world',
      phraseLen = length(phrase),
      phraseIndCount = phraseLen - 1,
      getAppendage = ind => parseInt(ind, 10) < phraseIndCount ? '|' : '',
      expectedTransform = phrase.split('').map((x, ind) => x + getAppendage(ind));
    expectEqual(
      foldl1((agg, item, ind) => {
        agg += getAppendage(ind) + item;
        return agg;
      }, phrase as unknown as Slice<string>),
      expectedTransform.join('')
    );
    expectEqual(
      foldl1((agg, item) => agg + item, [1, 2, 3, 4, 5]),
      15
    );
    expectEqual(
      foldl1((agg, item) => agg * item, [1, 2, 3, 4, 5]),
      120
    );
    expectEqual(
      foldl1((agg, item, ind) => {
        agg += getAppendage(ind) + item;
        return agg;
      }, phrase.split('')),
      expectedTransform.join('')
    );
  });
  it('should return the zero value when an empty list is passed in', () => {
    expectEqual(foldl1((agg, item) => agg + item, []), undefined);
  });
});
