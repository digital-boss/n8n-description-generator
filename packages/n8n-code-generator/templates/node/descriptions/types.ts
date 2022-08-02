import { INodeDescrBase, IOperationBase, IResourceBase } from '@digital-boss/n8n-node-generator/dist/usecases/res-op/types';
import { INodeProperties } from 'n8n-workflow';

export interface INodeDescr extends INodeDescrBase<IResource, IOperation> {
}

export interface IResource extends IResourceBase<IOperation> {
	desc?: string;
}

export interface IOperation extends IOperationBase {
	method: string;
	path: string;
	responseMap?: string | string[];
}

