'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const revDel = require('gulp-rev-delete-original');
const pngquant = require('imagemin-pngquant');
const rev = require('gulp-rev');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const rimraf = require('rimraf');

const APP_PORT = 5000;

gulp.task('sass', () => {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer("last 2 versions", "> 1%"))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('imagemin', () => {
  return gulp.src('./assets/images/**')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./public/assets/images/'))
});

gulp.task('watch', () => {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./assets/assets/images/**', ['imagemin']);
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

gulp.task('clean', (cb) => {
  rimraf('./public/assets', cb);
});

gulp.task('revision', () => {
  return gulp.src([
      './public/assets/*.css',
      './public/assets/*.js'
    ], {
      base: './public/assets/'
    })
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev())
    .pipe(revDel())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      path: 'manifest.json',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('build', ['clean', 'sass', 'imagemin', 'revision'])

gulp.task('default', [
  'sass',
  'nodemon',
  'watch',
  'browser-sync'
]);
