define(['exports'], function (exports) {
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
        Object.defineProperty(this, 'value', {
            value: value,
            writable: true
        });
    }

    Functor.prototype.map = function (fn) {
        return new this.constructor(fn(this.value));
    };

    Object.defineProperty(Functor.prototype, 'constructor', { value: Functor });

    exports.default = Functor;
});