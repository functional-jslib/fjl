import {isPrimitive} from './is';

export const

  /**
   * Merges all objects down into one (takes two or more args).
   */
  assignDeep = (obj0, ...objs) => {
    if (!obj0) return obj0;

    return objs.reduce((topAgg, obj) => {
      if (!obj) return topAgg;

      return Object.keys(obj).reduce((agg, key) => {
        const propDescriptor = Object.getOwnPropertyDescriptor(agg, key);

        // If property being visited is not settable, skip it
        if (propDescriptor && (
          propDescriptor.writable === false || (
            propDescriptor.writable === undefined &&
            !propDescriptor.set
          )
        )) {
          return agg;
        }

        const existingValue = agg[key],
          value = obj[key];

        // If LHV, and RHV, are not primitives then assume they are 'assign'able.
        if (propDescriptor &&
          !isPrimitive(existingValue) &&
          !isPrimitive(value)
        ) {
          assignDeep(existingValue, value);
        } else {
          agg[key] = value;
        }

        return agg;
      }, topAgg);

    }, obj0);
  },

  /**
   * Curried version of `assignDeep`.
   */
  $assignDeep = (obj0) => (...objs) => assignDeep(obj0, objs)

;
