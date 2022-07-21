/**
 * Example of regular node generator script
 */

import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { INodeParams, IPackageParams, newNode, newPackage } from 'src/helpers';
import { ITask, Task, TasksContainer } from "src/lib";
import { copyIcon, createNode, createPackage } from 'src/tasks';
import { renameTask } from 'src/tasks/rename';
import { SubstituteTask } from 'src/tasks/substitute';
import { removeIfExists } from 'src/tasks';
import { exec } from 'child_process';


const baseDir = 'generated'; // or '/absolute/path'

const packageParams = newPackage({
  ns: 'digital-boss',
  suffix: 'redge',
  baseDir,
})

const node = newNode({
  package: packageParams,
  nodeName: "KrsProv",
  brandColor: '#f89000',
  iconPath: 'templates/SomeRandomName.png'
});

const tasks: Task[] = [
  () => removeIfExists(packageParams.packageDir),
  createPackage(packageParams, 'templates/starter'),
  createNode(node, 'templates/node', 'templates/creds/three-fields.ts'),
  () => exec('git init'),
];

const root = new TasksContainer(tasks);
root.run();
