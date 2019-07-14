import {findIndices, inits, intersperse, map} from "../../src/list";
import {alphabetArray, expectError, expectTrue} from "../helpers";

describe('#findIndices', () => {
    it('should return indices for all items that match passed in predicate', () => {
        const tokenInits = inits(intersperse('e', alphabetArray)),
            indicePred = (x: string) => x === 'e',
            expectedResults = tokenInits.map(xs =>
                xs.map((x, ind) => [ind, x])
                    .filter(([ind, x]) => indicePred(x))
            )
                .map(xs => !xs.length ? undefined : xs.map(([x]) => x)),
            results = map(xs => findIndices(indicePred, xs), tokenInits);

        expectTrue(
            results.every((xs, ind) => {
                const expected = expectedResults[ind];
                return xs === expected || ( // match undefined
                    xs.every((x, ind2) => x === expected[ind2]) &&
                    xs.length === expected.length
                );
            })
        );
    });

    it('should return `undefined` when doesn\'t find element at indice', () => {
        [undefined, null, {}].forEach(x => expectError(() => findIndices(99, x)));
    });
});
