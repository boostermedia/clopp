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
var glob = require("glob");

module.exports = function(grunt) {

    grunt.registerMultiTask("clopp", "clopp is a cross-language omni-functional preprocessor designed to make building for multiple targets easy", function() 
    {
        // Merges default options with custom ones
        var options = this.options();
        var done = this.async();

        glob(options.files[0], function (err, files) 
        {
            console.log(err, files);

            done();
        });
    });
};