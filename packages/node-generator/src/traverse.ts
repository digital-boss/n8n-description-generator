export type VisitFn<T=any> = (
	value: unknown,
	path: Array<string | number>,
	sourceObj: T,
) => void;

export type MapFn<T> = (
	value: unknown,
	path: Array<string | number>,
	sourceObj: T,
) => any;

type Action = 'visit' | 'map';

const traverseInternal = <T, TRes=T>(
	fn: MapFn<T>,
	action: Action,
	value: unknown,
	path: Array<string | number>,
	sourceObj: T,
): TRes => {
	const mappedVal = fn(value, path, sourceObj);
	const val = action === 'visit' ? value : mappedVal;
	if (val instanceof Array) {
		return val.map(
			(v, idx) => traverseInternal(fn, action, v, [...path, idx], sourceObj),
		) as unknown as TRes;
	} else if (val !== null && typeof val === 'object') {
		const result = Object.entries(val)
			.map(([k, v]) => [k, traverseInternal(fn, action, v, [...path, k], sourceObj)]);
		return Object.fromEntries(result);
	}
	return val as TRes;
};

export const traverseVisit = <T>(fn: VisitFn<T>, obj: T): void => {
	traverseInternal(fn, 'visit', obj, [], obj);
};

export const traverseMap = <T, TRes=T>(fn: MapFn<T>, obj: T): TRes => {
	return traverseInternal(fn, 'map', obj, [], obj);
};
