---
published: true
layout: post
title: "Grunt live-reloading"
description: ""
modified: 2013-10-30
tags: [grunt, live-reload, watch, connect]
comments: true
share: true 
---

This post explains how I got live-reloading to work.

#Idea

The basic idea is you use `grunt-contrib-connect` and `[grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)` together to reload your site automagically in your browser(s).
So when you change a file that's being watched, your browser will update. Nice! 

##Lesson Learnt
- Update your `NPM` packages
- Make sure `watch` tasks are not overriding or recursing into each other

##Problems
Be careful with your watch task. If it is watching lots of files (like `**/*`) then you may run into this error:

{% highlight console %}
2013-10-30 08:49 node[49991] (CarbonCore.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-21)
2013-10-30 08:49 node[49991] (CarbonCore.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-21)
2013-10-30 08:49 node[49991] (CarbonCore.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-21)
...
{% endhighlight %}

The solution I found for this was to be more specific about the kind of files to watch. In my case, I was watching `**/*.html`, which meant
I was watching source HTML files as well as generated HTML files. But also had a watch:dev task which was watching the generated files - including
the HTML files!

{% highlight js %}
watch: {
...
	dev: {
		files: ['dev/**/*.html'],
		tasks: ['<%= env.environment.envName %>'],
		options: {
			livereload: true
		}
	}
}
{% endhighlight %}

##More problems
The next issue I found was that I needed to add the `livereload.js` file to your HTML files. That is no problem - just add it to a template or
include file before the closing `</body>` tag:

{% highlight html %}
<script src="//localhost:35729/livereload.js"></script>
{% endhighlight %}

But I noticed in Chrome that I was getting a 404 error loading `livereload.js`. So I tried using a different port - no improvment. 
After some googling, I came across [this article](http://stackoverflow.com/questions/16553549/grunt-live-reload-via-watch) which suggested
that the version of `grunt-contrib-watch` might be out-of date.

So, I updated the `package.json` file to tell `NPM` to update `grunt-contrib-watch` to the latest version: 

{% highlight js %}
{
  ...
  "devDependencies": {
    ...
    //"grunt-contrib-watch": "~0.3.2",
    "grunt-contrib-watch": "*",  
   ...
  }
}
{% endhighlight %}

Then run `npm`:

{% highlight console %}
sudo npm update --save-dev
{% endhighlight %}

This brought the package version to 0.5.3. Now, running the task again, I can see that `livereload.js` is loaded by Chrome correctly,
 and the page refreshes whenever I change a HTML or CSS page that is published into the `dev` folder - yay!


##Final GruntFile.js

{% highlight js %}
'use strict';
module.exports = function(grunt) {

	// Load tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		environments: {
			dev: {...	},
			prod: {	...	}
		},
		...
		watch: {
			...
			dev: {
				files: ['dev/**/*.html', 'dev/**/*.css'],
				tasks: ['<%= env.environment.envName %>'],
				options: {
					livereload: true
				}
			}
		},
		...
		exec: {
			build: {
				cmd: 'jekyll build'
			}
		},
		
		copy: {
			env: {
				files: [{expand: true, flatten: false, cwd:'_site', src: '**/*', dest: '<%= env.environment.outputDir %>'}]
			}
		},
		
		connect: {
			dev: {
				options: {
					port: 4000,
					base: 'dev'
				}
			},
			prod: {
				options: {
					port: 4000,
					base: 'dist'
				}
			}
		}
	});
	
	
	grunt.registerTask('env', 'Set environment variables for use by other tasks.', function(environment) {
		if (environment === null || environment === undefined) {
			grunt.warn('You must specify the environment as either DEV or PROD.');
			return false;
		}
		// Store the environment definition in 'env.environment'
		var envName = '' + environment.toLowerCase();
		var envDefinition = grunt.config.get('environments.' + envName);
		
		grunt.config.set('env.environment', envDefinition);
		
		var envName = grunt.config.get('env.environment.name');
		
		grunt.log.writeln(envName + ' environment <<<--------------------------------------');
	});
	
	grunt.registerTask('dev', ['env:dev', 'clean:env', 'exec:build', 'compass:build', 'copy:env', 'connect:dev', 'watch']);
};
{% endhighlight %}


