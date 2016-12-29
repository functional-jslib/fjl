/**
 * Created by edlc on 12/9/16.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Functor(value) {
    if (!this) {
        return new Functor(value);
    }
    Functor.addValueProperty(this, value);
}

Functor.prototype.map = function (fn) {
    return new this.constructor(fn(this.value));
};

Functor.addValueProperty = function (instance, value) {
    if (!instance.hasOwnProperty('value')) {
        Object.defineProperty(instance, 'value', {
            value: value,
            writable: true
        });
    }
    return instance;
};

Object.defineProperty(Functor.prototype, 'constructor', { value: Functor });

exports.default = Functor;