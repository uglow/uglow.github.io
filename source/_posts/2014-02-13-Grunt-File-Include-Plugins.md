---
title: File-include plugins for GruntJS
date: 2014-02-13
tags: [grunt, include, grunt-plugin]
coverImage: abstract-10.jpg
coverCaption: '[dargadgetz](http://www.dargadgetz.com/ios-7-abstract-wallpaper-pack-for-iphone-5-and-ipod-touch-retina/)'
---

## The Problem
You want to keep your code <abbr title="Don't repeat yourself">DRY</abbr> and/or you want to keep data separate form your code.

<!-- more -->

So you pull the data out of your code into a separate data file (in an XML or JSON format). Sweet! Now you have appropriate syntax codeblocking for your code and data, and you have separated your concerns. But how do you use the data from your code?

Well you can either:
- Load the data at runtime
- OR, recombine the code and data in a compilation step

There are pros and cons to both approaches, but lets say that the main priority is you want to avoid an extra HTTP request at runtime. That means that combining the files during compilation is the best option.

There are number of [GruntJS](http://gruntjs.com/) plugins available which purport to offer the required functionality. Let's take a look at the main features of 4 plugins:

1. grunt-bake
1. grunt-include-replace-cwd
1. grunt-includes
1. grunt-include-replace

## Key requirements

### Include any kind of file

Obviously, the plugin must allow you to include one file from another file:
{% codeblock lang:html  %}
// index.html:
//@@include('indexTemplate.html')

// indexTemplate.html:
<html><body>
Hello world
</body></html>
{% endcodeblock %}

This should produce the following index.html file:
{% codeblock lang:html  %}
<html><body>
Hello world
</body></html>
{% endcodeblock %}

Some plugins are adept and doing file-includes for only certain types of files, usually HTML. This is fine if you only need HTML file-includes.
But an ideal solution shouldn't care what kind of files you want to include. For example, you should be able to do this:

{% codeblock lang:js  %}
// routeLoader.js:
...
function getRoutes() {
  var routeTable = [];
  //@@include('routeData.jsonp')
  return routeTable;
}
...

// routeData.jsonp:
routeTable = ['really', 'big', 'list', 'of', 'things', ...];
{% endcodeblock %}


This should produce the following routeLoader.js file:
{% codeblock lang:js  %}
...
function getRoutes() {
  var routeTable = [];
  routeTable = ['really', 'big', 'list', 'of', 'things', ...];
  return routeTable;
}
...
{% endcodeblock %}

### Templates and attribute passing

This is a really important feature which extends-on from the idea of being able to insert one file into another:
the ability to insert one-or-more values into one-or-more places in an included file. For example:

{% codeblock lang:html  %}
// indexDev.html:
//@@include('indexTemplate.html', {environment: "Dev"})

// indexProd.html:
//@@include('indexTemplate.html', {envirionment: "Prod"})

// indexTemplate.html:
<html><body>
Hello world, you're in //@@environment now!
</body></html>
{% endcodeblock %}

This produces indexDev.html...
{% codeblock lang:html  %}
<html><body>
Hello world, you're in Dev now!
</body></html>
{% endcodeblock %}

...and indexProd.html
{% codeblock lang:html  %}
<html><body>
Hello world, you're in Prod now!
</body></html>
{% endcodeblock %}

This capability provides a compile-time template engine! Very powerful.


### Template and file-include configurable syntax
The ideal file-include plugin would allow you to set the syntax to use when defining the file-include command and when defining what a template-value looks like.
Naïve implementations often use a syntax that conflicts with run-time template engines, or server-side template engines.

For example, if you use AngularJS, it uses { {}} notation for binding to data from within HTML fragments:
{% codeblock lang:html  %}
<html><body>
Hello world, you're in { {environment}} now!
</body></html>
{% endcodeblock %}

If the file-include plugin uses the same syntax, you're in trouble because the plugin will replace all the { {}} templates it finds before Angular gets to run!
Most of the newer plugins allow you to configure the syntax for both templates and file-include commands:

{% codeblock lang:js  %}
includereplace: {
  options: {
    prefix: '//@@', // This works for HTML and JS replacements
    suffix: ''
  }
}
{% endcodeblock %}


### Support for Grunt 0.4+ file globbing conventions
Depending on when the plugin was written, the plugin will support [different syntaxes](http://gruntjs.com/configuring-tasks#files) for file specifications.
You don't want to have to specify every single file that has an include in it (unless you have a really-small project... size DOES matter).

For example, the following sub-tasks should be supported by your plugin:

{% codeblock lang:js  %}
include-plugin: {
  // Specify a list of JS files as inputs, and output them into the output/js directory
  js: {
    files: [
      { expand: true, cwd: '\<%= env.environment.outputDir %>/js', src: ['*.js'], dest: '\<%= env.environment.outputDir %>/js/' },
    ]
  },
  
  // Find all JS files in the test directory, at any depth, and output them to the output/test directory
  test: {
    files: [
      { expand: true, cwd: '\<%= env.environment.outputDir %>/test', src: ['**/*.js'], dest: '\<%= env.environment.outputDir %>/test/' }
    ]
  },
  
  // Find all html files in the output directory, except for ones ending in '...Template.html' and output them to the output directory
  // Note that we are over-writing the original files, and that's ok!
  web: {
    files: [
      { expand: true, cwd: '\<%= env.environment.outputDir %>', src: ['*.html', '!*Template.html'], dest: '\<%= env.environment.outputDir %>/' }
    ]
  }
}
{% endcodeblock %}

Note that in all cases, none of the matching source files are expected to be concatenated into a single file by the plugin. 

### Other features
Some plugins support conditional logic in their templating, which can be useful if you are heavily using the templating features.
In my case, I don't need this functionality.

## Plugins

### grunt-bake

When I was first looking for a file-include plugin, [grunt-bake](https://github.com/MathiasPaumgarten/grunt-bake) was the first plugin I could get working. 
After using it a bit more and finding that it didn't support specifying a directory as a destination, I created a local patch to do it.
This patch had to be installed before any other Grunt tasks were run, so it became a glaring sign that something wasn't right. In the end, the need
for the patch file drove me to explore other file-include plugins further.

Features:

- File include capability
- Inline attributes for included files
- Attributes via Gruntfile.js
- Configurable template replacement pattern
- Conditional logic (if, for)

Missing Features:

- Specifying a directory as a destination for processed files
- Configurable file-include syntax pattern

### grunt-include-replace-cwd

I didn't investigate [grunt-include-replace-cwd](https://www.npmjs.org/package/grunt-include-replace-cwd) in much depth due to it's age, lack of
examples and the sense that it was not being maintained.

Features:

- File include capability
- Configurable template replacement pattern
- Configurable file-include syntax pattern
- Specifying a directory as a destination for processed files
- Inline attributes for included files
- Attributes via Gruntfile.js

Missing Features:

- Conditional logic (if, for)

### grunt-includes

[grunt-includes](https://www.npmjs.org/package/grunt-includes) supports basic file-include features, but does not support attribute-passing or templates.

Features:

- File include capability
- Configurable template replacement pattern
- Configurable file-include syntax pattern
- Specifying a directory as a destination for processed files

Missing Features:

- Inline attributes for included files
- Attributes via Gruntfile.js
- Conditional logic (if, for)


### grunt-include-replace
[include-replace](https://www.npmjs.org/package/grunt-include-replace) is a great plugin which met my main requirements. 

Features:

- File include capability
- Inline attributes for included files
- Attributes via Gruntfile.js
- Configurable template replacement pattern
- Specifying a directory as a destination for processed files
- Configurable file-include syntax pattern

Missing Features:

- Conditional logic (if, for)


## Conclusion
After evaluating these plugins, I decided on [include-replace](https://www.npmjs.org/package/grunt-include-replace) for the following reasons:

- It supports normal Grunt 0.4+ file source/destination conventions. You don't want to have to specify a destination file pattern for
each source file-pattern, which is what some plugins forced you to do. Alternatively, they interpreted a directory specification as "concatenate all source files into the specified directory"!
- It supports configurable file and template syntax which means that the plugin won't interfere with any other template syntax that is in use (such as AngularJS, Handlebars, JSPs). It also allows me to choose a syntax that is ignored by lint-checkers for JS and HTML files. 
- It supports passing attributes to included-files globally (via Gruntfile.js) and inline.

After using it for a month, it performs reliably and does what I need it to.