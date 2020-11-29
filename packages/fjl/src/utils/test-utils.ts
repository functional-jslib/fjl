import {range} from "../list";

import {Nameable} from "../types";
import {curry2_} from "../../tests/helpers/curry_";

export type ConstructorTestCase = [Nameable, any, boolean];

export type NameTestCase = [string, any, boolean];

export type ConstructorOrNameTestCase = [string | Nameable | number, any, boolean];

export interface LinkedListNode {
    data: string;
    next?: LinkedListNode;
}

export const

    log = console.log.bind(console),

    peek = (...args: any[]): void => (log(...args), args.pop()),

    add = curry2_((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    subtract = curry2_((arg0, ...args) => {
        return args.reduce((agg, num) => agg - num, arg0);
    }),

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

    consonantsArray = alphabetArray.filter(x => vowelsString.indexOf(x) === -1),

    consonantsString = consonantsArray.join(''),

    nums1To10 = range(1, 10),

    nonAlphaNums = '!@#$%^&*()_+|}{:"?><,./;[]\\\'',

    nonAlphaNumsArray = nonAlphaNums.split(''),

    revNonAlphaNumsArray = nonAlphaNumsArray.slice(0).reverse(),

    revNonAlphaNums = revNonAlphaNumsArray.slice(0).reverse().join(''),

    isVowel = (x: string): boolean => vowelsString.indexOf(x) > -1,

    jsonClone = (x: string): object => JSON.parse(JSON.stringify(x)),

    falsyList = [undefined, null, false, 0, ''],

    truthyList = [-1, 1, true, 'true', (): void => undefined, function (): void {
        return;
    }, {}, []],


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