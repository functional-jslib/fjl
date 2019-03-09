"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Functor {
    constructor(value) {
        this.value = value;
    }
    valueOf() {
        return this.value;
    }
    map(fn) {
        return new Functor(fn(this.valueOf()));
    }
    fmap(fn) {
        return this.map(fn);
    }
}
exports.default = Functor;
//# sourceMappingURL=Functor.js.map