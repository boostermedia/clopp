/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2015 Riko Ophorst
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-bump');

    var bump = grunt.option("bump") || 'patch'; // what to bump

    grunt.initConfig({
        bump: {
            options: {
                dryRun: false,
                files: ['package.json'],
                commit: true,
                commitFiles: ['-a'],
                createTag: true,
                push: true
            }
        },
        clean: 
        {
            tests: ['test/functional/dest/*', '!test/functional/dest/*.md']
        },
        clopp: 
        {
            preprocess: 
            {
                options: {
                    filetypes: true,
                    context: {
                        __ads: true,
                        __environment: 'stage'
                    }
                },
                files:
                [
                    { src: 'test/functional/src/test.html', dest: 'test/functional/dest/'},
                    { src: 'test/functional/src/test.js',   dest: 'test/functional/dest/'}
                ]
            }
        },
        mochaTest: {
            'spec': {
                options: {
                    reporter: 'spec',
                    // tests are quite slow as thy spawn node processes
                    timeout: 10000
                },
                src: ['test/unit/**/*.js']
            }
        }
    });

    grunt.registerTask('build',   ['bump-only:'+bump, 'clean', 'clopp', 'bump-commit']);
    grunt.registerTask('default', ['clean', 'clopp']);
};
