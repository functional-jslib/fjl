import {apply, log, peek, range} from 'fjl';

export {log, peek};

export const

    jsonClone = x => JSON.parse(JSON.stringify(x)),

    genRan = (min, max) => Math.round(Math.random() * max),

    genRanChar = (min = 0, max = 0x10FFFF) =>
        String.fromCharCode(genRan(min, max)),

    genRanStr = (min = 0, max = 100) =>
        range(min, max)
            .reduce(str => str + genRanChar(min, max), ''),

    runHasPropOfType = (Type, propName, [correctValue, incorrectValue], x) => {
        test (`it should have the a \`${propName}\` property`, function () {
            expect(x.hasOwnProperty(propName)).toEqual(true);
        });
        test (`it should throw an error when setting \`${propName}\` to ${incorrectValue}`, function () {
            expect(() => { x[propName] = incorrectValue; }).toThrow(Error);
        });
        test (`it should set value correctly for \`${propName}\` when value is of correct type`, function () {
            expect(x[propName] = correctValue).toEqual(correctValue);
        });
        // log(Type, propName, correctValue, incorrectValue, x);
    },

    runHasPropTypes = (propTypeArgsList, x) =>
        propTypeArgsList.forEach(args => {
            const _args = args.slice(0);
            _args.push(x);
            apply(runHasPropOfType, _args);
        })

;
