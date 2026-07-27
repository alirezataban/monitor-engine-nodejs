module.exports = {

    name: "cacheStorage",

    async collect(ctx) {

        return await ctx.page.evaluate(async () => {

            if (!("caches" in window)) {

                return {

                    supported: false

                };

            }

            try {

                const keys = await caches.keys();

                const result = [];

                for (const key of keys) {

                    const cache = await caches.open(key);

                    const requests = await cache.keys();

                    result.push({

                        name: key,

                        entries: requests.length,

                        urls: requests.map(r => r.url)

                    });

                }

                return {

                    supported: true,

                    count: result.length,

                    caches: result

                };

            } catch (error) {

                return {

                    supported: true,

                    error: error.message

                };

            }

        });

    }

};