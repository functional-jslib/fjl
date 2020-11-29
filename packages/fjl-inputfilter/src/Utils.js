/**
 * Same as `console.error`.  Used by *IO variant methods (methods that work with promises) in fjlInputFilter;
 * E.g., used as the error catcher on promises returned from IO processes.
 * @function module:fjlInputFilter.defaultErrorHandler
 * @returns {void}
 */
export const defaultErrorHandler = console.error.bind(console);
