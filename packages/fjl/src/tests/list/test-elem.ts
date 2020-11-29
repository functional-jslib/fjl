import {elem} from "../../list/elem";
import {includes} from "../../platform/slice";

describe('#elem', () => {
    it('same as "#includes" test suite (methods should be equal)', () => {
        expect(includes).toEqual(elem);
    });
});
