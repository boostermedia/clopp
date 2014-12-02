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

    var rIf = "(?:[ \t]*)?(?://|/\\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\\*/)?(?:[ \t]*[\r\n]+)?";
    var rMid = "((?:.|\n|\r)*?)";
    var rEnd = "(?:[ \t]*)?(?://|/\\*)[ \t]*#endif[ \t]*(?:\\*/)?(?:[ \t]*[\r\n]+)?";

    ///\* #if ([^\n*]*)((?:.|\n|\r)*?)/\* #endif \*/

    contents = contents.replace(new RegExp(rIf + rMid + rEnd, 'gi'), function (match, test, include) 
    {
        console.log(arguments);

        return include;
    });

    return contents;
}