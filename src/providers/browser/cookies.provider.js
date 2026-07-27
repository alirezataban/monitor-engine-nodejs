module.exports = {

    name: "cookies",

    async collect(ctx) {

        return await ctx.context.cookies();

    }

};