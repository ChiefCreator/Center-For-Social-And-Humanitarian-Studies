import gulp from 'gulp';
import changed from 'gulp-changed';

import { paths } from '../config/paths.js';

export function fonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(changed(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest))
}