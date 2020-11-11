import {compose} from '../../packages/function/compose';

describe('#compose', () => {
    it('should be of type function.', () => {
        expect(compose).toBeInstanceOf(Function);
    });

    it('should return a function whether or not any parameters were passed in.', () => {
        expect(compose()).toBeInstanceOf(Function);
        expect(compose(console.log)).toBeInstanceOf(Function);
    });

    it('should return a function that when used returns the passed in value if `compose` ' +
        'itself didn\'t receive any parameters.', () => {
        let result = compose();
        expect(result(99)).toEqual(99);
    });

    it('should be able to compose an arbitrary number of functions and execute them as expected.', () => {
        let min = a => b => Math.min(a, b),
            max = a => b => Math.max(a, b),
            pow = a => b => Math.pow(a, b),
            composed = compose(min(8), max(5), pow(2)),
            randomNum = start => end => Math.round(Math.random() * end + start),
            random = randomNum(0),
            expectedFor = (num) => min(8)(max(5)(pow(num)(2)));
        [8, 5, 3, 2, 1, 0, random(89), random(55), random(34)].forEach(num => {
            expect(composed(num)).toEqual(expectedFor(num));
        });
    });

});
