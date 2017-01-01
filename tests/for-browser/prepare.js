/**
 * Created by Ely on 5/3/2014.
 */
define(['chai', 'fjl'], function (chai) {
    "use strict";

    Object.keys(fjl).forEach(function (key) {
        window[key] = fjl[key];
    });

    window.chai = chai;
    window.expect = chai.expect;
    window.should = chai.should;
    window.assert = chai.assert;
});
