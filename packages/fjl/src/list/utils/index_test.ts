import {PredForSliceOf} from "../types";
import {SliceOf} from "../../platform/slice";
import {alphabetArray, expectTrue, vowelsArray, vowelsString} from "../../../tests/helpers";
import {CurryOf1} from "../../function";
import {findIndexWhere, findIndexWhereRight, genericAscOrdering, lastIndex, lengths, sliceFrom} from "./index";

const getPredForEqualTo = <T>(a: T): PredForSliceOf<T> => (b: T): boolean => a === b;

describe(`#findIndexWhere`, () => {
  (<[PredForSliceOf<any>, SliceOf<any>, number][]>[]
    .concat(
      // Falsy variations
      alphabetArray.slice(0)
        .filter(x => vowelsString.indexOf(x) === -1)
        .slice(0, vowelsString.length) // take only enough for tests
        .flatMap(x => {
          const pred = getPredForEqualTo(x);
          return [
            [pred, vowelsArray, -1],
            [pred, vowelsString, -1],
          ];
        }),

      // Truthy variations
      vowelsArray.flatMap((x, i) => {
        const pred = getPredForEqualTo(x);
        return [
          [pred, vowelsArray, i],
          [pred, vowelsString, i],
        ];
      })
    ))
    .forEach(([pred, slice, expectedIndex]) => {
      it(`findIndexWhere(${pred.toString()}, ${JSON.stringify(slice)}) === ${JSON.stringify(expectedIndex)}`, () => {
        const result = findIndexWhere(pred, slice);
        expect(result).toEqual(expectedIndex);
      });
    });
});

describe(`#findIndexWhereRight`, () => {
  (<[PredForSliceOf<any>, SliceOf<any>, number][]>[]
    .concat(
      // Falsy variations
      alphabetArray.slice(0)
        .filter(x => vowelsString.indexOf(x) === -1)
        .slice(0, vowelsString.length) // take only enough for tests
        .flatMap(x => {
          const pred = getPredForEqualTo(x);
          return [
            [pred, vowelsArray, -1],
            [pred, vowelsString, -1],
          ];
        }),

      // Truthy variations
      vowelsArray.flatMap((x, i) => {
        const pred = getPredForEqualTo(x);
        return [
          [pred, vowelsArray, i],
          [pred, vowelsString, i],
        ];
      })
    ))
    .forEach(([pred, xs, expectedIndex]) => {
      it(`findIndexWhereRight(${pred.toString()}, ` +
        `${JSON.stringify(xs)}) === ${JSON.stringify(expectedIndex)}`, () => {
        const result = findIndexWhereRight(pred, xs);
        expect(result).toEqual(expectedIndex);
      });
    });
});

describe('#genericAscOrdering', () => {
  (<[[any, any], number][]>[
    [['a', 'b'], -1],
    [['a', 'a'], 0],
    [['b', 'a'], 1],
    [[0, 1], -1],
    [[1, 0], 1],
    [[1, 1], 0]
  ]).forEach(([args, expected]) => {
    it(`genericAscOrdering(${args[0]}, ${args[1]}) === ${expected}`, () => {
      const result = genericAscOrdering(...args);
      expect(result).toEqual(expected);
    });
  });
});

describe('#lastIndex', () => {
  (<[SliceOf<any>, number][]>[
    ['', -1],
    [[], -1],
    [vowelsString, vowelsString.length - 1],
    [vowelsArray, vowelsArray.length - 1],
    [alphabetArray, alphabetArray.length - 1],
  ])
    .forEach(([subject, expected]) => {
      it(`lastIndex(${JSON.stringify(subject)}) === ${expected}`, function () {
        expect(lastIndex(subject)).toEqual(expected);
      });
    });
});

describe('#lengths', () => {
  (<[SliceOf<any>[], number[]][]>[
    (vowelsArray.reduce((agg, c, i) => {
      agg[0].push(vowelsArray.slice(0, i + 1))
      agg[1].push(i + 1);
      return agg;
    }, [[[]], [0]])),
  ])
    .forEach(([xss, expected]) => {
      it(`lengths(${JSON.stringify(xss)} === ${JSON.stringify(expected)}`, () => {
        const rslt = lengths(...xss);
        expect(rslt).toEqual(expected);
      });
    });
});

describe('#reduce', () => {
  it('should have more tests', function () {
    expect(true).toEqual(false);
  });
});

describe('#reduceRight', () => {
  it('should have more tests', function () {
    expect(true).toEqual(false);
  });
});

describe('#reduceUntil', () => {
  it('should have more tests', function () {
    expect(true).toEqual(false);
  });
});

describe('#reduceUntilRight', () => {
  it('should have more tests', function () {
    expect(true).toEqual(false);
  });
});

describe(`#sliceCopy`, () => {
  it('should have more tests', () => {
    expect(true).toEqual(false);
  });
});

describe('#sliceFrom', () => {
  it('should be curried', () => {
    vowelsArray
      .map((_, ind) => sliceFrom(ind) as unknown as CurryOf1<SliceOf<any>, SliceOf<any>>)
      .forEach((fn, ind) => {
        const result = fn(vowelsArray);
        // Compare slices
        expect(result).toEqual(vowelsArray.slice(ind, vowelsArray.length)); // deep equal

        // Compare lengths (calculated)
        expect(vowelsArray.length - ind).toEqual(result.length);
      });
  });
  it('should create a slice of an array "from" given index.', () => {
    alphabetArray.forEach((_, ind, list) => {
      const result = sliceFrom(ind, list);

      // Compare slices
      expect(result).toEqual(list.slice(ind, list.length)); // deep equal

      // Compare lengths (calculated)
      expect(alphabetArray.length - ind).toEqual(result.length);
    });
  });
  it('should return an empty slice when given an empty slice', () => {
    expect(sliceFrom(99, [])).toEqual([]);
  });
  it('should throw an error when not receiving a `ListLike` (a sliceable, an array, and/or string).', () => {
    [null, undefined, {}, false, 0].forEach((x: any) => {
      expect(() => sliceFrom(99, x)).toThrow(Error);
    });
  });
});

describe(`#sliceTo`, () => {
  it('should have more tests', () => {
    expect(true).toEqual(false);
  });
});

describe(`#swapped`, () => {
  it('should have more tests', () => {
    expect(true).toEqual(false);
  });
});

describe(`#toShortest`, () => {
  it('should have more tests', () => {
    expect(true).toEqual(false);
  });
});
