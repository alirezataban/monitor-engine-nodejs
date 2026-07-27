const browserManager = require("./browser.manager");
const browserConfig = require("../config/browser.config");

class ContextManager {

    async create(ctx) {

        // Launch Browser
        ctx.browser = await browserManager.launch();

        // Create Browser Context
        ctx.context = await ctx.browser.newContext(
            browserConfig.contextOptions
        );

        // Create Page
        ctx.page = await ctx.context.newPage();

        return ctx;

    }

    async destroy(ctx) {

        if (ctx.page) {
            await ctx.page.close();
        }

        if (ctx.context) {
            await ctx.context.close();
        }

        await browserManager.close(ctx.browser);

    }

}

module.exports = new ContextManager();