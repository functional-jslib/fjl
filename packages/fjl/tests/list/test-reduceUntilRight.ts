import {reduceUntil, reduceUntilRight} from "../../src";
import {alphabetArray, alphabetLen, expectFunction} from "../helpers";

describe('#reduceUntilRight', () => {
  it('should reduce entire list when given predicate holds for all items in list', () => {
    // Example: Get map characters to char codes (effectively `map` operation).
    const

      // Operation to perform
      aggregateCharCode = (agg, item) => {
        agg.push((item + '').charCodeAt(0));
        return agg;
      },

      // Predicate to use (run through entire array (as long as...))
      isFalsy = x => !x,

      // Result
      charCodes = reduceUntilRight(isFalsy, aggregateCharCode, [], alphabetArray);

    // Result length
    expect(charCodes.length).toEqual(alphabetLen);

    // Convert char codes back to array of letters (reversed)
    const backToStringArray = charCodes.map(x => String.fromCharCode(x)).reverse();

    // Check results
    expect(backToStringArray).toEqual(alphabetArray);
  });
  it('should reduce list up until given predicate holds for all items in list', () => {
    const source = 'abc#!@#defg',
      predicate = x => !/^[a-z]$/.test(x),
      operation = (agg, item) => agg + item,
      aggregand = '',
      result = reduceUntilRight(predicate, operation, aggregand, source),
      result2 = reduceUntilRight(predicate,
        (agg, item) => {
          agg.push(item);
          return agg;
        }, [], source.split(''))
    ;
    expect(result).toEqual('gfed');
    expect(result2).toEqual(['g', 'f', 'e', 'd']);
  });
  it('should return `aggregand` when predicate holds for first item in list', () => {
    const source = 'abc#!@#defg',
      predicate = x => /^[a-z]$/.test(x),
      operation = (agg, item) => agg + item,
      aggregand = '',
      result = reduceUntilRight(predicate, operation, aggregand, source),
      result2 = reduceUntilRight(predicate,
        (agg, item) => {
          agg.push(item);
          return agg;
        }, [], source.split(''))
    ;
    expect(result).toEqual('');
    expect(result2).toEqual([]);
  });
});
