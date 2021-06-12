// @todo remove library methods as testing utilities here (namely 'reverse').

import {expectEqual, expectError, vowelsArray, vowelsLen, vowelsString} from "../helpers";
import {reverse} from "../../src/list/reverse";
import {foldr} from "../../src/list/foldr";

describe('#foldr', () => {
  it('should fold a `Foldable` (list, etc.) into some value', () => {
    const vowelsStringIndCount = vowelsLen - 1,
      getAppendage = ind => parseInt(ind, 10) !== vowelsStringIndCount ? '|' : '',
      expectedTransform = reverse(vowelsArray.map((x, ind) => x + getAppendage(ind))) as string[];
    expectEqual(
      foldr((agg, item, ind) => {
        agg += item + getAppendage(ind);
        return agg;
      }, '', vowelsString),
      expectedTransform.join('')
    );
    expectEqual(
      foldr((agg, item: number) => agg + item, 0, [1, 2, 3, 4, 5]),
      15
    );
    expectEqual(
      foldr((agg, item: number) => agg * item, 1, [1, 2, 3, 4, 5]),
      120
    );
    expectEqual(
      foldr((agg, item, ind) => {
        agg.push(item + getAppendage(ind));
        return agg;
      }, [], vowelsArray),
      expectedTransform
    );
  });
  it('should return the zero value when an empty list is passed in', () => {
    expectEqual(foldr((agg, item) => agg + item, 'a', ''), 'a');
    expectEqual(foldr((agg: string, item) => agg + item, '', ''), '');
  });
  it('should throw an error when `null` or `undefined` are passed in as the list', () => {
    expectError(() => foldr((agg, item) => agg + item, 'a', null));
    expectError(() => foldr((agg, item) => agg + item, 'a', undefined));
  });
});
