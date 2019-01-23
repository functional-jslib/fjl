declare module fjl {

    export function lines(str: string): string[];

    export function words(str: string): string[];

    export function unwords(list: string[]): string;

    export function unlines(list: string[]): string;

    export function split(pattern: RegExp | string, str: string): string[];

    export function lcaseFirst(str: string): string;

    export function ucaseFirst(str: string): string;

    export function camelCase(str: string, pattern?: RegExp): string;

    export function classCase(str: string, pattern?: RegExp): string;

}
