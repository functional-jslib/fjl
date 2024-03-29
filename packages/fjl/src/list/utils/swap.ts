export const

    /**
     * Returns an array with the given indices swapped.
     */
    swap = <T>(ind1: number, ind2: number, list: T[]): T[] => {
        const out = list.slice(0) as T[],
            tmp = out[ind1];
        out[ind1] = out[ind2];
        out[ind2] = tmp;
        return out;
    },

    /**
     * Returns an array with the given indices swapped.
     */
    $swap = <T>(ind1: number) =>
      (ind2: number) =>
        (list: T[]): T[] => swap(ind1, ind2, list)

;
