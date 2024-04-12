import { propSetter, TransformerFn } from 'src/transform';

export const fromString: TransformerFn = (v) => {
	return {
		value: v,
	};
};

export const setName: TransformerFn = propSetter('name', (v) => v.value);
