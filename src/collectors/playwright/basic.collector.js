module.exports = {

    name: "basic",

    async collect(ctx) {

        return {

            title: await ctx.page.title(),

            url: ctx.page.url(),

            finalUrl: ctx.page.url()

        };

    }

};