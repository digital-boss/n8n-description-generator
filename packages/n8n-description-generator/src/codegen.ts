const toStr = (json: any) => JSON.stringify(json, undefined, '\t');

export const warnMsg = '// This code was generated. Therefore do not edit it directly.';

//*** Modules

export const getJsModule = (json: any, name: string): string => {
	const str = toStr(json);
	const type = json instanceof Array ? 'INodeProperties[]' : 'INodeProperties';
	return `${warnMsg}

import { INodeProperties } from "n8n-workflow";

export const ${name}: ${type} = ${str}
`;
};

export const getJsModuleForNode = (json: any, typeName: string, from: string): string => {
	const str = toStr(json);
	return `${warnMsg}

import { ${typeName} } from '${from}';

export const nodeDescr: ${typeName} = ${str}
`;
};

//*** Code snippets

export const getConstFromObject = (constName: string, json: any): string => {
	const str = toStr(json);
	return `export const ${constName} = ${str} as const;`;
};
