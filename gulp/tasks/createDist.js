import fs from "fs";

import { paths } from '../config/paths.js';

export function createDist(cb) {
  if (!fs.existsSync(paths.dist)) {
    fs.mkdirSync(paths.dist);
  }
  cb();
}