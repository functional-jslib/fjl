import {indexOf} from "../platform/slice";

export const

  elemIndex = <T>(xs: T[], x: T): number | undefined => {
    const foundInd = indexOf(xs, x);
    return foundInd !== -1 ? foundInd : undefined;
  },

  $elemIndex = <T>(xs: T[]) =>
    (x: T): number | undefined => elemIndex(xs, x)
;

