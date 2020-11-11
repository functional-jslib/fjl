export const bind = (fn: Function, ...args: any[]): Function | any => fn.bind(null, ...args);
