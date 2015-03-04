'use strict';
module.exports = function(grunt) {

  // jit-grunt saves about 3 seconds per cycle now - valuable!
  require('jit-grunt')(grunt, {
  });

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		environments: {
			dev: {
				envName: 'env:dev',
				physicalEnvName: '',
				name: 'DEVELOPMENT',
				outputDir: 'dev',
				configFile: '_dev_config.yml'
			},
			prod: {
				envName: 'env:prod',
				physicalEnvName: '',
				name: 'PRODUCTION',
				outputDir: 'web',
				configFile: '_prod_config.yml'
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'assets/js/*.js',
				'assets/js/plugins/*.js',
				'!assets/js/scripts.min.js'
			]
		},
		recess: {
			dist: {
				options: {
					compile: true,
					compress: true
				},
				files: {
					'assets/css/main.min.css': [
						'assets/less/main.less'
					]
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'assets/js/scripts.min.js': [
						'assets/js/plugins/*.js',
						'assets/js/_*.js'
					]
				}
			}
		},
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,
					cwd: 'images/',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: 'images/'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: '{,*/}*.svg',
					dest: 'images/'
				}]
			}
		},

		watch: {
			less: {
				files: [
					'assets/less/*.less',
					'assets/less/bootstrap/*.less'
				],
				tasks: ['recess']
			},
      stylus: {
        files: [
          'assets/stylus/*.styl'
        ],
        tasks: ['<%= env.environment.envName %>', 'stylus:compile'],
        livereload: true
      },

//			js: {
//				files: [
//					'<%= jshint.all %>'
//				],
//				tasks: ['jshint','uglify']
//			},

			html: {
				files: ['*.yml', '*.html', '_includes/*.html', '_layouts/*.html', 'pages/**/*.html', '*.md', '_posts/*.md', 'pages/*.md'],
				tasks: ['<%= env.environment.envName %>', 'exec:build', 'stylus:compile', 'copy:env']
			},

			dev: {
				files: ['dev/**/*.html', 'dev/**/*.css'],
				tasks: ['<%= env.environment.envName %>'],
				options: {
					livereload: true
				}
			}
		},

		clean: {
			dist: [
				'assets/css/main.min.css',
				'assets/js/scripts.min.js'
			],
			env: ['<%= env.environment.outputDir %>']
		},


		stylus: {
      compile: {
        options: {
          compress: false
        },
        paths: 'assets/stylus',
        files: [
          {expand: true, flatten: true, cwd: 'assets/stylus', src: 'uglow.styl', dest: '<%= env.environment.outputDir %>/assets/css', ext: '.css'}
        ]
      }
		},

		exec: {
			build: {
				cmd: 'jekyll build --config _config.yml,<%= env.environment.configFile %>'
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
					base: '<%= env.environment.outputDir %>',
					open: true
				}
			},
			prod: {
				options: {
					port: 4001,
					base: '<%= env.environment.outputDir %>',
					keepalive: true
				}
			}
		},
    'gh-pages': {
      options: {
        base: 'web',
        branch: 'master',       // Where to publish the pages
        user: 'uglow',
        push: true
      },
      src: ['**']
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

	grunt.registerTask('_build', 'PRIVATE - creates an environment-specific build', ['clean:env', 'exec:build', 'stylus:compile']);

	grunt.registerTask('dev', ['env:dev', '_build', 'connect:dev', 'watch']);
	grunt.registerTask('prod', ['env:prod', 'imagemin', '_build', 'connect:prod']);

	grunt.registerTask('publish', ['env:prod', '_build', 'gh-pages']);

	// Default Task
	grunt.registerTask('default', ['dev']);
};
