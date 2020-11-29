/**
 * Created by elydelacruz on 3/25/16.
 * @todo finish the class (BooleanFilter).
 */
import {assign, assignDeep, keys, isBoolean, isArray, isNumber, isString, until,
defineEnumProp} from 'fjl';

export const toBooleanFilterOptions = options => {
        const _options = defineEnumProps([
            [Boolean, 'allowCasting', true],
            [Boolean, 'translations', {}],
            [Array, 'conversionRules', []],
        ], {});
        return options ? assignDeep(_options, options) : _options;
    },

    castingRules = {
        boolean:    castBoolean,
        integer:    castInteger,
        float:      castFloat,
        string:     castString,
        null:       castNull,
        array:      castArray,
        object:     castObject,
        byNative:   castByNative,
        falseString: castFalseString,
        yesNo:      castYesNo
    },

    booleanFilter = (options, value) => {
        const {allowCasting, conversionRules, translations} =
            toBooleanFilterOptions(options);
        let retVal = false;
        if (isBoolean(value) || !allowCasting) {
            retVal = value;
        }
        else if (!options) {
            retVal = castByNative(value);
        }
        else if (conversionRules) {
            retVal = castValue(value, conversionRules, translations);
        }
        return retVal;
    }

;

function castFromTranslations(translations, value) {
    const lowerCasedValue = (value + '').toLowerCase();
    if (!lowerCasedValue.length) { return; }
    const result = keys(translations)
        .filter(key => key.toLowerCase() === lowerCasedValue)
        .map(key => translations[key])
        .shift();
    return isBoolean(result) ? result : undefined;
}

function toConversionRules (rules) {
    if (!rules) { return []; }
    if (rules && rules.indexOf(/all/i) > -1) {
        let out = new Set(keys(castingRules));
        out.delete('byNative');
        return Array.from(out.values());
    }
    return rules;
}

function castValue (value, conversionRules, translations) {
    if (!conversionRules.length) { // if no rules, convert by native casting
        return castByNative(value);
    }
    const rules = toConversionRules(conversionRules),
        result = until (
            ([rules, lastResult], _, list) => isBoolean(lastResult) || !list.length,
            ([rules]) => [rules, rules.shift()(value, translations)],
            [rules.map(rule => castingRules[rule]), null]
        );
    return isBoolean(result) ? result : false;
}

function castBoolean(value) {
    return isBoolean(value) ? value : undefined;
}

function castInteger(value) {
    return isNumber(value) ? value !== 0 : undefined;
}

function castFloat(value) {
    return isNumber(value) ? Number(value.toFixed(1)) !== 0.0 : undefined;
}

function castString(value, translations) {
    return value && isString(value) ?
        castFromTranslations(value, translations) :
        undefined;
}

function castNull (value) {
    return value === null ? false : undefined;
}

function castArray (value) {
    return isArray(value) ? !!value.length : undefined;
}

function castObject (value) {
    return value ? !!keys(value).length : undefined;
}

function castByNative (value) {
    return Boolean(value);
}

function castFalseString (value) {
    return isString(value) ?
        ['null', 'false', 'undefined',
            '0', '[]', '{}', '""'].includes(value) :
        undefined;
}

function castYesNo (value, translations) {
    return isString(value) ?
        castFromTranslations(
            value, assign({yes: true, no: false}, translations)) :
        undefined;
}
