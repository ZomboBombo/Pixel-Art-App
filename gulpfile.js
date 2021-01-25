'use strict';


const gulp = require('gulp');

// --- Вспомогательные утилиты ---
const rename = require('gulp-rename');

// --- Препроцессорные утилиты ---
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');

// --- CSS-утилиты ---
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');

// --- JS-утилиты ---
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const pipeline = require('readable-stream').pipeline;

// --- Серверные утилиты ---
const server = require('browser-sync').create();



/*
=====================================================
----------------------- ТАСКИ -----------------------
=====================================================
*/

// *** Обработка всех стилевых SCSS-файлов и превращение в CSS ***
gulp.task('css', () => {
  return pipeline(
    gulp.src('source/sass/styles.scss'),
    plumber(),
    sourcemap.init(),
    sass(),
    postcss([
      autoprefixer()
    ]),
    gulp.dest('source/css'),
    csso(),
    rename('styles.min.css'),
    sourcemap.write('.'),
    gulp.dest('source/css'),
    server.stream()
  );
});


// *** Работа с Сервером ***
gulp.task('server', () => {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{sass,scss}', gulp.series('css'));
  gulp.watch('source/js/*.js', gulp.series('refresh'));
  gulp.watch('source/*.html', gulp.series('refresh'));
});

gulp.task('refresh', (done) => {
  server.reload();
  done();
});



// === Главные задачи для Сборки проекта в "продакшн" и поднятия Сервера ===
gulp.task('start', gulp.series('server'));