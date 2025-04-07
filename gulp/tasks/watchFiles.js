import gulp from 'gulp';

import { paths } from '../config/paths.js';

import { html } from "./html.js";
import { styles } from './styles.js';
import { images } from './images.js';
import { fonts } from './fonts.js';
import { files } from './files.js';
import { scripts } from './scripts.js';
import { reloadServer } from './server.js';

export function watchFiles() {
  gulp.watch(paths.html.watch, gulp.series(html, reloadServer))
  gulp.watch(paths.styles.watch, gulp.series(styles, reloadServer))
  gulp.watch(paths.images.watch, gulp.series(images, reloadServer))
  gulp.watch(paths.fonts.watch, gulp.series(fonts, reloadServer))
  gulp.watch(paths.files.watch, gulp.series(files, reloadServer))
  gulp.watch(paths.scripts.watch, gulp.series(scripts, reloadServer))
}

