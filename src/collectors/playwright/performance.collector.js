const numberUtil =
require("../../utils/number.util");

module.exports = {

    name: "performance",

    async collect(ctx) {

        const perf = ctx.performance;

        if (!perf)
            return null;

        return {

            navigationType:
                perf.navigationType,

            redirectCount:
                perf.redirectCount,

            uptime:
                numberUtil.round(
                    perf.timing.now
                ),

            memory:
                perf.memory
                    ? {

                        jsHeapSizeLimit:
                            perf.memory.jsHeapSizeLimit,

                        totalJSHeapSize:
                            perf.memory.totalJSHeapSize,

                        usedJSHeapSize:
                            perf.memory.usedJSHeapSize,

                        usagePercent:

                            numberUtil.round(

                                (perf.memory.usedJSHeapSize * 100) /

                                perf.memory.jsHeapSizeLimit

                            )

                    }

                    : null

        };

    }

};