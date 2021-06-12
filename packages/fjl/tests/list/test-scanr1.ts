import {alphabetArray, expectEqual, linkedListToList, LLNode} from "../helpers";
import {scanr1} from "../../src/list";

describe('#scanr1', () => {
  const unlinkedNodes = alphabetArray.map(char => ({data: char}));

  it('should return a list of successively reduced values from left to right', () => {
    // Generate linked-list structure
    const result = scanr1((agg, item) => {
      agg.next = item;
      item.next = null;
      return item;
    }, [{}].concat(unlinkedNodes) as LLNode[]);

    // Expect every item in result to be a linked list with remaining items linked to said item
    expect(
      result.every(node => {
        const nodesList = linkedListToList(node);
        return alphabetArray
          .slice(0, alphabetArray.indexOf(node.data) + 1)
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
    expectEqual(scanr1(x => x * 2, []), []);
    expectEqual(scanr1(x => x + 2, '') as string[], []);
  });
});
