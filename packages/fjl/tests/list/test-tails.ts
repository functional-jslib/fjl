import {length} from "../../src/platform/object";
import {alphabetArray, alphabetString, expectTrue} from "../helpers";
import {all, head, tails} from "../../src/list";

describe('#tails', () => {
  it('should unfold a list into list of all possible ' +
    'non-omitting sequential sets that start with the last item', () => {
    const limit = length(alphabetString);
    expectTrue(all(
      (item, ind: number) => {
        const headOfLast = head(item);
        return length(item) ? length(item) === limit - ind &&
          headOfLast === alphabetString[ind] : true;
      },
      tails(alphabetString)
    ));
    expectTrue(all(
      (item, ind: number) => {
        const headOfLast = head(item);
        return length(item) ? length(item) === limit - ind &&
          headOfLast === alphabetArray[ind] : true;
      },
      tails(alphabetArray)
    ));
  });
});
