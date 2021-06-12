import {alphabetArray, expectEqual, genericOrdering, vowelsArray, vowelsString} from "../helpers";
import {insertBy} from "../../src/list/insertBy";
import {range, reverse} from "../../src/list";

describe('#insertBy', () => {
  const injectValueAtIndex = (x, ind, list) => {
      if (ind <= 0) {
        return [x].concat(list);
      } else if (ind > list.length - 1) {
        return list.concat([x]);
      }
      return list.slice(0, ind).concat([x], list.slice(ind));
    },
    genericInsert = (x, xs) => insertBy(genericOrdering, x, xs);
  it('Should insert a value before value that matches equality check', () => {
    // expectEqual(genericInsert(99, range(0, 144, 5))
    const range0To145 = range(0, 145, 5),
      expectedResult = injectValueAtIndex(99, 20, range0To145),
      result = genericInsert(99, range0To145),
      result1 = genericInsert(99, reverse(range0To145)),
      result2 = genericInsert('x', alphabetArray),
      result3 = genericInsert('x', reverse(alphabetArray));
    expectEqual(result, expectedResult);
    expectEqual(result1, [99].concat(reverse(range0To145) as number[]));
    expectEqual(result2, injectValueAtIndex('x', 24, alphabetArray));
    expectEqual(result3, ['x'].concat(reverse(alphabetArray)));
  });
  it('should insert value even if passed in list is empty', () => {
    expectEqual(genericInsert(99, []), [99]);
    expectEqual(genericInsert('a', []), ['a']);
  });
});
