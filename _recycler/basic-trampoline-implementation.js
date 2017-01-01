/**
 * Created by elyde on 12/31/2016.
 */
let trampoline = function(fn) {
    return function trampolined (...args) {
        var result = fn.apply(fn, args);
        while (result instanceof Function) {
            result = result();
        }
        return result;
    };
};

function factorial (n) {
    let actualProcess = (acc, n) => n ? () => actualProcess(acc * n, n - 1) : acc,
        _factorial = trampoline(actualProcess);
    return _factorial(1, n);
}

// Test
factorial(32768);
