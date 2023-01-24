import {
	INodeProperties,
} from 'n8n-workflow';

export const resources: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		required: true,
		type: 'options',
		options: [
			{
				name: 'Resource 1',
				value: 'resource1',
			},
			{
				name: 'Resource 2',
				value: 'resource2',
			},
		],
		default: 'resource1',
		description: 'The resource to consume',
	},
];
