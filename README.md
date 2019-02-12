# EnduranceBase - A Joomla! Template

## Introduction

EnduranceBase is a custom [Joomla](https://www.joomla.org/) template developed by [EnduranceCode](https://twitter.com/EnduranceCodePT) that is based on [Bootstrap 4](https://getbootstrap.com/) and follows [Google Material Design](https://material.io/) principles.

## Version Control System and development tasks automation

EnduranceBase template uses [Git](https://git-scm.com) as version control system and [Gulp](http://gulpjs.com) for the automation of the development tasks.

The available Gulp tasks are:

* **_initializeBrowsersync_**: Spins up a web server to enable live-reloading easily;
* **_styles_**: Compile Sass and Minifie CSS;
* **_scripts_**: Concatenate Javascript Files and Minifie the output file;
* **_joomla_**: Copy the Joomla files to the `./dist` folder;
* **_reportTodo_**: Extract, collect and report TODOs and FIXMEs in the code;
* **_images_**: Optimizes for web the template's image files.

The above listed tasks will automatically run whenever there are changes in the HTML, PHP, CSS, JavaScript and Image files.

The following resources were very helpfull to buil this project's Gulp file (`gulpifile.js`):

* [The `package.json` Guide](https://flaviocopes.com/package-json/) by [Flavio Copes](https://flaviocopes.com);
* [Choose an open source licence](https://choosealicense.com/);
* [SPDX License List](https://spdx.org/licenses);
* [Gulp Cheatsheet](http://karloespiritu.github.io/cheatsheets/gulp/) by [Karlu Espiritu](https://karloespiritu.com/);
* [Gulp Js Tutorial For Beginners](https://appdividend.com/2018/03/09/gulp-js-tutorial-beginners/#Why_use_Gulp);
* [Super simple Gulp tutorial](https://coder-coder.com/gulp-tutorial-beginners);
* [Gulp for Beginners](https://css-tricks.com/gulp-for-beginners) by [Zell Liew](https://zellwk.com);
* [Switching to Gulp 4](https://www.webstoemp.com/blog/switching-to-gulp4);
* [The Complete-Ish Guide to Upgrading to Gulp 4](https://www.joezimjs.com/javascript/complete-guide-upgrading-gulp-4) by [Joe Zimmerman](https://github.com/joezimjs);
* [Setting up gulp 4 for automatic Sass compilation and CSS injection](https://goede.site/setting-up-gulp-4-for-automatic-sass-compilation-and-css-injection);
* [The Gulp's Documentation](https://gulpjs.com/docs/en/getting-started/quick-start).
