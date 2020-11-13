import { /*expectEqual,*/ vowelsArray, vowelsString } from "../helpers";
import { insert } from "../../packages/list/insert";
const toJson = JSON.stringify;
describe(`#list.insert`, () => {
    [
        [['a', ''], 'a'],
        [['a', []], ['a']]
    ]
        .concat(vowelsArray.flatMap((x, i) => [
        [[x, vowelsArray], vowelsArray.slice(0, i).concat([x], vowelsArray.slice(i))],
        [[x, vowelsString], vowelsString.substring(0, i) + x + vowelsString.substring(i, vowelsString.length)],
    ]))
        .forEach(([args, expected]) => {
        // console.log('args: ', args);
        it(`insert(${toJson(args[0])}, ${toJson(args[1])}) === ${toJson(expected)}`, () => {
            expect(insert(...args)).toEqual(expected);
        });
    });
});
//# sourceMappingURL=test-insert.js.map