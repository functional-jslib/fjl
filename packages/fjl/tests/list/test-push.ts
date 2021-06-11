import {push} from "../../src";
import {falsyList, truthyList} from "../helpers";

describe('#push', () => {
  (<[[any, any[]], any[]][]>[]).concat(
    falsyList.map(x => [
      [x, []],
      [x]
    ]),
    truthyList.map(x => [
      [x, []],
      [x]
    ])
  )
    .forEach(([args, expected]) => {
      it(`push(${args.map(x => JSON.stringify(x)).join(', ')}) === ${JSON.stringify(expected)}`, () => {
        const rslt = push(...args);
        expect(rslt).toEqual(expected);
        // Expect equal instances also
        expect(rslt).toEqual(args[1]);
      });
    });
});
