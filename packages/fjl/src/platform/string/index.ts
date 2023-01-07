export const split = (pattern: string | RegExp, xs: string, limit?: number): string[] => (xs || '').split(pattern, limit),

  $split = (p: string) => (xs: string): string[] => split(p, xs);
