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
            inline: false
        });
        var done = this.async();

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
                if (grunt.file.isFile(src))
                {
                    var preprocessed = clopp.preprocess(grunt, src);
                    
                    if (file.dest)
                        grunt.file.write(file.dest + path.basename(src), preprocessed);
                    else
                        grunt.file.write(src, preprocessed);
                }
            });
        });
    });
};