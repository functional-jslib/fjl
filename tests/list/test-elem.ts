import {expectTrue} from "../helpers";
import {all, elem} from "../../src/list";

describe('#elem', () => {
    it('should return `true` when the element is found in given list', () => {
        const word = 'hello world';
        expectTrue(
            all(() => all((elm2, ind2, arr) => !!elem(elm2, arr), word), [word.split(''), word]));
    });
    it('should return `false` when element is not found in given list', () => {
        const word = 'hello world';
        expectTrue(
            all(elm =>
                    all((elm2, ind2, arr) => !elem('z', arr), elm),
                [word.split(''), word]));
    });
});

