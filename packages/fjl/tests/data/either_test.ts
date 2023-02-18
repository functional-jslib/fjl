import {
  defaultLeftErrMsgTmpl,
  either,
  isLeft,
  isRight,
  Left,
  Right,
} from '../../src/data/either';
import {falsyList, truthyList} from "../helpers";

const methodNames = ['ap', 'map', 'flatMap', 'join'];

describe('#Left', () => {
  test('should return an instance of `Left`', () => {
    // @ts-ignore
    expect(new Left() instanceof Left).toEqual(true);
  });

  test('should be extendable', () => {
    // @ts-ignore
    class Hello<T> extends Left<T> {
      constructor(something?: T) {
        super(something);
      }
    }

    expect(new Hello()).toBeInstanceOf(Left);
  });

  ((): void => {
    const left = Left();
    methodNames.forEach(methodName => {
      it(`#Left.${methodName} instanceof Function === true`, function () {
        expect(left[methodName]).toBeInstanceOf(Function);
      });
    });
  })();

  test('Expect `map` and `flatMap` should return instances of `Left`', () => {
    expect(Left('something').map(x => x)).toBeInstanceOf(Left);
    expect(Left('something-else').flatMap(x => Left(x))).toBeInstanceOf(Left);
  });

  test('Expect calling `ap` on a `#Left` to return containing value of `Left`', () => {
    const value = 'Hello World',
      left = Left(value);
    left.ap(Right('99')).map(x => expect(x).toEqual(value));
  });

  test('#join should return whatever is contained within `Left`', () => {
    expect(Left(99).join()).toEqual(99);
  });
});

describe('`isLeft`', () => {
  test('should return `true` when value is a `Left`', () => {
    [ // @ts-ignore
      new Left(),
      Left()].forEach(x => {
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
    const right = Right();
    methodNames.forEach(methodName => {
      it(`#Left.${methodName} instanceof Function === true`, function () {
        expect(right[methodName]).toBeInstanceOf(Function);
      });
    });
  })();

  test('Expect `map`, `flatMap`, and `join` methods to return a new instance of `Right`', () => {
    const right = Right('Only right');
    // expect(Right(right).join()).toBeInstanceOf(Right);
    expect(right.map(x => x)).toBeInstanceOf(Right);
    expect(right.flatMap(x => Right(x))).toBeInstanceOf(Right);
  });
  test('Expect calling `ap` on a `#Right` to return containing value of `Right`', () => {
    const value = 'Hello World',
      right = Right(value);
    right.ap(Right('99')).map(x => expect(x).toEqual(value));
  });
});

describe('`isRight`', () => {
  test('should return `true` when value is a `Right`', () => {
    [ // @ts-ignore
      new Right(),
      Right()].forEach(x => {
      expect(isRight(x)).toEqual(true);
    });
  });
  test('should return `false` when a value is not a `Right`', () => {
    [false, 0, (): void => null, [], {}].forEach(x => {
      expect(isRight(x)).toEqual(false);
    });
  });
});

describe('#Right(', () => {
  (<[string, any, any][]>[
      ['Right(Right<"string">) === Right("string")', Right("string"), Right("string")],
      ['Right(Right<Left<"Err msg">>) === Right(Left("Err msg"))', Left("Err msg"), Right(Left("Err msg"))]
    ].concat(
      [null, undefined].map(x => [`Right(${x}) === Right(${x})`, x, Right(x)]),
      truthyList.map(x => [`Right(${x}) === Right(${x})`, x, Right(x)]) as ConcatArray<any>
    )
  )
    .forEach(([testName, control, expected]) => {
      it(testName, function () {
        const result = Right(control);
        expect(result).toBeInstanceOf(expected.constructor);
        expect(result.valueOf()).toEqual(expected.valueOf());
      });
    });
});

describe('#Left(', () => {
  (<[string, any, any][]>[
      ['Left(Left("Error message") === Left("Error message")', Left("Error message"), Left("Error message")],
      ['Left(Right("Success") === Left(Right("Success"))', Right("Success"), Left(Right("Success"))]
    ].concat(
      [null, undefined].map(x => [`Left(${x}) === Left(${x})`, x, Left(x)]),
      truthyList.map(x => [`Left(${x}) === Left(${x})`, x, Left(x)]) as ConcatArray<any>
    )
  )
    .forEach(([testName, control, expected]) => {
      it(testName, function () {
        const result = Left(control);
        expect(result).toBeInstanceOf(expected.constructor);
        expect(result.valueOf()).toEqual(expected.valueOf());
      });
    });
});

describe('#either', () => {
  const successMessage = 'Success message.';
  [].concat(
    truthyList.map(x => [Right(x), successMessage]),
    falsyList.map(x => [Left(x), defaultLeftErrMsgTmpl(x)]),
    [
      [Right(), successMessage],
      [Left(), defaultLeftErrMsgTmpl()]
    ])
    .forEach(([arg, expected]) => {
      it(`either(A, B) === ${JSON.stringify(expected)}`, () => {
        const result = either(() => expected, () => successMessage, arg);
        expect(result).toEqual(expected);
      });
    });
});
