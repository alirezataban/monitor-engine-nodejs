module.exports = {

    name: "resource",

    async collect(ctx) {

        const entries = await ctx.page.evaluate(() => {

            return performance
                .getEntriesByType("resource")
                .map(entry => ({

                    name: entry.name,

                    initiatorType: entry.initiatorType,

                    startTime: entry.startTime,

                    duration: entry.duration,

                    transferSize: entry.transferSize,

                    encodedBodySize: entry.encodedBodySize,

                    decodedBodySize: entry.decodedBodySize,

                    nextHopProtocol: entry.nextHopProtocol,

                    responseEnd: entry.responseEnd,

                    responseStart: entry.responseStart,

                    domainLookupStart: entry.domainLookupStart,

                    domainLookupEnd: entry.domainLookupEnd,

                    connectStart: entry.connectStart,

                    connectEnd: entry.connectEnd,

                    secureConnectionStart: entry.secureConnectionStart

                }));

        });

        return entries;

    }

};