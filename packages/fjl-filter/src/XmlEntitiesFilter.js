export const xmlEntitiesOptions = ops => {
        return {
            charsAssocMap: CHARS_ASSOC_MAP,
            ...ops
        };
    },

    CHARS_ASSOC_MAP = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&apos;',
        '&': '&amp;'
    },

    xmlEntitiesFilter = (options, str) => {
        const {charsAssocMap} = xmlEntitiesOptions(options);
        if (!str || !str.length) { return ''; }
        return str.replace(/[<>"'&]/g, s => charsAssocMap[s]);
    }

;
