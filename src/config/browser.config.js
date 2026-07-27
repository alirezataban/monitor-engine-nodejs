require("dotenv").config();

module.exports = {

    executablePath: process.env.CHROME_PATH,

    headless: process.env.HEADLESS === "true",

    launchOptions: {

        slowMo: 0,

        timeout: 60000

    },

    contextOptions: {

        ignoreHTTPSErrors: true,

        acceptDownloads: true,

        bypassCSP: false,

        javaScriptEnabled: true,

        viewport: {
            width: 1920,
            height: 1080
        }

    }

};