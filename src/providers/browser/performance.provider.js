module.exports = {

    name: "performance",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            const navigation =
                performance.getEntriesByType("navigation")[0];

            return {

                timeOrigin: performance.timeOrigin,

                navigationType:
                    navigation?.type ?? null,

                redirectCount:
                    navigation?.redirectCount ?? 0,

                timing: {

                    now: performance.now()

                },

                memory: performance.memory
                    ? {

                        jsHeapSizeLimit:
                            performance.memory.jsHeapSizeLimit,

                        totalJSHeapSize:
                            performance.memory.totalJSHeapSize,

                        usedJSHeapSize:
                            performance.memory.usedJSHeapSize

                    }
                    : null

            };

        });

    }

};