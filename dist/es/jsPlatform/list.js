"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
exports.concat = utils_1.fPureTakesOneOrMore('concat'), exports.slice = utils_1.fPureTakes2('slice'), exports.includes = (() => 'includes' in Array.prototype ?
    utils_1.fPureTakesOne('includes') :
    (value, xs) => xs.indexOf(value) > -1)(), exports.indexOf = utils_1.fPureTakesOne('indexOf'), exports.lastIndexOf = utils_1.fPureTakesOne('lastIndexOf');
//# sourceMappingURL=list.js.map