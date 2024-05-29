/**
 * Contains `Either` constructs (`Right`, `Left`,  `either` etc.) and associated operations.
 * Created by elyde on 12/10/2016.
 */
import {Boxed} from './monad';
import {Monad} from "../types";
import {type Ternary, isset} from "fjl";
import {VALUE_SYM} from "./symbols";

interface Left<T = any> extends Monad<T> {
  new(...args: any[]): any;
}

interface Right<T = any> extends Monad<T> {
  new(...args: any[]): any;
}

export type Either<A, B> = Left<A> | Right<B>;

export type LeftMap<A = any, RetA = any> = Ternary<A, keyof Left<A>, Left<A>, RetA>;
export type RightMap<B = any, RetB = any> = Ternary<B, keyof Right<B>, Right<B>, RetB>;

const LeftProto = Object.create(Boxed.prototype),
  RightProto = Object.create(Boxed.prototype);

/**
 * `Left` representation of `Either` construct.
 */
function Left<T>(x?: T) {
  return Object.create(LeftProto, {[VALUE_SYM]: {value: x}})
}

LeftProto.constructor = Left;
Left.prototype = LeftProto;

export const isLeft =
  Left.isLeft = x => isset(x) && x instanceof Left;

function Right<T>(x?: T) {
  return Object.create(RightProto, {[VALUE_SYM]: {value: x}})
}

RightProto.constructor = Right;
Right.prototype = RightProto;

export const isRight =
  Right.isRight = x => isset(x) && x instanceof Right;

export {Left, Right}

export const

  defaultLeftErrMsgTmpl = <T>(x: T | string = ''): string => `TypeError: Cannot operate on \`${x}\`.`,

  /**
   * Calls matching callback on incoming `Either`;  If it's an `Left` type, calls left-callback on it,
   * If it's an `Right` type, calls the right-callback on it.
   * Returns value of the flat-mapped monad.
   */
  either = <A, B, C>(leftCallback: LeftMap<A, C>, rightCallback: RightMap<B, C>, _either_: Left<A> | Right<B>): C => {
    return ((isRight(_either_) ?
        _either_.map(rightCallback) :
        (_either_ as Left<A>).map(leftCallback)
    )).join()
  }
;

/**
 * Curried version `either`.
 */
export const $either = <A, B, C>(leftCallback: LeftMap<A, C>) =>
  (rightCallback: RightMap<B, C>) =>
    (_either_: Left<A> | Right<B>): C =>
      either(leftCallback, rightCallback, _either_);
