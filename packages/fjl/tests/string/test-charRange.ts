import {charRange} from "../../src";

const {stringify} = JSON;

describe('#charRange', () => {
  (<[Parameters<typeof charRange>, string[]][]>[
    [['a', 'e'], ['a', 'b', 'c', 'd', 'e']],
    [['a', 'e', 2], ['a', 'c', 'e']],
    [['a', 'd', 2], ['a', 'c']],
    [['c', 'a'], ['c', 'b', 'a']],
    [['e', 'a', 2], ['e', 'c', 'a']],
    [['e', 'a', -2], ['e', 'c', 'a']],
    [['a', 'c', -1], ['a', 'b', 'c']],
    [['a', 'a'], ['a']],
    [['0', '3'], ['0', '1', '2', '3']],
    [['😀', '😂'], ['😀', '😁', '😂']]
  ])
    .forEach(([args, expected]) => {
      it(`charRange(${stringify(args)}) collects to ${stringify(expected)}`, () => {
        expect(Array.from(charRange(...args))).toEqual(expected);
      });
    });

  it('should be lazy', () => {
    const gen = charRange('a', '\u{10FFFF}');
    expect(gen.next().value).toEqual('a');
    expect(gen.next().value).toEqual('b');
  });

  ([
    ['', 'a'],
    ['a', ''],
    ['ab', 'c'],
    ['a', 'bc'],
    [null, 'a'],
    ['a', undefined]
  ] as [string, string][])
    .forEach(([start, end]) => {
      it(`should throw when given charRange(${stringify(start)}, ${stringify(end)})`, () => {
        expect(() => Array.from(charRange(start, end))).toThrow();
      });
    });

  it('should throw when `step` is `0`', () => {
    expect(() => Array.from(charRange('a', 'c', 0))).toThrow();
  });
});
