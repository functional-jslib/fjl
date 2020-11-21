import { range } from "../list";
export const log = console.log.bind(console), peek = (...args) => (log(...args), args.pop()), allYourBase = { all: { your: { base: { are: { belong: { to: { us: 0 } } } } } } }, alphabetCharCodeRange = range('a'.charCodeAt(0), 'z'.charCodeAt(0)), alphabetArray = alphabetCharCodeRange
    .map(charCode => String.fromCharCode(charCode)), alphabetString = alphabetArray.join(''), alphabetLen = alphabetArray.length, alphabetIndices = range(0, alphabetLen - 1), revAlphabetArray = alphabetArray.slice(0).reverse(), revAlphabetStr = revAlphabetArray.join(''), vowelsString = 'aeiou', vowelsLen = vowelsString.length, vowelsArray = vowelsString.split(''), vowelCharCodes = vowelsArray.map(x => x.charCodeAt(0)), vowelIndices = alphabetIndices.filter(x => vowelsString.indexOf(alphabetString[x]) > -1), revVowelsArray = vowelsArray.slice(0).reverse(), revVowelsString = revVowelsArray.join(''), consonantsArray = alphabetArray.filter(x => vowelsString.indexOf(x) === -1), consonantsString = consonantsArray.join(''), nums1To10 = range(1, 10), nonAlphaNums = '!@#$%^&*()_+|}{:"?><,./;[]\\\'', nonAlphaNumsArray = nonAlphaNums.split(''), revNonAlphaNumsArray = nonAlphaNumsArray.slice(0).reverse(), revNonAlphaNums = revNonAlphaNumsArray.slice(0).reverse().join(''), isVowel = (x) => vowelsString.indexOf(x) > -1, jsonClone = (x) => JSON.parse(JSON.stringify(x)), falsyList = [undefined, null, false, 0, ''], truthyList = [-1, 1, true, 'true', () => undefined, function () {
        return;
    }, {}, []], generalEqualityCheck = (a, b) => a === b, genericOrdering = (a, b) => {
    if (a > b) {
        return 1;
    }
    else if (a < b) {
        return -1;
    }
    return 0;
}, equal = (a, b) => a === b, linkedListToList = (linkedList) => {
    const out = [];
    let node = linkedList;
    while (node.next) {
        out.push({ data: node.data });
        node = node.next;
    }
    return out;
};
//# sourceMappingURL=test-utils.js.map