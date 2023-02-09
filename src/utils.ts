export const getDeepValue = (path: Array<string | number>, obj: any) => path.reduce((acc, i) => acc[i], obj);
