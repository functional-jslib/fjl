import {alphabetArray, equal} from "../helpers";
import {groupBy} from "../../src";

describe('#groupBy', () => {
  it('should return a list of lists which contain the (sequential) matches on equality function', () => {
    const expectedResult = [['M'], ['i'], ['s', 's'], ['i'], ['s', 's'], ['i'], ['p', 'p'], ['i']];

    expect(groupBy(equal, 'Mississippi'))
      .toEqual(expectedResult.map(xs => xs.join('')));

    expect(groupBy(equal, 'Mississippi'.split('')))
      .toEqual(expectedResult);
  });

  it('should return a list of lists containing individual un-grouped items or items that do not match equality function', () => {
    expect(groupBy(equal, alphabetArray)).toEqual(alphabetArray.map(char => [char]));
  });
});
