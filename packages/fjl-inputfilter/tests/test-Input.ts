/**
 * Created by Ely on 3/26/2016.
 */
import {curry, error, isArray, isBoolean, isEmpty, keys, peek, repeat, subsequences} from 'fjl';
import {notEmptyValidator, regexValidator, stringLengthValidator} from 'fjl-validator';
import {
  Input,
  InputOptions,
  InputValidationResult,
  runFilters,
  runIOFilters,
  runIOValidators,
  runValidators,
  toInput,
  toInputValidationResult,
  validateInput,
  validateIOInput
} from '../src/Input';
import {runHasPropTypes} from "./utils";

const toSlug = (x: string): string => (x + '').replace(/[^a-z\d\-_]+/gim, '-').toLowerCase(),
  trim = (x: string): string => x ? (x + '').trim() : x,
  isValidateInputResult = (rsltObj: any): boolean =>
    ['result', 'messages', 'value', 'rawValue', 'filteredValue', 'obscuredValue']
      .every(key => Object.prototype.hasOwnProperty.call(rsltObj, key));

describe('#toInput', function () {
  describe('#Input', function () {
    // Ensure properties on inputObj default
    [toInput(), toInput({} as InputOptions<any>)]
      .forEach(inputObj => runHasPropTypes([
        [String, 'name', ['', 99]],
        [Boolean, 'required', [true, 99]],
        [Boolean, 'breakOnFailure', [true, 99]],
        [Array, 'filters', [[], 99]],
        [Array, 'validators', [[], 99]]
      ], inputObj));
  });
  test('should return an instance with the `name` property populated when `options` parameter is a string.', function () {
    const name = 'hello';
    expect((toInput(name)).name).toEqual(name);
  });
  test('should populate all properties passed in via hash object.', function () {
    const options = {
        name: 'hello',
        breakOnFailure: true,
        fallbackValue: 'hello world'
      },
      input = toInput(options);
    // log(input);
    keys(options).forEach(function (key) {
      expect(input[key]).toEqual(options[key]);
    });
  });
});

describe('#toInputValidationResult', function () {
  // Will test for correct-value when setting it and for error throwing when
  //  setting incorrect type
  [toInputValidationResult(), toInputValidationResult({} as InputValidationResult)]
    .forEach(x => runHasPropTypes([
      [Boolean, 'result', [false, 99]],
      [String, 'name', ['correct-value', 99]],
      [Array, 'messages', [[], 99]]
    ], x));
});

describe('#runValidators', function () {
  const breakOnFailure = false;
  test('it should return a `ValidationResult` object with the expected results', function () {
    const inputOptionObjs = [
      {
        validators: [
          stringLengthValidator({min: 0, max: 99})
        ],
      },
      {
        validators: [
          notEmptyValidator(null),
          stringLengthValidator({min: 3, max: 99})
        ]
      }
    ];
    (<[InputValidationResult, InputValidationResult, number][]>[
      // [ValidationResult, ExpectedResultResult, MessagesLength]
      [runValidators(inputOptionObjs[0].validators, breakOnFailure, 'hello-world'), true, 0],
      [runValidators(inputOptionObjs[1].validators, breakOnFailure, ''), false, 2],
      [runValidators(inputOptionObjs[1].validators, breakOnFailure, repeat(100, 'a').join('')), false, 1]
    ]
      .concat(
        subsequences('hello')
          .map(x => [runValidators(inputOptionObjs[0].validators, breakOnFailure, (x as string[]).join('')), true, 0])
      ))
      .forEach(([rsltObj, expectedResult, expectedMsgsLen]) => {
        const {result, messages} = rsltObj;
        expect(result).toEqual(expectedResult);
        if (messages) {
          expect(messages.length).toEqual(expectedMsgsLen);
        }
      });
  });
  test('it should return `true` if passed in `inputObj` doesn\'t have any validators', function () {
    expect(runValidators(null, breakOnFailure, 'hello-world').result).toEqual(true);
  });

  test('when input doesn\'t have `required` set to `true` should return truthy `result` for validation result.', () => {
    const rslt = runValidators(toInput().validators, breakOnFailure, ''),
      {result, messages} = rslt;
    expect(result).toEqual(true);
    expect(messages.length).toEqual(0);
  });
});

describe('#runIOValidators', function () {
  // Prepare some IO validators (promised based validators)
  const defaulBreakOnFailure = false,
    someIOValidateNotEmpty = x => {
      const result = !isEmpty(x),
        messages = [];
      if (!result) {
        messages.push('Empty not allowed');
      }
      return Promise.resolve({result, messages});
    },
    someIOValidateLength = curry((options, x) =>
      Promise.resolve(stringLengthValidator(options, x))
    );

  test('it should return a promise whether truthy result or falsy result', function () {
    const expectedPromise = runIOValidators([
      someIOValidateNotEmpty,
      someIOValidateLength({min: 3, max: 21})
    ], defaulBreakOnFailure, '').catch(peek);
    expect(expectedPromise).toBeInstanceOf(Promise);
  });

  test('the retured promise should resolve to a validation result object ' +
    'whether falsy or truthy result.result', function () {
    return Promise.all([
      runIOValidators([
        someIOValidateNotEmpty,
        someIOValidateLength({min: 3, max: 21})
      ], defaulBreakOnFailure, ''),
      runIOValidators([
        someIOValidateNotEmpty,
        someIOValidateLength({min: 3, max: 21})
      ], defaulBreakOnFailure, 'hello-world')
    ])
      .then(results => {
        const [falsyResult, truthyResult] = results;
        expect(falsyResult.result).toEqual(false);
        expect(truthyResult.result).toEqual(true);
        expect(falsyResult.messages.length).toEqual(2);
        expect(truthyResult.messages.length).toEqual(0);
        results.forEach(rslt => {
          expect(isArray(rslt.messages)).toEqual(true);
          expect(isBoolean(rslt.result)).toEqual(true);
        });
      }, peek);
  });

  test('when input doesn\'t have `required` set to `true` should return truthy `result` for validation result.', () => {
    runIOValidators(toInput().validators, false, '') // (validators, breakOnFailure, value) => Promise<ValidationResult>
      .then(({result, messages}) => {
        expect(result).toEqual(true);
        expect(messages.length).toEqual(0);
      }, error);
  });
});

describe('#runFilters', function () {
  test('should run all filters in compositional order', function () {
    expect(runFilters([
      x => (x + '').trim(),
      x => (x + '').toLowerCase(),
      x => (x + '').replace(/[^a-z\d\-_\s]+/gim, '')
    ], '  Hello#-#World ')).toEqual('hello-world');
  });
});

describe('#runIOFilters', function () {
  test('should run all filters in compositional order', function () {
    return runIOFilters([
      x => (x + '').trim(),
      x => Promise.resolve((x + '').toLowerCase()),
      x => (x + '').replace(/[^a-z\d\-_\s]+/gim, '')
    ], '  Hello#-#World ')
      .then(x => expect(x).toEqual('hello-world'));
  });
});

describe('#validateInput', function () {
  const baseExampleOptions = {
      required: true,
      validators: [
        notEmptyValidator(null),
        stringLengthValidator({min: 5, max: 255})
      ],
      filters: [toSlug]
    },
    otherInput = {
      name: 'otherInput',
      required: true,
      validators: [
        regexValidator({pattern: /^\s?[a-z][a-z\d\-\s]+/})
      ],
      filters: [
        toSlug,
        trim
      ]
    },
    // Format `[[ValidationResult, ExpectedResultBln, ExpectedMessagesLen, ExpectedFilteredValue]]`
    results = (<[InputValidationResult, boolean, number, any?][]>[
      [validateInput(toInput({
        breakOnFailure: true,
        ...baseExampleOptions
      }) as Input<string>, ''), false, 1],

      [validateInput(toInput({
        breakOnFailure: false,
        ...baseExampleOptions
      }) as Input<string>, ''), false, 2],

      // less than min stringlength 5
      [validateInput(toInput({
        breakOnFailure: true,
        ...baseExampleOptions
      }) as Input<string>, 'abc'), false, 1],
    ])
      .concat(
        (<[string, string, Input<string>][]>[
          ['Hello World', 'hello-world', toInput(baseExampleOptions)],
          ['hello-world', 'hello-world', toInput(otherInput)],
          ['hello-99-WORLD_hoW_Are_yoU_doinG', 'hello-99-world_how_are_you_doing', toInput(otherInput)],
          ['a9_B99_999 ', 'a9_b99_999', toInput(otherInput)]
        ])
          .map(([value, expectedValue, options]) =>
            [validateInput(options, value), true, 0, expectedValue])
      )
  ;

  test('should return an input validation result object', function () {
    expect(
      results.every(([validationResult]) =>
        isValidateInputResult(validationResult)
      )
    ).toEqual(true);
  });

  test('should return expected result object for given arguments', function () {
    results.forEach(([validationResult, expectedResultBln,
                       expectedMsgsLen, expectedValue]) => {
      const {result, messages, value} = validationResult;
      expect(result).toEqual(expectedResultBln);
      if (!result) {
        return;
      }
      if (messages) {
        expect(messages.length).toEqual(expectedMsgsLen);
      }
      expect(value).toEqual(expectedValue);
    });
  });

  test('when input has `required` set to true a `notEmptyValidator` should be added to `validators`', function () {
    const rslt = validateInput(toInput({required: true}), ''),
      {result, messages} = rslt;
    expect(result).toEqual(false);
    expect(messages.length).toEqual(1);
    expect(messages[0].indexOf('Empty')).toEqual(0);
  });

  test('when input doesn\'t have `required` set to `true` should return truthy `result` for validation result.', () => {
    const rslt = validateInput(toInput(), ''),
      {result, messages} = rslt;
    expect(result).toEqual(true);
    expect(messages.length).toEqual(0);
  });
});

describe('#validateIOInput', function () {
  const baseExampleOptions = {
      required: true,
      validators: [
        stringLengthValidator({min: 5, max: 255})
      ],
      filters: [toSlug]
    },
    otherInput = {
      name: 'otherInput',
      required: true,
      validators: [
        regexValidator({pattern: /^\s?[a-z][a-z\d\-\s]+/})
      ],
      filters: [
        toSlug,
        trim
      ]
    },
    // Format `[[ValidationResult, ExpectedResultBln, ExpectedMessagesLen, ExpectedFilteredValue]]`
    testCases = (<[Promise<InputValidationResult>, boolean, number, any?][]>[
      [validateIOInput(toInput({
        breakOnFailure: true,
        ...baseExampleOptions
      }), ''), false, 1, ''],

      [validateIOInput(toInput({
        breakOnFailure: false,
        ...baseExampleOptions
      }), ''), false, 2, ''],

      // less than min stringlength 5
      [validateIOInput(toInput({
        breakOnFailure: true,
        ...baseExampleOptions
      }), 'abc'), false, 1, 'abc'],
    ])
      .concat(
        (<[string, string, Input<string>][]>[
          ['Hello World', 'hello-world', toInput(baseExampleOptions)],
          ['hello-world', 'hello-world', toInput(otherInput)],
          ['hello-99-WORLD_hoW_Are_yoU_doinG', 'hello-99-world_how_are_you_doing', toInput(otherInput)],
          ['a9_B99_999 ', 'a9_b99_999', toInput(otherInput)]
        ])
          .map(([value, expectedValue, options]) =>
            [validateIOInput(options, value), true, 0, expectedValue])
      ),
    results = testCases.map(([rslts]) => rslts)
  ;

  test('should return an input validation result object', function () {
    return Promise.all(results)
      .then(rslts => {
        return expect(
          rslts.every(validationResult =>
            isValidateInputResult(validationResult)
          )
        ).toEqual(true);
      });
  });

  test('should return expected result object for given arguments', function () {
    return Promise.all(results)
      .then(rslts =>
        rslts.forEach((rslt, ind) => {
          const {result, messages, value} = rslt,
            [_, expectedResultBln, expectedMsgsLen, expectedValue] = testCases[ind];
          expect(result).toEqual(expectedResultBln);
          if (messages) {
            expect(messages.length).toEqual(expectedMsgsLen);
          }
          expect(value).toEqual(expectedValue);
        })
      );
  });

  test('when input has `required` set to true a `notEmptyValidator` should be added to `validators`', function () {
    return validateIOInput(toInput({required: true}), '')
      .then(({result, messages}) =>
        Promise.all([
          expect(result).toEqual(false),
          expect(messages.length).toEqual(1),
          expect(messages[0].indexOf('Empty')).toEqual(0)
        ])
      );
  });

  test('when input doesn\'t have `required` set to `true` should return truthy `result` for validation result.', () => {
    validateIOInput(toInput(), '')
      .then(({result, messages}) => {
        expect(result).toEqual(true);
        expect(messages.length).toEqual(0);
      }, error);
  });
});
