import {alphabetArray, alphabetCharCodeRange, alphabetString, expectEqual, expectError} from '../helpers';
import {concatMap} from '../../src/list/concatMap';

describe('#concatMap', () => {
    const id = (x: any): any => x;
    it('should map a function on a list and concatenate lists in resulting list into a list.', () => {
        const charCodeToCharOp = (charCode: number): string => String.fromCharCode(charCode),
            charCodeRange = alphabetCharCodeRange;
        // @investigate is babel shimming String.fromCharCode;
        //  When passing this function direct to `[].map` it returns a weird result (seems like it's returning
        //  an instance of `String` using `new` and it's constructor)?
        expectEqual(concatMap(charCodeToCharOp, charCodeRange), alphabetString);
        expectEqual(concatMap(charCode => [String.fromCharCode(charCode)], charCodeRange), alphabetArray);
    });
    it('should return an empty list when receiving an empty list or a list of empty lists', () => {
        expectEqual(concatMap(id, []), []);
        expectEqual(concatMap(id, [[], [], []]), []);
    });
    it('should throw an error when receiving `undefined` or `null` in it\'s list position', () => {
        expectError(() => concatMap(id, null));
        expectError(() => concatMap(id, undefined));
    });
});
