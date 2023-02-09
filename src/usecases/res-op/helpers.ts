import fs from 'fs';
import { INodeProperties } from 'n8n-workflow';
import { getConstFromObject, getJsModule, warnMsg } from 'src/codegen';


export const writeDescriptionModules = (
	outDir: string,
	descriptionsDict: Record<string, INodeProperties | INodeProperties[]>,
) => {
	Object.keys(descriptionsDict).map(key => {
		const props = descriptionsDict[key];
		fs.writeFileSync(`${outDir}/${key}.ts`, getJsModule(props, key), 'utf-8');
	});
};

interface IRes {
	operations: Record<string, {
		notImplemented?: boolean;
	}>;
}

export const getTypesForResourceOperations = (resources: Record<string, IRes>): string => {
	const resourcesCode = getConstFromObject('resourcesConst', Object.keys(resources));
	const operationsCode = Object.entries(resources)
		.map(([name, res]) => {
			const opNames = Object.entries(res.operations)
				.filter(([_, op]) => !op.notImplemented)
				.map(([name]) => name);
			return getConstFromObject(`${name}Ops`, opNames);
		})
		.join('\n\n');
	return [warnMsg, resourcesCode, operationsCode].join('\n\n') + '\n';
};
