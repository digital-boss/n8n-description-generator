import fs from 'fs';

export const assignJson = (path: string, obj: any) => () => {
  const str = fs.readFileSync(path, 'utf-8');
  const json = JSON.parse(str);
  const newJson = Object.assign(json, obj);
  const content = JSON.stringify(newJson, undefined, 2);
  fs.writeFileSync(path, content, 'utf-8');
}
