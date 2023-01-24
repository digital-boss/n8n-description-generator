/**
 * Example of node generator script for node which uses the description generator
 */

import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { execLog, INodeParams, IPackageParams, newNode, newPackage } from 'src/helpers';
import { ITask, Task, TasksContainer } from 'src/lib';
import { copyIcon, createNode, createPackage } from 'src/tasks';
import { renameTask } from 'src/tasks/rename';
import { SubstituteTask } from 'src/tasks/substitute';
import { removeIfExists } from 'src/tasks';
import { exec } from 'child_process';

const packageParams = newPackage({
	ns: 'digital-boss',
	suffix: 'the-node-name',
	baseDir: '/home/user/path/to/basedir',
});

const node = newNode({
	package: packageParams,
	nodeName: 'KrsProv',
	brandColor: '#f89000',
	iconPath: 'templates/SomeRandomName.png',
});

const packageTemplate = 'templates/starterDescriptionsGenerator';
const nodeTemplate = 'templates/node/withDescriptionsGenerator';
const credentialsTemplate = 'templates/creds/three-fields.ts';

const tasks: Task[] = [
	() => removeIfExists(packageParams.packageDir),
	createPackage(packageParams, packageTemplate),
	createNode(node, nodeTemplate, credentialsTemplate),
	() => exec(`cd ${packageParams.packageDir} && git init`, execLog),
];

const root = new TasksContainer(tasks);
root.run();
