/**
 * Reverses a list.
 * @function module:jsPlatform/array.reverse
 * @param xs {any[]}
 * @return {any[]}
 */
const reverse: (xs: any[]) => any[] = (
    (): (xs: any[]) => any[] =>
        Array.prototype.reverse ?
            (xs: any[]): any[] => xs.reverse() :
            (xs: any[]): any[] => xs.reduceRight((agg, item) => {
                agg.push(item);
                return agg;
            }, [])
)();

export default reverse;
