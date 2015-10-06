// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'jspm',
      'mocha',
      'chai-as-promised',
      'sinon-chai'
    ],


    // list of files / patterns to load in the browser
    // files: [],

    // configuration for karma-jspm
    jspm: {
      useBundles: true,
      config: 'src/config.js',
      loadFiles: [
        'test/**/*.js',

        // necessary for PhantomJS (doesn't have Function.bind)
        'node_modules/phantomjs-polyfill/bind-polyfill.js'
      ],
      serveFiles: ['src/js/**/*.js'],
      packages: 'src/lib'
    },

    proxies: {
      '/base/lib/': '/base/src/lib/'
    },

    // list of files to exclude
    // exclude: [
    // ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/js/**/*.js': ['babel', 'sourcemap', 'coverage'],
        'test/**/*.test.js': ['babel']
    },

    babelPreprocessor: {
        options: {
            sourceMap: 'inline'
        },
        sourceFileName: function(file) {
            return file.originalPath;
        }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage', 'mocha'],

    coverageReporter: {
      dir: 'test/coverage/',
      instrumenters: { isparta: require('isparta') },
      instrumenter: {
        'src/app/**/*.js': 'isparta'
      },
      reporters: [
        {
          // Prints a coverage summary to console
          type: 'text-summary'
        },
        {
          // Creates an html report in the given directory
          type: 'html'
        }
      ]
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
