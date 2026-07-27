const engine = require("./src/core/engine");

(async () => {

    const result = await engine.run({

        site: {

            id: 1,

            domain: "pars.host",

            url: "https://pars.host"

        },

        features: {

            browser: {

                collectors: [

                    "basic",
                    "navigation",
                    "navigationTiming",
                    "performance",
                    "network",
                    "console",
                    "resource",
                    "paint",
                    "cookies",
                    "storage",
                    "meta",
                    "links",
                    "dom",
                    "errors",
                    "frames",
                    "redirect",
                    "manifest",
                    "serviceWorker",
                    "indexedDB",
                    "cacheStorage",
                    "networkInformation",
                    "deviceMemory",
                    "hardwareConcurrency",
                    "permissions",
                    "navigator"
                    

                ]

            }

        }

    });

    console.log(JSON.stringify(result.report, null, 2));

})();