declare module fjl {

    export function fPureTakesOne(name): (arg: any, obj: any) => any;

    export function fPureTakes2(name): (arg1: any, arg2: any, obj: any) => any;

    export function fPureTakes3(name): (arg1: any, arg2: any, arg3: any, obj: any) => any;

    export function fPureTakes4(name): (arg1: any, arg2: any, arg3: any, arg4: any, obj: any) => any;

    export function fPureTakes5(name): (arg1: any, arg2: any, arg3: any, arg4: any, arg5: any, obj: any) => any;

    export function fPureTakesOneOrMore(name): (obj: any, ...args: any[]) => any;

}
