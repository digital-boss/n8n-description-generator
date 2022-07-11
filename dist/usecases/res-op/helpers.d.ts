import { INodeProperties } from 'n8n-workflow';
export declare const writeDescriptionModules: (outDir: string, descriptionsDict: Record<string, INodeProperties | INodeProperties[]>) => void;
interface IRes {
    operations: Record<string, {
        notImplemented?: boolean;
    }>;
}
export declare const getTypesForResourceOperations: (resources: Record<string, IRes>) => string;
export {};
