import gulp from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import webp from "gulp-webp";
import noop from "gulp-noop";

import { isProd } from "./../config/flags.js";
import { paths } from '../config/paths.js';
import { plumberNotify } from './plumberNotify.js';

export function images() {
  const taskImagemin = imagemin([
    imagemin.gifsicle({ interlaced: true }),
    mozjpeg({ quality: 75, progressive: true }),
    imageminPngquant({ quality: [0.6, 0.8], speed: 3 }),
    imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
  ]);

  return gulp
    .src(paths.images.src)
    .pipe(changed(paths.images.dest))
    .pipe(plumber(plumberNotify("IMG")))
    .pipe(isProd ? taskImagemin : noop())
    .pipe(isProd ? webp() : noop())
    .pipe(gulp.dest(paths.images.dest))
}