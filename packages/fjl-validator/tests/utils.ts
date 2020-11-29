import {range, log, peek} from 'fjl';

export {log, peek};

export const

    genRan = (min, max) => Math.round(Math.random() * max),

    genRanChar = (min = 0, max = 0x10FFFF) =>
        String.fromCharCode(genRan(min, max)),

    genRanStr = (min = 0, max = 100) =>
        range(min, max)
            .reduce(str => str + genRanChar(min, max), '')

;
