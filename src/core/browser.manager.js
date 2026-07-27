const { chromium } = require("playwright-core");
const browserConfig = require("../config/browser.config");

class BrowserManager {

    async launch() {

        const browser = await chromium.launch({

            executablePath: browserConfig.executablePath,

            headless: browserConfig.headless,

            ...browserConfig.launchOptions

        });

        return browser;

    }

    async close(browser) {

        if (!browser) {
            return;
        }

        await browser.close();

    }

}

module.exports = new BrowserManager();