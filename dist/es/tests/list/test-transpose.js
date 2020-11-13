import { transpose } from "../../packages/list/transpose";
describe('#transpose', () => {
    it('should transpose a list of lists into a rotated list of lists (from columns and rows to rows and' +
        ' columns and vice versa).', () => {
        // [subj, expected]
        // @todo add test cases for strings
        [
            [
                [[1, 2, 3], [4, 5, 6]],
                [[1, 4], [2, 5], [3, 6]]
            ],
            [
                [[10, 11], [20], [], [30, 31, 32]],
                [[10, 20, 30], [11, 31], [32]]
            ],
            [
                [[], [], []], []
            ],
            [
                [], []
            ]
        ]
            .forEach(([subj, expected]) => {
            const result = transpose(subj);
            expect(result).toEqual(expected);
            // Ensure empty lists are not generated in `result`
            if (result.length) {
                expect(result.every(xs => xs.length > 0)).toEqual(true);
            }
        });
    });
});
//# sourceMappingURL=test-transpose.js.map