const fjl = require('../dist/cjs/fjl'), { expectTrue } = require('./helpers');
describe('fjl', function () {
    it('should have reached this point with no errors', () => {
        expectTrue((!!fjl && !!Object.keys(fjl).length)); // Bangs are for compilers that get the `&&` statement wrong
    });
});
//# sourceMappingURL=build-test-cjsLibraryImport.js.map