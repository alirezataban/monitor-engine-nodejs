module.exports = {

    name: "serviceWorker",

    async collect(ctx) {

        return await ctx.page.evaluate(async () => {

            if (!("serviceWorker" in navigator)) {

                return {
                    supported: false
                };

            }

            const registrations =
                await navigator.serviceWorker.getRegistrations();

            return {

                supported: true,

                count: registrations.length,

                registrations: registrations.map(reg => ({

                    scope: reg.scope,

                    active: !!reg.active,

                    installing: !!reg.installing,

                    waiting: !!reg.waiting

                }))

            };

        });

    }

};