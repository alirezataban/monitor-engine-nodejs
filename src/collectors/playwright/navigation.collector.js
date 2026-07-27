module.exports = {

    name: "navigation",

    async collect(ctx) {

        const response = ctx.navigation.response;

        return {

            status: response ? response.status() : null,

            url: ctx.navigation.url,

            redirected: response
            ? response.request().redirectedFrom() !== null
            : false

        };

    }

};