import {alphabetArray, alphabetCharCodeRange} from "../helpers";
import {concatMap} from "../../src/list/concatMap";

describe('#concatMap', () => {
  const id = (x: any): any => x;

  it('should map a function on a list and concatenate lists in resulting list into a list.', () => {
    const charCodeToCharOp = (charCode: number): string => String.fromCharCode(charCode);
    expect(concatMap(charCodeToCharOp, alphabetCharCodeRange.map(c => [c]))).toEqual(alphabetArray);
  });

  it('should return an empty list when receiving an empty list or a list of empty lists', () => {
    expect(concatMap(id, [])).toEqual([]);
    expect(concatMap(id, [[], [], []])).toEqual([]);
  });

  it('should throw an error when receiving `undefined` or `null` in it\'s list position', () => {
    expect(() => concatMap(id, null)).toThrow();
    expect(() => concatMap(id, undefined)).toThrow();
  });
});
