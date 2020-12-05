import {alphabetArray, alphabetString, expectEqual} from "../helpers";
import {at, length} from "../../src";

describe('#at', () => {
  // @todo tabelize messages in tests
  it('should return an item at a given key/index.', () => {
    [alphabetString, alphabetArray].forEach(subject => {
      const subjectLastInd = length(subject) - 1;
      expectEqual(at(0, subject), subject[0]);
      expectEqual(at(5, subject), subject[5]);
      expectEqual(at(subjectLastInd, subject), subject[subjectLastInd]);
    });
  });
  it('should return `undefined` when list has no length.', () => {
    expectEqual(at(0, ''), undefined);
    expectEqual(at(0, []), undefined);
  });
});
