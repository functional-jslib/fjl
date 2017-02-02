/**
 * Created by Ely on 4/25/2016.
 * Description: Readable stream for outputting markdown friendly list
 * of packages and members for 'fjljs' project.  It also outputs any missing
 * doc files for any particular member or package.
 * @exports PackageMemberListReadStream
 */

'use strict';

let fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    util = require('util'),
    stream = require('stream'),
    Readable = stream.Readable,
    fjl = require('./../dist/iife/fjl'),
    isNumber = value => typeof value === 'number' && !isNaN(value);

function repeatStr(str, times) {
    var out = '';
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

function renderNode(dir, file, stat, padLeft, docsPath) {
    var basename = path.basename(file, '.js'),
        name = renderLabelNodeName(dir, basename),
        type = renderType(stat),
        label = renderLabel(type + name),
        typeForHref = type.replace(/[\(\)]+/g, ''),
        href = renderHref(typeForHref.replace(/\s/g, '-') + name),

    // ~~ REMOVE FROM HERE ~~
        // Added this here temporarily but this should be pushed to it's own stream
        // and should be contained in an appropriate function and/or class.
        fileName = (type + name).replace(/\s/g, '-'),
        docFilePath =  path.join(docsPath, fileName + '.md');
    // If doc file doesn't exist, generate an empty file for it
    if (!fs.existsSync(docFilePath)) {
        fs.writeFileSync(docFilePath,
            '### ' + label.replace(/[\[\]]/g, '') + '\n' +
            '@todo - Added documentation here.\n' +
            '[Back to other packages and members list.](#other-packages-and-members)\n');
    }
    // ~~ /REMOVE FROM HERE ~~

    return renderMdLi(label + href, padLeft);
}

function renderLabelNodeName(dir, fileBasename) {
    var resolvedDir = dir.replace(/\.?(\/|\\)?src(\/|\\)?/, '');
    resolvedDir += resolvedDir.length > 0 ? '.' : '';
    return ((fileBasename !== 'fjl') ? 'fjl.' + resolvedDir : '') + fileBasename;
}

function renderLabel(innerText) {
    return '[' + innerText + ']';
}

function renderType(stat) {
    return '(' + (stat.isFile() ? 'f' : 'p') + ') ';
}

function renderHref(innerText) {
    return '(#' + innerText.toLowerCase().replace(/\./gim, '') + ')';
}

function renderMdLi(innerText, padLeft) {
    padLeft = repeatStr(' ', getEvenNumber(padLeft)) + '';
    return padLeft + '- ' + innerText + '\n';
}

function createPackageMemberList(dir, levelsDeep, docsPath) {
    levelsDeep = isNumber(levelsDeep) ? levelsDeep : 0;
    var out = '',
        normalDir = path.normalize(dir);
    fs.readdirSync(normalDir).forEach(function (file) {
        var stat = fs.statSync(path.join(normalDir, file));
        out += renderNode(normalDir, file, stat, levelsDeep, docsPath);
        if (stat.isDirectory()) {
            out += createPackageMemberList(path.join(normalDir, file), levelsDeep + 1);
        }
    });
    return out;
}

/**
 * Our package member list to markdown-fragments readable stream.  It
 * reads our srcs directory and outputs a markdown-fragments friendly list
 * of all the packages and members in said directory.
 * @param dirToScan {String} - Dir to scan for list.
 * @param options {Object|undefined} - Optional.  Readable stream options.
 * @constructor {PackageMemberListReadStream}
 */
function PackageMemberListReadStream(dirToScan, docsPath) {
    this._pathToRead = dirToScan;
    this._docsPath = docsPath;
    Readable.call(this, {
        encoding: 'utf8',
        objectMode: false,
        highWaterMark: 100000,
    });
}

// Inherit Readable Stream
util.inherits(PackageMemberListReadStream, Readable);

// Extend prototype
Object.assign(PackageMemberListReadStream.prototype, {

    createPackageMemberList: function createPackageMemberList(dir, levelsDeep, docsPath) {
        levelsDeep = isNumber(levelsDeep) ? levelsDeep : 0;
        var normalDir = path.normalize(dir),
            self = this;
        fs.readdirSync(normalDir).forEach(function (file) {
            var stat = fs.statSync(path.join(normalDir, file));
            self.push(renderNode(normalDir, file, stat, levelsDeep, docsPath));
            if (stat.isDirectory()) {
                self.push(self.createPackageMemberList(path.join(normalDir, file), levelsDeep + 1, docsPath));
            }
        });
    },

    _read: function () {
        if (!this._startedReading) {
            this._startedReading = true;
            this.createPackageMemberList(this._pathToRead, 0, this._docsPath);
        }
        else {
            this.push('\n');
            this.push(null);
        }
    },

    // Ensure Readable Stream's 'toString' method is the one being called
    toString: function toStringForReadable() {
        return Readable.prototype.toString.call(this);
    }

});

// Export Readable Stream
module.exports = PackageMemberListReadStream;
