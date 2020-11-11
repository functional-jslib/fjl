import {CurryOf2} from "../../function";

export type SplitFunc = CurryOf2<string | RegExp, string, string[]>
