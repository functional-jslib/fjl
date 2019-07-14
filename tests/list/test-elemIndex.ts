import {expectTrue} from "../helpers";
import {all, elemIndex} from "../../src/list";

describe('#elemIndex', () => {
    it('should return the index where the element is found', () => {
        const word = 'hello world';
        expectTrue(
            all(elm =>
                    all((elm2, ind2, arr) => elemIndex(elm2, arr) === word.indexOf(elm2), elm),
                [word.split(''), word]));
    });
    it('should return `undefined` when element is not in list', () => {
        const word = 'hello world';
        expectTrue(
            all(elm =>
                    all((elm2, ind2, arr) => elemIndex('z', arr) === undefined, elm),
                [word.split(''), word]));
    });
});
