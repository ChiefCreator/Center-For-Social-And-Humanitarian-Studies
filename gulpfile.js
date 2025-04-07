import gulp from 'gulp';

import { createDist } from './gulp/tasks/createDist.js';
import { cleanBuild } from './gulp/tasks/clean.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { styles } from './gulp/tasks/styles.js';
import { images } from './gulp/tasks/images.js';
import { fonts } from './gulp/tasks/fonts.js';
import { files } from './gulp/tasks/files.js';
import { scripts } from './gulp/tasks/scripts.js';
import { watchFiles } from "./gulp/tasks/watchFiles.js";

gulp.task("default", gulp.series(
  createDist,
  cleanBuild,
  gulp.parallel(html, styles, images, fonts, files, scripts),
  gulp.parallel(server, watchFiles),
));

gulp.task("build", gulp.series(
  createDist,
  cleanBuild,
  gulp.parallel(html, styles, images, fonts, files, scripts),
  server,
));
