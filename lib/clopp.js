/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

exports.preprocess = function (grunt, src, options)
{
    var contents = grunt.file.read(src);

    var start = "(?:[ \t]*)?(?://|/\\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\\*/)?(?:[ \t]*[\r\n]+)?";
    var mid = "((?:.|\n|\r)*?)";
    var end = "(?:[ \t]*)?(?://|/\\*)[ \t]*#endif[ \t]*(?:\\*/)?(?:[ \t]*[\r\n]+)?";

    //file = file.replace(/\/\*\s+#if (\w*\s*==\s*\"?\w+\")(?:.|\n)*((?:.|\n|\r)*)/g, function (match, test, include, blab) {
    contents = preprocessIfStatements(contents);

    return contents;
}

function preprocessIfStatements (contents)
{
    var ifStatement = "/* #if ";
    for (var i = 0; i <= contents.length; i++)
    {
        if (contents.substr(i, ifStatement.length) == ifStatement)
        {
            //var endOfLineI = lookBack(contents, i, '\n') + contents.substr(i, Infinity).indexOf('\n');
            //var completeLine = contents.substr(i, Infinity).indexOf;
        }
    }
}

function lookBack (string, startingPoint, match)
{
    for (var i = startingPoint; i >= 0; i--)
    {
        if (string.substr(i, match.length) == match)
        {
            return i;
        }
    }
    return 0;
}

function lookForward (string, startingPoint, match)
{
    for (var i = startingPoint; i < string.length; i++)
    {
        if (string.substr(i, match.length) == match)
        {
            return i;
        }
    }
    return 0;
}