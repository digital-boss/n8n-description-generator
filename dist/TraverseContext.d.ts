export interface MarkedData<TTypeName> {
    type: TTypeName;
}
export declare class TraverseContext<TTypeName, TSrc = any> {
    sourceObj: TSrc;
    path: Array<string | number>;
    data: Record<string, MarkedData<TTypeName>>;
    constructor(sourceObj: TSrc);
    private log;
    private getPathBySliceEnd;
    private getPath;
    isMatchCustomType(type: TTypeName, pathIndexRev: number, debug?: boolean): boolean;
    isMatchJsType(type: string, pathIndexRev: number, debug?: boolean): boolean;
    isMatchPart(pattern: string, pathIndexRev: number, debug?: boolean): boolean;
    isMatch(pattern: string, debug?: boolean): boolean;
    getValue(index?: Array<string | number> | number): any;
    getData(index?: Array<string | number> | number): MarkedData<TTypeName> | undefined;
    setData(path: Array<string | number>, data: MarkedData<TTypeName>): void;
}
