import {curry} from "../function/curry";

export const

  /**
   * Unfolds a value into a list of somethings.
   */
  unfoldr = (op, x) => {
    let ind = 0,
      out: any[] = [],
      resultTuple = op(x, ind, out);
    while (resultTuple) {
      out.push(resultTuple[0]);
      resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
  },

  $unfoldr = curry(unfoldr);
