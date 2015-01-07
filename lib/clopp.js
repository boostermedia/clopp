/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2015 Riko Ophorst
 * Licensed under the MIT license.
 */

var definitions = {};
var path = require("path");
var regexps = require("./regexps.js");

exports.setContext = function (context, grunt) 
{
    definitions = context;

    grunt.verbose.write("\nOverwriting the complete definitions context..\n".yellow);
    for (var prop in context)
    {
        grunt.verbose.write("Setting definition " + prop.cyan + " to " + context[prop].cyan + "\n");
    }
    grunt.verbose.write("\n");
};

exports.preprocess = function (grunt, src, options)
{
    var contents = grunt.file.read(src);
    var options = options || {};

    var ext = path.extname(src).split('.')[1];

    var regex = regexps[ext];

    grunt.verbose.write("\nPreprocessing " + src.cyan + "...\n");
    grunt.verbose.write("Identified file type: " + ext.cyan + "\n");

    if (!regex)
    {
        if (!options.ignoreErrors)
        {
            grunt.log.error("As of this moment, the is no way for clopp to preprocess this file: ");
            grunt.log.error("\t\tFile path:" + src);
            grunt.log.error("\t\tFile extension:" + ext);
            grunt.log.error("Currently, these are the supported file extensions:");

            for (var prop in regexps)
            {
                grunt.log.error("\t" + prop);
            }

            grunt.log.error("If you want this file type to be supported, please submit a request to this contact e-mail: info@rikoophorst.com");
    
            throw new Error();
        }
        return contents;
    }

    if (scanSkips(contents, regex) && options.skips)
    {
        grunt.verbose.write("Found " + "#skip".cyan + " tag, skipping " + src.cyan + "\n");
        return contents;
    }

    if (options.exclude)
    {
        contents = scanExcludes(contents, regex, grunt);
    }

    if (options.include)
    {
        contents = scanIncludes(contents, regex, grunt);
    }

    if (options.searchDefinitions)
    {
        contents = scanSearchDefinitions(contents, regex, grunt);
    }

    if (options.preprocess)
    {
        contents = scanIfDefBlocks(contents, regex, grunt);

        contents = scanIfNDefBlocks(contents, regex, grunt);

        contents = scanReplaceDefinitions(contents, regex, grunt);

        contents = scanIfBlocks(contents, regex, grunt);
    }

    grunt.verbose.write("\n");

    return contents;
};

function testCondition (condition, grunt) 
{
    condition = condition.replace(/\-\-\>/gi, function (match) {
        return "";
    });

    var testFunc = new Function("context", "with(context||{}){ return (" + condition + "); }");

    // Note that we are using two lines for this. This is because if there are any syntaxial errors in the condition & we would
    // use only a one-line statement, you wouldn't get the debug output of your condition in the console because the JavaScript
    // environment would crash on us.
    grunt.verbose.write("Testing condition: " + condition.cyan + "\n");
    grunt.verbose.write("Result of above condition: " + testFunc(definitions) + "\n");

    return testFunc(definitions);
}

function scanSkips (source, regexs, grunt)
{
    var regexType = "array";
    var regexs_ = regexs;
    
    if (Object.prototype.toString.call(regexs) === "[object Object]")
    {
        regexs = [0];
        regexType = "object";
    }

    var skip = false;

    for (var i = 0; i < regexs.length; i++)
    {
        var regex = regexs[i];
        
        if (regexType !== "array")
        {
            regex = regexs_;
        }

        if (source.match(regex.skip))
        {
            skip = true;
        }
    }

    return skip;
}

/*
 * Scans, searches & parses given source with given regex(s) for #defines
 */
function scanSearchDefinitions (source, regexs, grunt)
{
    var regexType = "array";
    var regexs_ = regexs;
    
    if (Object.prototype.toString.call(regexs) === "[object Object]")
    {
        regexs = [0];
        regexType = "object";
    }

    var contents = source;

    for (var i = 0; i < regexs.length; i++)
    {
        var regex = regexs[i];
        
        if (regexType !== "array")
        {
            regex = regexs_;
        }

        contents = contents.replace(regex.define, function (match, definition, value)
        {
            definitions[definition] = value;
            grunt.verbose.write("Found " + "#define".cyan + " tag, setting " + definition.cyan + " to " + value.cyan + "\n");
            return "";
        });
    }

    return contents;
}

/*
 * Scans & searches given source with given regex(s) for #excludes
 */
function scanExcludes (source, regexs, grunt)
{
    var regexType = "array";
    var regexs_ = regexs;
    
    if (Object.prototype.toString.call(regexs) === "[object Object]")
    {
        regexs = [0];
        regexType = "object";
    }

    var contents = source;

    for (var i = 0; i < regexs.length; i++)
    {
        var regex = regexs[i];
        
        if (regexType !== "array")
        {
            regex = regexs_;
        }

        contents = contents.replace(regex.exclude, function (match)
        {
            grunt.verbose.write("Found " + "#exclude".cyan + " tag, excluding code..\n");
            return "";
        });
    }

    return contents;
}

/*
 * Scans & searches given source with given regex(s) for #includes
 */
function scanIncludes (source, regexs, grunt)
{
    var regexType = "array";
    var regexs_ = regexs;
    
    if (Object.prototype.toString.call(regexs) === "[object Object]")
    {
        regexs = [0];
        regexType = "object";
    }

    var contents = source;

    for (var i = 0; i < regexs.length; i++)
    {
        var regex = regexs[i];
        
        if (regexType !== "array")
        {
            regex = regexs_;
        }

        contents = contents.replace(regex.include, function (match, file)
        {
            grunt.verbose.write("Found " + "#include".cyan + " tag, include test from " + file.trim().cyan + "..\n");
            var include = grunt.file.read(file.trim());
            return include;
        });
    }

    return contents;
}

/*
 * Scans given source file, looks for already defined definitions & replaces them accordingly
 */
function scanReplaceDefinitions (source, regexs, grunt)
{
    var regexType = "array";
    var regexs_ = regexs;
    
    if (Object.prototype.toString.call(regexs) === "[object Object]")
    {
        regexs = [0];
        regexType = "object";
    }

    var contents = source;

    for (var i = 0; i < regexs.length; i++)
    {
        var regex = regexs[i];
        
        if (regexType !== "array")
        {
            regex = regexs_;
        }

        for (var prop in definitions)
        {
            var amt = 0;
            contents = contents.replace(new RegExp('([ \\+\\-\\*\\!\\|\\[\\]\\\'\\"\\>\\<\\=\\(\\)\n\t])(' + prop + ')([\\\'\\[\\]\\+\\-\\(\\) \\=\\*\\&\\>\\<\\{\\}\n \t\!])', 'gi'), function (match, pre, include, post) {
                amt++;
                return pre + definitions[prop] + post;
            });
            grunt.verbose.write("Replaced definition " + prop.cyan + " with " + definitions[prop].cyan + " " +  amt.toString().yellow + " time(s)..\n");
        }
    }

    return contents;
}

/*
 * Scans given source file for ifdef blocks and parses them accordingly
 */
function scanIfDefBlocks (source, regexs, grunt)
{
    var regexType = "array";
    var regexs_ = regexs;
    
    if (Object.prototype.toString.call(regexs) === "[object Object]")
    {
        regexs = [0];
        regexType = "object";
    }

    var contents = source;

    for (var i = 0; i < regexs.length; i++)
    {
        var regex = regexs[i];
        
        if (regexType !== "array")
        {
            regex = regexs_;
        }

        contents = contents.replace(regex.ifdef, function (match, test, include) {
            if (definitions[test.trim()] !== undefined)
            {
                grunt.verbose.write("Found " + "#ifdef".cyan + " tag on " + test.trim().cyan + ", and it " + "IS".yellow + " defined\n");
                return include;
            }
            else
            {
                grunt.verbose.write("Found " + "#ifdef".cyan + " tag on " + test.trim().cyan + ", and it " + "IS NOT".red + " defined\n");
                return "";
            }
        });
    }

    return contents;
}

/*
 * Scans given source file for ifndef blocks and parses them accordingly
 */
function scanIfNDefBlocks (source, regexs, grunt)
{
    var regexType = "array";
    var regexs_ = regexs;
    
    if (Object.prototype.toString.call(regexs) === "[object Object]")
    {
        regexs = [0];
        regexType = "object";
    }

    var contents = source;

    for (var i = 0; i < regexs.length; i++)
    {
        var regex = regexs[i];
        
        if (regexType !== "array")
        {
            regex = regexs_;
        }

        contents = contents.replace(regex.ifndef, function (match, test, include) {
            if (definitions[test.trim()] === undefined)
            {
                grunt.verbose.write("Found " + "#ifndef".cyan + " tag on " + test.trim().cyan + ", and it " + "IS NOT".red + " defined\n");
                return include;
            }
            else
            {
                grunt.verbose.write("Found " + "#ifndef".cyan + " tag on " + test.trim().cyan + ", and it " + "IS".yellow + " defined\n");
                return "";
            }
        });
    }

    return contents;
}

/*
 * Scans the file for if blocks/statements
 * and processes them accordingly
 */
function scanIfBlocks (source, regexs, grunt)
{
    var regexType = "array";
    var regexs_ = regexs;
    
    if (Object.prototype.toString.call(regexs) === "[object Object]")
    {
        regexs = [0];
        regexType = "object";
    }

    var contents = source;

    for (var i = 0; i < regexs.length; i++)
    {
        var regex = regexs[i];
        
        if (regexType !== "array")
        {
            regex = regexs_;
        }

        contents = contents.replace(regex.if, function (match, test, include) 
        {
            var result = testCondition(test, grunt);

            include += regex.endelseifstring;
            
            // Is the main if statement true?
            if (result)
            {
                // Yes, the main if statement is true, so use the include

                // Does the include contain #else or #elseif statements?
                if (include.match(regex.elsechecker))
                {
                    // Yes, the include contains #else & #elseif statements

                    // Remove all #else & #elseif statements from the include, and return that as a result
                    var include2;
                    include = include.replace(regex.elsechecker, function (match, actualInclude) {
                        include2 = actualInclude;
                    });
                    include = include2;
                }
                else
                {
                    // No, the include does not contain #else & #elseif statements

                    // Return just the include

                    include = include.replace(regex.endelseifregex, function (match, replace) {
                        return "";
                    });
                    return include;
                }
            }
            else
            {
                // No, the main if statement is false

                // Does the include contain #elseif statements?
                if (include.match(regex.elseif))
                {
                    // Yes, the include does contain #elseif statements

                    var matched = 0;
                    include = include.replace(regex.elsereplacer, function (match, prev) {
                        if (++matched >= 1) {
                            return regex.endelseifstring + prev;
                        }
                        else
                        {
                            return prev;
                        }
                    });

                    // Create a boolean variable that will determine if there is at least 1 #elseif that is succesful
                    var found = false;

                    // Create an array of all conditions that are found
                    var conditions = [];
                    include = include.replace(regex.elseif, function (match, test, include) {
                        conditions.push({
                            condition: test,
                            include: include
                        });
                        return match;
                    });

                    // Loop over the conditions array
                    for (var i = 0; i < conditions.length; i++)
                    {
                        // Test each condition
                        var result = testCondition(conditions[i].condition, grunt);
                        
                        // Is the condition succesful?
                        if (result)
                        {
                            // Yes, so set the include to the conditions' include & set found to true
                            include = conditions[i].include;
                            found = true;
                            break;
                        }
                    }

                    // Is there any #elseif statement succesful?
                    if (!found)
                    {
                        // No, there are no #elseif statements succesful

                        // Does the include contain else statements?
                        if (include.match(regex.else))
                        {
                            // Yes, the include does contain #else statements

                            // Strip down the #else statement and return it
                            var include2;
                            include = include.replace(regex.else, function (match, actualInclude) {
                                include2 = actualInclude;
                            });
                            include = include2;
                        }
                        else
                        {
                            // No, the include does not contain #else statements

                            // Return an empty string, as nothing from this if statement should be outputted in the final file
                            include = "";
                        }
                    }
                }
                else
                {
                    // No, the include does not contain #elseif statements

                    // Does the include contain else statements?
                    if (include.match(regex.else))
                    {
                        // Yes, the include does contain #else statements

                        // Strip down the #else statement and return it
                        var include2;
                        include = include.replace(regex.else, function (match, actualInclude) {
                            include2 = actualInclude;
                        });
                        include = include2;
                    }
                    else
                    {
                        // No, the include does not contain #else statements

                        // Return an empty string, as nothing from this if statement should be outputted in the final file
                        include = "";
                    }
                }
            }

            include = include.replace(regex.endelseifregex, function (match, replace) {
                return "";
            });

            return include;
        });
    }

    return contents;
}