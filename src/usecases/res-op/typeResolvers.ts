import { TypeResolvers } from 'src/mark';
import { TypeName } from './types';

export const getTypeResolvers = <T>(): TypeResolvers<TypeName, T> => [
	['Root', (ctx) => ctx.path.length === 0],
	['Resource', (ctx) => ctx.isMatch('::Root / resources / *')],
	['Operation', (ctx) => ctx.isMatch('::Resource / operations / *')],
	['Param', (ctx) => ctx.isMatch('::Operation / params / *')],
	[
		'Option',
		(ctx) => {
			if (!ctx.isMatch('::Param / options / *')) {
				return false;
			}
			const o = ctx.getValue(-2);
			return ['options', 'multiOptions'].includes(o.type);
		},
	],
	['PropCollection', (ctx, v) => ctx.isMatch('::Param / options / * :: obj') && 'values' in v],
	[
		'Param',
		(ctx) => {
			const v = ctx.getValue();
			return (
				ctx.isMatch('::Param / options / *') &&
				(typeof v === 'string' || (typeof v === 'object' && !('value' in v)))
			);
		},
	],
	['Param', (ctx) => ctx.isMatch('::PropCollection / values / *')],
];
