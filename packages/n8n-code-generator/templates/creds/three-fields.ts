import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export interface I{{nodeName}}ApiCredentials {
	email: string;
	password: string;
	token: string;
}

export class {{nodeName}}Api implements ICredentialType {
	name = '{{nodeNameCamel}}Api';
	displayName = '{{nodeName}} API';
	documentationUrl = '{{nodeNameCamel}}';
	properties: INodeProperties[] = [
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Access Token',
			name: 'token',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
		},
	];
}
