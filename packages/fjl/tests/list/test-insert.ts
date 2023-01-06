import {/*expectEqual,*/ vowelsArray, vowelsString} from "../helpers";
import {insert} from "../../src/list/insert";

const toJson = JSON.stringify;

describe(`#list.insert`, () => {
  (<[Parameters<typeof insert>, ReturnType<typeof insert>][]>[
    [['a', []], ['a']]
  ]
    .concat(
      vowelsArray.flatMap((x, i) => [
          [[x, vowelsArray], vowelsArray.slice(0, i).concat([x], vowelsArray.slice(i))],
        ]
      )
    ))
    .forEach(([args, expected]) => {
      // console.log('args: ', args);
      it(`insert(${toJson(args[0])}, ${toJson(args[1])}) === ${toJson(expected)}`, () => {
        expect(insert(...args)).toEqual(expected);
      });
    });
});
