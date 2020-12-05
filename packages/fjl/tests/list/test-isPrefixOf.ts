import {alphabetArray, alphabetString, expectTrue} from "../helpers";
import {all, inits, isPrefixOf, splitAt} from "../../src/list";
import {negateF2} from "../../src/function";

describe('#isPrefixOf', () => {
  it('should return `true` when a list is a prefix of another', () => {
    expectTrue(all(
      isPrefixOf('abc'),
      splitAt(3, inits(alphabetString))[1]
    ));
    expectTrue(all(
      isPrefixOf('abc'.split('')),
      splitAt(3, inits(alphabetArray))[1]
    ));
  });
  it('should return `false` when a list is not prefix of second list', () => {
    expectTrue(all(
      negateF2(isPrefixOf('!@#')),
      splitAt(3, inits(alphabetString))[1]
    ));
    expectTrue(all(
      negateF2(isPrefixOf('!@#'.split(''))),
      splitAt(3, inits(alphabetArray))[1]
    ));
  });
});
