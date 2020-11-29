export const

    slugOptions = obj => ({
            splitAtPattern: /[^a-z\d\-_]/gim,
            max: 201,
            ...obj
        }),

    slugFilter = (ops, value) =>  {
        const {splitAtPattern, max} = slugOptions(ops);
        return (value + '')
            .toLowerCase()
            .split(splitAtPattern)
            .filter(x => !!x.length)
            .join('-')
            .substring(0, max);
    }

;
