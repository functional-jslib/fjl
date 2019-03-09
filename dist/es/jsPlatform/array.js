"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const defineReverse = () => Array.prototype.reverse ? x => x.reverse() :
    x => x.reduceRight((agg, item) => {
        agg.push(item);
        return agg;
    }, []);
exports.map = utils_1.fPureTakesOne('map'), exports.filter = utils_1.fPureTakesOne('filter'), exports.reduce = utils_1.fPureTakes2('reduce'), exports.reduceRight = utils_1.fPureTakes2('reduceRight'), exports.forEach = utils_1.fPureTakesOne('forEach'), exports.some = utils_1.fPureTakesOne('some'), exports.every = utils_1.fPureTakesOne('every'), exports.join = utils_1.fPureTakesOne('join'), exports.push = utils_1.fPureTakesOneOrMore('push'), exports.reverse = defineReverse();
//# sourceMappingURL=array.js.map