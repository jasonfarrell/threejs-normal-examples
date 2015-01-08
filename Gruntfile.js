var _;
var matchdep;
var chalk;
var module;

_ = require('underscore');
matchdep = require('matchdep');
chalk = require('chalk');

module.exports = function(grunt) {

    var config;
    var isDevTasks;
    var pkg;
    var tasks;

    pkg = grunt.file.readJSON('package.json');
    config = grunt.file.readYAML('config/grunt.yml').config;
    isDevTasks = !(_.contains(grunt.cli.tasks, 'deploy') || _.contains(grunt.cli.tasks, 'prod'));

    grunt.initConfig({
        pkg: pkg,
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    src: [config.files.img.src],
                    // Just replace the file
                    dest: '.'
                }]
            }
        },
        exec: {
            'write-scss-import-file': {
                command: './scssImport.sh'
            }
        },
        karma: {
            options: {
                // karma server requires angular / angular module JavaScript
                // as well as the rest of the app's JavaScript files to run
                // correctly
                files: [config.files.js.tests.unit.src, config.files.js.app.src, config.files.js.vendor.src]
            },
            unit: {
                configFile: 'karma.conf.js',
                background: true
            }
        },
        protractor: {
            options: {
                configFile: 'protractor.conf.js',
                keepAlive: true,
                args: {
                    baseUrl: config.files.js.tests.e2e.baseUrl,
                    specs: config.files.js.tests.e2e.specs,
                    capabilities: {
                        browserName: 'chrome'
                    }
                }
            },
            run: {}
        },
        concat: {
            options: {
                sourceMap: true
            },
            'js-app': {
                src: config.files.js.app.src,
                dest: config.files.js.app.dest
            },
            'js-vendor': {
                src: config.files.js.vendor.src,
                dest: config.files.js.vendor.dest
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            'js-app': {
                options: {
                    sourceMapIn: config.files.js.app.dest + '.map'
                },
                src: config.files.js.app.dest,
                dest: config.files.js.app.destMin
            },
            'js-vendor': {
                options: {
                    sourceMapIn: config.files.js.vendor.dest + '.map'
                },
                src: config.files.js.vendor.dest,
                dest: config.files.js.vendor.destMin
            }
        },
        jshint: {
            options: {
                jshintrc: true
            },
            inline: {
                files: {
                    src: config.files.js.app.src
                }
            },
            startup: {
                options: {
                    force: true
                },
                files: {
                    src: config.files.js.app.src
                }
            }
        },
        jscs: {
            inline: {
                files: {
                    src: config.files.js.app.src
                }
            },
            startup: {
                options: {
                    force: true
                },
                files: {
                    src: config.files.js.app.src
                }
            }
        },
        sass: {
            options: {
                loadPath: config.files.scss.loadPaths,
                quiet: true,
                style: 'compact'
            },
            build: {
                src: config.files.scss.app.src,
                dest: config.files.scss.app.dest
            }
        },
        scsslint: {
            allFiles: config.files.scssImport.watch,
            options: {
                bundleExec: false,
                config: '.scss-lint.yml',
                colorizeOutput: true
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            'pre-commit-hook': {
                src: 'pre-commit-hook.sh',
                dest: '.git/hooks/pre-commit'
            }
        },
        watch: {
            karma: {
                files: [config.files.js.app.src, config.files.js.tests.unit.src],
                tasks: ['karma:unit:run']
            },
            concat: {
                files: config.files.js.app.src,
                tasks: 'concat:js-app'
            },
            uglify: {
                files: config.files.js.app.dest,
                tasks: 'uglify:js-app'
            },
            imagemin: {
                files: config.files.img.src,
                tasks: 'newer:imagemin:build'
            },
            'js-lint': {
                files: config.files.js.app.src,
                tasks: ['jshint:inline', 'jscs:inline']
            },
            livereload: {
                options: {
                    livereload: config.liveReloadPort
                },
                files: [].concat(
                    'web/css/main.css',
                    config.files.js.app.src,
                    config.files.templates.watch
                )
            },
            scssImport: {
                options: {
                    interrupt: true
                },
                files: config.files.scssImport.watch,
                tasks: ['exec:write-scss-import-file', 'sass']
            }
        }
    });
    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('prepare_livereload', 'Build Locale files.', function() {
        var filename;
        var generateLiveReload;

        filename = config.files.js.livereload;
        generateLiveReload = function(port) {
            return '(function() {\n    \'use strict\';\n        var existing_script_tag = document.getElementsByTagName(\'script\')[0];\n        var host;\n        var new_script_tag = document.createElement(\'script\');\n        var url;\n        host = (location.host || \'localhost\').split(\':\')[0];\n        url = \'http://\' + host + \':' + port + '/livereload.js?snipver=1\';\n        new_script_tag.src = url;\n        existing_script_tag.parentNode.insertBefore(new_script_tag, existing_script_tag);\n})(); ';
        };

        if (isDevTasks) {
            grunt.file.write(filename, generateLiveReload(config.liveReloadPort));
            grunt.log.writeln('File ' + chalk.cyan(filename) + ' created');
        } else {
            grunt.file.write(filename, '');
        }
    });
    // delete-python-vendor-directory before installing vendor requirements is necessary because
    // pip is not idempotent when using the -t flag, which we want so the
    // vendor requirements are installed locally.
    // see: https://github.com/GoogleCloudPlatform/appengine-python-flask-skeleton/issues/1
    tasks = [
        'karma:unit',
        'symlink:pre-commit-hook',
        'exec:write-scss-import-file',
        'sass',
        'concat',
        'uglify',
        'newer:imagemin:build',
        'prepare_livereload',
        'watch'
    ];

    // Default grunt task: `grunt`
    grunt.registerTask('default', tasks);

    // Register task for validating code.
    // `grunt validate-code`
    grunt.registerTask('validate-code', ['jshint:inline', 'jscs:inline', 'scsslint']);

    // Register task for end to end testing
    // `grunt protractor`
    grunt.registerTask('test-e2e', ['protractor:run']);
};
