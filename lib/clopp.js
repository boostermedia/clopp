/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

exports.preprocess = function (grunt, src, options)
{
	var file = grunt.file.read(src);

	return file;
}