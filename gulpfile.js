const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const del = require('del');
const pump = require('pump');

// minify styles
gulp.task('styles', (callback) => {
  pump([
    gulp.src('public/stylesheets/**/*.css'),
    autoprefixer('last 2 versions'),
    rename({ suffix: '.min' }),
    cssnano(),
    gulp.dest('public/stylesheets/dist'),
  ], callback);
});

// minify scripts
gulp.task('scripts', (callback) => {
  pump([
    gulp.src('public/javascripts/**/*.js'),
    concat('main.js'),
    rename({ suffix: '.min' }),
    uglify(),
    gulp.dest('public/javascripts/dist'),
  ], callback);
});

// delete dist folders
gulp.task('clean', () => del(['public/stylesheets/dist', 'public/javascripts/dist']));

// default task
gulp.task('default', ['clean'], () => {
  gulp.start('styles', 'scripts');
});
