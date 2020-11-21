import { expectEqual } from "../helpers";
import { find } from "../../packages/list/find";
describe('#find', () => {
    const word = 'word';
    it('should should find element that matches predicate when element is in given list', () => {
        const pred = (x) => x === 'o';
        expectEqual(find(pred, word), 'o'); // @todo remove use of `unknown`
        expectEqual(find(pred, word.split('')), 'o');
    });
    it('should return `undefined` when predicate doesn\'t match any elements.', () => {
        const pred = (x) => x === 'a';
        expectEqual(find(pred, word), undefined);
        expectEqual(find(pred, word.split('')), undefined);
    });
});
//# sourceMappingURL=test-find.js.map