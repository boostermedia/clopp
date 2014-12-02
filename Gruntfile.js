/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        clean: 
        {
            tests: ['tmp']
        },
        clopp: 
        {
            preprocess: 
            {
                options: 
                {

                },
                files:
                [
                    { src: ['test/src/*.*'], dest: 'test/dest/' }
                ]
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean', 'clopp']);
};
