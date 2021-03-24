import {isArray, isType} from './is';
import {keys} from '../platform/object';
import {TypeConstructor} from "../types";

export const

    /**
     * Returns an associated list from given object.
     */
    toAssocList = <T>(obj: T): [keyof T, any][] => Object.entries(obj) as [keyof T, any][],

    /**
     * Returns an associated list from given object (deeply (on incoming object's type)).
     */
    toAssocListDeep = (obj, TypeConstraint: TypeConstructor = Object) => keys(obj).map(key =>
        TypeConstraint && isType(TypeConstraint, obj[key]) ?
            [key, toAssocListDeep(obj[key], TypeConstraint)] :
            [key, obj[key]]
    ),

    /**
     * From associated list to object.
     */
    fromAssocList = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, new OutType()),

    /**
     * From associated list to object (deep conversion on associative lists (array of 2 value arrays)).
     */
    fromAssocListDeep = (xs, OutType = Object) => xs.reduce((agg, [key, value]) => {
        if (isArray(value) && isArray(value[0]) && value[0].length === 2) {
            agg[key] = fromAssocListDeep(value, OutType);
            return agg;
        }
        agg[key] = value;
        return agg;
    }, new OutType())
;
