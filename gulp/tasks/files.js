import gulp from 'gulp';
import changed from 'gulp-changed';

import { paths } from '../config/paths.js';

export function files() {
  return gulp
    .src(paths.files.src)
    .pipe(changed(paths.files.dest))
    .pipe(gulp.dest(paths.files.dest))
}