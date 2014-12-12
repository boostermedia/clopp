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

## The "clopp" task

### Overview
In your project's Gruntfile, add a section named `clopp` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  clopp: {
    options: {
      inline: [ true | false ]
    },
    files:
    [
        { src: ['myinput.js'], dest: 'myoutputfolder' }
    ]
  },
});
```

### Options

#### options.inline
Type: `boolean`
Default value: `false`

This specifies whether you want the preprocessing to happen within the source input file(s). If you chose to do so, keep in mind that you are risking code loss.
If you do not specify inline, or specify it as false, you have to tell the files configuration what your destination folder is.

### Usage Examples

#### Pick all files from your project, and output them in target destination folder
In this example, we pick all files from our project, and output them in a target destination folder specified via the normal Grunt files format.

```js
module.exports = function(grunt) 
{
  grunt.loadNpmTasks('grunt-clopp');

  grunt.initConfig(
  {
    clopp: 
    {
      preprocess: 
      {
        files:
        [
          { src: ['*.*'], dest: 'preprocessed' }
        ]
      }
    }
  });

  grunt.registerTask('default', ['clopp']);
};
```

#### Inline preprocessing (WARNING: *dangerous*)
*WARNING! Inline preprocessing is very dangerous. By running this, you are risking severe code loss on your project. Use with caution.*
In this example, we set the inline option to true and do not specify a destination folder. 

```js
module.exports = function(grunt) 
{
  grunt.loadNpmTasks('grunt-clopp');

  grunt.initConfig(
  {
    clopp: 
    {
      preprocess: 
      {
        options:
        {
          inline: true
        },
        files:
        [
          { src: ['*.*'] }
        ]
      }
    }
  });

  grunt.registerTask('default', ['clopp']);
};
```

## Release History
clopp is still very much in a pre-alpha state. It is no where near supposed to be able to run in a professional production environment.
