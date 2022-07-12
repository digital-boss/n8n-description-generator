import fs from 'fs';
import fse from 'fs-extra';
import { Task, TasksRunner } from "./lib";
import { renameTask } from './tasks/rename';
import { SubstituteTask } from './tasks/substitute';

const data = {
  name: 'Bill Murrey',
  age: 46
};

const tasks: Task[] = [
  () => fse.removeSync('dist'),
  () => fs.mkdirSync('dist/newNode', {recursive: true}),
  () => fse.copySync('templates/test', 'dist/newNode'),
  renameTask('dist', data),
  new SubstituteTask({
    path: 'dist',
    exclude: [/\.json/],
    data
  }),
];

const runner = new TasksRunner(tasks);
runner.run();
