import {length} from "../../src/list/length";
import {foldl1} from "../../src/list/foldl1";

describe('#foldl1', () => {
  it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', () => {
    const phrase = 'hello world',
      phraseLen = length(phrase),
      phraseIndCount = phraseLen - 1,
      getAppendage = ind => parseInt(ind, 10) < phraseIndCount ? '|' : '',
      expectedTransform = phrase.split('').map((x, ind) => x + getAppendage(ind));
    expect(
      foldl1((agg, item, ind) => {
        agg += getAppendage(ind) + item;
        return agg;
      }, phrase.split(''))
    )
      .toEqual(expectedTransform.join(''));
    expect(
      foldl1((agg, item) => agg + item, [1, 2, 3, 4, 5])
    )
      .toEqual(15);
    expect(
      foldl1((agg, item) => agg * item, [1, 2, 3, 4, 5])
    )
      .toEqual(120);
  });
  it('should return `undefined` when an empty list is passed in', () => {
    expect(foldl1((agg, item) => agg + item, [])).toEqual(undefined);
  });
});
