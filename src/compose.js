/**
 * Created by elyde on 12/6/2016.
 */

/**
 * @param args {...Function}
 * @returns {function(*=): *}
 */
export default function compose (...args) {
    return arg0 => args.reduceRight((value, arg) => arg(value), arg0);
}
