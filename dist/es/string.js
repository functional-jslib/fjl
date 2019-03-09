"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("./list");
const string_1 = require("./jsPlatform/string");
exports.split = string_1.split;
const compose_1 = require("./function/compose");
const array_1 = require("./jsPlatform/array");
const errorThrowing_1 = require("./errorThrowing");
exports.lines = string_1.split(/[\n\r]/gm), exports.words = string_1.split(/[\s\t]/gm), exports.unwords = list_1.intercalate(' '), exports.unlines = list_1.intercalate('\n'), exports.lcaseFirst = xs => {
    errorThrowing_1._errorIfNotType(String, 'lcaseFirst', 'xs', xs);
    return xs[0].toLowerCase() + xs.substring(1);
}, exports.ucaseFirst = xs => {
    errorThrowing_1._errorIfNotType(String, 'ucaseFirst', 'xs', xs);
    return xs[0].toUpperCase() + xs.substring(1);
}, exports.camelCase = (xs, pattern = /[^a-z\d]/i) => compose_1.compose(array_1.join(''), list_1.map(str => exports.ucaseFirst(str.toLowerCase())), list_1.filter(x => !!x), string_1.split(pattern))(errorThrowing_1._errorIfNotType(String, 'camelCase', 'xs', xs)), exports.classCase = compose_1.compose(exports.ucaseFirst, exports.camelCase);
//# sourceMappingURL=string.js.map