import {stringLengthValidator, toStringLengthOptions} from '../src/stringLengthValidator';
import {repeat, subsequences, typeOf} from 'fjl';

describe('#toStringLengthOptions', function () {
  const strLenOptions = toStringLengthOptions();
  test('should have a min and max property.', function () {
    expect(typeOf(strLenOptions.min)).toEqual(Number.name);
    expect(typeOf(strLenOptions.max)).toEqual(Number.name);
  });
  test('should have a default value of `0` for `min` property.', function () {
    expect(strLenOptions.min).toEqual(0);
  });
  test('should have a default value of `' + Number.MAX_SAFE_INTEGER + '` for `max` property.', function () {
    expect(strLenOptions.max).toEqual(Number.MAX_SAFE_INTEGER);
  });
});

describe('#stringLengthValidator', function () {
  const testArgs = (subsequences('hello')
    .concat([repeat(21, 'a'), repeat(14, 'b')]) as string[][])
    .map(x => x instanceof Array ? x.join('') : x);
  test('should return a validation result object with a `result` of `false` and ' +
    'one error message when value is not of type `String`', function () {
    const strValidator = stringLengthValidator(null);
    [false, 99, () => null, null, undefined, [], {}]
      .map(x => [false, x, 1])
      .forEach(([expected, value, messagesLength]) => {
        const {result, messages} = strValidator(value),
          expectedMsg = `Value is not a String.  ` +
            `Value type received: ${typeOf(value)}.  ` +
            `Value received: "${value}".`;
        expect(result).toEqual(expected);
        expect(messages.length).toEqual(messagesLength);
        expect(messages[0]).toEqual(expectedMsg);
      });
  });
  test('it should return a validation result object with a `result` of `false` and ' +
    'one error message when the passed in value is not within length range', function () {
    const exampleOps = {min: 6, max: 13},
      strValidator = stringLengthValidator(exampleOps);
    testArgs
      .map(x => [false, x, 1])
      .forEach(([expected, value, messagesLength]) => {
        const {result, messages} = strValidator(value);
        expect(result).toEqual(expected);
        expect(messages.length).toEqual(messagesLength);
      });
  });
  test('it should return a validation result object with a `result` of `true` and ' +
    'no error messages when the passed in value is a string within range `String`', function () {
    const strValidator = stringLengthValidator({min: 0, max: 22});
    testArgs
      .map(x => [true, x, 0])
      .forEach(([expected, value, messagesLength]) => {
        const {result, messages} = strValidator(value);
        expect(result).toEqual(expected);
        expect(messages.length).toEqual(messagesLength);
      });
  });
});
