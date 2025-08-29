/** @format */

export function formatOSMQuery(queryParts: string[]) {
    const queryConfig = {
        outputFormat: 'json',
        timeout: 25,
        outputMode: 'geom',
        queries: queryParts,
    };

    const header = `[out:${queryConfig.outputFormat}][timeout:${queryConfig.timeout}];`;
    const queriesBlock = `(\n  ${queryConfig.queries.join('\n  ')}\n);`;
    const footer = `out ${queryConfig.outputMode};`;

    return [header, queriesBlock, footer].join('\n');
}
