module.exports = {

    name: "deviceMemory",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            if (!("deviceMemory" in navigator)) {

                return {

                    supported: false

                };

            }

            return {

                supported: true,

                memoryGB: navigator.deviceMemory

            };

        });

    }

};