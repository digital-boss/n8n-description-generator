
import {
	OptionsWithUri,
} from 'request';

import {
	ICredentialsDecrypted,
	ICredentialTestFunctions,
	INodeCredentialTestResult,
	JsonObject,
} from 'n8n-workflow';
import { I{{nodeName}}ApiCredentials } from 'credentials/{{nodeName}}Api.credentials';
import { type } from 'os';


const fail = (message?: string | object): INodeCredentialTestResult => {
	const msg = typeof message === 'string'
		? message
		: typeof message === 'undefined'
		? 'Auth failed'
		: `Auth failed: ${JSON.stringify(message)}`;

	return {
		status: 'Error',
		message: msg,
	};
};

const success = (message?: string): INodeCredentialTestResult => {
	const msg = typeof message === 'undefined'
		? 'Authentication successful!'
		: message;

	return {
		status: 'OK',
		message: msg,
	};
};

export async function {{nodeNameCamel}}ApiTest(this: ICredentialTestFunctions, credentials: ICredentialsDecrypted): Promise<INodeCredentialTestResult> {
	const creds = credentials.data as unknown as I{{nodeName}}ApiCredentials;
	return success();
}
