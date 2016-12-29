/**
 * Created by elyde on 12/29/2016.
 */

"use strict";

import Counter from "../../stdlib/Counter";
import Random from "random-js";
import yargs from "yargs";

let log = console.log.bind(console);

function Flips (argv) {
    let heads = Counter(),
        tails = Counter(),
        numIts = argv.len;
    for (var i = 0; i < numIts; i += 1) {
        Random.bool() ? heads.increment() : tails.increment();
    }
    log(heads);
    log(tails);
    log('Delta:', Math.abs(heads.tally() + tails.tally()));
}

Flips(
    yargs
        .default('len', 0)
        .argv
);
