import {defaultValueObscurer} from '../src/ValidationUtils';

describe('#defaultValueObscurer', () => {
  ([
    ['abc', '***'],
    ['', ''],
    [12345, '*****'],
  ] as [unknown, string][]).forEach(([value, expected]) => {
    it(`defaultValueObscurer(${JSON.stringify(value)}) === ${JSON.stringify(expected)}`, () => {
      expect(defaultValueObscurer(value)).toEqual(expected);
    });
  });
});
