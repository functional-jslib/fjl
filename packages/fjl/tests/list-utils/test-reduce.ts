import {reduce} from "../../src";
import {alphabetArray, alphabetLen, expectFunction, falsyList} from "../helpers";
import {$reduce} from "../../dist/es";

describe('#reduce', () => {
  it('should reduce entire list', () => {
    // Example: Get map characters to char codes (effectively `map` operation).
    const

      // Operation to perform
      aggregateCharCode = (agg, item) => {
        agg.push((item + '').charCodeAt(0));
        return agg;
      },

      // Result
      charCodes = reduce(aggregateCharCode, [], alphabetArray);

    // Result length
    expect(charCodes.length).toEqual(alphabetLen);

    // Check results
    charCodes.forEach((x, ind) => {
      expect(String.fromCharCode(x)).toEqual(alphabetArray[ind]);
    });
  });
  it('should be able to reduce any kind of list (string, or array, etc.)', () => {
    const source = 'abc#!@#defg',
      predicate = x => !/^[a-z]$/.test(x),
      operation = (agg, item) => predicate(item) ? agg : agg + item,
      aggregand = '',
      expectedArr = source.split('').filter(x => !predicate(x)),
      expectedStr = expectedArr.join(''),
      result = reduce(operation, aggregand, source),
      result2 = reduce((agg, item) => {
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
        expect(reduce(op, x, list)).toEqual(x);
      });
    });
  });
});
