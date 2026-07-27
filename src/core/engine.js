const MonitorContext = require("./monitor.context");
const featureLoader = require("./feature.loader");

class Engine {

    async run(job) {

        const ctx = new MonitorContext(job);

        ctx.startedAt = Date.now();

        for (const featureName of Object.keys(ctx.features)) {

            const featureConfig = ctx.features[featureName];

            const feature = featureLoader.load(featureName);

            if (!feature) {

                ctx.report.features[featureName] = {

                    success: false,

                    error: "Feature not found"

                };

                continue;

            }

            const started = Date.now();

            try {

                const featureConfig = ctx.features[featureName];

                await feature.execute(ctx, featureConfig);

                ctx.report.features[featureName] = {

                    success: true,

                    duration: Date.now() - started

                };

            }

            catch (error) {

                ctx.report.features[featureName] = {

                    success: false,

                    duration: Date.now() - started,

                    error: error.message

                };

            }

        }

        ctx.finishedAt = Date.now();

        ctx.report.summary = {

            success: true,

            startedAt: ctx.startedAt,

            finishedAt: ctx.finishedAt,

            duration: ctx.finishedAt - ctx.startedAt

        };

        return ctx;

    }

}

module.exports = new Engine();