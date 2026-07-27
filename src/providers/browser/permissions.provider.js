module.exports = {

    name: "permissions",

    async collect(ctx) {

        return await ctx.page.evaluate(async () => {

            if (!navigator.permissions) {

                return {
                    supported: false
                };

            }

            const permissions = [
                "geolocation",
                "notifications",
                "camera",
                "microphone",
                "clipboard-read",
                "clipboard-write"
            ];

            const result = {};

            for (const name of permissions) {

                try {

                    const status =
                        await navigator.permissions.query({ name });

                    result[name] = status.state;

                } catch {

                    result[name] = "unsupported";

                }

            }

            return {

                supported: true,

                permissions: result

            };

        });

    }

};