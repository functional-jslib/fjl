/**
 * Created by elyde on 12/6/2016.
 */

export function compose (...args) {
    return arg0 => args.reduceRight((value, arg) => arg(value), arg0);
}
