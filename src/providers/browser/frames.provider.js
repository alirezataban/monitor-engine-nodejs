module.exports = {

    name: "frames",

    async collect(ctx) {

        return ctx.page.frames().map(frame => ({

            url: frame.url(),

            name: frame.name() || null,

            isMainFrame: frame === ctx.page.mainFrame(),

            parentFrame: frame.parentFrame()
                ? frame.parentFrame().url()
                : null

        }));

    }

};