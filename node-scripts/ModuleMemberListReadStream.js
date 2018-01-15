/**
 * Created by elydelacruz on 4/28/16.
 */

'use strict';

const fs = require('fs'),
    path = require('path'),
    util = require('util'),
    stream = require('stream'),
    Readable = stream.Readable;

function repeatStr(str, times) {
    let out = '';
    while (out.length < times) {
        out += str;
    }
    return out;
}

function getEvenNumber(num) {
    while (num % 2) {
        num += 1;
    }
    return num;
}

function renderNode(moduleName, memberName, padLeft, docsPath) {
    let name = renderLabelNodeName(moduleName, memberName),
        label = renderLabel(name),
        href = renderHref(name);

    // ~~ REMOVE FROM HERE ~~
    // Added this here temporarily but this should be pushed to it's own stream
    // and should be contained in an appropriate _functionOps and/or class.
     /*   fileName = name.replace(/\s/g, '-'),
        docFilePath = path.join(docsPath, fileName + '.md');
    // If doc file doesn't exist, generate an empty file for it
    if (!fs.existsSync(docFilePath)) {
        fs.writeFileSync(docFilePath,
            '### ' + label.replace(/[\[\]]/g, '') + '\n' +
            '@todo - Added documentation here.\n' +
            '[Back to ' + moduleName + ' members list.]' +
            '(#' + moduleName + '-members-list)\n');
    }*/
    // ~~ /REMOVE FROM HERE ~~

    return renderMdLi(label + href, padLeft);
}

function renderLabelNodeName(moduleName, funcName) {
    return moduleName + '.' + funcName;
}

function renderLabel(innerText) {
    return '[' + innerText + ']';
}

function renderHref(innerText) {
    return '(#' + innerText.toLowerCase().replace(/\./gim, '') + ')';
}

function renderMdLi(innerText, padLeft) {
    padLeft = repeatStr(' ', getEvenNumber(padLeft)) + '';
    return padLeft + '- ' + innerText + '\n';
}

function ModuleMemberListReadStream (moduleToUse, moduleToUseName, docsPath, options) {
    this._moduleToUse = moduleToUse;
    this._moduleToUseName = moduleToUseName;
    this._docsPath = docsPath;
    Readable.call(this, Object.assign({
        encoding: 'utf8',
        objectMode: false,
        highWaterMark: 100000
    }, options));
}

util.inherits(ModuleMemberListReadStream, Readable);

ModuleMemberListReadStream.prototype._read = function () {
    if (!this._startedReading) {
        this._startedReading = true;
        // Separate names starting with '_' from others
        const [with_, without_] = this._moduleToUse.partition(
                key => key[0] === '_',
                Object.keys(this._moduleToUse).sort()
            ),
            names = without_.concat(with_);
        names.forEach(function (key) {
            this.push(renderNode(this._moduleToUseName, key, 0, this._docsPath));
        }, this);
    }
    else {
        // this.push('\n');
        this.push(null);
    }
};

module.exports = ModuleMemberListReadStream;
