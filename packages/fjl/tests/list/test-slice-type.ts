/**
 * General ephemeral tests for `Slice` type - Tests just ensure that TSC (typescript compiler)
 *  doesn't throw any errors when using the `Slice` type.
 */
import {Slice} from "../../src";

const {stringify} = JSON;

describe('Slice type', () => {
  const concat = <T extends Slice>(...xss: (T | ConcatArray<any>)[]): any =>
    (xss.shift() as Slice)?.concat(...xss);

  ([
    [['abc', 'def'], 'abcdef'],
    ['abcdef'.split('').map(x => [x]), 'abcdef'.split('')]
  ] as Slice[])
    .forEach(([args, expected]) => {
      it(`'Should be able to stand in for \`string\`, and \`T[]\` in: ` +
        `concat(${args.map((x: any) => stringify(x)).join(', ')}) === ${stringify(expected)}`, () => {
        const result: string = concat(...args); // Ensure return value is inferred to our inline declarations type,
        // e.g., no TSC error is thrown

        expect(result).toEqual(expected);
      });
    });

  it('Should be able to stand in for `string`, and `T[]` types in standalone value declaration contexts;' +
    ' e.g., it should not throw any TSC errors', () => {
    // Should be able to represent string values interchangeably (when calling `concat`, and/or `slice`, methods)
    const ctrlHead = 'all your base';
    const ctrlTail = 'belong to us';
    const someArray: Slice = ctrlHead.split(' ').map(x => x);

    expect(ctrlHead.concat(ctrlTail)).toEqual(ctrlHead + ctrlTail);

    expect(someArray.concat(...'all your base'.split(' ')
      .map(xs => [xs]))).toEqual(['all', 'your', 'base', 'all', 'your', 'base']);

    // Should ignore generic type param when value is a string;  E.g., should not throw error
    // ----
    let someStr2: Slice<string> = 'hi';

    someStr2 = ''.slice.call(someStr2, 0);
    expect(someStr2).toEqual('hi');
  });
});
