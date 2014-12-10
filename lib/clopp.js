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

    var rDefine = '(?:\/\/|\/\*)?[ \t]*?#define[ \t]*([a-zA-Z_]*)[ \t]*([^\n]*)';
    var rIf = "(?:[ \t]*)?(?://|/\\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\\*/)?(?:[ \t]*[\r\n]+)?((?:.|\n|\r)*?)(?://|/\\*)[ \t]*#endif[ \t]*(?:\\*/)?";

    contents = contents.replace(new RegExp(rDefine, 'gi'), function (match, definition, value)
    {
        definitions[definition] = value;
        return "";
    });

    for (var prop in definitions)
    {
        contents = contents.replace(new RegExp('( )(' + prop + ')([^a-z_])', 'gi'), function (match, pre, include, post) {
            return pre + definitions[prop] + post;
        });
    }

    contents = contents.replace(new RegExp(rIf, 'gi'), function (match, test, include) 
    {
        var result = testC(test);

        return result ? include : '';
    });

    return contents;
}

function testC (condition, context) 
{
    var testFunc = new Function("context", "with(context||{}){ return (" + condition + "); }");
    return testFunc(definitions);
}

function define ()
{

}

function include ()
{

}