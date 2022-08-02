import fs from 'fs';
import path from 'path';

const getAllFilesRec = (dir: string, baseDir: string, arrayOfFiles: string[] = []): string[] => {
	const files = fs.readdirSync(dir);
	files.forEach(file => {
		const p = path.join(dir, file);
		arrayOfFiles.push(p.slice(baseDir.length+1));
		if (fs.statSync(p).isDirectory()) {
			getAllFilesRec(p, baseDir, arrayOfFiles);
		}
	});
	return arrayOfFiles;
};

export const getAllFiles = (dir: string): string[] => {
	const d = path.resolve(dir);
	return getAllFilesRec(d, d);
};