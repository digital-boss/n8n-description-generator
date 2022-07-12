
import {
	CoreOptions,
	OptionsWithUri,
} from 'request';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';
import { groupOps, resourcesConst, simOps } from '../descriptions/generated/resourceOperations';
import { INodeDescr, IOperation, IResource } from '../descriptions/types';
import { IHttpClient } from 'n8n-designpatterns/dist/interfaces';
import { ResOpExecutor } from 'n8n-designpatterns/dist/usecases/res-op/ResOpExecutor';
import { serviceUrl } from './common';
import { ExecFnHelperBase } from 'n8n-designpatterns/dist/ExecFnHelperBase';

type ReqFn = (coreOpts: CoreOptions, path?: string) => Promise<any>;
type OpFn = (request: ReqFn, execFnHelper: ExecFnHelperBase) => Promise<any>;

type OpsContainer<T extends string> = {
	[p in T]: OpFn;
};

const group: OpsContainer<typeof groupOps[number]> = {
	get (request): Promise<any> {
		return request({});
	},
	getUsers (request, helper): Promise<any> {
		return request({
			qs: helper.getParam('additionalFields'),
		});
	},
	getAll (request, helper): Promise<any> {
		const fields = { ...helper.getParam('additionalFields') };
		const path = fields.search ? `/groups/search/${fields.search}` : '/groups';
		delete fields.search;
		return request({
			qs: fields,
		}, path);
	},
};

const sim: OpsContainer<typeof simOps[number]> = {
	get (request): Promise<any> {
		return request({});
	},
	getAll (request, helper): Promise<any> {
		return request({
			qs: helper.getParam('additionalFields'),
		});
	},
	search (request): Promise<any> {
		return request({});
	},
	listUsageByDate (request, helper): Promise<any> {
		const d = (helper.getParam('date') || new Date().toISOString()).split('T')[0];
		const path = `/sims/${d}/daily`; // ToDo: make setParam method to override and set variables, that can be substituted later in applyPathParams.
		return request({
			qs: helper.getParam('additionalFields'),
		}, path);
	},
};

const executors = {
	group,
	sim,
};

// const fallbackOperation: ExecFn<ApiTools> = (api: ApiTools) => {
// 	return request();
// };

export class OperationExecutor extends ResOpExecutor<
	INodeDescr,
	IResource,
	IOperation,
	ExecFnHelperBase,
	IHttpClient
> {

	private strip = (transformer: (res: any) => any = r => r.message) => (res: any) => {
		if (res && res.result && res.result === 'success') {
			const value = transformer(res);
			if (value === undefined) {
				throw new NodeOperationError(this.node.execFns.getNode(), 'Transformer function returns undefined. If there is no data, return empty array or empty object.');
			}
			return value;
		} else {
			throw new NodeApiError(this.node.execFns.getNode(), res, { message: `Error in strip: ${res.errMsg}` });
		}
	}

	private buildRequest (coreOpts: CoreOptions = {}, path?: string): OptionsWithUri {
		const pathWithValues = this.node.applyPathParams(path || this.operation.path);
		return Object.assign({
			headers: {
				'Content-Type': 'application/json',
			},
			method: this.operation.method,
			uri: `${serviceUrl}/api/v2${pathWithValues}`,
			json: true,
		}, coreOpts);
	}

	private request = async (coreOpts: CoreOptions = {}, path?: string): Promise<any> => {
		const opts = this.buildRequest(coreOpts, path);
		return await this.client.request(opts).then(this.strip());
	}

	protected executeCurrentItem(): Promise<any> {
		const res = executors[this.resourceName as typeof resourcesConst[number]];

		if (!res) {
			throw new Error(`There is no resource: '${this.resourceName}'`);
		}

		const op: OpFn = (res as any)[this.operationName];
		if (!op) {
			throw new Error(`There is no operation: '${this.operationName}'`);
			// return fallbackOperation(this.api!);
		} else {
			return op(this.request, this.node);
		}
	}

}
