import { ConditionFn, propSetter, TransformerFn } from 'src/transform';


/******************************************************************************
 * Utilities
 */

export const cap1st = (i: string): string => i[0].toUpperCase() + i.slice(1);

export const createDisplayName = (name: string): string => {
	const words = name.split(/(?=[A-Z])/); // split by capitals
	return words.map(cap1st).join(' ');
};


/******************************************************************************
 * Conditions and Transformers
 */

export const isString: ConditionFn = v => typeof v === 'string';
export const setDisplayName: TransformerFn = propSetter('displayName', v => createDisplayName(v.name));
