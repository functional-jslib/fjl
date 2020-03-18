/**
 * Created by elyde on 12/10/2016.
 * @todo remove use of 'curry_' from tests and helpers.
 */
import {compose} from '../src/function';
import {curry2_, __} from './helpers/curry_';
import {range} from './../src/list/range';

export interface LinkedListNode {data: string, next?: LinkedListNode}

export * from './helpers/curry_';

export const  expectInstanceOf = curry2_((instance, value) => expect(value).toBeInstanceOf(instance)),

    expectFunction = value => expectInstanceOf(Function, value),

    expectEqual = curry2_((value, value2) => expect(value).toEqual(value2)),

    expectFalse = value => expectEqual(value, false),

    expectTrue = value => expectEqual(value, true),

    expectLength = curry2_((len, element) => compose(expectEqual(__, len), length)(element)),

    expectError = curry2_(fn => expect(fn).toThrow()),

    hasOwnProperty = (instance, key) => Object.prototype.hasOwnProperty.call(instance, key),

    length = something => something.length,

    add = curry2_((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    subtract = curry2_((arg0, ...args) => {
        return args.reduce((agg, num) => agg - num, arg0);
    }),

    shallowCompareOnLeft = curry2_((incoming, against) => Array.isArray(incoming) ?
        shallowCompareArraysLeft(incoming, against) :
            shallowCompareObjectsLeft(incoming, against) ),

    shallowCompareArraysLeft = curry2_((incoming, against) => !incoming.some((_, ind) => against[ind] !== incoming[ind])),

    shallowCompareObjectsLeft = curry2_((incoming, against, keys) => !(keys || Object.keys(incoming))
        .some(key => against[key] !== incoming[key]) ),

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

    peek = (...args) => (log(...args), args.pop()),

    allYourBase = {all: {your: {base: {are: {belong: {to: {us: 0}}}}}}},

    alphabetCharCodeRange: number[] = range('a'.charCodeAt(0), 'z'.charCodeAt(0)) as number[],

    alphabetArray = alphabetCharCodeRange
        .map(charCode => String.fromCharCode(charCode)),

    alphabetString = alphabetArray.join(''),

    alphabetLen = alphabetArray.length,

    alphabetIndices = range(0, alphabetLen - 1) as number[],

    revAlphabetArray = alphabetArray.slice(0).reverse(),

    revAlphabetStr = revAlphabetArray.join(''),

    vowelsString = 'aeiou',

    vowelsLen = vowelsString.length,

    vowelsArray = vowelsString.split(''),

    vowelCharCodes = vowelsArray.map(x => x.charCodeAt(0)),

    vowelIndices = alphabetIndices.filter(x => vowelsString.indexOf(alphabetString[x]) > -1),

    revVowelsArray = vowelsArray.slice(0).reverse(),

    revVowelsString = revVowelsArray.join(''),

    nums1To10 = range(1, 10),

    nonAlphaNums = '!@#$%^&*()_+|}{:"?><,./;[]\\\'',

    nonAlphaNumsArray = nonAlphaNums.split(''),

    revNonAlphaNumsArray = nonAlphaNumsArray.slice(0).reverse(),

    revNonAlphaNums = revNonAlphaNumsArray.slice(0).reverse().join(''),

    isVowel = x => vowelsString.indexOf(x) > -1,

    jsonClone = x => JSON.parse(JSON.stringify(x)),

    falsyList = [undefined, null, false, 0, ''],

    truthyList = [-1, 1, true, 'true', () => undefined, function () {}, {}, []],


    generalEqualityCheck = (a, b) => a === b,

    genericOrdering = (a, b) => {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    },

    equal = (a, b) => a === b,

    linkedListToList = linkedList => {
        const out: LinkedListNode[] = [];
        let node = linkedList;
        while (node.next) {
            out.push({data: node.data});
            node = node.next;
        }
        return out;
    }

;
