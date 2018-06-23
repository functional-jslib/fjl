export const

    /**
     * `Console.log` method.
     * @function module:object.log
     * @params args {...*}
     * @returns {void}
     */
    log = console.log.bind(console),

    /**
     * `Console.error` method.
     * @function module:object.error
     * @params args {...*}
     * @returns {void}
     */
    error = console.error.bind(console),

    /**
     * Peeks at incoming value(s) and returns the last value.
     * @function module:object.peek
     * @param args {...*}
     * @returns {*} - Last given value (if one or more values) else first value.
     */
    peek = (...args) => (log(...args), args.pop())

;
