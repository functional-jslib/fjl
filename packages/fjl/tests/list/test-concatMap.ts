import {vowelCharCodes, vowelsArray} from "../helpers";
import {concatMap} from "../../src/list/concatMap";
import {id} from "../../src";

describe('#concatMap', () => {
  const charCodeToCharList = (charCode: number) => [String.fromCharCode(charCode)];

  it('should flatten the mapped results by one level', () => {
    expect(concatMap((x: number) => [x, x], [1, 2])).toEqual([1, 1, 2, 2]);
    expect(concatMap(charCodeToCharList, vowelCharCodes)).toEqual(vowelsArray);
  });

  it('should only flatten one level', () => {
    expect(concatMap((x: number) => [[x]], [1, 2])).toEqual([[1], [2]]);
  });

  it('should concatenate string results into a string', () => {
    expect(concatMap((x: string) => x + x, ['a', 'b'])).toEqual('aabb');
  });

  it('should return an empty list when given an empty list', () => {
    expect(concatMap(id, [])).toEqual([]);
  });

  it('should throw an error when receiving `undefined` or `null` in it\'s list position', () => {
    expect(() => concatMap(id, null)).toThrow();
    expect(() => concatMap(id, undefined)).toThrow();
  });
});
