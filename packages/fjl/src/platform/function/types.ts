import {CurryOf2} from "../../function/curry";
import {NaryOf} from "../../types";

export type ApplyFunc= CurryOf2<NaryOf<any, any>, any, any>;

export type CallFunc = CurryOf2<NaryOf<any, any>, any, any>;
