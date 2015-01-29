/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2015 Riko Ophorst
 * Licensed under the MIT license.
 */

var regexps = {};

regexps.all = {
    filetype: /(?:[ \t]*)?(?:\/\/|\/\*|\<\!\-\-)[ \t]*?#filetype[ \t]*((?:JavaScript|JS|TypeScript|TS|CSS|SASS|LESS|HTML|XML|C|C\#|C sharp|Csharp|C-sharp|C\+\+|cpp|cc|Java|PHP))(?:\*\/|\-\-\>|\n)/gi
};

regexps.html = {
    skip: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#skip[ \t]*(?:\-\-\>|\n)?/gi,
    define: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#define[ \t]*([a-zA-Z_]*)[ \t]*([^ \n]*)[ \t]*(?:\-\-\>)/gi,
    include: /(?:\<\!\-\-)[ \t]*?#include[ \t]*([^\>\<\:\"\|\?\*\']*?)(?:\-\-\>)/gi,
    exclude: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#exclude[ \t]*(?:\-\-\>)?(?:.|\n|\r)*?(?:\<\!\-\-)?[ \t]*#endexclude[ \t]*(?:\-\-\>)?/gi,
    ifdef: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#ifdef[ \t]*([^\n*]*)[ \t]*?(?:\-\-\>)?((?:.|\n|\r)*?)(?:\<\!\-\-)[ \t]*?#endif[ \t]*(?:\-\-\>)?/gi,
    ifndef: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#ifndef[ \t]*([^\n*]*)[ \t]*?(?:\-\-\>)?((?:.|\n|\r)*?)(?:\<\!\-\-)[ \t]*?#endif[ \t]*(?:\-\-\>)?/gi,
    if: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\-\-\>)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:\<\!\-\-)[ \t]*#endif[ \t]*(?:\-\-\>)?/gi,
    elsechecker: /((?:.|\n|\r)*?)(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#else/i,
    elsereplacer: /((?:\<\!\-\-)[ \t]*#else)/gi,
    elseif: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#elseif[ \t]*([^\n*]*)[ \t]*(?:\-\-\>)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#endelseif[ \t]*(?:\-\-\>)?(?:[ \t]*[\r\n]+)?/gi,
    endelseifstring: "<!-- #endelseif -->",
    endelseifregex: /\<\!\-\- #endelseif \-\-\>/g,
    else: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#else[^a-z](?:\-\-\>)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*)/gi
};

regexps.js = {
    skip: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#skip[ \t]*(?:\*\/|\n)?/gi,
    define: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#define[ \t]*([a-zA-Z_]*)[ \t]*([^ \n]*)[ \t]*(?:\*\/)?/gi,
    include: /(?:\/\/|\/\*)[ \t]*?#include[ \t]*([^\>\<\:\"\|\?\*\']*?)(?:\*\/|\n)/gi,
    exclude: /(?:[ \t]*)?(?:[ \t]*)(?:\/\/|\/\*)[ \t]*#exclude[ \t]*(?:\*\/)?(?:.|\n|\r)*?(?:\/\/|\/\*)[ \t]*#endexclude[ \t]*(?:\*\/)?/gi,
    ifdef: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#ifdef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*?#endif[ \t]*(?:\*\/)?/gi,
    ifndef: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#ifndef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*?#endif[ \t]*(?:\*\/)?/gi,
    if: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*#endif[ \t]*(?:\*\/)?/gi,
    elsechecker: /((?:.|\n|\r)*?)(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#else/i,
    elsereplacer: /((?:\/\/|\/\*)[ \t]*#else)/gi,
    elseif: /(?:(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#elseif[ \t]*([^\n*]*)[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#endelseif[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?)/gi,
    endelseifstring: "/* #endelseif */",
    endelseifregex: /\/\* #endelseif \*\//g,
    else: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#else[^a-z](?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*)/gi,
};

exports.all             = regexps.all;

exports.js              = regexps.js;
exports.html            = [regexps.html, regexps.js];
exports.xml             = regexps.html;

exports.c               = regexps.js;
exports.cc              = regexps.js;
exports.cpp             = regexps.js;
exports.h               = regexps.js;
exports.cs              = regexps.js;
exports.csharp          = regexps.js;
exports.java            = regexps.js;
exports.less            = regexps.js;
exports.sass            = regexps.js;
exports.scss            = regexps.js;
exports.css             = regexps.js;
exports.php             = regexps.js;
exports.ts              = regexps.js;
exports["c sharp"]      = regexps.js;
exports["csharp"]       = regexps.js;
exports["c-sharp"]      = regexps.js;
exports["javascript"]   = regexps.js;
exports["typescript"]   = regexps.js;