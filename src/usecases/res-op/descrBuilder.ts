import { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

interface IRes {
	display?: string;
	defaultOperation?: string;
	operations: Record<string, IOp>;
}

interface IOp {
	notImplemented?: boolean;
	display?: string;
	desc?: string;
	params: INodeProperties[];
}

export const getResourcesParam = (resources: Record<string, IRes>): INodeProperties => {
	const options: INodePropertyOptions[] = Object.entries(resources).map(([name, res]) => ({
		name: res.display || name,
		value: name,
	}));

	return {
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options,
		default: options[0].value,
	};
};

export const getOperationsParam = (
	operations: Record<string, IOp>,
	defaultOp: string,
	resourceName: string,
): INodeProperties => {
	const options: INodePropertyOptions[] = Object.entries(operations)
		.filter(([_, op]) => !op.notImplemented)
		.map(([name, op]) => {
			return {
				name: op.display || name,
				value: name,
				description: op.desc,
			};
		});

	return {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: defaultOp,
		displayOptions: {
			show: {
				resource: [resourceName],
			},
		},
		options,
	};
};

export const getDescriptionsDict = (
	resources: Record<string, IRes>,
): Record<string, INodeProperties | INodeProperties[]> => {
	const result: Record<string, INodeProperties | INodeProperties[]> = {};
	const resource = getResourcesParam(resources);
	result.resources = resource;

	Object.entries(resources).map(([resName, r]) => {
		const operations = getOperationsParam(r.operations, r.defaultOperation!, resName);
		const fields = Object.entries(r.operations)
			.filter(([_, op]) => !op.notImplemented)
			.map(([_, op]) => op.params)
			.flat();

		result[resName + 'Fields'] = [operations, ...fields];
	});

	return result;
};
