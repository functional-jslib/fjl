import {alphabetArray, alphabetString} from "../helpers";
import {inits} from "../../src/list/inits";
import {SliceOf} from "../../src/jsPlatform/slice";

describe('#inits', () => {
    it('should unfold a list into list of all possible ' +
        'non-omitting sequential sets that start with initial item', () => {
        const lengthsEqualToIndex = (item, ind): boolean => item.length === ind;
        expect((inits(alphabetString as unknown as SliceOf<string>) as string[]).every(lengthsEqualToIndex));
        expect((inits(alphabetArray) as string[]).every(lengthsEqualToIndex));
    });
});
