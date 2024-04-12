import { NodePropertyTypes } from 'n8n-workflow';
import { ConditionFn, propSetter, TransformerFn } from 'src/transform';
import { TypeName } from '../types';
import { TraverseContext } from 'src/TraverseContext';
import { merge } from 'lodash';

/******************************************************************************
 * Utilities
 */

interface ISrc {
	models: Record<string, Array<{ name?: string }>>;
}

export const getModelField = <T>(
	name: string,
	ctx: TraverseContext<T, ISrc>,
): object | undefined => {
	const [modelName, fieldName] = name.split('.');
	const model = ctx.sourceObj.models[modelName];
	return model.find((f) => f.name === fieldName);
};

export const getDefaultForType = (type?: NodePropertyTypes): any => {
	switch (type) {
		case 'boolean':
			return false;
		case 'collection':
			return [];
		case 'dateTime':
			return '';
		case 'fixedCollection':
			return {};
		case 'number':
			return 0;
		case 'string':
			return '';
		case 'options':
			return '';
		case 'multiOptions':
			return [];
		// Not implemented:
		// case 'color':
		// 	return
		// case 'hidden':
		// 	return
		// case 'json':
		// 	return
		// case 'notice':
		// 	return
		// case 'credentialsSelect':
		// 	return
		default:
			throw new Error(`Not implemented default for type: ${type}`);
	}
};

/**
 * @returns hierarchy: Resource, operation, param...
 */
export const getHighHierarchy = (ctx: TraverseContext<TypeName, ISrc>): string[] => {
	const result: string[] = [];

	let end = ctx.path.length;
	while (end > 0) {
		const s = ctx.getData(end);
		if (s) {
			const o = ctx.getValue(end);
			if (s.type === 'Param') {
				result.push(o.name);
			} else if (s.type === 'Operation') {
				const op = ctx.path[end - 1] as string;
				result.push(op);
			} else if (s.type === 'Resource') {
				const resName = ctx.path[end - 1] as string;
				result.push(resName);
			}
		}
		end--;
	}
	return result.reverse();
};

export const getRequired = (v: any, ctx: TraverseContext<TypeName, ISrc>): boolean | undefined => {
	const s = ctx.getData(-2);
	if (s && s.type === 'Operation' && !['collection', 'fixedCollection'].includes(v.type)) {
		return true;
	}
	return undefined;
};

/******************************************************************************
 * Conditions and Transformers
 */

export const isLink: ConditionFn = (v, ctx) => v !== null && typeof v === 'object' && '$link' in v;

export const importFromModel: TransformerFn<TypeName, ISrc> = (v: string, ctx) => {
	const field = getModelField(v, ctx);
	return field;
};

export const linkFromModel: TransformerFn<TypeName, ISrc> = (v, ctx) => {
	const field = getModelField(v.$link, ctx);
	const result = {
		...field,
		...v,
	};
	delete result.$link;
	return result;
};

export const setType: TransformerFn<TypeName, ISrc> = propSetter('type', () => 'string');
export const setDefault: TransformerFn<TypeName, ISrc> = propSetter('default', (v, _) =>
	getDefaultForType(v.type),
);
export const setRequired: TransformerFn<TypeName, ISrc> = propSetter('required', (v, ctx) =>
	getRequired(v, ctx),
);

export const setDisplayOptions: TransformerFn<TypeName, ISrc> = (v, ctx) => {
	const hier = getHighHierarchy(ctx);

	if (hier.length !== 3) {
		return v;
	}
	const [res, op] = hier;
	
	let displayOptions = { show: { resource: [res], operation: [op] } };
	if (v.displayOptions) {
		merge(displayOptions, v.displayOptions);
	}

	return {
		...v,
		displayOptions,
	};
};
