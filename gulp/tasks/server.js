import browserSync from "browser-sync";

import { dist } from "./../config/paths.js";

const bs = browserSync.create();

export const server = () => {
  bs.init({
    server: {
      baseDir: dist,
    },
    livereload: true,
    open: true,
    notify: false,
  });
};

export const reloadServer = (done) => {
  bs.reload();
  done();
}
