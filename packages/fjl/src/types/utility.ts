export type OptionalParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : any[];
