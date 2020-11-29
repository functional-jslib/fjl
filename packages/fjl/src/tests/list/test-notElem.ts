import {lastIndexOf, notElem} from "../../list";
import {SliceOf} from "../../platform/slice";
import {vowelsArray, vowelsString} from "../../utils/test-utils";


describe('#notElem', () => {
    (<[SliceOf<any>, any, false][]>[
        [vowelsString, '0', true],
        [vowelsString, 'z', true],
    ].concat(
        vowelsArray.flatMap((c) => {
            return [[vowelsString, c, false], [vowelsArray, c, false]];
        }) as [SliceOf<any>, any, false][]
    ))
        .forEach(([xs, x, expected]) => {
            it(`notElem(${JSON.stringify(x)}, ${JSON.stringify(xs)}) === ${expected}`, function () {
                expect(notElem(x, xs)).toEqual(expected);
            });
        });

});