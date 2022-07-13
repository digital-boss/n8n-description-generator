import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { INodeParams, IPackageParams, newNode, newPackage } from '../helpers';
import { ITask, Task, TasksContainer } from "../lib";
import { copyIcon, createNode, createPackage } from '../tasks';
import { assignJson } from '../tasks/assignJson';
import { renameTask } from '../tasks/rename';
import { SubstituteTask } from '../tasks/substitute';

const packageParams = newPackage({
  ns: 'digital-boss',
  suffix: 'mynodes',
  baseDir: 'dist',
})

const myNode1 = newNode({
  package: packageParams,
  nodeName: "MyNode1",
  brandColor: '#f89000',
  iconPath: 'templates/SomeRandomName.png'
});

const myNode2 = newNode({
  package: packageParams,
  nodeName: "MyNode2",
  brandColor: '#f89000',
  iconPath: 'templates/SomeRandomName.png'
});

const tasks: Task[] = [
  () => fse.removeSync('dist'),
  createPackage(packageParams, 'templates/starter'),
  createNode(myNode1, 'templates/node', 'templates/creds/three-fields.ts'),
  createNode(myNode2, 'templates/node', 'templates/creds/three-fields.ts')
];

const root = new TasksContainer(tasks);
root.run();
