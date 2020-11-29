import {stringTrimFilter as stringTrim} from '../src/StringTrimFilter';
import {expect} from 'chai';

describe ('StringTrimFilter', function () {
    describe ('#stringTrim', function () {
        test ('should trim spaces from both front and end of a string', function () {
            expect(stringTrim(' hello world ')).to.equal('hello world');
        });
        test ('should return empty string when receiving empty string', function () {
            expect(stringTrim('')).to.equal('');
        });
    });
});
