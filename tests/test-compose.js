/**
 * Created by elyde on 11/13/2016.
 */
// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {expect} from 'chai';
import {compose} from './../src/compose';
import {curry2} from './../src/curry';

// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('compose', function () {

    it ('should be of type function.', function () {
        expect(compose).to.be.instanceOf(Function);
    });

    it ('should return a function whether or not any parameters were passed in to it.', function () {
        expect(compose()).to.be.instanceOf(Function);
        expect(compose(console.log)).to.be.instanceOf(Function);
    });

    it ('should return a function that when used returns the passed in value if `compose` ' +
        'itself didn\'t receive any parameters.', function () {
        var result = compose();
        expect(result(99)).to.equal(99);
    });

    it ('should be able to compose an arbitrary number of functions and execute them as expected ' +
        'from generated function.', function () {
        var curry2 = curry2,
            min = curry2(Math.min),
            max = curry2(Math.max),
            pow = curry2(Math.pow),
            composed = compose(min(8), max(5), pow(2)),
            randomNum = curry2( (start, end) => Math.round(Math.random() * end + start) ),
            random = randomNum(0),
            expectedFor = (num) => min(8, max(5, pow(num, 2)));
            [8,5,3,2,1,0, random(89), random(55), random(34)].forEach(function (num) {
                expect(composed(num)).to.equal(expectedFor(num));
            });
    });

});
