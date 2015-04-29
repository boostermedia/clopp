/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

// #filetype HTML

// #define assert (function(condition,errorMsg){if(!condition){someErrorFunction(errorMsg);}})

var app = {};

_.extend(app, {
	initializeApp: function () {
		assert(loggedIn, 'ermehgerwd');

		doSomeInitializationCode();
	},
	loginUser: function () 
	{

	},
	viewAd: function (callback, ctx)
	{

		doSomeAdCall(callback, ctx);
		return;
		

	},
	getMetaData: function () 
	{
		return "this is some meta data";
	},
	showDebuggingTools: function ()
	{

	},
	analytics: function (type, callback, ctx)
	{
		doSomeStageCall(type, callback, ctx);

	},
	version: function ()
	{
		return __version;
	}
});