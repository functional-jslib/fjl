import {typeOf} from '../_objectOps/_objectOps';

export const

    aggregateStr = (agg, item) => agg + item,

    aggregateArr = (agg, item) => {
        agg.push(item);
        return agg;
    },

    aggregateObj = (agg, item, ind) => {
        agg[ind] = item;
        return agg;
    },

    aggregatorByType = x => {
        switch (typeOf(x)) {
            case 'String': return aggregateStr;
            case 'Array': return aggregateArr;
            case 'Object':
            default: return aggregateObj;
        }
    };
