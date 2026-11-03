import {alphabetArray, expectEqual, LinkedListNode, LLNode, linkedListToList} from "../helpers";
import {scanl} from "../../src/list/scanl";

describe('#scanl', () => {
  const unlinkedNodes = alphabetArray.map(char => ({data: char})) as LLNode[];

  it('should return a list of successively reduced values from left to right', () => {
    // Generate linked-list structure
    const result: LinkedListNode[] = scanl((agg, item) => {
      agg.next = item;
      item.next = null;
      return item;
    }, {data: '', next: null} as LLNode, unlinkedNodes);

    // Expect every item in result to be a linked list with remaining items linked to said item
    expect(
      result.slice(1).every(node => {
        const nodesList: LinkedListNode[] = linkedListToList(node);
        return alphabetArray.slice(alphabetArray.indexOf(node.data)).every((char, ind1) => {
          const charCodeToTest = char.charCodeAt(0);
          return nodesList.slice(ind1).every((data, ind2) =>
            data.data.charCodeAt(0) - ind2 === charCodeToTest
          );
        });
      })
    )
      .toEqual(true);
  });

  it('should start with the seed value, and end with the `foldl` result', () => {
    expectEqual(scanl((a: number, b: number) => a + b, 0, [1, 2]), [0, 1, 3]);
  });

  it('should return only the seed value when receiving an empty list', () => {
    expectEqual(scanl(x => x * 2, 99, []), [99]);
  });
});
