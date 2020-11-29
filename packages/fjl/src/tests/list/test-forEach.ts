import {forEach} from "../../list/forEach";
import {alphabetArray} from "../helpers";

describe('#forEach', () => {
    it('should execute passed in function for every item in passed in list (array)\n ' +
        '(all incoming params should validate also;  I.e., `(element, index, array) => ...`', () => {
        forEach((x, index, list) => {
            expect(list).toEqual(alphabetArray);
            expect(x).toEqual(alphabetArray[index]);
        }, alphabetArray);
    });
    it('should throw an error when receiving a non-function value as first param and a non-empty list', () => {
        expect(() => forEach(null, [1])).toThrow(Error);
    });
    // it('should throw an error when receiving a non-lengthable value as second param', () => {
    //     expect(() => forEach(() => undefined, null)).toThrow(Error);
    // });
});
