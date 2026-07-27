module.exports = {

    name: "indexedDB",

    async collect(ctx) {

        return await ctx.page.evaluate(async () => {

            if (!window.indexedDB) {

                return {

                    supported: false

                };

            }

            if (!indexedDB.databases) {

                return {

                    supported: true,

                    available: false

                };

            }

            try {

                const databases =
                    await indexedDB.databases();

                return {

                    supported: true,

                    available: true,

                    count: databases.length,

                    databases

                };

            } catch {

                return {

                    supported: true,

                    available: false

                };

            }

        });

    }

};