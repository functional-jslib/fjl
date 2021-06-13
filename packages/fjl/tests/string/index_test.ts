import {intercalate, length} from "../../src/list";
import {
  alphabetArray,
  alphabetString,
  expectEqual,
  expectError,
  expectLength,
  vowelsArray,
  vowelsString
} from "../helpers";
import {
  camelCase,
  classCase,
  FirstCharCase,
  lcaseFirst,
  lines,
  ucaseFirst,
  unlines,
  unwords,
  words
} from "../../src/string";
import {Slice} from '../../src/types';

describe('#lines', () => {
  it('should split a string on all new line characters.', () => {
    const subj = intercalate('\n', alphabetArray) as string,
      result = lines(subj);

    // Ensure subject is valid first:
    // ------------------------------------
    // Expect new line char before every char except the first
    expectLength(length(alphabetArray) * 2 - 1, subj);

    // Check split string
    expectEqual(alphabetArray, result);
  });
  it('should return original string when no new lines are found in string', () => {
    expectEqual(lines('hello world'), ['hello world']);
    expectEqual(lines(''), ['']);
  });
  it('should throw Errors when receiving nothing', () => {
    expectError(() => lines(null));
    expectError(() => lines(undefined));
  });
});

describe('#words', () => {
  it('should split a string on all whitespace characters.', () => {
    // subject | expectedLength | shallowEqualsTo
    (<[Slice, number, [string, string]][]>[
      [intercalate(' ', alphabetArray), length(alphabetArray), alphabetArray],
      ['hello world', 2, ['hello', 'world']]
    ])
      .forEach(tuple => {
        const [subj, expectedLen, shallowEqualsTo] = tuple,
          result = words(subj as string);

        // Check length of result
        expectLength(expectedLen, result);

        // Check split string
        expectEqual(shallowEqualsTo, result);
      });
  });
  it('should return a copy of original list when no whitespace characters are found.', () => {
    // subject | expectedLength | shallowEqualsTo
    (<[string, number, string[]][]>[
      [alphabetString, 1, [alphabetString]],
      [vowelsString, 1, [vowelsString]]
    ])
      .forEach(tuple => {
        const [subj, expectedLen, shallowEqualsTo] = tuple,
          result = words(subj);

        // Check length of result
        expectLength(expectedLen, result);

        // Check split string
        expectEqual(shallowEqualsTo, result);
      });
  });
  it('should throw Errors when receiving nothing', () => {
    expectError(() => words(null));
    expectError(() => words(undefined));
  });
});

describe('#unlines', () => {
  it('should join a list with new lines.', () => {
    [
      [vowelsArray, vowelsArray.join('\n')],
    ]
      .forEach(([subj, expected]) => {
        const r = unlines(subj as string[]);
        expectEqual(r, expected);
      });
  });
  it('should return empty lists when receiving empty lists', () => {
    expectEqual(unlines([]), '');
  });
  it('should throw Errors when receiving nothing', () => {
    expectError(() => unlines(null));
    expectError(() => unlines(undefined));
  });
});

describe('#unwords', () => {
  it('should join a list of words with spaces.', () => {
    [
      [vowelsArray, vowelsArray.join(' ')],
    ]
      .forEach(([subj, expected]) => {
        const r = unwords(subj as string[]);
        expectEqual(r, expected);
      });
  });
  it('should return empty lists when receiving empty lists', () => {
    expectEqual(unwords([]), '');
  });
  it('should throw Errors when receiving nothing', () => {
    expectError(() => unwords(null));
    expectError(() => unwords(undefined));
  });
});

describe('#lcaseFirst', () => {
  it('should return passed in non-empty string with first alpha char toUpperCase', () => {
    expect(lcaseFirst('ABC')).toEqual('aBC');
  });
  it('should return given non-empty string if it cannot be operated on;  Non-alpha char at index `0` or "empty string"', () => {
    expect(lcaseFirst('$$ABC')).toEqual('$$ABC');
  });
  it('should throw an error when receiving an empty-string or any value that is not a string', () => {
    [null, undefined, [], {}]
      .forEach(xs =>
        expectError(() => lcaseFirst(xs as string))
      );
  });
});

describe('#ucaseFirst', () => {
  it('should return passed in non-empty string with first alpha char toUpperCase', () => {
    expect(ucaseFirst('abc')).toEqual('Abc');
  });
  it('should return given non-empty string if it cannot be operated on;  Non-alpha char at index `0` or "empty string"', () => {
    expect(ucaseFirst('$$abc')).toEqual('$$abc');
  });
  it('should throw an error when receiving an empty-string or any value that is not a string', () => {
    [null, undefined, [], {}]
      .forEach(xs =>
        expectError(() => ucaseFirst(xs as string))
      );
  });
});

describe('#camelCase', () => {
  it('should return a "camel-cased" version of passed in non-empty string', () => {
    (<[string, string, FirstCharCase][]>[
      ['all-your-base', 'AllYourBase', FirstCharCase.Upper],
      ['ALL-YOUR-BASE', 'AllYourBase', FirstCharCase.Upper],
      ['$$abc', 'Abc', FirstCharCase.Upper],
      ['all-your-base', 'allYourBase', FirstCharCase.Lower],
      ['ALL-YOUR-BASE', 'allYourBase', FirstCharCase.Lower],
      ['$$abc', 'abc', FirstCharCase.Lower]
    ])
      .forEach(([given, expected, charCase]) => {
        expect(camelCase(given, charCase)).toEqual(expected);
      });
  });
  it('should throw an error when receiving an empty-string or any value that is not a string', () => {
    [null, undefined, [], {}]
      .forEach(xs =>
        expectError(() => camelCase(xs as string))
      );
  });
});

describe('#classCase', () => {
  it('should return a "class-cased" version of passed in non-empty string', () => {
    (<[string, string][]>[
      ['all-your-base', 'AllYourBase'],
      ['ALL-YOUR-BASE', 'AllYourBase'],
      ['$$abc', 'Abc']
    ])
      .forEach(([given, expected]) => {
        expect(classCase(given)).toEqual(expected);
      });
  });
  it('should throw an error when receiving an empty-string or any value that is not a string', () => {
    [null, undefined, [], {}]
      .forEach(xs =>
        expectError(() => classCase(xs as string))
      );
  });
});
