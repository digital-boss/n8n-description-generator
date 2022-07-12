import fs from 'fs';
import path from 'path';
import { ITask } from "src/lib";
import { getAllFiles, getAllVars, renderTpl, walk } from '../utils';

export interface ISubstituteTask {
  /**
   * dir or file
   */
  path: string;
  data: Record<string, any>;
  include?: RegExp[];
  exclude?: RegExp[];
}

export class SubstituteTask implements ITask {
  
  config: ISubstituteTask;

  constructor (config: ISubstituteTask) {
    this.config = config;
  }

  protected applyToFile(filePath: string) {
    const tpl = fs.readFileSync(filePath, 'utf-8');
    const content = renderTpl(tpl, this.config.data);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  run () {
    const d = path.resolve(this.config.path);
    if (fs.lstatSync(d).isFile()) {
      this.applyToFile(d);
      return;
    }
    walk(d, this.config.include, this.config.exclude, (f: string) => {
      const stat = fs.lstatSync(f);
      if (stat.isFile()) {
        this.applyToFile(f);
      }
      return f;
    });
  }
}