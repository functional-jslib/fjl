/**
 * Created by Ely on 5/3/2014.
 */

define(['mocha', 'fjl', 'prepare', 'test-suite'], function (mocha) {
    'use strict';
    mocha.checkLeaks();
    mocha.globals(['fjl']);
    mocha.run();
});
