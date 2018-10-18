/**
 * Created by elydelacruz on 4/28/16.
 * Refactored 09/28/2018
 */

const _List = require('../dist/cjs/list'),
    _Object = require('../dist/cjs/object'),
    _Function = require('../dist/cjs/function'),
    _Boolean = require('../dist/cjs/boolean'),
    _ErrorThrowing = require('../dist/cjs/errorThrowing'),
    _String = require('../dist/cjs/string'),
    _Utils = require('../dist/cjs/utils'),

    newModuleMeta = _module => ({module: _module, methodNames: [], methodNamesByArity: {}}),

    newTopLevelMeta = () => ({
        moduleMetas: {
            'list': newModuleMeta(_List),
            'object': newModuleMeta(_Object),
            'function': newModuleMeta(_Function),
            'boolean': newModuleMeta(_Boolean),
            'errorThrowing': newModuleMeta(_ErrorThrowing),
            'string': newModuleMeta(_String),
            'utils': newModuleMeta(_Utils)
        },
        'methodNamesByArity': {}
    }),

    updateWithMethodNames = (moduleMeta, topLevelNamesByArity) => {
        const {module: m} = moduleMeta;
        Object.keys(m).forEach(methodName => {
            updateMethodByArity(moduleMeta, methodName, topLevelNamesByArity);
            m.methodNames.push(methodName);
        });
    },

    updateMethodByArity = (moduleMeta, methodName, topLevelNamesByArity) => {
        const arity = moduleMeta.module[methodName].length,
            {methodNamesByArity} = moduleMeta;
        if (!methodNamesByArity[arity]) {
            methodNamesByArity[arity] = new Set();
        }
        topLevelNamesByArity.push(methodName);
        methodNamesByArity[arity].add(methodName);
    },

    populateMeta = meta => {
        const {moduleMetas, methodNamesByArity} = meta;
        // Set empty array for 'method names by arity'
        [0,1,2,3,4,5].forEach(x => { methodNamesByArity[x] = []; });

        // Loop through module metas and populate 'methodNames' and
        //  'methodsByArity' properties
        Object.keys(moduleMetas).forEach(key => {
            updateWithMethodNames(moduleMetas[key], methodNamesByArity);
        });
    },

    getModulesMeta = () => populateMeta(newTopLevelMeta())
;

module.exports = getModulesMeta;
