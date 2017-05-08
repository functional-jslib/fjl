/**
 * Created by edlc on 12/9/16.
 */

'use strict';

function Functor(value) {
    if (!(this instanceof Functor)) {
        return new Functor(value);
    }
    this.value = value;
}

Functor.prototype.map = function (fn) {
    return new this.constructor(fn(this.value));
};

Object.defineProperty(Functor.prototype, 'constructor', { value: Functor });

export default Functor;
