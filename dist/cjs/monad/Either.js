/**
 * Created by elyde on 12/10/2016.
 */
'use strict';
/**
 * Created by elyde on 11/20/2016.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Either = exports.either = exports.Right = exports.Left = undefined;

var _curry = require('./../curry');

var _operators = require('./../operators');

var _subClass = require('./../subClass');

var _Maybe = require('./Maybe');

var _Maybe2 = _interopRequireDefault(_Maybe);

var _Bifunctor = require('./../functor/Bifunctor');

var _Bifunctor2 = _interopRequireDefault(_Bifunctor);

var _Monad = require('./Monad');

var _Monad2 = _interopRequireDefault(_Monad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Left = exports.Left = (0, _subClass.subClass)(_Maybe.Just, {
    constructor: function Left(value) {
        if (!(this instanceof Left)) {
            return Left.of(value);
        }
        _Maybe.Just.call(this, value);
    },
    map: function map(fn) {
        (0, _operators.map)(fn, this.value);
        return this;
    }
}),
    Right = exports.Right = (0, _subClass.subClass)(_Maybe.Just, {
    constructor: function Right(value) {
        if (!(this instanceof Right)) {
            return Right.of(value);
        }
        _Maybe.Just.call(this, value);
    }
}, null, {
    counterConstructor: Left
}),
    either = exports.either = (0, _curry.curry2)(function (leftCallback, rightCallback, monad) {
    var identity = (0, _operators.map)(function (value) {
        return value;
    }, monad),
        ctor = identity.constructor;
    if (ctor === Left) {
        return (0, _operators.map)(leftCallback, identity);
    } else if (ctor === Right) {
        return (0, _operators.map)(rightCallback, identity);
    }
}),
    Either = exports.Either = (0, _subClass.subClassMulti)([_Monad2.default, _Bifunctor2.default], {
    constructor: function Either(left, right) {
        if (!(this instanceof Either)) {
            return new Either(left, right);
        }
        _Bifunctor2.default.call(this, left, right);
        _Monad2.default.call(this);
    }
}, null, {
    of: function of(value) {
        return new _Maybe2.default(value);
    },
    Left: Left,
    Right: Right,
    either: either
});

exports.default = Either;