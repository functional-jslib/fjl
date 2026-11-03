import {reduceRight} from "../../src";
import {alphabetArray, alphabetLen, expectFunction, falsyList} from "../helpers";

describe('#reduceRight', () => {
  it('should reduce entire list when given predicate holds for all items in list', () => {
    // Example: Get map characters to char codes (effectively `map` operation).
    const
      aggregateCharCode = (agg, item) => {
        agg.push((item + '').charCodeAt(0));
        return agg;
      },
      charCodes = reduceRight(aggregateCharCode, [], alphabetArray);

    // Result length
    expect(charCodes.length).toEqual(alphabetLen);

    // Convert char codes back to array of letters (reversed)
    const backToStringArray = charCodes.map(x => String.fromCharCode(x)).reverse();

    // Check results
    expect(backToStringArray).toEqual(alphabetArray);
  });
  it('should be able to reduce any kind of list (string, or array, etc.)', () => {
    const source = 'abc#!@#defg',
      predicate = x => !/^[a-z]$/.test(x),
      operation = (agg, item) => predicate(item) ? agg : agg + item,
      aggregand = '',
      expectedArr = source.split('').filter(x => !predicate(x)).reverse(),
      expectedStr = expectedArr.join(''),
      result = reduceRight(operation, aggregand, source),
      result2 = reduceRight((agg, item) => {
          if (predicate(item)) {
            return agg;
          }
          agg.push(item);
          return agg;
        },
        [], source.split('')
      )
    ;
    expect(result).toEqual(expectedStr);
    expect(result2).toEqual(expectedArr);
  });
  it('should return the `addend` (aggregand) if given list is empty', () => {
    const op = (agg, item) => agg + item;
    [[], ''].forEach(list => {
      falsyList.forEach(x => {
        expect(reduceRight(op, x, list)).toEqual(x);
      });
    });
  });
});
