import {apply, $apply, UnitNary} from "../../src";

const {stringify} = JSON;

describe('#apply, #$apply', () => {
  const add = (...nums) => nums.reduce((a, b) => a + b, 0);

  (<[Parameters<typeof apply>, ReturnType<typeof apply>][]>(() => {
    const ctrl = [1, 2, 3, 4, 5];
    const out = [];
    for (let i = 0; i <= 5; i += 1) {
      const ctrlSlice = ctrl.slice(0, i);
      const applyArgs = [add, ctrlSlice] as [UnitNary, number[]];
      out.push([applyArgs, add(...ctrlSlice)]);
    }
    return out;
  })())
    .forEach(([args, expected]) => {
      it(`apply(${add.name}, ${stringify(args[1])}) === ${stringify(expected)}`, () => {
        expect(apply(...args)).toEqual(expected);
        expect($apply(args[0])(args[1])).toEqual(expected);
      });
    })
});
