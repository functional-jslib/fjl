/**
 * Created by elydelacruz on 4/28/16.
 * Refactored 09/28/2018
 */

const

    fs = require('fs'),

    {Readable} = require('stream'),

    newModuleMeta = _module => ({module: _module, methodNames: [], methodNamesByArity: {}}),

    newTopLevelMeta = modulesHashMap => ({
        moduleMetas: Object.keys(modulesHashMap).reduce((agg, key) => {
            agg[key] = newModuleMeta(modulesHashMap[key]);
            return agg;
        }, {}),
        methodNamesByArity: {}
    }),

    updateWithMethodNames = (moduleMeta, topLevelNamesByArity) => {
        const {module: m} = moduleMeta;
        Object.keys(m).forEach(methodName => {
            // Avoid private methods
            if (methodName[0] === '_') {
                return;
            }
            updateMethodByArity(moduleMeta, methodName, topLevelNamesByArity);
            moduleMeta.methodNames.push(methodName);
        });
    },

    updateMethodByArity = (moduleMeta, methodName, topLevelNamesByArity) => {
        const arity = moduleMeta.module[methodName].length,
            {methodNamesByArity} = moduleMeta;
        if (arity === undefined) { // not a function, bail
            return;
        }
        if (!methodNamesByArity[arity]) {
            methodNamesByArity[arity] = [];
        }
        topLevelNamesByArity[arity].push(methodName);
        methodNamesByArity[arity].push(methodName);
    },

    populateMeta = meta => {
        const {moduleMetas, methodNamesByArity} = meta;
        // Set empty array for 'method names by arity'
        [0,1,2,3,4,5,6,7,8].forEach(x => { methodNamesByArity[x] = []; });

        // Loop through module metas and populate 'methodNames' and
        //  'methodsByArity' properties
        Object.keys(moduleMetas).forEach(key => {
            updateWithMethodNames(moduleMetas[key], methodNamesByArity);
        });
        return meta;
    },

    methodNamesMdTmpl = (moduleName, moduleMeta) => {
        const {methodNames} = moduleMeta,
            _methodNames = methodNames.slice(0),
            colLen = 72,
            firstMethod = _methodNames.shift(),
            methodNamesMd = _methodNames.reduce((agg, name) => {
                    const lineMetaEntry = agg[agg.length - 1],
                        [lineLen, line] = lineMetaEntry,
                        newLineLen = lineLen + (', ' + name).length,
                        greaterThanColLen = newLineLen >= colLen
                    ;
                    if (greaterThanColLen) {
                        const newLine = [];
                        newLine.push(name);
                        agg.push([name.length, newLine]);
                    } else {
                        line.push(name);
                        lineMetaEntry[0] = newLineLen;
                    }

                    return agg;
                },
                [[firstMethod.length, [firstMethod]]]
            )
                .map(([_, line]) => line.join(', '))
                .join(',\n')
        ;
        return `### \`${moduleName}\` methods\n \`\`\`\n${methodNamesMd}\n\`\`\`\n`;
    }
;

/**
 * Readstream for pumping out the contents of the "expected" markdown file.
 * @class ModuleMemberListsReadStream
 * @extends stream.Readable
 */
class ModuleMemberListsReadStream extends Readable {
    constructor(options, modNamesAndModMap) {
        super(Object.assign({
            encoding: 'utf8',
            objectMode: false,
            highWaterMark: 100000
        }, options));
        this.topMeta = populateMeta(newTopLevelMeta(modNamesAndModMap));
        this.moduleMetaNames = Object.keys(this.topMeta.moduleMetas);
        this.currIndex = 0;
    }
    _nextKey () {
        return this.moduleMetaNames[this.currIndex++];
    }
    _read () {
        const nextKey = this._nextKey();
        this.push(
            nextKey ?
            methodNamesMdTmpl(nextKey, this.topMeta.moduleMetas[nextKey]) :
            null
        );
    }
}

/**
 * @returns {ModuleMemberListsReadStream}
 */
export default moduleNameAndModuleHashMap => new ModuleMemberListsReadStream({}, moduleNameAndModuleHashMap);
