import gulp from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import noop from "gulp-noop";
import rename from "gulp-rename";

import { isProd } from "../config/flags.js";
import { paths } from '../config/paths.js';
import { plumberNotify } from './plumberNotify.js';

export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(changed(paths.styles.dest, { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberNotify("CSS")))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(isProd ? groupMedia() : noop())
    .pipe(isProd ? cleanCSS() : noop())
    .pipe(isProd ? rename({ suffix: ".min" }) : noop())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(paths.styles.dest));
}