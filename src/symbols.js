/**
 * Created by elyde on 12/6/2016.
 */
let createSymbol = value => Symbol ? Symbol(value) : value,
    fjlSymbol = key => createSymbol('@@fjl/' + key);

export default Object.freeze([
    'equals',
    'concat',
    'empty',
    'map',
    'ap',
    'of',
    'alt',
    'zero',
    'reduce',
    'traverse',
    'chain',
    'chainRec',
    'extend',
    'extract',
    'bimap',
    'promap'
    ].reduce((agg, key) => {
        Object.defineProperty(agg, key, {
            value: fjlSymbol(key),
            enumerable: true
        });
        return agg;
    }, {
    fjlSymbol,
    createSymbol,
    placeholder: fjlSymbol('placeholder')
}));
