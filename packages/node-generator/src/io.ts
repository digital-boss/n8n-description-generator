import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const toYaml = (obj: any): string => {
	return yaml.dump(obj, {
		noRefs: true,
	});
};

export const readYaml = <T>(p: string, name: string) => {
	const filePath = path.join(p, `${name}.yaml`);
	const s = fs.readFileSync(filePath, 'utf-8');
	return yaml.load(s) as T;
};

export const write = (p: string, name: string, json: any) => {
	const s = JSON.stringify(json, undefined, 2);
	fs.writeFileSync(path.join(p, `${name}.json`), s, 'utf-8');
	fs.writeFileSync(path.join(p, `${name}.yaml`), toYaml(json));
};
