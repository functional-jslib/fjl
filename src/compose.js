
/**
 * Composes all functions passed in from right to left passing the return value of the function to the right of a function to left.
 * @module compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
export default function compose (...args) {
    return arg0 => args.reduceRight((value, fn) => fn(value), arg0);
}
