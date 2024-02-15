/**
 * Created by elyde on 12/10/2016.
 * @todo remove use of 'curry_' from tests and helpers.
 */
import {compose} from '../src/function';
import {range} from '../src/list/range';

export interface LinkedListNode<T = any> {
  data: T;
  next?: LinkedListNode;
}

export type LLNode = LinkedListNode;

export const expectInstanceOf = (Type) => (value) => expect(value).toBeInstanceOf(Type),

  expectFunction = expectInstanceOf(Function),

  expectEqual = (value, value2) => expect(value).toEqual(value2),

  expectFalse = value => expectEqual(value, false),

  expectTrue = value => expectEqual(value, true),

  expectLength = (len, element) => compose((value) => expectEqual(value, len), length)(element),

  expectError = fn => () => expect(fn).toThrow(),

  length = xs => xs.length,

  log = console.log.bind(console),

  peek = (...args: any[]): any => {
    log(...args);
    return args.pop();
  },

  add = (arg0 = 0, ...args: number[]): number =>
    args.reduce((agg, num) => num + agg, arg0),

  subtract = (arg0: number, ...args: number[]): number =>
    args.reduce((agg, num) => agg - num, arg0),

  allYourBase = Object.freeze({all: {your: {base: {are: {belong: {to: {us: 0}}}}}}}) as object,

  alphabetCharCodeRange = Object.freeze(range('a'.charCodeAt(0), 'z'.charCodeAt(0))) as number[],

  alphabetArray = Object.freeze(alphabetCharCodeRange
    .map(charCode => String.fromCharCode(charCode))) as string[],

  alphabetString = alphabetArray.join(''),

  alphabetLen = alphabetArray.length,

  alphabetIndices = Object.freeze(range(0, alphabetLen - 1)) as number[],

  vowelsString = 'aeiou',

  vowelsLen = vowelsString.length,

  vowelsArray = Object.freeze(vowelsString.split('')) as string[],

  vowelCharCodes = Object.freeze(vowelsArray.map(x => x.charCodeAt(0))) as number[],

  vowelIndices = Object.freeze(alphabetIndices.filter(x => vowelsString.indexOf(alphabetString[x]) > -1)) as number[],

  revVowelsArray = Object.freeze(vowelsArray.slice(0).reverse()) as string[],

  nums1To10 = Object.freeze(range(1, 10)) as number[],

  nonAlphaNums = '!@#$%^&*()_+|}{:"?><,./;[]\\\'',

  nonAlphaNumsArray = Object.freeze(nonAlphaNums.split('')) as string[],

  isVowel = (x: string): boolean => vowelsString.indexOf(x) > -1,

  notIsVowel = (x: string): boolean => !isVowel(x),

  jsonClone = (x: string): object => JSON.parse(JSON.stringify(x)),

  falsyList = Object.freeze([undefined, null, false, 0, '']) as any[],

  truthyList = Object.freeze([-1, 1, true, 'true', (): void => undefined, function (): void {
    return;
  }, {}, []]) as any[],

  genericOrdering = (a, b): number => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  },

  equal = (a, b): boolean => a === b,

  linkedListToList = (linkedList: LinkedListNode): LinkedListNode[] => {
    const out: LinkedListNode[] = [];
    let node = linkedList;
    while (node.next) {
      out.push({data: node.data});
      node = node.next;
    }
    return out;
  }
;
