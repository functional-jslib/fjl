import {CurryOf2} from "../../function";

export type ApplyFunc = CurryOf2<Function, any[], any>;

export type CallFunc = CurryOf2<Function, any, any>;
