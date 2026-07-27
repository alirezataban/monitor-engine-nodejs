const collectorLoader = require("./collector.loader");

class CollectorRunner {

    async run(ctx, collectors = []) {

        for (const collectorName of collectors) {

            const collector = collectorLoader.load(collectorName);

            if (!collector) {

                ctx.report.collectors[collectorName] = {

                    success: false,

                    error: "Collector not found"

                };

                continue;

            }

            const started = Date.now();

            try {

                const result = await collector.collect(ctx);

                ctx.report.collectors[collectorName] = {

                    success: true,

                    duration: Date.now() - started,

                    data: result || {}

                };

            }

            catch (error) {

                ctx.report.collectors[collectorName] = {

                    success: false,

                    duration: Date.now() - started,

                    error: error.message

                };

            }

        }

    }

}

module.exports = new CollectorRunner();