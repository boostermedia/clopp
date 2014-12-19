/*
 * grunt-clopp
 * https://github.com/boostermedia/clopp
 *
 * Copyright (c) 2014 Riko Ophorst
 * Licensed under the MIT license.
 */

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
		/* #ifdef __ads
		doSomeAdCall(callback, ctx);
		return;
		/* #endif */
		/* #ifndef __ads */
		callback.call(ctx);
		/* #endif */
	},
	getMetaData: function () 
	{
		return "/* #include test\src\metadata.js */";
	},
	showDebuggingTools: function ()
	{
		/* #exclude */
		showAllTheDebuggerTools();
		/* #endexclude */
	},
	analytics: function (type, callback, ctx)
	{
		/* #if __environment == "prodd"
		doSomeProductionCall(type, callback, ctx);
		/* #elseif __environment == "stage"
		doSomeStageCall(type, callback, ctx);
		/* #elseif 1+1==2
		console.log();
		/* #else */
		callback.call(ctx);
		/* #endif */
	},
	version: function ()
	{
		return __version;
	}
});