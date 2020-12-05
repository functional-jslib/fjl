import {all, length, splitAt, unfoldr, unzipN} from "../../src/list";
import {alphabetArray, expectEqual, expectTrue} from "../helpers";

describe('#unzipN', () => {
  (<[[any, any][], [any[], any[]]][]>[])
    .forEach(([tuples, expected]) => {
      it(`unzipN(${JSON.stringify(tuples)} === ${JSON.stringify(expected)}`, () => {
        const rslt = unzipN(tuples);
        expect(rslt).toEqual(expected);
      });
    });

  it('should throw an error when passed in arg is `null` or `undefined`', () => {
    expect(() => unzipN(undefined)).toThrow(Error);
    expect(() => unzipN(null)).toThrow(Error);
  });
});
