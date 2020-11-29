import {expectTrue} from "../helpers";
import {findIndex} from "../../src/list/findIndex";

describe('#findIndex', () => {
    const word = 'abcdefg';
    it('should find an index where predicate is satisfied', () => {
        expectTrue(
            word.split('')
                .every((char, ind, arr) =>
                    findIndex((x, ind2) => ind === ind2 && x === word[ind], arr) === ind));
    });
    it('should return `-1` when item is not found in populated list', () => {
        const nonAlphaList = '!@#$%^&*()_+'.split(''),
            vowels = 'aeiou'.split('');
        vowels.forEach(char => {
            const result = findIndex(x => x === char, nonAlphaList);
            expect(result).toEqual(-1);
        });
    });
});
