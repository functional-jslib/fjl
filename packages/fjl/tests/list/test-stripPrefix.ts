import {alphabetArray, alphabetString, expectEqual, expectError} from "../helpers";
import {stripPrefix} from "../../src/list";

describe('#stripPrefix', () => {
  it('should be able to strip a prefix from a list', () => {
    expectEqual(
      stripPrefix('abc', alphabetArray.slice(0, 10)),
      alphabetArray.slice(3, 10));

    expectEqual(
      stripPrefix('abc', alphabetString.substring(0, 10)),
      alphabetString.substring(3, 10));
  });
  it('should return a copy of the passed in list when prefix is not found', () => {
    expectEqual(stripPrefix('!*&', alphabetArray), alphabetArray);
    expectEqual(stripPrefix('!*&', alphabetString), alphabetString);
    expectEqual(stripPrefix('!*&', ''), '');
    expectEqual(stripPrefix('!*&', []), []);
  });
  it('should throw an error when receiving nothing in either position', () => {
    expectError(() => stripPrefix(null, 'abc'));
    expectError(() => stripPrefix(null, null));
    expectError(() => stripPrefix('abc', null));
  });
});
