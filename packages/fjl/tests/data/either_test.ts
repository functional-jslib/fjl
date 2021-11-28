import {
  defaultLeftErrMsgTmpl,
  either,
  isLeft,
  isRight,
  left,
  Left, right,
  Right, toEither,
  toLeft,
  toRight
} from '../../src/data/either';
import {falsyList, truthyList} from "../helpers";

const methodNames = ['ap', 'map', 'flatMap', 'join'];

describe('#Left', () => {
  test('should return an instance of `Left`', () => {
    expect(new Left() instanceof Left).toEqual(true);
  });

  test('should be extendable', () => {
    class Hello<T> extends Left<T> {
      constructor(something?: T) {
        super(something);
      }
    }

    expect(new Hello()).toBeInstanceOf(Left);
  });

  ((): void => {
    const left = Left.of();
    methodNames.forEach(methodName => {
      it(`#Left.${methodName} instanceof Function === true`, function () {
        expect(left[methodName]).toBeInstanceOf(Function);
      });
    });
  })();

  test('Expect `map` and `flatMap` should return instances of `Left`', () => {
    expect(Left.of('something').map(x => x)).toBeInstanceOf(Left);
    expect(Left.of('something-else').flatMap(x => Left.of(x))).toBeInstanceOf(Left);
  });

  test('Expect calling `ap` on a `#Left` to return containing value of `Left`', () => {
    const value = 'Hello World',
      left = Left.of(value);
    left.ap(Right.of('99')).map(x => expect(x).toEqual(value));
  });

  test('#join should return whatever is contained within `Left`', () => {
    expect(Left.of(99).join()).toEqual(99);
  });
});

describe('`isLeft`', () => {
  test('should return `true` when value is a `Left`', () => {
    [Left.of(), new Left(), Left.of()].forEach(x => {
      expect(isLeft(x)).toEqual(true);
    });
  });
  test('should return `false` when a value is not a `Left`', () => {
    [false, 0, (): void => null, [], {}].forEach(x => {
      expect(isLeft(x)).toEqual(false);
    });
  });
});

describe('#Right', () => {
  test('should return an instance of `Right`', () => {
    expect(new Right() instanceof Right).toEqual(true);
  });
  test('should be extendable', () => {
    class Hello<T> extends Right<T> {
    }

    expect(new Hello()).toBeInstanceOf(Right);
  });

  ((): void => {
    const right = Right.of();
    methodNames.forEach(methodName => {
      it(`#Left.${methodName} instanceof Function === true`, function () {
        expect(right[methodName]).toBeInstanceOf(Function);
      });
    });
  })();

  test('Expect `map`, `flatMap`, and `join` methods to return a new instance of `Right`', () => {
    const right = Right.of('Only right');
    // expect(Right.of(right).join()).toBeInstanceOf(Right);
    expect(right.map(x => x)).toBeInstanceOf(Right);
    expect(right.flatMap(x => Right.of(x))).toBeInstanceOf(Right);
  });
  test('Expect calling `ap` on a `#Right` to return containing value of `Right`', () => {
    const value = 'Hello World',
      right = Right.of(value);
    right.ap(Right.of('99')).map(x => expect(x).toEqual(value));
  });
});

describe('`isRight`', () => {
  test('should return `true` when value is a `Right`', () => {
    [Right.of(), new Right(), Right.of()].forEach(x => {
      expect(isRight(x)).toEqual(true);
    });
  });
  test('should return `false` when a value is not a `Right`', () => {
    [false, 0, (): void => null, [], {}].forEach(x => {
      expect(isRight(x)).toEqual(false);
    });
  });
});

describe('#toRight', () => {
  (<[string, any, any][]>[
      ['toRight(Right<"string">) === right("string")', right("string"), right("string")],
      ['toRight(Right<Left<"Err msg">>) === right(left("Err msg"))', left("Err msg"), right(left("Err msg"))]
    ].concat(
      [null, undefined].map(x => [`toRight(${x}) === right(${x})`, x, right(x)]),
      truthyList.map(x => [`toRight(${x}) === right(${x})`, x, right(x)]) as ConcatArray<any>
    )
  )
    .forEach(([testName, control, expected]) => {
      it(testName, function () {
        const result = toRight(control);
        expect(result).toBeInstanceOf(expected.constructor);
        expect(result.valueOf()).toEqual(expected.valueOf());
      });
    });
});

describe('#toLeft', () => {
  (<[string, any, any][]>[
      ['toLeft(Left("Error message") === left("Error message")', left("Error message"), left("Error message")],
      ['toLeft(Right("Success") === left(right("Success"))', right("Success"), left(right("Success"))]
    ].concat(
      [null, undefined].map(x => [`toLeft(${x}) === left(${x})`, x, left(x)]),
      truthyList.map(x => [`toLeft(${x}) === left(${x})`, x, left(x)]) as ConcatArray<any>
    )
  )
    .forEach(([testName, control, expected]) => {
      it(testName, function () {
        const result = toLeft(control);
        expect(result).toBeInstanceOf(expected.constructor);
        expect(result.valueOf()).toEqual(expected.valueOf());
      });
    });
});

describe('#either', () => {
  const successMessage = 'Success message.';
  [].concat(
    truthyList.map(x => [toRight(x), successMessage]),
    falsyList.map(x => [toLeft(x), defaultLeftErrMsgTmpl(x)]),
    [
      [toRight(), successMessage],
      [toLeft(), defaultLeftErrMsgTmpl()]
    ])
    .forEach(([arg, expected]) => {
      it(`either(A, B) === ${JSON.stringify(expected)}`, () => {
        const result = either(() => expected, () => successMessage, arg);
        expect(result).toEqual(expected);
      });
    });
});

describe('#toEither', () => {
  (<[string, any, any][]>[
      ['toEither(Left("Error message") === Left("Error message")', left("Error message"), left("Error message")],
      ['toEither(Right("Success") === Right("Success")', right("Success"), right("Success")]
    ].concat(
      [null, undefined].map(x => [`toEither(${x}) === left(${x})`, x, left(x)]),
      truthyList.map(x => [`toEither(${x}) === right(${x})`, x, right(x)]) as ConcatArray<any>
    )
  )
    .forEach(([testName, control, expected]) => {
      it(testName, function () {
        const result = toEither(control);
        expect(result).toBeInstanceOf(expected.constructor);
        expect(result.valueOf()).toEqual(expected.valueOf());
      });
    });
});
