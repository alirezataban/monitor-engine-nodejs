module.exports = {

    name: "dom",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            const allElements =
                document.querySelectorAll("*");

            return {

                totalElements:
                    allElements.length,

                headElements:
                    document.head.children.length,

                bodyElements:
                    document.body
                        ? document.body.querySelectorAll("*").length
                        : 0,

                forms:
                    document.forms.length,

                images:
                    document.images.length,

                links:
                    document.links.length,

                scripts:
                    document.scripts.length,

                stylesheets:
                    document.styleSheets.length,

                iframes:
                    document.querySelectorAll("iframe").length

            };

        });

    }

};