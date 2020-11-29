import {alphabetArray, expectEqual, genericOrdering, vowelsArray, vowelsString} from "../helpers";
import {SliceOf} from "../../packages/platform/slice";
import {insertBy} from "../../packages/list/insertBy";
import {OrderingFunc} from "../../packages/list/utils";
import {range, reverse} from "../../packages/list";

const toJson = JSON.stringify;

describe(`#list.insertBy`, () => {
    (<[[OrderingFunc<any>, any, SliceOf<any>], SliceOf<any>][]>[
        [[genericOrdering, 'a', ''], 'a'],
        [[genericOrdering, 'a', []], ['a']]
    ]
        .concat(
            vowelsArray.flatMap((x, i) => [
                    [[genericOrdering, x, vowelsArray],
                        vowelsArray
                            .slice(0, i)
                            .concat([x], vowelsArray.slice(i))
                    ],
                    [[genericOrdering, x, vowelsString],
                        vowelsString.substring(0, i) +
                        x + vowelsString.substring(i, vowelsString.length)
                    ],
                ]
            )
        ))
        .forEach(([args, expected]) => {
            it(`insert(${toJson(args)}) === ${toJson(expected)}`, () => {
                expect(insertBy(...args)).toEqual(expected);
            });
        });
});


describe('#insertBy', () => {
    const injectValueAtIndex = (x, ind, list) => {
            if (ind <= 0) {
                return [x].concat(list);
            }
            else if (ind > list.length - 1) {
                return list.concat([x]);
            }
            return list.slice(0, ind).concat([x], list.slice(ind));
        },
        genericInsert = (x, xs) => insertBy(genericOrdering, x, xs);
    it('Should insert a value before value that matches equality check', () => {
        // expectEqual(genericInsert(99, range(0, 144, 5))
        const range0To145 = range(0, 145, 5),
            expectedResult = injectValueAtIndex(99, 20, range0To145),
            result = genericInsert(99, range0To145),
            result1 = genericInsert(99, reverse(range0To145)),
            result2 = genericInsert('x', alphabetArray),
            result3 = genericInsert('x', reverse(alphabetArray));
        expectEqual(result, expectedResult);
        expectEqual(result1, [99].concat(reverse(range0To145)));
        expectEqual(result2, injectValueAtIndex('x', 24, alphabetArray));
        expectEqual(result3, ['x'].concat(reverse(alphabetArray)));
    });
    it('should insert value even if passed in list is empty', () => {
        expectEqual(genericInsert(99, []), [99]);
        expectEqual(genericInsert('a', []), ['a']);
    });
});
