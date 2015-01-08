base-angular
===============
[![Build Status](https://magnum.travis-ci.com/UseAllFive/base-angular.svg?token=dfaxEQcQwzEeozJHADsN)](https://magnum.travis-ci.com/UseAllFive/base-angular)

## Getting started
```BASH
npm install
bower install
grunt
```

## Testing
### Unit Testing w/ Karma
Ideally, developer should write tests for each function in every controller, service and directive as she develops. This is commonly referred to as test driven development. There is an obvious time cost up-front but ultimately total development time should be reduced as the amount of hard to find bugs decrease dramatically.

Test files should be written and included alongside the JavaScript file they are testing. That is to say, if your controller is located in `js/apps/contacts_app/app/contacts/contact_list/` then your test file should be as well.

In order for tests to be recognized as such, test file names should mimic the following structure: `*.test.js`. The important thing to note is that regardless of file name, tests must be appended with `.test.js`.

The Grunt Watch task runs the unit tests every single time a JavaScript file changes. This means the developer must ensure that `grunt watch` is currently running in their terminal.

Karma unit tests require that your application's JavaScript be defined in the configuration file. In order to accomplish this, make sure that any vendor file used by your application but not included in `config/grunt.yml` (hosted by CDN) gets added to `config.files.js.tests.unit.src` in grunt.yml. The `grunt karma` task will be smart enough to add all other application JavaScript into Karma.

### End to End Testing w/ Protractor
The developer should use end to end tests to ensure that the application continues to work as expected. It may be helpeful to think of these kinds of tests as a sanity check. In the example application, there is a very basic e2e sanity check test that navigates to two routes and ensures that the proper containers are on the page.

It is recommended that the developer runs these tests after any significant change to ensure that the application is still basically up and running. To run: `grunt test-e2e`.

## Code Standards
### Sublime Settings
The JavaScript linting for this project requires [Sublime Text 3](http://www.sublimetext.com/3).

In Sublime Text 3 (ST3) install the following packages `CMD + Shift + P`:
- SublimeLinter
- SublimeLinter-jshint
- SublimeLinter-jscs

Next make sure you globally install the following on your command line:
- jshint `npm install -g jshint`
- jscs (JavaScript Code Style Checker) `npm -g install jscs`

### Resources
- Setup package control in ST3 - [Setup Package Control in ST3](https://sublime.wbond.net/installation)
- jscs documentation -  [jscs github repo](https://github.com/mdevils/node-jscs)
