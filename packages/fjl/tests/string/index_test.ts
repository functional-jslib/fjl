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

describe('#lines', () => {
  it('should split a string on all new line characters.', () => {
    const subj = alphabetArray.join('\n'),
      result = lines(subj);

    // Ensure subject is valid first:
    // ------------------------------------
    // Expect new line char before every char except the first
    expectLength(alphabetArray.length * 2 - 1, subj);

    // Check split string
    expectEqual(alphabetArray, result);
  });
  it('should return original string when no new lines are found in string', () => {
    expectEqual(lines('hello world'), ['hello world']);
  });
  it('should match the documented Haskell examples', () => {
    (<[string, string[]][]>[
      ['', []],
      ['\n', ['']],
      ['one', ['one']],
      ['one\n', ['one']],
      ['one\n\n', ['one', '']],
      ['one\ntwo', ['one', 'two']],
      ['one\ntwo\n', ['one', 'two']],
    ]).forEach(([subj, expected]) => expectEqual(lines(subj), expected));
  });
  it('should count `\\r`, `\\r\\n`, and `\\n\\r` as one line break', () => {
    expectEqual(lines('a\rb\r\nc\n\rd\r\n'), ['a', 'b', 'c', 'd']);
  });
  it('should keep `unlines . lines` idempotent', () => {
    ['', '\n', 'one', 'one\n', 'one\n\n', 'one\ntwo', 'one\ntwo\n'].forEach(subj => {
      const once = unlines(lines(subj));
      expectEqual(unlines(lines(once)), once);
    });
  });
  it('should throw Errors when receiving nothing', () => {
    expectError(() => lines(null));
    expectError(() => lines(undefined));
  });
});

describe('#words', () => {
  it('should split a string on all whitespace characters.', () => {
    // subject | expectedLength | shallowEqualsTo
    (<[string, number, ReturnType<typeof words>][]>[
      [alphabetArray.join(' '), alphabetArray.length, alphabetArray],
      ['hello world', 2, ['hello', 'world']]
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
  it('should match the documented Haskell examples', () => {
    expectEqual(words('Lorem ipsum\ndolor'), ['Lorem', 'ipsum', 'dolor']);
    expectEqual(words(' foo bar '), ['foo', 'bar']);
    expectEqual(words(' foo  bar\t\r\n'), ['foo', 'bar']);
    expectEqual(words(''), []);
    expectEqual(words('  '), []);
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
  it('should end each item with a new line.', () => {
    [
      [vowelsArray, vowelsArray.join('\n') + '\n'],
      [['Hello', 'World', '!'], 'Hello\nWorld\n!\n'],
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
