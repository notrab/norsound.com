'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const APP_PORT = 5000;

gulp.task('sass', () => {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('watch', () => {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('browser-sync', () => {
  browserSync.init(null, {
    proxy: `http://localhost:5000`,
    files: ['public/**/*.*', 'views'],
    browser: 'google chrome',
    port: 7000
  });
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'server.js',
    ext: 'js pug',
    env: {
      NODE_ENV: 'development',
      PORT: APP_PORT
    },
    stdout: false
  }).on('readable', () => {
    this.stdout.opn('data', (chunk) => {
      if (/^App listening on/.test(chunk)) {
        reload();
      }
    });

    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task('default', [
  'sass',
  'nodemon',
  'watch',
  'browser-sync'
]);
