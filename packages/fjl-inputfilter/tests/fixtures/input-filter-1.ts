/**
 * An input filer case for our 'InputFilter' tests.
 * @module inputFilter1
 */
import {toInputMap} from '../../src/InputFilter';
import {regexValidator,
    stringLengthValidator as stringLength,
    digitValidator} from 'fjl-validator';
import {encodeXmlEntities} from './filters/XmlEntitiesFilter';

export const

    NUMBER_FIELD =      'num-field',
    DATE_FIELD =        'date-field',
    TIME_FIELD =        'time-field',
    DIGIT_FIELD =       'digit-field',
    TEXT_FIELD =        'text-field',
    TEXTAREA_FIELD =    'textarea-field',
    EMAIL_FIELD =       'email-field',

    // For using from the definition below
    required = true,

    inputFilter1 = toInputMap({
        [TEXT_FIELD]: {
            required,
            validators: [
                regexValidator({
                    pattern: /^[a-z][a-z'\s]+$/i,
                    messageTemplates: {
                        DOES_NOT_MATCH_PATTERN: x => `"${x}" does not match the required ` +
                            `\`${TEXT_FIELD}\` pattern.  Only ... are allowed.`
                    }
                }),
                stringLength({min: 3, max: 55})
            ]
        },
        [EMAIL_FIELD]: {
            validators: [
                stringLength({min: 3, max: 144})
            ]
        },
        [DIGIT_FIELD]: {
            required,
            validators: [
                digitValidator({}),
                stringLength({min: 10, max: 21})
            ]
        },
        [NUMBER_FIELD]: {
            validators: [
                digitValidator({
                    messageTemplates: {
                        DOES_NOT_MATCH_PATTERN: x => `"${x}" must be a number`
                    }
                })
            ]
        },
        [DATE_FIELD]: {
            required,
            validators: [
                regexValidator({ // date validator
                    pattern: /^\d{4}-\d{2}-\d{2}$/,
                    messageTemplates: {
                        DOES_NOT_MATCH_PATTERN: () => `Date format is incorrect.`
                    }
                })
            ]
        },
        [TIME_FIELD]: {
            validators: [
                regexValidator({ // time validation
                    pattern: /^\d{2}:\d{2}(?:AM|PM)?$/,
                    messageTemplates: {
                        DOES_NOT_MATCH_PATTERN: () => `${TIME_FIELD} format is incorrect.`
                    }
                }),
            ]
        },
        [TEXT_FIELD]: {
            required,
            validators: [
                regexValidator({
                    pattern: /^[a-z\d][a-z\d\s.\-,"'\n\t\r]+$/im,
                    messageTemplates: {
                        DOES_NOT_MATCH_PATTERN: () =>
                            `Locations format is incorrect.  ` +
                            `Only a-z, A-Z, ",", " ", 0-9, "'", """, or "-" are allowed.`
                    }
                }),
                stringLength({min: 3, max: 144})
            ]
        },
        [TEXTAREA_FIELD]: {
            filters: [
                x => x ? (x + '').trim() : x,
                encodeXmlEntities
            ],
            validators: [
                stringLength({min: 1, max: 144})
            ]
        }
    }),

    /**
     * Truthy cases data invalidMessagesMap array map.
     * @memberOf module:inputFilter1
     * @type {Array.<Array<Object.<String,*>>,Object.<String,Array>>} -
     *  Or `[[Object<String,*>, Object<String,Array]]`
     */
    truthyCasesForInputFilter1 = [
        [{
            [TEXT_FIELD]: `Romulus Von' Bomulus`,
            [EMAIL_FIELD]: 'romulus.von.bomulus@hello.com',
            [DIGIT_FIELD]: '7182903456',
            [NUMBER_FIELD]: '999',
            [DATE_FIELD]: '2018-02-10',
            [TIME_FIELD]: '01:00PM',
            [TEXTAREA_FIELD]: 'Hello World! <b>How are you doing?</b>',
        }, {}],
        [{
            [TEXT_FIELD]: `Romulus Von' Bomulus`,
            [EMAIL_FIELD]: '',
            [DIGIT_FIELD]: '7182903456',
            [NUMBER_FIELD]: null,
            [DATE_FIELD]: '2018-02-10',
            [TIME_FIELD]: undefined,
            [TEXTAREA_FIELD]: 'Hello World! <b>How are you doing?</b>',
        }, {}]
    ],

    /**
     * Falsy cases data invalidMessagesMap array map.
     * @memberOf module:inputFilter1
     * @type {Array.<Array<Object.<String,*>>,Object.<String,Array>>} -
     *  Or `[[Object<String,*>, Object<String,Array]]`
     */
    falsyCasesForInputFilter1 = [
        [{
            [TEXT_FIELD]: '',               // required (should fail)
            [EMAIL_FIELD]: 'abc@hello.com',
            [DIGIT_FIELD]: '',              // required (should fail)
            [NUMBER_FIELD]: '999',
            [DATE_FIELD]: '2018-02-10a',    // should fail ('has a letter in it')
            [TIME_FIELD]: '01:00PM',
            [TEXTAREA_FIELD]: '',           // should fail (required)
        }, {
            [TEXT_FIELD]: [],
            [DIGIT_FIELD]: [],
            [DATE_FIELD]: []
        }],
        [{
            [TEXT_FIELD]: `Romulus Von' Bomulus`,
            [EMAIL_FIELD]: '',
            [DIGIT_FIELD]: '7182903456s',   // should fail (only digits allowed here)
            [NUMBER_FIELD]: null,
            [DATE_FIELD]: '2018-02-10',
            [TIME_FIELD]: undefined,
            [TEXTAREA_FIELD]: 'Hello World! <b>How are you doing?</b>',
        }, {
            [DIGIT_FIELD]: []
        }]
    ];
