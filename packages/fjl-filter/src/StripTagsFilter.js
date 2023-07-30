/**
 * Created by elydelacruz on 3/25/16.
 */
import {assign, defineEnumProps, errorIfNotType} from 'fjl';

// @todo hard code the generated unicode values below
const stripEscapeSeqHead = x => x.substr(2),

    wrapUnicodeClass = x => `\\u{${x}}`,

    hexRangeToUnicodeRange = rangeStr => {
        const [from, to] = rangeStr.split('-'),
            fromNum = stripEscapeSeqHead(from),
            toNum = stripEscapeSeqHead(to),
            fromStrRep = wrapUnicodeClass(fromNum),
            toStrRep = wrapUnicodeClass(toNum);
        return `${fromStrRep}-${toStrRep}`;
    },

    nameStartCharHexRanges = [
        '\\xC0-\\xD6',
        '\\xD8-\\xF6',
        '\\xF8-\\x2FF',
        '\\x370-\\x37D',
        '\\x37F-\\x1FFF',
        '\\x200C-\\x200D',
        '\\x2070-\\x218F',
        '\\x2C00-\\x2FEF',
        '\\x3001-\\xD7FF',
        '\\xF900-\\xFDCF',
        '\\xFDF0-\\xFFFD',
        '\\x10000-\\xEFFFF'
    ]
        .map(hexRangeToUnicodeRange), // @todo Hard code generated values

    nameCharHexRanges = [
        '\\x0300-\\x036F',
        '\\x203F-\\x2040'
    ]
        .map(hexRangeToUnicodeRange) // @todo Hard code generated values
;

// Xml names and tokens
// Valid html tag and attribute names and
// @see https://www.w3.org/TR/xml/#sec-terminology
// @see https://www.w3.org/TR/xml/#NT-Name
export const

    contextName = 'StripTagsFilter',

    nameStartCharPartial = nameStartCharHexRanges
        .concat([':_a-zA-Z']).join(''), // `"\\u{3A}" === String.fromCharCode(0x3A)` same as ":"

    nameCharPartial = nameStartCharPartial +
        ['\\-\\.0-9' + wrapUnicodeClass(stripEscapeSeqHead('\\xB7'))]
            .concat( nameCharHexRanges).join(''),

    namePartial = `[${nameStartCharPartial}][${nameCharPartial}]*`,

    eqPartial = '\\s?=\\s?',

    mlnSpacePartial = '[\\n\\r\\t\\s]*', // our own

    attrValuePartial = '"[^"]*"',

    attrPartial = `${namePartial + eqPartial + attrValuePartial}`,

    tagNameRegex = new RegExp(`^${namePartial}$`, 'u'),

    validateName = tag => tagNameRegex.test(tag),

    validateNames = tags => tags.every(validateName),

    stripComments = value => value.replace(/<!--[\t\n\r\s]*.+[\t\n\r\s]*-->/gm, ''),

    createTagRegexPartial = tag => `(<\\/?(${tag})(?:${mlnSpacePartial + attrPartial})*${mlnSpacePartial}>)*`,

    stripTags = (value, tags) => {
        const localContextName = contextName + '.stripTags';
        errorIfNotType(String, localContextName, 'value', value);
        errorIfNotType(Array, localContextName, 'tags', tags);
        if (!validateNames(tags)) {
            throw new Error(`Type Format Error: ${localContextName} expects tag names passed in ` +
                `to conform to html tag/element name format.  Please review passed in tags`);
        }
        return tags.reduce((out, tag) => {
            const regex = new RegExp(createTagRegexPartial(tag), 'gum');
            return out.replace(regex, '');
        }, value);
    },

    stripAttribs = (value, attribs) => {
        const localContextName = contextName + '.stripAttribs';
        errorIfNotType(String, localContextName, 'value', value);
        errorIfNotType(Array, localContextName, 'attribs', attribs);
        if (!validateNames(attribs)) {
            throw new Error(`Type Format Error: ${localContextName} expects attribute names passed in ` +
                `to conform to html tag/element attribute name format.  Passed in attribute names: ${attribs.join(', ')}.`);
        }
        let out = value;
        attribs.forEach(function (attrib) {
            const regex = new RegExp(
                        '([\\n\\r\\t\\s]*' + attrib + '=\\"[^\\"]*\\")',
                    'gim'
                );
            out = out.replace(regex, '');
        });
        return out;
    },

    filter = (value, tags, attribs, removeComments) => {
        return stripTags(removeComments ? stripComments(value) : value, tags, attribs);
    }

;

export class StripTagsFilter {
    constructor (options) {
        defineEnumProps([
            [Array, 'tags', []],
            [Boolean, 'stripComments', false],
            [Array, 'attribs', []]
        ], this);
        if (options) {
            assign(this, options);
        }
    }

    filter (value) {
        return StripTagsFilter.filter(
            value,
            this.tags,
            this.attribs,
            this.stripComments
        );
    }
}

Object.defineProperties(StripTagsFilter, {
    filter: {value: filter, enumerable: true}
});

export default StripTagsFilter;
