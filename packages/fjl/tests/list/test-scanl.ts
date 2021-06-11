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
      result.every(node => {
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

  it('should return an empty list when receiving an empty one', () => {
    expectEqual(scanl(x => x * 2, 99, []), []);
    expectEqual(scanl(x => x + 2, '99', ''), []);
  });
});
