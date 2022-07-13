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
import { groupFields } from './descriptions/generated/groupFields';
import { resources } from './descriptions/generated/resources';
import { simFields } from './descriptions/generated/simFields';
import { nodeDescr } from './descriptions/generated/nodeDescr';
import { getNodeExecFn } from 'n8n-designpatterns/dist/getNodeExecFn';
import { OperationExecutor } from './backend/operations';
import { resourcesConst } from './descriptions/generated/resourceOperations';
import { HttpClient } from './backend/HttpClient';
import { ReturnParamsExecutor } from 'n8n-designpatterns/dist/usecases/ReturnParamsExecutor';
import { ExecFnHelperBase } from 'n8n-designpatterns/dist/ExecFnHelperBase';

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
			...groupFields,
			...simFields,
		],
	};

	methods = {
		credentialTest: {
			{{nodeNameCamel}}ApiTest,
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const httpClient = await HttpClient.create(this);
		const resource = this.getNodeParameter('resource', 0) as typeof resourcesConst[number];
		const operation = this.getNodeParameter('operation', 0) as string;

		const execFnHelper = new ExecFnHelperBase(this);
		//const returnParamsExec = new ReturnParamsExecutor(execFnHelper);
		const executor = new OperationExecutor(nodeDescr, resource, operation, execFnHelper, httpClient);

		const nodeExec = getNodeExecFn(executor.execute);
		return nodeExec.call(this);
	}
}

