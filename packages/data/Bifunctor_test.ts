import {Bifunctor} from "./Bifunctor";
import {vowelsArray} from "../utils/test-utils";

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
