/**
 * Compile-time checks for exported signatures - `ts-jest` reports type errors as test failures,
 * so each assignment and `@ts-expect-error` below is the assertion;  Pins the #32 typing rule.
 */
import {
  append, errorIfNotType, find, foldl, head, includes, map, sortBy, tail, take, uncons
} from '../src';
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

  test('`foldl` returns the type of the accumulator', () => {
    const sum: number = foldl((agg: number, x: number) => agg + x, 0, [1, 2]);
    // @ts-expect-error - Accumulator is a `number`.
    const notSum: string = foldl((agg: number, x: number) => agg + x, 0, [1, 2]);
    expect([sum, notSum]).toEqual([3, 3]);
  });

  test('`find` and `head` return the element type', () => {
    const found: number = find(x => x > 1, [1, 2]),
      first: number = head([1, 2]);
    // @ts-expect-error - Elements are numbers.
    const notFound: string = find(x => x > 1, [1, 2]);
    expect([found, first, notFound]).toEqual([2, 1, 2]);
  });

  test('`map` returns the mapped type', () => {
    const strs: string[] = map(x => `${x}`, [1, 2]);
    // @ts-expect-error - Mapped values are strings.
    const notStrs: number[] = map(x => `${x}`, [1, 2]);
    expect([strs, notStrs]).toEqual([['1', '2'], ['1', '2']]);
  });

  test('`take`, `tail`, `uncons`, and `sortBy` keep the list type', () => {
    const taken: number[] = take(1, [1, 2]),
      rest: number[] = tail([1, 2]),
      [h, t] = uncons([1, 2]) as [number, number[]],
      sorted: number[] = sortBy((a, b) => a - b, [2, 1]);
    // @ts-expect-error - Elements are numbers.
    const notTaken: string[] = take(1, [1, 2]);
    expect([taken, rest, h, t, sorted, notTaken]).toEqual([[1], [2], 1, [2], [1, 2], [1]]);
  });
});
