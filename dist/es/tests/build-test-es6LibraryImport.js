import * as fjl from '../dist/es6-module/fjl';
import { expectTrue } from './helpers';
describe('fjl', function () {
    it('imported `fjl` should have be populated', () => {
        expectTrue((!!fjl && !!Object.keys(fjl).length)); // Bangs are for compilers that get the `&&` statement wrong
    });
});
//# sourceMappingURL=build-test-es6LibraryImport.js.map