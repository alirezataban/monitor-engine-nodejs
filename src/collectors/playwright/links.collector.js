module.exports = {

    name: "links",

    async collect(ctx) {

        const links = ctx.links || [];

        const pageHost =
            new URL(ctx.site.url).hostname;

        const summary = {

            total: links.length,

            internal: 0,

            external: 0,

            blank: 0,

            nofollow: 0,

            mailto: 0,

            tel: 0

        };

        for (const link of links) {

            if (link.hostname === pageHost)
                summary.internal++;
            else
                summary.external++;

            if (link.target === "_blank")
                summary.blank++;

            if (
                link.rel &&
                link.rel.includes("nofollow")
            ) {
                summary.nofollow++;
            }

            if (link.protocol === "mailto:")
                summary.mailto++;

            if (link.protocol === "tel:")
                summary.tel++;

        }

        return {

            summary,

            links

        };

    }

};