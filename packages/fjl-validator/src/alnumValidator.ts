/**
 * Created by Ely on 1/21/2015.
 * Module for validating alpha-numeric values.
 * @module alnumValidator
 */
import {regexValidator} from './regexValidator';
import {assignDeep, curry} from 'fjl';
import {ValidatorOptions, ValidatorResult} from "./ValidationUtils";

export const

  $alnumValidator = <T>(options: ValidatorOptions<T>, value: T): ValidatorResult =>
    regexValidator(assignDeep({
      pattern: /^[\da-z]+$/i,
      messageTemplates: {
        DOES_NOT_MATCH_PATTERN: (x: T): string =>
          `Value is not alpha-numeric.  Value received: '${x}'.`
      }
    }, options), value),

  alnumValidator = curry($alnumValidator),

  alnumValidator1 = <T>(value: T): ValidatorResult => alnumValidator(null, value)

;

export default alnumValidator;
