import fs from 'fs';
import path from 'path';
import { serialize } from 'v8';

const getAllFilesRec = (dir: string, baseDir: string, arrayOfFiles: string[] = []): string[] => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const p = path.join(dir, file);
    arrayOfFiles.push(p.slice(baseDir.length+1));
    if (fs.statSync(p).isDirectory()) {
      getAllFilesRec(p, baseDir, arrayOfFiles)
    }
  })
  return arrayOfFiles;
}

export const getAllFiles = (dir: string): string[] => {
  const d = path.resolve(dir)
  return getAllFilesRec(d, d)
}

export const getAllVars = (str: string) => {
  const result = Array.from(str.matchAll(/{{(\w+)}}/g)).map(i => i[1]);
  return [...new Set(result)]; // return distinct
}

export const renderTpl = (tpl: string, data: Record<string, any>) => {
  const vars = getAllVars(tpl);
  let result = tpl;
  vars.forEach(variable => {
    const value = data[variable];
    if (value !== undefined) {
      const rx = new RegExp(`{{${variable}}}`, 'g');
      result = result.replace(rx, value);
    }
  });
  return result;
}

const walkIsMatch = (path: string, include: RegExp[] = [], exclude: RegExp[] = []): boolean => {
  return include.every(rx => path.match(rx)) && exclude.every(rx => path.match(rx) === null);
}

export const walk = (
  dir: string, 
  include: RegExp[] = [],
  exclude: RegExp[] = [],
  action: (f: string) => string | undefined = () => undefined
): void => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const p = path.resolve(dir, file);
    const newPath = walkIsMatch(p, include, exclude) ? (action(p) || p) : p;
    if (fs.statSync(newPath).isDirectory()) {
      walk(newPath, include, exclude, action);
    }
  })
}
