import {curry} from './curry';

export const

    /**
     * Run `operation` until predicate returns `true`.
     * @function module:function.until
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - A monoidal zero or some starting point.
     * @returns {*} - What ever type `typeInstance` is
     */
    until = curry((predicate, operation, typeInstance) => {
        let result = typeInstance;
        while (!predicate(result)) {
            result = operation(result);
        }
        return result;
    });
