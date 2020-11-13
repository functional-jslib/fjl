import { alphabetArray, alphabetString } from "../helpers";
import { inits } from "../../packages/list/inits";
describe('#inits', () => {
    it('should unfold a list into list of all possible ' +
        'non-omitting sequential sets that start with initial item', () => {
        const lengthsEqualToIndex = (item, ind) => item.length === ind;
        expect(inits(alphabetString).every(lengthsEqualToIndex));
        expect(inits(alphabetArray).every(lengthsEqualToIndex));
    });
});
//# sourceMappingURL=test-inits.js.map