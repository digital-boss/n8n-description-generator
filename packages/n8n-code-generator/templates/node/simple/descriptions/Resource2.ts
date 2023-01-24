import {
	INodeProperties,
} from 'n8n-workflow';

export const resource2: INodeProperties[] = [

	/*-------------------------------------------------------------------------- */
	/*                       						resource2				 	 			 								 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['resource2'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: '',
			},
			{
				name: 'Get',
				value: 'get',
				description: '',
			},
		],
		default: 'create',
		description: 'The operation to perform',
	},

	/*-------------------------------------------------------------------------- */
	/*                       				resource2:create										 	 			 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Field1',
		name: 'field1',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['resource2'],
				operation: ['create'],
			},
		},
		default: '',
		description: '',
	},
	{
		displayName: 'Field2',
		name: 'field2',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['resource2'],
				operation: ['create'],
			},
		},
		default: '',
		description: '',
	},

	/*-------------------------------------------------------------------------- */
	/*                       						resource2:get				 	 		 							 */
	/* ------------------------------------------------------------------------- */


];
