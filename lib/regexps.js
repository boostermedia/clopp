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
    ifdef: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#ifdef[ \t]*([^\n*]*)[ \t]*?(?:\-\-\>)?((?:.|\n|\r)*?)(?:\<\!\-\-)[ \t]*?#endif[ \t]*(?:\-\-\>)?/gi,
    ifndef: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*?#ifndef[ \t]*([^\n*]*)[ \t]*?(?:\-\-\>)?((?:.|\n|\r)*?)(?:\<\!\-\-)[ \t]*?#endif[ \t]*(?:\-\-\>)?/gi,
    if: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\-\-\>)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:\<\!\-\-)[ \t]*#endif[ \t]*(?:\-\-\>)?/gi,
    elsechecker: /((?:.|\n|\r)*?)(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#else/i,
    elseif: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#elseif[ \t]*([^\n*]*)[ \t]*(?:\-\-\>)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#endelseif[ \t]*(?:\-\-\>)?(?:[ \t]*[\r\n]+)?/gi,
    else: /(?:[ \t]*)?(?:\<\!\-\-)[ \t]*#else[^a-z](?:\-\-\>)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*)/gi
};

exports.js = {
    define: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#define[ \t]*([a-zA-Z_]*)[ \t]*([^ ]*)[ \t]*(?:\*\/)?/gi,
    include: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#include[ \t]*([^\>\<\:\"\|\?\*\']*?)(?:\*\/|\n)/gi,
    exclude: /(?:[ \t]*)?(?:[ \t]*)(?:\/\/|\/\*)[ \t]*#exclude[ \t]*(?:\*\/)?(?:.|\n|\r)*?(?:\/\/|\/\*)[ \t]*#endexclude[ \t]*(?:\*\/)?/gi,
    ifdef: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#ifdef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*?#endif[ \t]*(?:\*\/)?/gi,
    ifndef: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*?#ifndef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*?#endif[ \t]*(?:\*\/)?/gi,
    if: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*#endif[ \t]*(?:\*\/)?/gi,
    elsechecker: /((?:.|\n|\r)*?)(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#else/i,
    elseif: /(?:(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#elseif[ \t]*([^\n*]*)[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#endelseif[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?)/gi,
    else: /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#else[^a-z](?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*)/gi
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