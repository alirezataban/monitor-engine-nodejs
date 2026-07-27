module.exports = {

    name: "paint",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            const entries =
                performance.getEntriesByType("paint");

            const result = {};

            for (const entry of entries) {

                result[entry.name] = {

                    startTime: entry.startTime,

                    duration: entry.duration

                };

            }

            return result;

        });

    }

};