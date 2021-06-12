// @todo remove library methods as testing utilities here (namely 'reverse').
import {expectEqual, vowelsArray, vowelsLen, vowelsString} from "../helpers";
import {reverse} from "../../src/list/reverse";
import {foldr1} from "../../src/list/foldr1";

describe('#foldr1', () => {
  it('should fold a `Foldable` (list, etc.) into some value with no starting point value passed in.', () => {
    const vowelsStringIndCount = vowelsLen - 1,
      getAppendage = ind => parseInt(ind, 10) !== vowelsStringIndCount ? '|' : '',
      expectedTransform = reverse(vowelsArray.map((x, ind) => x + getAppendage(ind))) as string[];
    expectEqual(
      foldr1((agg, item, ind) => {
        agg += item + getAppendage(ind);
        return agg;
      }, vowelsString),
      expectedTransform.join('')
    );
    expectEqual(
      foldr1((agg, item) => agg + item, [1, 2, 3, 4, 5]),
      15
    );
    expectEqual(
      foldr1((agg, item) => agg * item, [1, 2, 3, 4, 5]),
      120
    );
    expectEqual(
      foldr1((agg, item, ind) => (
          agg.push(item + getAppendage(ind)),
            agg
        ), vowelsArray.concat((<any[]>[[]]))
      ),
      expectedTransform
    );
  });
  it('should return the zero value when an empty list is passed in', () => {
    expectEqual(foldr1((agg, item) => agg + item, []), []);
  });
});
