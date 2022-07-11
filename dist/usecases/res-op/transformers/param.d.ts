import { NodePropertyTypes } from 'n8n-workflow';
import { ConditionFn, TransformerFn } from 'src/transform';
import { TypeName } from '../types';
import { TraverseContext } from 'src/TraverseContext';
interface ISrc {
    models: Record<string, Array<{
        name?: string;
    }>>;
}
export declare const getModelField: <T>(name: string, ctx: TraverseContext<T, ISrc>) => object | undefined;
export declare const getDefaultForType: (type?: NodePropertyTypes) => any;
export declare const getHighHierarchy: (ctx: TraverseContext<TypeName, ISrc>) => string[];
export declare const getRequired: (v: any, ctx: TraverseContext<TypeName, ISrc>) => boolean | undefined;
export declare const isLink: ConditionFn;
export declare const importFromModel: TransformerFn<TypeName, ISrc>;
export declare const linkFromModel: TransformerFn<TypeName, ISrc>;
export declare const setType: TransformerFn<TypeName, ISrc>;
export declare const setDefault: TransformerFn<TypeName, ISrc>;
export declare const setRequired: TransformerFn<TypeName, ISrc>;
export declare const setDisplayOptions: TransformerFn<TypeName, ISrc>;
export {};
