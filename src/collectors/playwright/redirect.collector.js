module.exports = {

    name: "redirect",

    async collect(ctx) {

        const chain = ctx.redirectChain || [];

        return {

            summary: {

                redirects:
                    Math.max(chain.length - 1, 0),

                finalUrl:
                    chain.length
                        ? chain[chain.length - 1].url
                        : null

            },

            chain

        };

    }

};