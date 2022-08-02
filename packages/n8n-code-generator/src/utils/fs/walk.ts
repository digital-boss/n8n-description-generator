import fs from 'fs';
import path from 'path';


const walkIsMatch = (path: string, include: RegExp[] = [], exclude: RegExp[] = []): boolean => {
	return include.every(rx => path.match(rx)) && exclude.every(rx => path.match(rx) === null);
};

export const walk = (
	dir: string, 
	include: RegExp[] = [],
	exclude: RegExp[] = [],
	action: (f: string) => string | undefined = () => undefined,
): void => {
	const files = fs.readdirSync(dir);
	files.forEach(file => {
		const p = path.resolve(dir, file);
		const newPath = walkIsMatch(p, include, exclude) ? (action(p) || p) : p;
		if (fs.statSync(newPath).isDirectory()) {
			walk(newPath, include, exclude, action);
		}
	});
};
