/**
 * Compile-time checks for exported signatures - `ts-jest` reports type errors as test failures,
 * so each assignment and `@ts-expect-error` below is the assertion;  Pins the #32 typing rule.
 */
import {append, errorIfNotType, includes} from '../src';
import {instanceOf} from '../src/_platform/object';

describe('exported signatures', () => {
  test('`append` keeps the input types', () => {
    const str: string = append('a', 'b'),
      nums: number[] = append([1], [2]);
    // @ts-expect-error - Array inputs don't produce a string.
    const notStr: string = append([1], [2]);
    expect([str, nums, notStr]).toEqual(['ab', [1, 2], [1, 2]]);
  });

  test('`includes` checks the needle against the element type', () => {
    expect(includes([1, 2], 1)).toEqual(true);
    // @ts-expect-error - `string` isn't an element of `number[]`.
    expect(includes([1, 2], 'a')).toEqual(false);
  });

  test('`errorIfNotType` returns the type of the given value', () => {
    const value: number = errorIfNotType(Number, 'ctx', 'value', 1);
    // @ts-expect-error - Returned type follows `value`.
    const notValue: string = errorIfNotType(Number, 'ctx', 'value', 1);
    expect([value, notValue]).toEqual([1, 1]);
  });

  test('`instanceOf` requires a constructor', () => {
    expect(instanceOf([], Array)).toEqual(true);
    // @ts-expect-error - Not `new`-able.
    expect(() => instanceOf([], 'Array')).toThrow(TypeError);
  });
});
