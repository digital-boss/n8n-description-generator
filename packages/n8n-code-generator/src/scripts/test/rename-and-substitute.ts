import fs from 'fs';
import fse from 'fs-extra';
import { Task, TasksContainer } from 'src/lib';
import { renameTask } from 'src/tasks/rename';
import { SubstituteTask } from 'src/tasks/substitute';

const baseDir = 'generated';
const targetDir = `${baseDir}/newNode`;

const data = {
	name: 'Bill Murrey',
	age: 46,
};

const tasks: Task[] = [
	() => fse.removeSync(targetDir),
	() => fs.mkdirSync(targetDir, {recursive: true}),
	() => fse.copySync('templates/tests/rename-and-substitute', targetDir),
	renameTask(targetDir, data),
	new SubstituteTask({
		path: targetDir,
		exclude: [/\.json/],
		data,
	}),
];

const runner = new TasksContainer(tasks);
runner.run();
