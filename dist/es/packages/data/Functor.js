import instanceOf from "../platform/object/instanceOf";
export class Functor {
    constructor(value) {
        this.value = value;
    }
    valueOf() {
        return this.value;
    }
    map(fn) {
        return new this.constructor(fn(this.valueOf()));
    }
}
export const isFunctor = instanceOf(Functor), toFunctor = (x) => !isFunctor(x) ? new Functor(x) : x;
//# sourceMappingURL=Functor.js.map