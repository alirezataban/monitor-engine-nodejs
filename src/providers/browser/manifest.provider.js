module.exports = {

    name: "manifest",

    async collect(ctx) {

        return await ctx.page.evaluate(async () => {

            const manifestLink = document.querySelector(
                'link[rel="manifest"]'
            );

            if (!manifestLink) {

                return null;

            }

            try {

                const response = await fetch(manifestLink.href);

                const manifest = await response.json();

                return {

                    href: manifestLink.href,

                    manifest

                };

            } catch {

                return {

                    href: manifestLink.href,

                    error: "Failed to fetch manifest"

                };

            }

        });

    }

};