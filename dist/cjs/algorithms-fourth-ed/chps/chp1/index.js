/**
 * Created by elyde on 12/29/2016.
 */

"use strict";

var _Counter = require("../../stdlib/Counter");

var _Counter2 = _interopRequireDefault(_Counter);

var _randomJs = require("random-js");

var _randomJs2 = _interopRequireDefault(_randomJs);

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = console.log.bind(console);

function main(argv) {
    var heads = (0, _Counter2.default)(),
        tails = (0, _Counter2.default)(),
        ind = argv.len;
    log(heads.value);
    while (ind > 0) {
        _randomJs2.default.bool() ? heads.increment() : tails.increment();
        ind -= 1;
    }
    log('heads: ', heads.extract());
    log('tails: ', tails.extract());
    // log('Delta:', Math.abs(heads.tally() + tails.tally()));
}

main(_yargs2.default.default('len', 0).argv);