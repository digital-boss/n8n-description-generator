export declare type VisitFn<T = any> = (value: unknown, path: Array<string | number>, sourceObj: T) => void;
export declare type MapFn<T> = (value: unknown, path: Array<string | number>, sourceObj: T) => any;
export declare const traverseVisit: <T>(fn: VisitFn<T>, obj: T) => void;
export declare const traverseMap: <T, TRes = T>(fn: MapFn<T>, obj: T) => TRes;
