/**
 * @module console
 * @description Console exports.
 */
export const

    /**
     * `Console.log` method.
     * @function module:console.log
     * @params args {...*}
     * @returns {void}
     */
    log = console.log.bind(console),

    /**
     * `Console.error` method.
     * @function module:console.error
     * @params args {...*}
     * @returns {void}
     */
    error = console.error.bind(console),

    /**
     * Peeks (console.log) at incoming value(s) and returns the last value.
     * @function module:console.peek
     * @param args {...*}
     * @returns {*} Last given value (if one or more values) else first value.
     */
    peek = <T>(...args: T[]): T => (log(...args), args.pop()),

    /**
     * `Console.warn`.
     * @function module:console.warn
     * @param args {...*}
     * @returns {void}
     */
    warn = console.warn.bind(console)

;
