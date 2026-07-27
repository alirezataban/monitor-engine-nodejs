module.exports = {

    name: "meta",

    async collect(ctx) {

        const meta = ctx.meta;

        return {

            title:
                meta.title,

            charset:
                meta.charset,

            language:
                meta.language,

            canonical:
                meta.canonical,

            favicon:
                !!meta.favicon,

            metaCount:
                Object.keys(meta.metas).length,

            metas:
                meta.metas

        };

    }

};