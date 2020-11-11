import {expectLength, expectTrue} from "../helpers";
import {permutations} from "../../packages/list/permutations";

describe('#permutations', () => {
    const areAllPermutesUnique = permutes => {
            const xs = permutes,
                limit = xs.length;
            for (let i = 0; i < limit; i += 1) {
                let str = xs[i].join('');
                for (let j = 0; j < limit; j += 1) {
                    if (j !== i && xs[j].join('') === str) {
                        return false;
                    }
                }
            }
            return true;
        },

        howManyPermutes = n => {
            if (n <= 0) {
                return 0;
            }
            let lastPermutes = 1,
                i = 1;
            while (i <= n) {
                lastPermutes = i * lastPermutes;
                i += 1;
            }
            return lastPermutes;
        };

    it('Should return unique permutations for a given set of items', () => {
        const lists: string[] =
            'abcd'.split('').reduceRight((agg, item, ind, list) =>
                    agg.concat([list.slice(ind)]),
                (<any[]>[])
            ); // I know laziness lol
        expectLength(4, lists);
        expectTrue(lists.every(
            (xs, ind) => xs.length === ind + 1
        ));
        expectTrue(
            lists.every(xs => {
                const result = permutations(xs);
                return areAllPermutesUnique(result) &&
                    howManyPermutes(xs.length) === result.length;
            })
        );
    });
});
