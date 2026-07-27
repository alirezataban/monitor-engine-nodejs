module.exports = {

    name: "errors",

    async collect(ctx) {

        const pageErrors =
            ctx.pageErrors || [];

        const failedRequests =
            ctx.network.failed || [];

        const consoleErrors =
            (ctx.console || []).filter(
                item => item.type === "error"
            );

        return {

            summary: {

                pageErrors:
                    pageErrors.length,

                consoleErrors:
                    consoleErrors.length,

                failedRequests:
                    failedRequests.length

            },

            pageErrors,

            consoleErrors,

            failedRequests

        };

    }

};