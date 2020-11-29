import {length} from "../../platform/object";
import {expectEqual, expectError} from "../helpers";
import {foldl} from "../../list/foldl";

describe('#foldl', () => {
    it('should fold a `Foldable` (list, etc.) into some value', () => {
        const phrase = 'hello world',
            phraseLen = length(phrase),
            phraseIndCount = phraseLen - 1,
            getAppendage = ind => parseInt(ind, 10) !== phraseIndCount ? '|' : '',
            expectedTransform = phrase.split('').map((x, ind) => x + getAppendage(ind));
        expectEqual(
            foldl((agg, item, ind) => {
                agg += item + getAppendage(ind);
                return agg;
            }, '', phrase),
            expectedTransform.join('')
        );
        expectEqual(
            foldl((agg, item) => agg + item, 0, [1, 2, 3, 4, 5]),
            15
        );
        expectEqual(
            foldl((agg, item) => agg * item, 1, [1, 2, 3, 4, 5]),
            120
        );
        expectEqual(
            foldl((agg, item, ind) => {
                agg.push(item + getAppendage(ind));
                return agg;
            }, [], phrase.split('')),
            expectedTransform
        );
    });

    it('should return the zero value when an empty list is passed in', () => {
        expectEqual(foldl((agg, item) => agg + item, 'a', ''), 'a');
        expectEqual(foldl((agg, item) => agg + item, [], []), []);
    });

    it('should throw an error when `null` or `undefined` are passed in as the list', () => {
        expectError(() => foldl((agg, item) => agg + item, 'a', null));
        expectError(() => foldl((agg, item) => agg + item, 'a', undefined));
    });
});
