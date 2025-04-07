import fs from "fs";

import gulp from 'gulp';
import clean from 'gulp-clean';

import { paths } from '../config/paths.js';

export function cleanBuild(cb) {
  if (!fs.existsSync(paths.dist)) cb();

  return gulp
    .src(paths.dist, { read: false })
    .pipe(clean({ force: true }));
}