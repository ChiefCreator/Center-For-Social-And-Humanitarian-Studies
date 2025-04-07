import gulp from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import webpack from 'webpack-stream';
import babel from 'gulp-babel';
import noop from 'gulp-noop';

import { config } from '../../webpack.config.js';
import { isProd } from "../config/flags.js";
import { paths } from '../config/paths.js';
import { plumberNotify } from './plumberNotify.js';

export function scripts() {

  return gulp
    .src(paths.scripts.src)
    .pipe(changed(paths.scripts.dest))
    .pipe(plumber(plumberNotify("JS")))
    .pipe(isProd ? babel() : noop())
    .pipe(webpack(config))
    .pipe(gulp.dest(paths.scripts.dest))
}