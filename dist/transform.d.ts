import { VisitFn as MapFn } from './traverse';
import { TraverseContext } from './TraverseContext';
export declare type ConditionFn<TTypeName = string, TSrc = any> = (value: any, ctx: TraverseContext<TTypeName, TSrc>) => boolean;
export declare type TransformerFn<TTypeName = string, TSrc = any> = (value: any, ctx: TraverseContext<TTypeName, TSrc>) => any;
declare type Transformer<TTypeName, TSrc> = TransformerFn<TTypeName, TSrc> | Array<TransformerFn<TTypeName, TSrc> | ConditionalTransformer<TTypeName, TSrc>>;
declare type ConditionalTransformer<TTypeName, TSrc> = [
    ConditionFn<TTypeName, TSrc>,
    Transformer<TTypeName, TSrc>
];
export declare type Transformers<TTypeName, TSrc> = Array<ConditionalTransformer<TTypeName, TSrc>>;
export declare const createMapFromTransformers: <TTypeName, TSrc>(ctx: TraverseContext<TTypeName, TSrc>, transformers: Transformers<TTypeName, TSrc>) => MapFn;
export declare const propSetter: <TTypeName, TSrc>(propName: string, getter: (value: any, ctx: TraverseContext<TTypeName, TSrc>) => any) => TransformerFn<TTypeName, TSrc>;
export declare const matchType: <TTypeName = string, TSrc = any>(t: TTypeName) => ConditionFn<TTypeName, TSrc>;
export {};
