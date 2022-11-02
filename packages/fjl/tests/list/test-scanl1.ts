import {alphabetArray, expectEqual, linkedListToList, LLNode} from "../helpers";
import {scanl1} from "../../src/list";
import {Slice} from '../../src/types/data';

describe('#scanl1', () => {
  const unlinkedNodes = alphabetArray.map(char => ({data: char}));

  it('should return a list of successively reduced values from left to right', () => {
    // Generate linked-list structure
    const result = scanl1((agg: LLNode, item) => {
      agg.next = item;
      item.next = null;
      return item;
    }, [{}].concat(unlinkedNodes) as LLNode[]);

    // Expect every item in result to be a linked list with remaining items linked to said item
    expect(
      result.every(node => {
        const nodesList = linkedListToList(node);
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
    expectEqual(scanl1((x: number) => x * 2, []), []);
  });
});
