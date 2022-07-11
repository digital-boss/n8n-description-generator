import { VisitFn } from './traverse';
import { TraverseContext } from './TraverseContext';
export declare type TypeResolvers<TTypeName, TSrc> = Array<[TTypeName, (ctx: TraverseContext<TTypeName, TSrc>, value: any) => boolean]>;
export declare const createTypeMarker: <TTypeName, TSrc>(ctx: TraverseContext<TTypeName, TSrc>, resolvers: TypeResolvers<TTypeName, TSrc>) => VisitFn;
