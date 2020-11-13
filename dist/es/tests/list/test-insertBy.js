import { genericOrdering, vowelsArray, vowelsString } from "../helpers";
import { insertBy } from "../../packages/list/insertBy";
const toJson = JSON.stringify;
describe(`#list.insertBy`, () => {
    [
        [[genericOrdering, 'a', ''], 'a'],
        [[genericOrdering, 'a', []], ['a']]
    ]
        .concat(vowelsArray.flatMap((x, i) => [
        [[genericOrdering, x, vowelsArray],
            vowelsArray
                .slice(0, i)
                .concat([x], vowelsArray.slice(i))
        ],
        [[genericOrdering, x, vowelsString],
            vowelsString.substring(0, i) +
                x + vowelsString.substring(i, vowelsString.length)
        ],
    ]))
        .forEach(([args, expected]) => {
        it(`insert(${toJson(args)}) === ${toJson(expected)}`, () => {
            expect(insertBy(...args)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-insertBy.js.map