import { watch } from 'browser-sync';
import path from 'path';

export const src = path.resolve('src');
export const dist = path.resolve('dist');

export const paths = {
  src: src,
  dist: dist,
  html: {
    pages: {
      src: path.join(src, "html/pages/*.html"),
    },
    blocks: {
      src: path.join(src, "html/blocks/*.html"),
    },
    srcDir: path.join(src, "html"),
    src: path.join(src, "html/**/*.html"),
    dest: dist,
    watch: "src/html/**/*.html"
  },
  styles: {
    src: path.join(src, "styles/**/*.css"),
    dest: path.join(dist, "styles"),
    watch: "src/styles/**/*.css"
  },
  images: {
    src: path.join(src, "images/**/*"),
    dest: path.join(dist, "images"),
    watch: "src/images/**/*"
  },
  fonts: {
    src: path.join(src, "fonts/**/*"),
    dest: path.join(dist, "fonts"),
    watch: "src/fonts/**/*"
  },
  files: {
    src: path.join(src, "files/**/*"),
    dest: path.join(dist, "files"),
    watch: "src/files/**/*"
  },
  scripts: {
    src: path.join(src, "js/**/*.js"),
    dest: path.join(dist, "js"),
    watch: "src/js/**/*.js"
  },
};
