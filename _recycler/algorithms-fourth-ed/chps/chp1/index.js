/**
 * Created by elyde on 12/29/2016.
 */

"use strict";

import Counter from "../../stdlib/Counter";
import Random from "random-js";
import yargs from "yargs";

let log = console.log.bind(console);

function main (argv) {
    let heads = Counter(),
        tails = Counter(),
        ind = argv.len;
    while (ind > 0) {
        Random.bool() ? heads.increment() : tails.increment();
        ind -= 1;
    }
    log(heads);
    log(tails);
    log('Delta:', Math.abs(heads.extract() + tails.extract()));
}

main (
    yargs
        .default('len', 0)
        .argv
);
