module.exports = {

    name: "links",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            return Array.from(document.links).map(link => ({

                text:
                    link.textContent.trim(),

                href:
                    link.href,

                target:
                    link.target || null,

                rel:
                    link.rel || null,

                protocol:
                    link.protocol,

                hostname:
                    link.hostname,

                pathname:
                    link.pathname

            }));

        });

    }

};