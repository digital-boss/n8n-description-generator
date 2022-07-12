
import {
	OptionsWithUri,
} from 'request';

export const serviceUrl = 'https://api.cloudapn.co.za';

export const getLoginReq = (email: string, password: string): OptionsWithUri => {
	return {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		uri: `${serviceUrl}/api/auths/login`,
		json: true,
		body: {
			email,
			password,
		},
	};
};
