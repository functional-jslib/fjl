import {expectEqual} from "../helpers";
import {find} from "../../list/find";
import {SliceOf} from "../../platform/slice/types";

describe('#find', () => {
    const word = 'word';
    it('should should find element that matches predicate when element is in given list', () => {
        const pred = (x: string): boolean => x === 'o';
        expectEqual(find(pred, word as unknown as SliceOf<string>), 'o'); // @todo remove use of `unknown`
        expectEqual(find(pred, word.split('')), 'o');
    });
    it('should return `undefined` when predicate doesn\'t match any elements.', () => {
        const pred = (x: string): boolean => x === 'a';
        expectEqual(find(pred, word as unknown as SliceOf<string>), undefined);
        expectEqual(find(pred, word.split('')), undefined);
    });
});

