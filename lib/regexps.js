/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

exports.html = {
    define: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#define[ \t]*([a-zA-Z_]*)[ \t]*([^\n]*)[ \t]*?(?:\-\-\>)/gi,
    include: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#include[ \t]*([^\>\<\:\"\|\?\*\']*?)(?:\-\-\>)/gi,
    exclude: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#exclude[ \t]*(?:\-\-\>)?(?:.|\n|\r)*?(?:\<\!\-\-)?[ \t]*#endexclude[ \t]*(?:\-\-\>)/gi,
    ifdef: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#ifdef[ \t]*([^\n*]*)[ \t]*?(?:\-\-\>)?((?:.|\n|\r)*?)(?:\<\!\-\-)?[ \t]*?#endif[ \t]*(?:\-\-\>)?/gi,
    ifndef: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#ifndef[ \t]*([^\n*]*)[ \t]*?(?:\-\-\>)?((?:.|\n|\r)*?)(?:\<\!\-\-)?[ \t]*?#endif[ \t]*(?:\-\-\>)?/gi,
    if: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:\<\!\-\-)[ \t]*#endif[ \t]*(?:\-\-\>)/gi
};

exports.js = {
    define: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#define[ \t]*([a-zA-Z_]*)[ \t]*([^\n\*\/]*)/gi,
    include: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#include[ \t]*([^\>\<\:\"\|\?\*\']*?)(?:\*\/|\n)/gi,
    exclude: /(?:[ \t]*)?(?:[ \t]*)(?:\/\/|\/\*)[ \t]*#exclude[ \t]*(?:\*\/)?(?:.|\n|\r)*?(?:\/\/|\/\*)[ \t]*#endexclude[ \t]*(?:\*\/)?/gi,
    ifdef: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#ifdef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)?[ \t]*?#endif(?:\*\/)?/gi,
    ifndef: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#ifndef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)?[ \t]*?#endif(?:\*\/)?/gi,
    if: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*#endif[ \t]*(?:\*\/)?/gi
};

exports.xml        = exports.html;
exports.c          = exports.js;
exports.cc         = exports.js;
exports.cpp        = exports.js;
exports.cs         = exports.js;
exports.csharp     = exports.js;
exports.java       = exports.js;
exports.less       = exports.js;
exports.sass       = exports.js;
exports.scss       = exports.js;
exports.css        = exports.js;
exports.php        = exports.js;

exports.html.extraRegex = exports.js;

// just to be sure
/*
    var rDefine = /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#define[ \t]*([a-zA-Z_]*)[ \t]*([^\n\*\/]*)/gi;
    var rInclude = /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#include[ \t]*([^\>\<\:\"\|\?\*\']*?)(?:\*\/|\n)/gi;
    var rExclude = /(?:[ \t]*)?(?:[ \t]*)(?:\/\/|\/\*)[ \t]*#exclude[ \t]*(?:\*\/)?(?:.|\n|\r)*?(?:\/\/|\/\*)[ \t]*#endexclude[ \t]*(?:\*\/)?/gi;
    var rIfDef = /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#ifdef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)?[ \t]*?#endif(?:\*\/)?/gi;
    var rIfNDef = /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#ifndef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)?[ \t]*?#endif(?:\*\/)?/gi;
    var rIf = /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*#endif[ \t]*(?:\*\/)?/gi;
*/