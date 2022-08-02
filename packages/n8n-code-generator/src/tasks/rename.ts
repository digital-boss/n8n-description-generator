import fs from 'fs';
import path from 'path';
import { walk } from 'src/utils/fs/walk';
import { getAllVars, renderTpl } from 'src/utils/templates';

export const renameTask = (dir: string, data: Record<string, any>) => () => {
	walk(dir, [], [], (f: string) => {
		const d = path.dirname(f);
		const n = path.basename(f);
		const vars = getAllVars(n);
		if (vars.length > 0) {
			const newName = renderTpl(n, data);
			//console.log(`${d}/${n} -> ${newName}`)
			fs.renameSync(f, path.join(d, newName));
			return path.join(d, newName);
		}
		return f;
	});
};