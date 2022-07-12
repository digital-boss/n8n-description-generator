import {
	CoreOptions,
	OptionsWithUri,
} from 'request';

import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { StaticData } from './StaticData';
import { I{{nodeName}}ApiCredentials } from 'credentials/{{nodeName}}Api.credentials';
import { getLoginReq } from './common';
import { IHttpClient } from 'n8n-designpatterns/dist/interfaces';


export class HttpClient implements IHttpClient {

	private staticData: StaticData;
	private execFns: IExecuteFunctions;
	private creds: I{{nodeName}}ApiCredentials;

	private constructor (execFns: IExecuteFunctions, creds: I{{nodeName}}ApiCredentials) {
		this.execFns = execFns;
		this.creds = creds;
		this.staticData = new StaticData(this.execFns);
	}

	static create = async (execFns: IExecuteFunctions): Promise<HttpClient> => {
		const creds = await execFns.getCredentials('{{nodeNameCamel}}Api') as unknown as I{{nodeName}}ApiCredentials;
		return new HttpClient(execFns, creds);
	}

	protected login = async (): Promise<string> => {
		const creds = this.creds;
		const options = getLoginReq(creds.email, creds.password);

		let response;
		try {
			response = await this.execFns.helpers.request!(options);
		} catch (res) {
			throw new NodeOperationError(this.execFns.getNode(), `Login error: ${res.error}`, res);
		}

		if (response.result === 'success' && response.message && response.message.token) {
			return response.message.token;
		}

		throw new NodeOperationError(this.execFns.getNode(), `Login error: No token received`, response);
	}

	protected setNewToken = async (): Promise<string> => {
		const t = await this.login();
		this.staticData.token = t;
		return t;
	}

	protected getToken = async (): Promise<string> => {
		return this.staticData.token || this.creds.token || this.setNewToken();
	}

	request = async (options: OptionsWithUri, count = 0): Promise<any> => {
		const token = await this.getToken();

		let response;
		try {
			options.headers!['Authorization'] = `Bearer ${token}`;
			response = await this.execFns.helpers.request!(options);
		} catch (res) {
			const err = res.error;
			if (err) {
				if (err.result === 'error' && err.message === 'Token has expired') {
					if (count > 1) {
						throw new NodeOperationError(this.execFns.getNode(), 'Login failed: Two times login returned token, but it was theated as expired in next response', res);
					}
					await this.setNewToken();
					return this.request(options, count + 1);
				} else if (err.result === 'success') {
					// This API can return HTTP code 302, for example, but with success result.
					return err; // return successfull result.
				}
			}
			throw(res);
		}
		return response;
	}
}



