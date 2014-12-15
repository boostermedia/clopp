/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

var definitions = {};
var path = require("path");
var regexps = require("./regexps.js");

exports.setContext = function (context) 
{
    definitions = context;
};

exports.preprocess = function (grunt, src, options)
{
    var contents = grunt.file.read(src);
    var options = options || {};

    var ext = path.extname(src).split('.')[1];

    var regex = regexps[ext];

    if (!regex)
    {
        if (!options.ignoreErrors)
        {
            grunt.log.error("As of this moment, the is no way for clopp to preprocess this file: ");
            grunt.log.error("\t\tFile path:" + src);
            grunt.log.error("\t\tFile extension:" + ext);
            grunt.log.error("If you want this file type to be supported, please submit a request to this contact e-mail: info@rikoophorst.com");
    
            throw new Error();
        }
        return contents;
    }

    if (options.definitions)
    {
        contents = contents.replace(regex.define, function (match, definition, value)
        {
            definitions[definition] = value;
            return "";
        });

        if (regex.extraRegex)
        {
            contents = contents.replace(regex.extraRegex.define, function (match, definition, value)
            {
                definitions[definition] = value;
                return "";
            });
        }
    }

    if (options.include)
    {
        contents = contents.replace(regex.include, function (match, file)
        {
            var include = grunt.file.read(file);
            return include;
        });

        if (regex.extraRegex)
        {
            contents = contents.replace(regex.extraRegex.include, function (match, definition, value)
            {
                var include = grunt.file.read(file);
                return include;
            });
        }
    }

    if (options.exclude)
    {
        contents = contents.replace(regex.exclude, function (match)
        {
            return "";
        });

        if (regex.extraRegex)
        {
            contents = contents.replace(regex.extraRegex.exclude, function (match, definition, value)
            {
                return "";
            });
        }
    }

    if (options.preprocess)
    {
        contents = contents.replace(regex.ifdef, function (match, test, include) {
            if (definitions[test.trim()] !== undefined)
                return include;
            else
                return "";
        });

        if (regex.extraRegex)
        {
            contents = contents.replace(regex.extraRegex.ifdef, function (match, test, include) {
                if (definitions[test.trim()] !== undefined)
                    return include;
                else
                    return "";
            });
        }

        contents = contents.replace(regex.ifndef, function (match, test, include) {
            if (definitions[test.trim()] === undefined)
                return include;
            else
                return "";
        });

        if (regex.extraRegex)
        {
            contents = contents.replace(regex.extraRegex.ifndef, function (match, test, include) {
                if (definitions[test.trim()] === undefined)
                    return include;
                else
                    return "";
            });
        }

        for (var prop in definitions)
        {
            contents = contents.replace(new RegExp('([ \\+\\-\\*\\!\\|\\[\\]\\\'\\"\\>\\<\\=\\(\\)\n\t])(' + prop + ')([\\\'\\[\\]\\+\\-\\(\\) \\=\\*\\&\\>\\<\\{\\}\n \t])', 'gi'), function (match, pre, include, post) {
                console.log('hurdur found one');
                return pre + definitions[prop] + post;
            });
        }

        contents = contents.replace(regex.if, function (match, test, include) 
        {
            var result = testCondition(test);
            return result ? include : '';
        });

        if (regex.extraRegex)
        {
            contents = contents.replace(regex.extraRegex.if, function (match, test, include) 
            {
                var result = testCondition(test);

                return result ? include : '';
            });
        }
    }

    return contents;
};

function testCondition (condition, context) 
{
    var testFunc = new Function("context", "with(context||{}){ return (" + condition + "); }");
    return testFunc(definitions);
}