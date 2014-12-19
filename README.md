# grunt-clopp

> clopp is a cross-language omni-functional preprocessor designed to make building for multiple targets easy

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-clopp --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-clopp');
```

## clopp

### Introduction
clopp is a tool that you can add to your toolchain which will allow you to do certain things at compile time of your project. It is designed to be run in a fully fledged production environment.

##### Why would you want to do things at compile time with JavaScript?
Valid question. There are several use-cases for this kind of thing:
1. If you have multiple build targets (i.e. a production environment, staging environment, dev environment), you can easily use specific pieces of code per build target.
2. If you want to disable pieces of code while developing, but want them actived when your app gets compiled, clopp can do that for you.
3. If you have large chunks of text that you do not want in your development files, but do *need* in your files when it's compiled, you can easily include a file & clopp does the trick!
4. If you have any experience with other preprocessors (such as the one in C++), you will understand how useful **macros** (or other definitions) are.
5. You can clopp it like it's hot... *hehehehe*

Here is a short example of what clopp can do for you.

```javascript
// #define fooFactor 3

// #ifdef fooFactor
function Foo(a, b)
{
    return a + b * fooFactor;
}
// #endif
```
Turns into this at compile time:
```javascript
function Foo(a, b)
{
    return a + b * 3;
}
```

### Configuring clopp

#### Configuring your files that need to be preprocessed
clopp, as of now, "only" supports the [standard Grunt files configuration](http://gruntjs.com/configuring-tasks#files-array-format). We recommend you use the files array format, but also support the object format and the compact format. **There is one catch though.** The destination ***needs*** to be a **folder** that **already exists** if you decide to **omit inline preprocessing**. If you choose to do inline preprocessing (which is further explained down below), clopp will *omit* your destination folder. It is in the to-do list to have this fixed, luckily.

Here is an example of a basic configuration of clopp using the array format:

```javascript
grunt.initConfig({
    clopp: 
    {
        preprocess: 
        {
            files:
            [
                { src: 'sourceFile.js', dest: '/destination/' }
            ]
        }
    }
});
```

#### Configuring options for the preprocessor
You can configure a *lot* of options in the preprocessor. Here's the ones that you can define:

#### options.inline
Type: `boolean` Default value: `false`

This is probably the most controversial option you can enable. If you set this to true, the preprocessing will happen in your *source files*. This is potentionally *very* dangerous. It can cause severe code loss in your projects if you don't take the right safety precautions.

If you set this to true, you do not have to configure any destination folder anymore.

#### options.context
Type: `object` Default value: `{}` (empty object)

This is an option that you will **probably need** in your configuration. It allows you to set the context in which the preprocessor operates. It's an object which contains `#define`s that clopp will use as if you used the `#define` statement in your source code. Sorry if that explanation is a bit weird, but please try understand this example configuration of options.context:

```javascript
grunt.initConfig({
    clopp: 
    {
        preprocess: 
        {
            options: {
                context: {
                    myDefinition: "myValue",
                }
            },
            files:
            [
                { src: 'sourceFile.js', dest: '/destination/' }
            ]
        }
    }
});
```
#### options.definitions
Type: `boolean` Default value: `true`

If you set this to false, clopp will no longer look for any `#define` statements in your code.

#### options.include
Type: `boolean` Default value: `true`

If you set this to false, clopp will no longer look for any `#include` statements in your code.

#### options.exclude
Type: `boolean` Default value: `true`

If you set this to false, clopp will no longer look for any `#exclude` statements in your code.

#### options.skips
Type: `boolean` Default value: `true`

If you set this to false, clopp will no longer look for any `#skip` statements in your code.

#### options.preprocess
Type: `boolean` Default value: `true`

If you set this to false, clopp will no longer look for any `#if`, `#ifdef` or `#ifndef` statements in your code.

#### clopp syntax

#### `#define`
`#define` is a statement you can put in your code which clopp will pick up. It basically works like a `JavaScript` variable. clopp will do a text based *search & replace* on all your files and replace all definitions it can find with the definitions' value.

Examples of `#define` in `JavaScript`:
```javascript
// #define myDefinition 10
/* #define myOtherDefinition 11 */
// #define myMacro (function(text){console.log(text);})
```

*Quick note: definition names & definition values **cannot** hold any spaces*

#### `#include`
`#include` is a statement you can put in your code which clopp will pick up. You can use to include another file at the point where you call your `#include`.

Examples of `#include` in `JavaScript`:
```javascript
// #include myInclude.txt
/* #include myOtherInclude.txt */
// #include includes/anotherInclude.js
```

#### `#exclude`
`#exclude` is a statement you can put in your code which clopp will pick up. You can use to exclude specific pieces of code from your file. Please note that `#exclude` requires an end statement, which is `#endexclude`.

Examples of `#exclude` in `JavaScript`:
```javascript
// #exclude
console.log("This code will not be here anymore when it's passed compile time!");
// #endexclude

console.log("This code will be here after compile time!");

/* #exclude */
console.log("This code will also not be here anymore when it's passed compile time!");
/* #endexclude */
```

#### `#skip`
`#skip` is a statement you can put in your code which clopp will pick up. You can use `#skip` to skip the current file and not preprocess it *at all*. That effect happens when your `#skip` statement is found **anywhere** in the file, even if it is at the very bottom of your file.

Examples of `#skip` in `JavaScript`:
```javascript
// #skip
/* #skip */
```

#### `#ifdef`
`#ifdef` is a statement you can put in your code which clopp will pick up. You can use `#ifdef` when you want to check if a given definition is already defined or not.

Examples of `#ifdef` in `JavaScript`:
```javascript
// #ifdef myDefinition
console.log("Cool! myDefinition is defined!");
// #endif

/* #ifdef myOtherDefinition */
console.log("Cool! myOtherDefinition is also defined!");
/* #endif */
```

#### `#ifndef`
`#ifndef` is a statement you can put in your code which clopp will pick up. You can use `#ifndef` when you want to check if a given definition is not defined.

Examples of `#ifndef` in `JavaScript`:
```javascript
// #ifndef myDefinition
console.log("Cool! myDefinition is not defined!");
// #endif

/* #ifndef myOtherDefinition */
console.log("Cool! myOtherDefinition is also not defined!");
/* #endif */
```

#### `#if`
`#if` is a statement you can put in your code which clopp will pick up. `#if` is a rather complicated statement in clopp, though. I will not fully explain it here, but supply you with more examples further down the page.

`#if` allows you to write conditions as you would like. Your actual condition actually gets executed in ***actual JavaScript***, so when you write `#if` statements, make sure you write as if you are writing **actual JavaScript**.

Examples of `#if` in `JavaScript`:
```javascript
// #if 1+1==2
console.log("Today I learned that 1+1 equals 2.");
// #endif

/* #if 2+2==4 */
console.log("WOW! Even more we learned today, 2+2 equals 4!");
/* #endif */

// Here is a neat little trick! This trick will work with all multiline statements in clopp :)

// This trick will allow you to have code disabled while you are developing it, but depending on whether or not
// your condition passes at compile time clopp enables / disables it. If you are confused, try it out yourself!

// The trick here, is that I am omitting the "*/" at the end of my #if statement. This will disable the code while developing it.

/* #if 3+3==6
console.log("Apparently, 3+3 equals 6!");
/* #endif */
```

#### `#elseif`
`#elseif` is a statement you can put in your code which clopp will pick up. `#elseif` functions pretty much in the same way as any `#if` statement would function, however it has to be **inside an `#if` block**. It's on the to-do list to loosen up this syntax (because it is very strict at the moment), however if-elseif-else logic is really complicated when you are in the world of regex. Sorry!

Examples of `#elseif` in `JavaScript`:
```javascript
// #if 1+1==3
console.log("Today I learned that 1+1 equals 3.");
// #elseif 1+1==4
console.log("Okay, what dimension are we in where 1+1 equals 4?");
// #elseif 1+1==2
console.log("Back on earth! 1+1 does equal 2!");
// #endif
```

#### `#else`
`#else` is a statement you can put in your code which clopp will pick up. `#else` functions in cohesion with `#if` and `#elseif`. It is a very straight forward block of code, however it has to be inside an `#if` block, just like `#elseif`.

Examples of `#else` in `JavaScript`:
```javascript
// #if 1+1==3
console.log("Today I learned that 1+1 equals 3.");
// #else
console.log("Okay, okay.. 1+1 does not actually equal 3..");
// #endif

// And an example of how to use it in cohesion with an #if & #elseif statement

// #if 1+1==3
console.log("Today I learned that 1+1 equals 3.");
// #elseif 1+1==4
console.log("Okay, what dimension are we in where 1+1 equals 4?");
// #else
console.log("Hrrm.. okay we don't know what 1+1 equals to!");
// #endif
```