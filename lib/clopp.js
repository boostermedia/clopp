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

    //var rIf = "(?:[ \t]*)?(?://|/\\*)[ \t]*#if[ \t]*([^\n*]*)[ \t]*(?:\\*/)?(?:[ \t]*[\r\n]+)?";
    //var rMid = "((?:.|\n|\r)*?)";
    //var rEnd = "(?:[ \t]*)?(?://|/\\*)[ \t]*#endif[ \t]*(?:\\*/)?(?:[ \t]*[\r\n]+)?";

    var rIf = "/\* #if ([^\n*]*)((?:.|\n|\r)*?)/\* #endif \*";
    var rElses = "(?:/\* #elseif|/\* #else)";
    var rElses2 = '((?:.|\n|\r)*?)/\* #elseif ([^\n*]*)((?:.|\n|\r)*?)/\* #else((?:.|\n|\r)*?)##----####';

    ///\* #if ([^\n*]*)((?:.|\n|\r)*?)/\* #endif \*/
    contents = contents.replace(new RegExp(rIf, 'gi'), function (match, test, include) 
    {
        if (include.match(new RegExp(rElses, 'gi')))
        {
            include += "##----####";

            include.replace(new RegExp(rElses2, 'gi'), function () {
                console.log(arguments);
            });
        }
        else
        {
            // do test
        }
        return include;
    });

    return contents;
}