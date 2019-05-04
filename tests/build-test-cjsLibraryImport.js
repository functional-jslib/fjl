const fjl = require('../dist/cjs/fjl'),
    {expectTrue}  = require('./helpers');

describe ('fjl', function () {
    it ('should have reached this point with no errors', () => {
        expectTrue((!!fjl && !!Object.keys(fjl).length)); // Bangs are for compilers that get the `&&` statement wrong
    });

    describe ('#defineProps', () => {
        it ('should have a `defineEnumProp` method', () => {
            expect(fjl.defineEnumProps).toBeInstanceOf(Function);
            expect(fjl.defineEnumProp).toBeInstanceOf(Function);
            expect(fjl.defineProps).toBeInstanceOf(Function);
            expect(fjl.defineProp).toBeInstanceOf(Function);
        });
    });
});
