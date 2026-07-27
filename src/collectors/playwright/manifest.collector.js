module.exports = {

    name: "manifest",

    async collect(ctx) {

        const manifest = ctx.manifest;

        if (!manifest) {

            return {

                exists: false

            };

        }

        return {

            exists: true,

            href: manifest.href,

            manifest: manifest.manifest || null,

            error: manifest.error || null

        };

    }

};