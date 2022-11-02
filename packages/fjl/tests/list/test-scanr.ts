import {alphabetArray, expectEqual, linkedListToList, LLNode} from "../helpers";
import {scanr} from "../../src/list";

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

  it('should return an empty list when receiving an empty one', () => {
    expectEqual(scanr(x => x * 2, 99, []), []);
  });
});
