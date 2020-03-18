import {elem} from "../../src/list/elem";
import includes from "../../src/jsPlatform/slice/includes";

describe('#elem', () => {
    it('same as "#includes" test suite (methods should be equal)', () => {
        expect(includes).toEqual(elem);
    });
});
