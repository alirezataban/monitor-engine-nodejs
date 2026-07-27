module.exports = {

    name: "navigator",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            return {

                userAgent:
                    navigator.userAgent,

                language:
                    navigator.language,

                languages:
                    navigator.languages,

                platform:
                    navigator.platform,

                vendor:
                    navigator.vendor,

                cookieEnabled:
                    navigator.cookieEnabled,

                onLine:
                    navigator.onLine,

                doNotTrack:
                    navigator.doNotTrack,

                pdfViewerEnabled:
                    navigator.pdfViewerEnabled ?? null

            };

        });

    }

};