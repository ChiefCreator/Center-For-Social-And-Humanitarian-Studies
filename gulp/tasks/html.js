import path from 'path';

import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import gulpFilter from 'gulp-filter';
import htmlmin from 'gulp-htmlmin';
import noop from "gulp-noop";

import { isProd } from "./../config/flags.js";
import { paths } from '../config/paths.js';
import { plumberNotify } from './plumberNotify.js';

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

export function html() {
  const pages = gulpFilter(paths.html.pages.src, { restore: true });

  return gulp
    .src(paths.html.src)
    .pipe(changed(paths.html.dest, { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberNotify("HTML")))
    .pipe(fileInclude(fileIncludeSetting))
    .pipe(pages)
    .pipe(isProd ? htmlmin({ collapseWhitespace: true, removeComments: true }) : noop())
    .pipe(gulp.dest(file => {
      const fileName = path.basename(file.path); 
      file.path = path.join(paths.html.srcDir, fileName);
      return paths.html.dest;
    }))
    .pipe(pages.restore); 
}