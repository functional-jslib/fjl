import {elem} from "../../src/list/elem";
import {includes} from "../../src/platform/slice";

describe('#elem', () => {
    it('same as "#includes" test suite (methods should be equal)', () => {
        expect(includes).toEqual(elem);
    });
});
