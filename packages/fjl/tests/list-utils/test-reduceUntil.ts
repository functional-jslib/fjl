import {reduceUntil} from "../../src";
import {alphabetArray, alphabetLen, expectFunction} from "../helpers";


describe('#reduceUntil', () => {
  it('should reduce entire list when given predicate holds for all items in list', () => {
    // Example: Get map characters to char codes (effectively `map` operation).
    const
      aggregateCharCode = (agg, item) => {
        agg.push((item + '').charCodeAt(0));
        return agg;
      },
      isFalsy = x => !x,
      charCodes = reduceUntil(isFalsy, aggregateCharCode, [], alphabetArray);

    // Result length
    expect(charCodes.length).toEqual(alphabetLen);

    // Check results
    charCodes.forEach((x, ind) => {
      expect(String.fromCharCode(x)).toEqual(alphabetArray[ind]);
    });
  });
  it('should reduce list up until given predicate holds for all items in list', () => {
    const source = 'abc#!@#defg',
      predicate = x => !/^[a-z]$/.test(x),
      operation = (agg, item) => agg + item,
      aggregand = '',
      result = reduceUntil(predicate, operation, aggregand, source),
      result2 = reduceUntil(predicate,
        (agg, item) => {
          agg.push(item);
          return agg;
        },
        [], source.split('')
      )
    ;
    expect(result).toEqual('abc');
    expect(result2).toEqual(['a', 'b', 'c']);
  });
  it('should return `aggregand` when predicate holds for first item', () => {
    const source = 'abc#!@#defg',
      predicate = x => /^[a-z]$/.test(x),
      operation = (agg, item) => agg + item,
      aggregand = '',
      result = reduceUntil(predicate, operation, aggregand, source),
      result2 = reduceUntil(predicate,
        (agg, item) => {
          agg.push(item);
          return agg;
        },
        [], source.split('')
      )
    ;
    expect(result).toEqual('');
    expect(result2).toEqual([]);
  });
  it('should be curried', () => {
    const source = 'abc#!@#defg',
      predicate = x => !/^[a-z]$/.test(x),
      operation = (agg, item) => agg + item,
      aggregand = '',
      reductionFn = reduceUntil(predicate, operation),
      result = reductionFn(aggregand, source),
      reductionFn2 = reduceUntil(predicate,
        (agg, item) => {
          agg.push(item);
          return agg;
        }),
      result2 = reductionFn2([], source.split(''))
    ;
    // Ensure funcs are functions
    [reductionFn, reductionFn2].forEach(expectFunction);

    // Test results
    expect(result).toEqual('abc');
    expect(result2).toEqual(['a', 'b', 'c']);
  });
});
