import {CurryOf2} from "../../function/curry";

export type ApplyFunc = CurryOf2<Function, unknown[], unknown>;

export type CallFunc = CurryOf2<Function, unknown, unknown>;
