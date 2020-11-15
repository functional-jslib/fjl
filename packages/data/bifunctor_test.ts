import {Bifunctor} from "./bifunctor";
import {alphabetArray, vowelsArray} from "../utils/test-utils";

describe('#Bifunctor.value2Of()', () => {
    (<[Bifunctor<string, number>, number][]>vowelsArray.map(c => {
        const charCode = c.charCodeAt(0);
        return [new Bifunctor(c, charCode), charCode];
    }))
        .forEach(([bifunctor, expectedValue2Of]) => {
            it(`new Bifunctor(${bifunctor.valueOf()}, ${bifunctor.value2Of()}).value2Of() === ${expectedValue2Of}`, function () {
                expect(bifunctor.value2Of()).toEqual(expectedValue2Of);
            });
        });
});

describe('#Bifunctor.first()', () => {
    const mapper = c => c.charCodeAt(0);
    (<[Bifunctor<string, number>, number][]>vowelsArray.map(c => {
        const charCode = mapper(c);
        return [new Bifunctor(c, charCode), charCode];
    }))
        .forEach(([bifunctor, expectedValue2Of]) => {
            it(`new Bifunctor(${bifunctor.valueOf()}, ${bifunctor.value2Of()}).first(mapper) === ${expectedValue2Of}`, function () {
                const rslt = bifunctor.first(mapper);
                expect(rslt.value2Of()).toEqual(expectedValue2Of);
                expect(rslt === bifunctor).toEqual(false);
            });
        });
});

describe('#Bifunctor.second()', () => {
    const mapper = n => n * 2;
    (<[Bifunctor<string, number>, number][]>vowelsArray.map((c, i) => {
        const charCode = c.charCodeAt(0),
            charCodeX2 = mapper(charCode);
        return [new Bifunctor(c, charCode), charCodeX2];
    }))
        .forEach(([bifunctor, expectedValue2Of]) => {
            it(`new Bifunctor(${bifunctor.valueOf()}, ${bifunctor.value2Of()}).second(times2) === ${expectedValue2Of}`, function () {
                const rslt = bifunctor.second(mapper);
                expect(rslt.value2Of()).toEqual(expectedValue2Of);
                expect(rslt === bifunctor).toEqual(false);
            });
        });
});

describe('#Bifunctor.bimap()', () => {
    // @test-description Here we put the alphabet into Bifunctors of `<char, null | char>`.
    // For the test we `bimap` the contained 'chars' using a `nextChar` method and test
    // against the already generated `nextChar` values.

    /**
     * Last 'char' - Used to compare against.
     */
    const lastCharCode = alphabetArray[alphabetArray.length - 1].charCodeAt(0),

        /**
         * Gets next char from given one.
         */
        nextChar = (char: string): null | string => {
            if (!char) {
                return char;
            }
            const charCode = char.charCodeAt(0);
            return charCode === lastCharCode ? null : String.fromCharCode(charCode + 1);
        };

    // Generate test cases
    (<[Bifunctor<string, string | null>, string, string | null][]>alphabetArray.map(c => {
        const expectedLastOnMapped = nextChar(c);
        return [new Bifunctor(c, expectedLastOnMapped), expectedLastOnMapped, nextChar(expectedLastOnMapped)];
    }))
        // Loop through test cases
        .forEach(([bifunctor, expectedValueOf, expectedValue2Of,]) => {
            it(`new Bifunctor(${bifunctor.valueOf()}, ${bifunctor.value2Of()}` +
            `).bimap(nextChar, nextChar) === ${expectedValueOf}, ${expectedValue2Of}`, function () {
                const rslt = bifunctor.bimap(nextChar, nextChar);
                expect(rslt.valueOf()).toEqual(expectedValueOf);
                expect(rslt.value2Of()).toEqual(expectedValue2Of);
                expect(rslt === bifunctor).toEqual(false);
            });
        });
});
