import { VisitFn as MapFn } from './traverse';
import { TraverseContext } from './TraverseContext';

export type ConditionFn<TTypeName = string, TSrc = any> = (
	value: any,
	ctx: TraverseContext<TTypeName, TSrc>,
) => boolean;
export type TransformerFn<TTypeName = string, TSrc = any> = (
	value: any,
	ctx: TraverseContext<TTypeName, TSrc>,
) => any;
type Transformer<TTypeName, TSrc> =
	| TransformerFn<TTypeName, TSrc>
	| Array<TransformerFn<TTypeName, TSrc> | ConditionalTransformer<TTypeName, TSrc>>;
type ConditionalTransformer<TTypeName, TSrc> = [
	ConditionFn<TTypeName, TSrc>,
	Transformer<TTypeName, TSrc>,
];
export type Transformers<TTypeName, TSrc> = Array<ConditionalTransformer<TTypeName, TSrc>>;

const applyTransformersRec = <TTypeName, TSrc>(
	conditionFn: ConditionFn<TTypeName, TSrc>,
	transformer: Transformer<TTypeName, TSrc>,
	value: any,
	ctx: TraverseContext<TTypeName, TSrc>,
) => {
	if (conditionFn(value, ctx)) {
		let result: any = value;
		if (typeof transformer === 'function') {
			result = transformer(result, ctx);
		} else if (transformer instanceof Array) {
			transformer.forEach((tr) => {
				if (typeof tr === 'function') {
					result = tr(result, ctx);
				} else if (tr instanceof Array) {
					const [c, t] = tr;
					result = applyTransformersRec(c, t, result, ctx);
				}
			});
		} else {
			throw new Error('Unexpected value type.');
		}
		return result;
	}
	return value;
};

export const createMapFromTransformers =
	<TTypeName, TSrc>(
		ctx: TraverseContext<TTypeName, TSrc>,
		transformers: Transformers<TTypeName, TSrc>,
	): MapFn =>
	(value: any, path: Array<string | number>, sourceObj: any) => {
		ctx.path = [...path];
		let result: any = value;
		for (const [cond, tr] of transformers) {
			result = applyTransformersRec(cond, tr, result, ctx);
		}
		return result;
	};

/******************************************************************************
 * Helpers
 */

export const propSetter =
	<TTypeName, TSrc>(
		propName: string,
		getter: (value: any, ctx: TraverseContext<TTypeName, TSrc>) => any,
	): TransformerFn<TTypeName, TSrc> =>
	(v, ctx) => {
		if (!(propName in v)) {
			const r = getter(v, ctx);
			if (r !== undefined) {
				return {
					...v,
					[propName]: r,
				};
			}
		}
		return v;
	};

export const matchType =
	<TTypeName = string, TSrc = any>(t: TTypeName): ConditionFn<TTypeName, TSrc> =>
	(v, ctx) => {
		const s = ctx.getData();
		return s !== undefined && s.type === t;
	};
