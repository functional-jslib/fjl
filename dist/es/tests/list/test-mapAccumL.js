import { mapAccumL } from "../../packages/list/mapAccumL";
import { expectEqual } from "../helpers";
describe('#mapAccumL', () => {
    it('should map a function/operation on every item of a list and it should return a tuple containing the ' +
        'accumulated value and the an instance of passed in container with mapped items', () => {
        let xs1 = [], xs2 = '', xs3 = [];
        const list0 = [1, 2, 3, 4, 5], list1 = 'hello world', list2 = list1.split(''), stringOp = (agg, item) => String.fromCharCode(item.charCodeAt(0) + 1), numberOp = (agg, item) => item * 2, result0 = mapAccumL((agg, item) => {
            let mappedValue = numberOp(agg, item);
            agg += mappedValue;
            xs1.push(mappedValue);
            return [agg, xs1];
        }, 0, list0), result1 = mapAccumL((agg, item) => {
            let mappedValue = stringOp(agg, item);
            agg += mappedValue;
            xs2 += mappedValue;
            return [agg, xs2];
        }, '', list1), result2 = mapAccumL((agg, item) => {
            let mappedValue = stringOp(agg, item);
            agg.push(mappedValue);
            xs3.push(mappedValue);
            return [agg, xs3];
        }, [], list1);
        [
            // Result, list, expected accumulation
            [result0, list0, numberOp, 0],
            [result1, list1, stringOp, ''],
            [result2, list2, stringOp, []]
        ]
            .forEach(tuple => {
            const reducedForCompare = (typeof tuple[1] === 'string' ?
                tuple[1].split('') :
                tuple[1])
                .reduce((agg, item, ind) => {
                if (Array.isArray(agg)) {
                    agg.push(tuple[2](agg, item, ind));
                }
                else {
                    agg += tuple[2](agg, item, ind);
                }
                return agg;
            }, tuple[3]);
            // Check that mapped results have equal length
            expectEqual(tuple[0][1].length, tuple[1].length);
            // Check aggregated results are equal
            expectEqual(tuple[0][0], reducedForCompare);
        });
    });
});
//# sourceMappingURL=test-mapAccumL.js.map