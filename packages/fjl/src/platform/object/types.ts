import {CurryOf2} from "../../function";

export type InstanceOfFunc = CurryOf2<Function, any, boolean>;

export type HasOwnPropertyFunc = CurryOf2<string, any, boolean>;

export type LengthFunc = (x?: any) => number;

export type KeysFunc = (x?: any) => string[];

export type AssignFunc = CurryOf2<any, any[], any>
