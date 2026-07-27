module.exports = {

    name: "hardwareConcurrency",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            if (!("hardwareConcurrency" in navigator)) {

                return {

                    supported: false

                };

            }

            return {

                supported: true,

                logicalProcessors:
                    navigator.hardwareConcurrency

            };

        });

    }

};