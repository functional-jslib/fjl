import {range, reverse, $sortOn, $take} from "../../src/list";
import {alphabetArray, expectEqual} from "../helpers";
import {compose} from "../../src/function";
import {Unary} from "../../src/types";

describe('#sortOn', () => {
  const identity = <T>(x: T): T => x,
    sortOnIdentity = $sortOn(identity),
    range0To10 = range(0, 10),
    range10To0 = range(10, 0, -1);
  it('should sort a list in ascending order', () => {
    expectEqual(sortOnIdentity(range10To0), range0To10);
    expectEqual(sortOnIdentity(range0To10), range0To10);
    compose((value) => expectEqual(value, alphabetArray), sortOnIdentity, reverse)(alphabetArray);
    compose(/*log,*/ sortOnIdentity, reverse)(alphabetArray);
  });
  it('should return a copy of original list when said list is already sorted', () => {
    compose((value) => expectEqual(value, ['a', 'b', 'c']), sortOnIdentity, $take(3) as unknown as Unary<string[]>)(alphabetArray);
    compose((value) => expectEqual(value, alphabetArray), sortOnIdentity)(alphabetArray);
    compose((value) => expectEqual(value, range0To10), sortOnIdentity)(range0To10);
  });
  it('should return an empty list when receiving an empty list', () => {
    expectEqual(sortOnIdentity([]), []);
  });
});
