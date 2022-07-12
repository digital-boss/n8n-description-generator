
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
import { getLoginReq, serviceUrl } from './backend/common';
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

const getArbitraryReq = (token: string): OptionsWithUri => {
	return {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		method: 'GET',
		uri: `${serviceUrl}/api/v2/groups`,
		json: true,
		qs: {
			limit: 1,
		},
	};
};

async function loginTest(this: ICredentialTestFunctions, creds: I{{nodeName}}ApiCredentials): Promise<INodeCredentialTestResult> {
	const options = getLoginReq(creds.email, creds.password);

	let response;
	try {
		response = await this.helpers.request!(options);
	} catch (res) {
		return fail(res.error);
	}

	if (response.result === 'success' && response.message && response.message.token) {
		const t = response.message.token;
		return fail(`Auth success. Save token here: ${t}`);
	}

	return fail(`Login failed: ${JSON.stringify(response)}`);
}

export async function {{nodeNameCamel}}ApiTest(this: ICredentialTestFunctions, credentials: ICredentialsDecrypted): Promise<INodeCredentialTestResult> {
	const creds = credentials.data as unknown as I{{nodeName}}ApiCredentials;

	if (creds.token) {
		const options = getArbitraryReq(creds.token);
		let response;
		try {
			response = await this.helpers.request!(options);
		} catch (res) {
			const err = res.error;
			if (err && err.result === 'error' && err.message === 'Token has expired') {
				return await loginTest.call(this, creds);
			}
			return fail(err);
		}
		return success();
	}
	return await loginTest.call(this, creds);
}
