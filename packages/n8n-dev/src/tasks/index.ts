import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import { INodeParams, IPackageParams } from "src/helpers";
import { ITask, TasksContainer } from 'src/lib';
import { SubstituteTask } from './substitute';
import { assignJson } from './assignJson';
import { renameTask } from './rename';

export const copyIcon = (n: INodeParams) => () => 
  n.iconPath 
  && fs.copyFileSync(n.iconPath, path.join(n.nodeDir, n.iconFileName));

export const createPackage = (p: IPackageParams, tplDir: string): ITask => new TasksContainer([
  () => fs.mkdirSync(p.packageDir, {recursive: true}),
  () => fse.copySync('templates/starter', p.packageDir),
  new SubstituteTask({
    path: path.join(p.packageDir, 'README.md'),
    data: p,
  }),
  assignJson(path.join(p.packageDir, 'package.json'), p.packageJson),
]);
  
export const createNode = (
    p: INodeParams, 
    tplDir: string, 
    credsTlpPath: string
): ITask => new TasksContainer([
  // node
  () => fse.copySync(tplDir, p.nodeDir),
  copyIcon(p),
  renameTask(p.nodeDir, p),
  new SubstituteTask({
    path: p.nodeDir,
    data: p,
  }),
  () => fs.copyFileSync(credsTlpPath, path.join(p.package.packageDir, 'credentials', `${p.nodeName}Api.credentials.ts`)),
  new SubstituteTask({
    path: path.join(p.package.packageDir, 'credentials'),
    data: p,
  }),
  assignJson(path.join(p.package.packageDir, 'package.json'), p.packageJson),
]);

/*
ToDo:
- Check how n8n section looks for two nodes, it should contain merged result, but I suspect that it doesn't work.
- gen scripts. How about gen and multiple nodes in package?
- add deps:
  - devDeps:
    - esbuild
    - generator
  - deps:
    - designpatterns
- init git

Then:
- npm i
- npm run gen
- npm run build
- npm link
- add link to local instance and run
*/