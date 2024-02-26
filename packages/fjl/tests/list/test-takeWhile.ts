import {
  alphabetArray,
  isVowel,
  nonAlphaNumsArray,
  vowelsArray,
} from "../helpers";
import {takeWhile, $takeWhile} from "../../src/list/takeWhile";

const {stringify} = JSON;

describe('#takeWhile, #$takeWhile', () => {
  function* numRange() {
    let i = 0;
    while (i++ <= 5) {
      yield i;
    }
  }

  (<[Parameters<typeof takeWhile>, ReturnType<typeof takeWhile>][]>[
    [[isVowel, vowelsArray], vowelsArray],
    [[isVowel, alphabetArray], ['a']],
    [[isVowel, numRange()], []],
    [[isVowel, nonAlphaNumsArray], []],
    [[isVowel, []], []],
  ])
    .forEach(([args, expected]) => {
      it(`takeWhile(isVowel, ${stringify(args.slice(1))}) === ${stringify(expected)}`, () => {
        expect(takeWhile(args[0], args[1])).toEqual(expected);
        expect($takeWhile(args[0])(args[1])).toEqual(expected);
      });
    });

  [null, undefined, 0, {}].forEach(x =>
    it(`should throw when: takeWhile(() => null, ${x + ''})`, () => {
      expect(() => takeWhile(() => null, x as Iterable<any>)).toThrow()
      expect(() => $takeWhile(() => null)(x as Iterable<any>)).toThrow()
    })
  );
});
