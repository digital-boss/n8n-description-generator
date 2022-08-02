import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import { INodeParams, IPackageParams } from 'src/helpers';
import { ITask, TasksContainer } from 'src/lib';
import { SubstituteTask } from './substitute';
import { renameTask } from './rename';
import mergeWith from 'lodash.mergewith';
import * as fns from '../utils/functional';

export const removeIfExists = (path: string) => fs.existsSync(path) && fse.removeSync(path);

export const mergePackageJson = (packageDir: string, json: any) => () => {
	const filePath = path.join(packageDir, 'package.json');
	fns.pipe(
		(f: string) => fs.readFileSync(f, 'utf-8'),
		JSON.parse,
		(srcObj: any) => mergeWith(srcObj, json, (value, srcValue) => {
			if (value instanceof Array && srcValue instanceof Array) {
				return value.concat(srcValue);
			}
			return undefined;
		}),
		(o: any) => JSON.stringify(o, undefined, 2),
		(result: string) => fs.writeFileSync(filePath, result, 'utf-8'),
	)(filePath);
};

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
	mergePackageJson(p.packageDir, p.packageJson),
]);

export const createNode = (
	p: INodeParams, 
	tplDir: string, 
	credsTlpPath: string,
): ITask => new TasksContainer([
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
	mergePackageJson(p.package.packageDir, p.packageJson),
]);
