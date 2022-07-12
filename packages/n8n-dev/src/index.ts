import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { getPackageJson, newNode } from './helpers';
import { Task, TasksRunner } from "./lib";
import { assignJson } from './tasks/assignJson';
import { renameTask } from './tasks/rename';
import { SubstituteTask } from './tasks/substitute';

const params = newNode({
  ns: "digital-boss",
  nodeName: "CloudApn",
  outDir: 'dist',
  iconPath: 'templates/SomeRandomName.png'
});

const tasks: Task[] = [
  () => fse.removeSync('dist'),
  () => fs.mkdirSync(params.packageDir, {recursive: true}),
  () => fse.copySync('templates/starter', params.packageDir),
  new SubstituteTask({
    path: path.join(params.packageDir, 'README.md'),
    data: params,
  }),
  () => fse.copySync('templates/node', params.nodeDir),
  () => params.iconPath && fs.copyFileSync(params.iconPath, path.join(params.nodeDir, params.iconFileName)),
  renameTask(params.nodeDir, params),
  new SubstituteTask({
    path: params.nodeDir,
    data: params,
  }),
  () => fs.copyFileSync('templates/creds/three-fields.ts', path.join(params.packageDir, 'credentials', `${params.nodeName}.credentials.ts`)),
  new SubstituteTask({
    path: path.join(params.packageDir, 'credentials'),
    data: params,
  }),
  assignJson(path.join(params.packageDir, 'package.json'), getPackageJson(params)),
];

const runner = new TasksRunner(tasks);
runner.run();
