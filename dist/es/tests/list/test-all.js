import { expectError, expectFalse, expectTrue } from "../helpers";
import { all } from "../../packages/list/all";
describe('#all', () => {
    // @todo tablelize tests here
    it('should return true when predicate returns true for all items in list', () => {
        expectTrue(all(item => item, [true, true, true]));
        expectTrue(all(char => char !== 'a', 'bcdefg'));
    });
    it('should return `false` when predicate returns `false` for an item', () => {
        expectFalse(all(item => item, [true, false, true]));
        expectFalse(all(item => item !== 'a', 'bcdaefg'));
    });
    it('should return `false` when an empty list is passed in', () => {
        expectFalse(all(item => item, []));
        expectFalse(all(item => item, ''));
    });
    it('should throw an error when nothing is passed in', () => {
        expectError(() => all(item => item, null));
        expectError(() => all(item => item, undefined));
    });
});
//# sourceMappingURL=test-all.js.map