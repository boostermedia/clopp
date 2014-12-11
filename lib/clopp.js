

/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

var definitions = {};

exports.preprocess = function (grunt, src, options)
{
    var contents = grunt.file.read(src);
    var options = options || {};

    var rDefine = /(?:\/\/|\/\*)?[ \t]*?#define[ \t]*([a-zA-Z_]*)[ \t]*([^\n]*)/gi;
    var rInclude = /(?:\/\/|\/\*)?[ \t]*?#include[ \t]*([^\>\<\:\"\|\?\*\']*?)(?:\*\/|\n)/gi;
    var rExclude = /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#exclude[ \t]*(?:\*\/)?(?:.|\n|\r)*?(?:\/\/|\/\*)[ \t]*#endexclude[ \t]*(?:\*\/)?/gi;
    var rIfDef = /(?:\/\/|\/\*)?[ \t]*?#ifdef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)?[ \t]*?#endif(?:\*\/)?/gi;
    var rIfNDef = /(?:\/\/|\/\*)?[ \t]*?#ifndef[ \t]*([^\n*]*)[ \t]*?(?:\*\/)?((?:.|\n|\r)*?)(?:\/\/|\/\*)?[ \t]*?#endif(?:\*\/)?/gi;
    var rIf = /(?:[ \t]*)?(?:\/\/|\/\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\*\/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?:\/\/|\/\*)[ \t]*#endif[ \t]*(?:\*\/)?/gi;

    if (options.definitions)
    {
        contents = contents.replace(rDefine, function (match, definition, value)
        {
            definitions[definition] = value;
            return "";
        });
    }

    if (options.include)
    {
        contents = contents.replace(rInclude, function (match, file)
        {
            var include = grunt.file.read(file);
            return include;
        });
    }

    if (options.exclude)
    {
        contents = contents.replace(rExclude, function (match)
        {
            return "";
        });
    }

    if (options.preprocess)
    {
        contents = contents.replace(rIfDef, function (match, test, include) {
            if (definitions[test.trim()] !== undefined)
                return include;
            else
                return "";
        });

        contents = contents.replace(rIfNDef, function (match, test, include) {
            if (definitions[test.trim()] === undefined)
                return include;
            else
                return "";
        });

        for (var prop in definitions)
        {
            contents = contents.replace(new RegExp('( )(' + prop + ')([^a-z_])', 'gi'), function (match, pre, include, post) {
                return pre + definitions[prop] + post;
            });
        }

        contents = contents.replace(rIf, function (match, test, include) 
        {
            var result = testC(test);

            return result ? include : '';
        });
    }

    return contents;
}

function testC (condition, context) 
{
    var testFunc = new Function("context", "with(context||{}){ return (" + condition + "); }");
    return testFunc(definitions);
}

function include ()
{

}