import {
	INodeProperties,
} from 'n8n-workflow';

export const resource1: INodeProperties[] = [

	/*-------------------------------------------------------------------------- */
	/*                       							resource1				 	 			 							 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['resource1'],
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
	/*                       					resource1:create				 	 								 */
	/* ------------------------------------------------------------------------- */
	{
		displayName: 'Field1',
		name: 'field1',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['resource1'],
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
				resource: ['resource1'],
				operation: ['create'],
			},
		},
		default: '',
		description: '',
	},

	/*-------------------------------------------------------------------------- */
	/*                       						resource1:get				 	 		 							 */
	/* ------------------------------------------------------------------------- */


];
