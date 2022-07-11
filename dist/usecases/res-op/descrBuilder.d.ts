import { INodeProperties } from 'n8n-workflow';
interface IRes {
    display?: string;
    defaultOperation?: string;
    operations: Record<string, IOp>;
}
interface IOp {
    notImplemented?: boolean;
    display?: string;
    desc?: string;
    params: INodeProperties[];
}
export declare const getResourcesParam: (resources: Record<string, IRes>) => INodeProperties;
export declare const getOperationsParam: (operations: Record<string, IOp>, defaultOp: string, resourceName: string) => INodeProperties;
export declare const getDescriptionsDict: (resources: Record<string, IRes>) => Record<string, INodeProperties | INodeProperties[]>;
export {};
