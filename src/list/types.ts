export interface List {
    concat(...fs: Array<Array<any> | string>): Array<any> | string;

    slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

    includes(x: any, xs: (any[] | string | any)): boolean;

    indexOf(x: any, xs: (any[] | string | any)): number;

    lastIndexOf(x: any, xs: (any[] | string | any)): number;
}
