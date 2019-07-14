import {expectEqual} from "../helpers";
import {find} from "../../src/list";

describe('#find', () => {
    it('should should find element that matches predicate when element is in given list', () => {
        const word = 'word',
            pred = x => x === 'o';
        expectEqual(find(pred, word), 'o');
        expectEqual(find(pred, word.split('')), 'o');
    });
    it('should return `undefined` when predicate doesn\'t match any elements.', () => {
        const word = 'word',
            pred = x => x === 'a';
        expectEqual(find(pred, word), undefined);
        expectEqual(find(pred, word.split('')), undefined);
    });
});

