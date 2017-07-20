/**
 * Created by Ely on 5/3/2014.
 */

define(['mocha', 'fjl', 'prepare', 'test-suite'], function (mocha) {
    mocha.checkLeaks();
    mocha.globals(['fjl']);
    mocha.run();
});
