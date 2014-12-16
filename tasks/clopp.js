/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

"use strict";

var fs = require("fs");
var path = require("path");
var clopp = require("../lib/clopp.js");

module.exports = function(grunt) 
{
    grunt.registerMultiTask("clopp", "clopp is a cross-language omni-functional preprocessor designed to make building for multiple targets easy", function() 
    {
        // Merges default options with custom ones
        var options = this.options({
            inline: false,
            definitions: true,
            include: true,
            exclude: true,
            skips: true,
            preprocess: true,
            context: {}
        });
        var done = this.async();

        // Set the context in which the preprocessor will operate
        clopp.setContext(options.context);
        
        // Loop TWICE over files, one for catching all #defines, #includes & #excludes, and one for the actual preprocessing

        // Check for #defines, #includes & #excludes
        this.files.forEach(function (file) 
        {
            if (!options.inline && !file.dest)
            {
                grunt.log.error("Please specify a writing destination for your preprocessed files, or set inline to true in your task configuration for clopp.");
                grunt.log.error("Keep in mind that if you choose to use inline preprocessing, you are risking code loss, because the preprocessing will happen in your actual source files.");

                throw new Error();
            }

            file.src.forEach(function (src)
            {
                if (!fs.existsSync(file.dest))
                {
                    grunt.log.error("Please make sure that your destination folder is already existing before running clopp! The following destination folder is not yet existing:");
                    grunt.log.error("Folder:\t" + file.dest);

                    throw new Error();
                }

                if (!fs.lstatSync(file.dest).isDirectory())
                {
                    grunt.log.error("You specified an actual file for the destination of one of your configured source files.");
                    grunt.log.error("Please check your grunt-clopp configuration and make sure to only submit folders as destination locations.");
                    grunt.log.error("This is the source & destination configuration you submitted:");
                    grunt.log.error("\t\tSrc file: \t"+file.src);
                    grunt.log.error("\t\tDest path: \t"+file.dest);

                    throw new Error();
                }

                if (grunt.file.isFile(src))
                {
                    var preprocessed = clopp.preprocess(grunt, src, {
                        searchDefinitions: options.definitions,
                        replaceDefinitions: false,
                        include: options.include, 
                        exclude: options.excludes,
                        skips: options.skips, 
                        preprocess: false
                    });
                    
                    if (file.dest)
                        grunt.file.write(file.dest + path.basename(src), preprocessed);
                    else
                        grunt.file.write(src, preprocessed);
                }
            });
        });

        // Actually preprocess here
        if (options.inline)
        {
            this.files.forEach(function (file) 
            {
                file.src.forEach(function (src)
                {
                    if (grunt.file.isFile(src))
                    {
                        var preprocessed = clopp.preprocess(grunt, src, {
                            searchDefinitions: false,
                            replaceDefinitions: true,
                            include: false, 
                            exclude: false,
                            skips: false,
                            preprocess: options.preprocess
                        });

                        grunt.file.write(src, preprocessed);
                    }
                });
            });
        }
        else
        {
            this.files.forEach(function (file)
            {
                file.src.forEach(function (src)
                {
                    if (grunt.file.isFile(src) && grunt.file.isFile(file.dest + path.basename(src)))
                    {
                        var preprocessed = clopp.preprocess(grunt, file.dest + path.basename(src), {
                            searchDefinitions: false,
                            replaceDefinitions: true,
                            include: false, 
                            exclude: false,
                            skips: false, 
                            preprocess: options.preprocess
                        });

                        grunt.file.write(file.dest + path.basename(src), preprocessed);
                    }
                });
            });
        }
    });
};