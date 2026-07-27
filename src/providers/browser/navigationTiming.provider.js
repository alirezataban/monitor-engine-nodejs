module.exports = {

    name: "navigationTiming",

    async collect(ctx) {

        const navigation = await ctx.page.evaluate(() => {

            const entry =
                performance.getEntriesByType("navigation")[0];

            if (!entry)
                return null;

            return {

                name: entry.name,

                entryType: entry.entryType,

                startTime: entry.startTime,

                duration: entry.duration,

                unloadEventStart: entry.unloadEventStart,
                unloadEventEnd: entry.unloadEventEnd,

                redirectStart: entry.redirectStart,
                redirectEnd: entry.redirectEnd,

                fetchStart: entry.fetchStart,

                domainLookupStart: entry.domainLookupStart,
                domainLookupEnd: entry.domainLookupEnd,

                connectStart: entry.connectStart,
                secureConnectionStart: entry.secureConnectionStart,
                connectEnd: entry.connectEnd,

                requestStart: entry.requestStart,

                responseStart: entry.responseStart,
                responseEnd: entry.responseEnd,

                domInteractive: entry.domInteractive,

                domContentLoadedEventStart:
                    entry.domContentLoadedEventStart,

                domContentLoadedEventEnd:
                    entry.domContentLoadedEventEnd,

                loadEventStart:
                    entry.loadEventStart,

                loadEventEnd:
                    entry.loadEventEnd

            };

        });

        return navigation;

    }

};