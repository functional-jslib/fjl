export const

    /**
     * Clones passed in value using `JSON.parse(JSON.stringify(...))` pattern.
     * @todo Should [tentatively] be using `structuredClone` here (in a future release).
     */
    jsonClone = (x: any): any => JSON.parse(JSON.stringify(x))

;
