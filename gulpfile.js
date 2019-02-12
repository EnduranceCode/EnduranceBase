/**
 * Gulp Configuration File
 *
 * Based in the following articles:
 *
 *   Tasks Definition
 *     - https://appdividend.com/2018/03/09/gulp-js-tutorial-beginners/#Why_use_Gulp
 *     - https://coder-coder.com/gulp-tutorial-beginners
 *     - https://css-tricks.com/gulp-for-beginners
 *
 *   Upggrade to Gulp 4
 *     - https://www.webstoemp.com/blog/switching-to-gulp4
 *     - https://gulpjs.com/docs/en/getting-started/quick-start
 */

/* Include gulp */
const gulp = require('gulp');

/**
 * Plugin to spin a web server to enable easy live reloading
 * browser-sync : https://www.npmjs.com/package/browser-sync
 */
const browserSync = require('browser-sync').create();

/**
 * Plugin for cache operations
 * gulp-cache : https://www.npmjs.com/package/gulp-cache
 */
const cache = require('gulp-cache');

/**
 * Plugin to Concatenate Javascript Files
 * gulp-concat : https://www.npmjs.com/package/gulp-concat
 */
const concatenateJavascript = require('gulp-concat');

/**
 * Plugin to minimize CSS
 * gulp-cssnano : https://www.npmjs.com/package/gulp-cssnano
 */
const minifieCSS = require('gulp-cssnano');

/**
 * Plugin to optimize images
 */
const optimizeImage = require('gulp-imagemin');

/**
 * Plugin to rename files
 * gulp-rename : https://www.npmjs.com/package/gulp-rename
 */
const renameFile = require('gulp-rename');

/**
 * Plugin to compile Sass
 * gulp-sass : https://www.npmjs.com/package/gulp-sass
 * node-sass : https://www.npmjs.com/package/node-sass
 */
const compileSass = require('gulp-sass');
compileSass.compiler = require('node-sass');

/**
 * Plugin to extract, collect and report TODOs and FIXMEs in the code
 * gulp-todo : https://www.npmjs.com/package/gulp-todo
 */
const todo = require('gulp-todo');

/**
 * Plugin to Minifie Javascript
 * gulp-uglify : https://www.npmjs.com/package/gulp-uglify
 */
const minifieJavascript = require('gulp-uglify');

/**
 * Configuration
 */
const config = {
  browserSyncHost: 'endurancebase.lcl',
  browserSyncProxy: 'endurancebase.lcl',
  sassPrimaryStylesheet: ['./src/css/scss/style.scss'],
  sassFiles: ['./src/css/scss/**/*.scss'],
  imageFiles: ['./src/img/*.{gif,jpg,jpeg,png,svg}'],
  JavascriptMainScript: 'script.js',
  javascriptFiles: [],
  joomlaRootFiles: ['./src/*.*'],
  joomlaPhpFiles: ['./src/*.php'],
  joomlaHtmlFiles: ['./src/html/**'],
  joomlaLanguageFiles: ['./src/language/**'],
};

/**
 * Browsersync initialization
 */
function initializeBrowsersync(done) {
  browserSync.init({
    open: 'external',
    host: config.browserSyncHost,
    proxy: config.browserSyncProxy,
  });
  done();
}

/**
 * Compile Sass and Minifie CSS
 *
 * @param config.sassPrimaryStylesheet Array with the path to the primary Sass stylesheet
 */
function styles() {
  return gulp
    .src(config.sassPrimaryStylesheet)
    .pipe(compileSass({ outputStyle: 'extended' }).on('error', compileSass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(minifieCSS({ preset: ['default', { dicardComments: { removeAll: true } }] }))
    .pipe(renameFile({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css'));
}

/**
 * Concatenate Javascript Files and Minifie the output file
 *
 * @param config.javascriptFiles Array with the paths to the Javascript files to concatenate
 */
function scripts() {
  return gulp
    .src(config.javascriptFiles)
    .pipe(concatenateJavascript(config.JavascriptMainScript))
    .pipe(gulp.dest('./dist/js'))
    .pipe(minifieJavascript())
    .pipe(renameFile({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'));
}

/**
 * Copy the Joomla files to the ./dist folder
 *
 * @param config.joomlaPhpFiles      Array with the path to the Joomla template's root php files
 * @param config.joomlaHtmlFiles     Array with the paths to the Joomla template's overrides
 * @param config.joomlaLanguageFiles Arrayt with the paths to the Joomla template's languages files
 */
function joomla(done) {
  gulp.src(config.joomlaRootFiles).pipe(gulp.dest('./dist'));
  gulp.src(config.joomlaHtmlFiles).pipe(gulp.dest('./dist/html'));
  gulp.src(config.joomlaLanguageFiles).pipe(gulp.dest('./dist/language'));
  done();
}

/**
 * Extract, collect and report TODOs and FIXMEs in the code
 *
 * @param config.joomlaRootFiles       Array with the path to the Joomla template's root files to watch
 * @param config.joomlaHtmlFiles       Array with the paths to the Joomla template's overrides files to watch
 * @param config.sassPrimaryStylesheet Array with the path to the primary Sass stylesheet
 * @param config.sassFiles             Array with the path to the Sass stylesheets to watch for changes
 * @param config.javascriptFiles       Array with the paths to the Javascript files to watch for changes
 */
function reportTodo(done) {
  gulp
    .src(
      config.joomlaPhpFiles.concat(
        config.joomlaHtmlFiles,
        config.sassPrimaryStylesheet,
        config.sassFiles,
        config.javascriptFiles,
        ['!./**/*.bak', '!./**/*.tpl', '!./**/*.txt']
      ),
      { base: './' }
    )
    .pipe(todo())
    .pipe(gulp.dest('./'));
  done();
}

/**
 * Optimize images for web
 *
 * @param config.imageFiles Array with the path to the images to be optimized
 */
function images() {
  return gulp
    .src(config.imageFiles)
    .pipe(
      cache(
        optimizeImage([
          optimizeImage.gifsicle({ interlaced: true }),
          optimizeImage.jpegtran({ progressive: true }),
          optimizeImage.optipng({ optimizationLevel: 5 }),
          optimizeImage.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
    )
    .pipe(gulp.dest('./dist/img'));
}

/**
 * Wathch files to detect changes
 *
 * @param config.sassFiles           Array with the path to the Sass stylesheets to watch for changes
 * @param config.javascriptFiles     Array with the paths to the Javascript files to watch for changes
 * @param config.joomlaRootFiles     Array with the path to the Joomla template's root files to watch
 * @param config.joomlaHtmlFiles     Array with the paths to the Joomla template's overrides files to watch
 * @param config.joomlaLanguageFiles Arrayt with the paths to the Joomla template's languages files to watch
 * @param config.imageFiles          Array with the path to the images files to watch
 */
function watchFiles(done) {
  gulp.watch(config.sassFiles, gulp.series(styles, reportTodo, browserSync.reload));
  gulp.watch(config.javascriptFiles, gulp.series(scripts, reportTodo, browserSync.reload));
  gulp.watch(
    config.joomlaRootFiles.concat(config.joomlaHtmlFiles, config.joomlaLanguageFiles),
    gulp.series(joomla, reportTodo, browserSync.reload)
  );
  gulp.watch(config.imageFiles, images, browserSync.reload);
  done();
}

/**
 * Clear the cache
 */
function clearCache(done) {
  cache.clearAll;
  done();
}

/**
 * Expose the task by exporting its functions. With tis,
 * we enable the possibilitie of running the fucntions as gulp tasks in the command line.
 * For exmaple:
 *   $ gulp default
 */
exports.initializeBrowsersync = initializeBrowsersync;
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.joomla = joomla;
exports.reportTodo = reportTodo;
exports.watchFiles = watchFiles;
exports.clearCache = clearCache;

/**
 * Default Gulp Task
 */
const defaultTask = gulp.series(initializeBrowsersync, styles, scripts, joomla, images, watchFiles);
exports.default = defaultTask;
