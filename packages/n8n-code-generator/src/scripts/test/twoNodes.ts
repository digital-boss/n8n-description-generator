import fse from 'fs-extra';
import { newNode, newPackage } from 'src/helpers';
import { Task, TasksContainer } from 'src/lib';
import { createNode, createPackage } from 'src/tasks';

const baseDir = 'generated';

const packageParams = newPackage({
	ns: 'digital-boss',
	suffix: 'mynodes',
	baseDir,
});

const myNode1 = newNode({
	package: packageParams,
	nodeName: 'MyNode1',
	brandColor: '#f89000',
	iconPath: 'templates/SomeRandomName.png',
});

const myNode2 = newNode({
	package: packageParams,
	nodeName: 'MyNode2',
	brandColor: '#f89000',
	iconPath: 'templates/SomeRandomName.png',
});

const tasks: Task[] = [
	() => fse.removeSync(packageParams.packageDir),
	createPackage(packageParams, 'templates/starter'),
	createNode(myNode1, 'templates/node', 'templates/creds/three-fields.ts'),
	createNode(myNode2, 'templates/node', 'templates/creds/three-fields.ts'),
];

const root = new TasksContainer(tasks);
root.run();
