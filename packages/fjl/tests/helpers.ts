/**
 * Created by elyde on 12/10/2016.
 * @todo remove use of 'curry_' from tests and helpers.
 */
import {compose} from '../src/function';
import {curry2_, __} from './helpers/curry_';
import {range} from '../src/list/range';

export interface LinkedListNode<T = any> {
  data: T;
  next?: LinkedListNode;
}

export type LLNode = LinkedListNode;

export * from './helpers/curry_';

export const expectInstanceOf = curry2_((instance, value) => expect(value).toBeInstanceOf(instance)),

  expectFunction = value => expectInstanceOf(Function, value),

  expectEqual = curry2_((value, value2) => expect(value).toEqual(value2)),

  expectFalse = value => expectEqual(value, false),

  expectTrue = value => expectEqual(value, true),

  expectLength = curry2_((len, element) => compose(expectEqual(__, len), length)(element)),

  expectError = curry2_(fn => expect(fn).toThrow()),

  hasOwnProperty = (instance, key) => Object.prototype.hasOwnProperty.call(instance, key),

  length = something => something.length,

  shallowCompareOnLeft = curry2_((incoming, against) => Array.isArray(incoming) ?
    shallowCompareArraysLeft(incoming, against) :
    shallowCompareObjectsLeft(incoming, against)),

  shallowCompareArraysLeft = curry2_((incoming, against) => !incoming.some((_, ind) => against[ind] !== incoming[ind])),

  shallowCompareObjectsLeft = curry2_((incoming, against, keys) => !(keys || Object.keys(incoming))
    .some(key => against[key] !== incoming[key])),

  deepCompareObjectsLeft = curry2_((incoming, against, keys) =>
    !(keys || Object.keys(incoming)).map(key =>
      typeof against[key] === 'object' && typeof incoming[key] === 'object' ?
        deepCompareObjectsLeft(incoming[key], against[key]) : incoming[key] === against[key]
    )
      .some(bln => !bln)
  ),

  deepCompareLeft = (incoming, against) =>
    incoming === against || Object.keys(incoming).every(key => {
      const typeOfValue = typeof incoming[key];
      // console.log('deepcompare', incoming[key], against[key]);
      return typeOfValue === 'object' ?
        deepCompareLeft(incoming[key], against[key]) :
        against[key] === incoming[key];
    }),

  log = console.log.bind(console),

  peek = (...args: any[]): any => {
    log(...args);
    return args.pop();
  },

  add = curry2_((...args: number[]): number => {
    return args.reduce((agg, num) => num + agg, 0);
  }),

  subtract = curry2_((arg0: number, ...args: number[]): number => {
    return args.reduce((agg, num) => agg - num, arg0);
  }),

  allYourBase = Object.freeze({all: {your: {base: {are: {belong: {to: {us: 0}}}}}}}) as object,

  alphabetCharCodeRange = Object.freeze(range('a'.charCodeAt(0), 'z'.charCodeAt(0))) as number[],

  alphabetArray = Object.freeze(alphabetCharCodeRange
    .map(charCode => String.fromCharCode(charCode))) as string[],

  alphabetString = alphabetArray.join(''),

  alphabetLen = alphabetArray.length,

  alphabetIndices = Object.freeze(range(0, alphabetLen - 1)) as number[],

  revAlphabetArray = Object.freeze(alphabetArray.slice(0).reverse()) as string[],

  revAlphabetStr = revAlphabetArray.join(''),

  vowelsString = 'aeiou',

  vowelsLen = vowelsString.length,

  vowelsArray = Object.freeze(vowelsString.split('')) as string[],

  vowelCharCodes = Object.freeze(vowelsArray.map(x => x.charCodeAt(0))) as number[],

  vowelIndices = Object.freeze(alphabetIndices.filter(x => vowelsString.indexOf(alphabetString[x]) > -1)) as number[],

  revVowelsArray = Object.freeze(vowelsArray.slice(0).reverse()) as string[],

  revVowelsString = revVowelsArray.join(''),

  consonantsArray = Object.freeze(alphabetArray.filter(x => vowelsString.indexOf(x) === -1)) as string[],

  consonantsString = consonantsArray.join(''),

  nums1To10 = Object.freeze(range(1, 10)) as number[],

  nonAlphaNums = '!@#$%^&*()_+|}{:"?><,./;[]\\\'',

  nonAlphaNumsArray = Object.freeze(nonAlphaNums.split('')) as string[],

  revNonAlphaNumsArray = Object.freeze(nonAlphaNumsArray.slice(0).reverse()) as string[],

  revNonAlphaNums = revNonAlphaNumsArray.slice(0).reverse().join(''),

  isVowel = (x: string): boolean => vowelsString.indexOf(x) > -1,

  notIsVowel = (x: string): boolean => !isVowel(x),

  jsonClone = (x: string): object => JSON.parse(JSON.stringify(x)),

  falsyList = Object.freeze([undefined, null, false, 0, '']) as any[],

  truthyList = Object.freeze([-1, 1, true, 'true', (): void => undefined, function (): void {
    return;
  }, {}, []]) as any[],

  generalEqualityCheck = (a, b): boolean => a === b,

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
