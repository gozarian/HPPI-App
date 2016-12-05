var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jscs = require('gulp-jscs');
var ngTemplates = require('gulp-angular-templatecache');

var paths = {
  styles: ['./src/styles/**/*.scss'],
  scripts: ['./src/scripts/**/*.js', './src/templates/**/*.html']
};

var scripts = [
  './src/scripts/app.js',
  './src/scripts/controllers/test-controller.js',
];

gulp.task('default', ['styles', 'scripts']);

gulp.task('styles', function(done) {
  gulp.src('./src/styles/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('scripts', ['templates'], function() {
  gulp.src(scripts)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./www/js/'));
});

gulp.task('templates', function() {
  return gulp.src('./src/templates/**/*.html')
    .pipe(ngTemplates('templates.js', { standalone: true }))
    .pipe(gulp.dest('www/js/'));
});

gulp.task('watch', ['default'], function() {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
});
