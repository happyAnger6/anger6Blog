import { Injectable } from '@angular/core';
import { Path } from '../models/path';

@Injectable()
export class PathNavService {
  public paths: Path[] = [];

  constructor() { }

  addPath(path: Path) {
    this.paths.push(path);
  }

  clearPaths() {
    this.paths = [];
  }

  getPaths() {
    return this.paths;
  }
}
