import {range, apply} from 'fjl';

export const

    genRan = (min, max) => Math.round(Math.random() * max),

    genRanChar = (min = 0, max = 0x10FFFF) =>
        String.fromCharCode(genRan(min, max)),

    genRanStr = (min = 0, max = 100) =>
        range(min, max)
            .reduce(str => str + genRanChar(min, max), ''),

    runHasPropOfType = (Type, propName, [correctValue, incorrectValue], x) => {
        test (`it should have an \`${propName}\` property`, () => {
            expect(x.hasOwnProperty(propName)).toEqual(true);
        });
        test (`it should throw an error when setting \`${propName}\` to ${incorrectValue}`, () => {
            expect(() => { x[propName] = incorrectValue; }).toThrow(Error);
        });
        test (`it should set value correctly for \`${propName}\` when value is of correct type`, () => {
            x[propName] = correctValue;
            expect(x[propName]).toEqual(correctValue);
        });
    },

    runHasPropOfTypeUnWrapped = (Type, propName, [correctValue, incorrectValue], x) => {
        expect(x.hasOwnProperty(propName)).toEqual(true);
        expect(() => { x[propName] = incorrectValue; }).toThrow(Error);
        x[propName] = correctValue;
        expect(x[propName]).toEqual(correctValue);
    },

    runHasPropTypes = (propTypeArgsList, x) =>
        propTypeArgsList.forEach(args => {
            const _args = args.slice(0);
            _args.push(x);
            apply(runHasPropOfType, _args);
        }),

    runHasPropTypesUnWrapped = (propTypeArgsList, x) =>
        propTypeArgsList.forEach(args => {
            const _args = args.slice(0);
            _args.push(x);
            apply(runHasPropOfTypeUnWrapped, _args);
        })

;
