"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = console.log.bind(console), exports.error = console.error.bind(console), exports.peek = (...args) => (exports.log(...args), args.pop()), exports.warn = console.warn.bind(console);
//# sourceMappingURL=console.js.map