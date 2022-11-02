import {alphabetArray, alphabetString} from "../helpers";
import {inits} from "../../src/list/inits";

describe('#inits', () => {
    it('should unfold a list into list of all possible ' +
        'non-omitting sequential sets that start with initial item', () => {
        const lengthsEqualToIndex = (item, ind): boolean => item.length === ind;
        expect((inits(alphabetString)).every(lengthsEqualToIndex));
        expect((inits(alphabetArray)).every(lengthsEqualToIndex));
    });
});
