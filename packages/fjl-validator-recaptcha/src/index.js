/**
 * Created by elydelacruz on 6/10/16.
 * @module fjlValidatorReCaptcha
 * @recaptchaVersion v2
 * @reference see below:
 * @see https://developers.google.com/recaptcha/docs/
 * @see https://developers.google.com/recaptcha/docs/verify
 * @todo Request handlers should be separated out from inlined definitions
 */
import https from 'https';
import querystring from 'querystring';
import {getErrorMsgByKey as getErrorMessageByKey, toValidationResult, toValidationOptions} from 'fjl-validator';
import {assign, assignDeep, isEmpty, curry, flip, defineEnumProps} from 'fjl';

export const

    /**
     * @memberOf module:fjlValidatorReCaptcha
     * @property MISSING_INPUT_SECRET
     * @type {string}
     */
    MISSING_INPUT_SECRET = 'missing-input-secret',

    /**
     * @memberOf module:fjlValidatorReCaptcha
     * @property INVALID_INPUT_SECRET
     * @type {string}
     */
    INVALID_INPUT_SECRET = 'invalid-input-secret',

    /**
     * @memberOf module:fjlValidatorReCaptcha
     * @property MISSING_INPUT_RESPONSE
     * @type {string}
     */
    MISSING_INPUT_RESPONSE = 'missing-input-response',

    /**
     * @memberOf module:fjlValidatorReCaptcha
     * @property INVALID_INPUT_RESPONSE
     * @type {string}
     */
    INVALID_INPUT_RESPONSE = 'invalid-input-response',

    /**
     * @memberOf module:fjlValidatorReCaptcha
     * @proerpty BAD_REQUEST
     * @type {string}
     */
    BAD_REQUEST = 'bad-request',

    /**
     * @memberOf module:fjlValidatorReCaptcha
     * @property UNKNOWN_ERROR
     * @type {string}
     */
    UNKNOWN_ERROR = 'unknown-error',

    /**
     * Normalizes value object to be tested by `reCaptchaValidator`.
     * @function module:fjlValidatorReCaptcha.toReCaptchaTestValue
     * @param incoming {Object} - Incoming 'un-normalized' test value object; E.g. `{secret: '', resonse: '', etc...}`
     * @param [outgoing={}]{Object} - Optional.  Outgoing object to apply enumerable prop getters and setters to.
     * @returns {ReCaptchaTestValue} - In the form of `{secret, response, remoteip}`.
     * @throws {Error} - If any of `secret`, `response`, or `remoteip` are passed in with values
     *  containing anything other than values of type String.
     */
    toReCaptchaTestValue = (incoming, outgoing = {}) =>
        assign(defineEnumProps([
            [String, 'secret'],
            [String, 'remoteip'],
            [String, 'response']
        ], outgoing), incoming),

    /**
     * Normalizes value object to be tested by `reCaptchaValidator`.
     * @function module:fjlValidatorReCaptcha.toReCaptchaValidatorOptions
     * @param options {Object} - Incoming 'un-normalized' test value object; E.g. `{secret: '', resonse: '', etc...}`
     * @param [outgoing={}]{Object} - Optional.  Outgoing object to apply enumerable prop getters and setters to.
     * @returns {ReCaptchaValidatorOptions} - `{requestOptions {Object}, messageTemplates {Object}}`.
     * @throws {Error} - If any of the passed object's properties do not match expected types.
     */
    toReCaptchaValidatorOptions = (options, outgoing = {}) =>
         // @note `toValidationOptions` sets getter and setter for 'messageTemplates', 'valueObscured', and `valueObscurer`
        assignDeep(
            defineEnumProps([[Object, 'requestOptions', {}]], toValidationOptions(outgoing)),
            {
                requestOptions: {
                    host: 'www.google.com',
                    path: '/recaptcha/api/siteverify',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },
                messageTemplates: {
                    [MISSING_INPUT_SECRET]: 'The secret parameter is missing.',
                    [INVALID_INPUT_SECRET]: 'The secret parameter is invalid or malformed.',
                    [MISSING_INPUT_RESPONSE]: 'The response parameter is missing.',
                    [INVALID_INPUT_RESPONSE]: 'The response parameter is invalid or malformed.',
                    [BAD_REQUEST]: 'Bad request',
                    [UNKNOWN_ERROR]: 'Unknown error.'
                }
            },
            options || {}
        ),

    /**
     * Makes request to reCaptchaV2 service using passed in options and test value.
     * @function module:fjlValidatorReCaptcha.makeReCaptchaRequest$
     * @param options {ReCaptchaValidatorOptions}
     * @param value {ReCaptchaTestValue}
     * @param resolve {Function} - Resolve/success callback - Receives validation result object.
     * @param reject {Function} - Reject/failure callback - Receives validation result object and errorCodes array.
     * @returns {void}
     */
    makeReCaptchaRequest$ = (options, value, resolve, reject) => {
        const messages = [],
            {secret, remoteip, response} = value;

        if (!secret) {
            messages.push(getErrorMessageByKey(options, MISSING_INPUT_SECRET, value));
        }
        if (!response) {
            messages.push(getErrorMessageByKey(options, MISSING_INPUT_RESPONSE, value));
        }
        if (messages.length) {
            resolve(toValidationResult({result: false, messages}));
            return; // Exiting explicitly here due to function being able to be used in callback style (old-style)
        }

        const formParams = {secret, remoteip, response},
            {requestOptions} = options,
            serializedParams = querystring.stringify(formParams);

        // Set content-length header
        requestOptions.headers['Content-Length'] = serializedParams.length;
        requestOptions.body = serializedParams;

        // Make request
        const validationResult = toValidationResult(),
            request = https.request(requestOptions, res => { // handle `response` (`res`)
                let body = '';
                res.setEncoding('utf8');
                res.on('data', chunk => {
                    body += chunk;
                });
                res.on('end', () => {
                    let responseData = JSON.parse(body),
                        errorCodes = responseData['error-codes'],
                        hasErrorCodes = !!errorCodes && !!errorCodes.length,
                        normalizedErrorCodes = hasErrorCodes ? errorCodes.map(x => x.toLowerCase()) : [],
                        nonEmptyErrorCodes = [];

                    // If validation failed (false, null, undefined)
                    if (!isEmpty(responseData.success)) {
                        validationResult.result = true;
                        resolve(validationResult);
                        return;
                    }

                    if (hasErrorCodes) {
                        // Add error message(s)
                        nonEmptyErrorCodes =
                            normalizedErrorCodes.filter(code =>
                                options.messageTemplates.hasOwnProperty(code));

                        // Get error messages
                        if (!nonEmptyErrorCodes.length) {
                            messages.push(getErrorMessageByKey(options, UNKNOWN_ERROR, value));
                        }

                        // Else add 'unknown error' error message
                        else {
                            nonEmptyErrorCodes.forEach(code =>
                                messages.push(getErrorMessageByKey(options, code, value)));
                        }
                    }
                    else {
                        messages.push(getErrorMessageByKey(options, UNKNOWN_ERROR, value));
                    }

                    // Set failure results
                    validationResult.result = false;
                    validationResult.messages = messages;
                    resolve(validationResult, nonEmptyErrorCodes);
                });
            });
        request.on('error', err => {
            messages.push(err);
            validationResult.messages = messages;
            validationResult.result = false;
            reject(validationResult, err);
        });
        request.write(serializedParams, 'utf8');
        request.end();
    },

    /**
     * Validates a test value against google's reCaptchaV2 backend validation service;
     * @note unlike `makeReCaptchaRequest$` this method validates/normalizes the passed in data objects before making
     * the validation request to the backend-validation-service.
     * @function module:fjlValidatorReCaptcha.reCaptchaValidator$
     * @param options {ReCaptchaValidatorOptions}
     * @param value {ReCaptchaTestValue}
     * @param resolve {Function} - Resolve/success callback - Receives validation result object.
     * @param reject {Function} - Reject/failure callback - Receives validation result object and errorCodes array.
     * @returns {void}
     */
    reCaptchaValidator$ = (options, value, resolve, reject) =>
        makeReCaptchaRequest$(
            toReCaptchaValidatorOptions(options),
            toReCaptchaTestValue(value),
            resolve, reject
        ),

    /**
     * Validates a test value against reCaptchaV2 backend service;
     * @note When a reject occurs it will receive validation result object and `errorCodes` array (which contains
     *  error code sent back by reCaptcha service.
     * @function module:fjlValidatorReCaptcha.reCaptchaIOValidator$
     * @param options {ReCaptchaValidatorOptions}
     * @param value {ReCaptchaTestValue}
     * @returns {(Promise.<ValidationResult>|Promise.<ValidationResult, Array.<String>>)}
     */
    reCaptchaIOValidator$ = (options, value) =>
        (new Promise((resolve, reject) =>
            reCaptchaValidator$(options, value, resolve, reject))
        ),

    /**
     * Curried version of `reCaptchaIOValidator$`.
     * @function module:fjlValidatorReCaptcha.reCaptchaIOValidator
     * @param options {ReCaptchaValidatorOptions}
     * @param value {ReCaptchaTestValue}
     * @returns {(Promise.<ValidationResult>|Promise.<ValidationResult, Array.<String>>)}
     * @curried - Is curried.
     */
    reCaptchaIOValidator = curry(reCaptchaIOValidator$),

    /**
     * Alias of `reCaptchaIOValidator`.
     * @function module:fjlValidatorReCaptcha.reCaptchaValidator
     * @param options {ReCaptchaValidatorOptions}
     * @param value {ReCaptchaTestValue}
     * @returns {(Promise.<ValidationResult>|Promise.<ValidationResult, Array.<String>>)}
     * @curried - Is curried.
     */
    reCaptchaValidator = reCaptchaIOValidator,

    /**
     * Same as `reCaptchaIOValidator` though with arguments flipped;
     *  Takes `value` parameter first and the `options` one second.
     * @function module:fjlValidatorReCaptcha.reCaptchaValidatorV2
     * @param value {ReCaptchaTestValue}
     * @param options {ReCaptchaValidatorOptions}
     * @returns {(Promise.<ValidationResult>|Promise.<ValidationResult, Array.<String>>)}
     * @curried - Is curried.
     */
    reCaptchaValidatorV2 = curry(flip(reCaptchaIOValidator$));

/*-------------------
 * VIRTUAL TYPES
 * @note 'reCaptcha-v2 backend service' is the backend validation service used to validate, from a backend,
 *  the frontend validation result (for reCaptchaV2).
 *-------------------*/

/**
 * @typedef {Object.<String, (Function|String)>} MessageTemplates
 * Message Templates object to get error messages from error codes received from the reCaptcha-v2 'backend' service.
 */

/**
 * @typedef {Object.<String, *>} RequestOptions
 * Options used to make request to google's reCaptcha-v2 backend-validation service.
 */

/**
 * @typedef {Object.<String, *>} ReCaptchaValidatorOptions
 * @property requestOptions {RequestOptions}
 * @property messageTemplates {MessageTemplates}
 */

/**
 * @typedef {Object.<String, String>} ReCaptchaTestValue
 * @property {String} secret - The 'secret' key sent to the google reCaptcha-v2 backend service.
 * @property {String} response - The 'response' string sent to the reCaptcha-v2 backend service.
 * @property {String} [remoteip=undefined] - Optional.  The 'remoteip' string sent to the reCaptcha-v2 backend-validation service.
 */

/**
 * @typedef {Object.<String, *>} ValidationResult
 * @property {Boolean} result - Result of validators validation (`true` or `false`).
 * @property {Array.<String>} messages - Validation failure messages;  Reasons why tested value(s) didn't pass validation.
 * @type {string}
 */
