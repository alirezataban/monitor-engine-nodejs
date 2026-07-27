module.exports = {

    name: "frames",

    async collect(ctx) {

        const frames =
            ctx.frames || [];

        return {

            summary: {

                total: frames.length,

                mainFrames:
                    frames.filter(f => f.isMainFrame).length,

                childFrames:
                    frames.filter(f => !f.isMainFrame).length

            },

            frames

        };

    }

};