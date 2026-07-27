module.exports = {

    name: "networkInformation",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            const connection =
                navigator.connection ||
                navigator.mozConnection ||
                navigator.webkitConnection;

            if (!connection) {

                return {

                    supported: false

                };

            }

            return {

                supported: true,

                effectiveType: connection.effectiveType ?? null,

                downlink: connection.downlink ?? null,

                downlinkMax: connection.downlinkMax ?? null,

                rtt: connection.rtt ?? null,

                saveData: connection.saveData ?? false,

                type: connection.type ?? null

            };

        });

    }

};