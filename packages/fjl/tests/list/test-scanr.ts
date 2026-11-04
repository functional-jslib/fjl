import {alphabetArray, expectEqual, linkedListToList, LLNode} from "../helpers";
import {foldr, head, scanr} from "../../src/list";

describe('#scanr', () => {
  const unlinkedNodes = alphabetArray.map(char => ({data: char})) as LLNode[];

  it('should return a list of successively reduced values from left to right', () => {
    // Generate linked-list structure
    const result = scanr((agg, item) => {
      agg.next = item;
      item.next = null;
      return item;
    }, {} as LLNode, unlinkedNodes);

    // Expect every item in result to be a linked list with remaining items linked to said item
    expect(
      result.every(node => {
        const nodesList = linkedListToList(node);
        return alphabetArray.slice(0, alphabetArray.indexOf(node.data) + 1)
          .reverse()
          .every((char, ind1) => {
            const charCodeToTest = char.charCodeAt(0);
            return nodesList.slice(ind1).every((data, ind2) =>
              data.data.charCodeAt(0) + ind2 === charCodeToTest
            );
          });
      })
    )
      .toEqual(true);
  });

  it('should start with the `foldr` result, and end with the seed value', () => {
    expectEqual(scanr((a: number, b: number) => a + b, 0, [1, 2]), [3, 2, 0]);
  });

  it('should call `fn` as `fn(acc, x, i, xs)`, so the `foldr` law holds in the same order', () => {
    const xs = [1, 2, 3],
      fn = (acc: number, x: number) => x - acc,
      calls: unknown[][] = [];
    scanr((acc: string, x: number, i, list) => {
      calls.push([acc, x, i, list]);
      return acc + x;
    }, 'z', [1, 2]);
    expectEqual(calls, [['z', 2, 1, [1, 2]], ['z2', 1, 0, [1, 2]]]);
    expectEqual(head(scanr(fn, 0, xs)), foldr(fn, 0, xs));
  });

  it('should return only the seed value when receiving an empty list', () => {
    expectEqual(scanr(x => x * 2, 99, []), [99]);
  });
});
