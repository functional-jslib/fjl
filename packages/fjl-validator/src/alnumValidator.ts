/**
 * Created by Ely on 1/21/2015.
 * Module for validating alpha-numeric values.
 * @module alnumValidator
 */
import {regexValidator} from './regexValidator';
import {assignDeep, curry} from 'fjl';

export const

  alnumValidator = curry((options, value) =>
    regexValidator(assignDeep({
      pattern: /^[\da-z]+$/i,
      messageTemplates: {
        DOES_NOT_MATCH_PATTERN: x =>
          `Value is not alpha-numeric.  Value received: '${x}'.`
      }
    }, options), value)
  ),

  alnumValidator1 = value => alnumValidator(null, value)

;

export default alnumValidator;
