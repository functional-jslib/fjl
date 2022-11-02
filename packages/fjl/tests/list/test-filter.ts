import {alphabetArray} from "../helpers";
import {filter} from "../../src/list/filter";

describe('#filter', () => {
  type TestName = string;

  const evenIndexChars = (_, ind): boolean => ind % 2 === 0;

  (<[TestName, Parameters<typeof filter>, ReturnType<typeof filter>][]>[
    ['Expect every other letter in `alphabetArray`',
      [evenIndexChars, alphabetArray],
      alphabetArray.filter(evenIndexChars)
    ],
    ['Expect empty array',
      [c => c === '#', alphabetArray],
      []
    ]
  ])
    .forEach(([testName, [pred, xs], expected]) => {
      it(testName, () => {
        const rslt = filter(pred, xs);
        expect(rslt).toEqual(expected);
      });
    });
});
