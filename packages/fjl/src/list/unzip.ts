import {foldl} from "./foldl";

export const

  /**
   * unzip transforms a list of pairs into a tuple of lists - first list contains first components and a second contains second ones.
   */
  unzip = <T1, T2>(xss: [T1, T2][]): [T1[], T2[]] =>
    foldl((agg, item: [T1, T2]) => {
      if (item.length) {
        agg[0].push(item[0]);
        agg[1].push(item[1]);
      }
      return agg;
    }, [[], []], xss);
