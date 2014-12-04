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
    // ---- (?:\/\* #elseif ([^\n*]*)((?:.|\n|\r)*?))?##----####

    var rIf = "\/\* #if ([^\n*]*)((?:.|\n|\r)*?)// #endif";
    var rElses = "(?:/\* #elseif|/\* #else)";
    var rElses2 = '((?:.|\n|\r)*?)/\* #elseif ([^\n*]*)((?:.|\n|\r)*?)/\* #else((?:.|\n|\r)*?)##----####';
    var rElses3 = '(?:\/\* #elseif ([^\n*]*)((?:.|\n|\r)*?))?##----####';

    ///\* #if ([^\n*]*)((?:.|\n|\r)*?)/\* #endif \*/
    contents = contents.replace(new RegExp(rIf, 'gi'), function (match, test, include) 
    {
        if (include.match(new RegExp(rElses, 'gi')))
        {
            include += "##----####";

            var recursiveElseifCheck = function (string) {
                var recursiveStuffs = "";
                string.replace(new RegExp(rElses3, 'gi'), function (sMatch, sTest, sInclude)
                {
                    var passed = false;
                    if (passed == true)
                    {
                        // test passed, use current if block
                    }
                    else
                    {
                        // test next if block
                        console.log('.' + sInclude);
                        var matches = sInclude.match(new RegExp('(?:\/\*|\/\/) #elseif', 'i'));
                        sInclude = sInclude.substr(matches.index, sInclude.length);
                        console.log('.' + sInclude);

                        matches = sInclude.match(new RegExp('(?:\/\*|\/\/) #elseif', 'i'));
                        sInclude = sInclude.substr(matches.index - 2, sInclude.length);
                        console.log('.' + sInclude);

                        //recur
                    }
                });

                if (recursiveStuffs)
                {
                    recursiveElseifCheck(recursiveStuffs);
                }
            };

            recursiveElseifCheck(include);

            //include.replace(new RegExp(rElses2, 'gi'), function () {
            //    console.log(arguments);
            //});
        }
        else
        {
            // do test
        }
        return include;
    });

    return contents;
}