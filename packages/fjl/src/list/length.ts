export const length = (x: { readonly length?: number }) => x === undefined || x === null  ? undefined : x.length;
