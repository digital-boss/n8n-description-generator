import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';


import { version } from '../version';
import { {{nodeNameCamel}}ApiTest } from './{{nodeName}}ApiTest';
import { resources } from './descriptions/generated/resources';
import { nodeDescr } from './descriptions/generated/nodeDescr';
import { resourcesConst } from './descriptions/generated/resourceOperations';
import { ResOpExecutor, ResOpResolver } from '@digital-boss/n8n-designpatterns/dist/usecases/res-op';
import { ReturnParamsExecutor } from '@digital-boss/n8n-designpatterns/dist/usecases';
import { getNodeExecFn, StateBase } from '@digital-boss/n8n-designpatterns/dist';


export class {{nodeName}} implements INodeType {
	description: INodeTypeDescription = {
		displayName: '{{nodeName}}',
		name: '{{nodeNameCamel}}',
		icon: 'file:{{iconFileName}}',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: `Consume {{nodeName}} API (v.${version})`,
		defaults: {
				name: '{{nodeName}}',
				color: '{{brandColor}}',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: '{{nodeNameCamel}}Api',
				required: true,
				testedBy: '{{nodeNameCamel}}ApiTest',
			},
		],
		properties: [
			resources,
			//...<resource1>Fields,
			//...<resource2>Fields,
			//...
		],
	};

	methods = {
		credentialTest: {
			{{nodeNameCamel}}ApiTest,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const resource = this.getNodeParameter('resource', 0) as typeof resourcesConst[number];
		const operation = this.getNodeParameter('operation', 0) as string;

		// Build Executor
		// const httpClient = await HttpClient.create(this);
		// const state = new State(this, nodeDescr, resource, operation);
		// const opResolver = new ResOpResolver(operationMethods, resource, operation, fallbackOperation);
		// const executor = new ResOpExecutor(state, opResolver, httpClient);
		const returnParamsExec = new ReturnParamsExecutor(new StateBase(this));

		const nodeExec = getNodeExecFn(returnParamsExec.execute);
		return nodeExec.call(this);
	}
}

