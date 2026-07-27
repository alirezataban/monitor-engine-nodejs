module.exports = {

    name: "meta",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            const metas = {};

            document
                .querySelectorAll("meta")
                .forEach(meta => {

                    const key =
                        meta.getAttribute("name") ||
                        meta.getAttribute("property") ||
                        meta.getAttribute("http-equiv");

                    if (!key)
                        return;

                    metas[key] =
                        meta.getAttribute("content");

                });

            return {

                title: document.title,

                charset:
                    document.characterSet,

                language:
                    document.documentElement.lang || null,

                canonical:
                    document
                        .querySelector("link[rel='canonical']")
                        ?.href || null,

                favicon:
                    document
                        .querySelector("link[rel*='icon']")
                        ?.href || null,

                metas

            };

        });

    }

};