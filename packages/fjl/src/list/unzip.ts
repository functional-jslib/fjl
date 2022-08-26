import {foldl} from "./foldl";

export const
  /**
   * unzip transforms a list of pairs into a list of first components and a list of second components.
   * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
   */
  unzip = <T1, T2>(xss: [T1, T2][]): [T1[], T2[]] => {
    if (!xss) {
      throw new Error(`\`unzip\` expects a value.  Received ${JSON.stringify(xss)}`);
    }
    return foldl((agg, item: [T1, T2]) => {
      if (item.length) {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
      }
      return agg;
    }, [[], []], xss);
  };
