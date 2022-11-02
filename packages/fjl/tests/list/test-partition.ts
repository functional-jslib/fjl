import {partition} from "../../src/list";
import {alphabetArray, alphabetString, isVowel, vowelsArray} from "../helpers";

describe('#partition', () => {
    const nonVowels = alphabetArray.filter(x => !isVowel(x));
    (<[Parameters<typeof partition>, ReturnType<typeof partition>][]>[
      [[isVowel, []], [[], []]],
      [[isVowel, alphabetArray], [vowelsArray, nonVowels]],
    ])
      .forEach(([args, expected]) => {
        it(`partition(${args.map(x => JSON.stringify(x)).join(', ')}) === ` +
          `${JSON.stringify(expected)}`, function () {
          const rslt = partition(...args);
          expect(rslt).toEqual(expected);
        });
      });
});

