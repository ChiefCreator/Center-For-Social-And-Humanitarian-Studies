import path from 'path';

import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import gulpFilter from 'gulp-filter';
import htmlmin from 'gulp-htmlmin';
import noop from "gulp-noop";
import replace from "gulp-replace";

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
    .pipe(isProd ? replace("./../../styles/style.css", "./styles/style.min.css") : replace("./../../styles/style.css", "./styles/style.css"))
    .pipe(replace("./../../js/index.js", "./js/index.bundle.js"))
    .pipe(isProd ? 
      replace(/(\.\/|\.\.\/)*images\/([^\/\s"']*\.(jpg|jpeg|png|gif|webp|svg))/g, (match, quote, p1) => {  
        if (p1.toLowerCase().endsWith('.svg')) {
          return `./images/${p1}`;
        }
      
        const newFilename = p1.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '.webp');
        return `./images/${newFilename}`;
      }) :
      replace(/(\.\/|\.\.\/)*images\/([^\/\s"']*\.(jpg|jpeg|png|gif|webp|svg))/g, (match, quote, p1, filename) => { 
        return `./images/${p1}`;
      })
    )
    .pipe(isProd ? htmlmin({ collapseWhitespace: true, removeComments: true }) : noop())
    .pipe(pages)
    .pipe(gulp.dest(file => {
      const fileName = path.basename(file.path); 
      file.path = path.join(paths.html.srcDir, fileName);
      return paths.html.dest;
    }))
    .pipe(pages.restore); 
}