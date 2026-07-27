const collectors = {

    basic: require("../collectors/playwright/basic.collector"),

    network: require("../collectors/playwright/network.collector"),

    cookies: require("../collectors/playwright/cookies.collector"),

    navigation: require("../collectors/playwright/navigation.collector"),

    navigationTiming: require("../collectors/playwright/navigationTiming.collector"),

    performance: require("../collectors/playwright/performance.collector"),

    console: require("../collectors/playwright/console.collector"),

    errors: require("../collectors/playwright/errors.collector"),

    resource: require("../collectors/playwright/resource.collector"),

    storage: require("../collectors/playwright/storage.collector"),

    dom: require("../collectors/playwright/dom.collector"),

    frames: require("../collectors/playwright/frames.collector"),

    redirect: require("../collectors/playwright/redirect.collector"),

    manifest: require("../collectors/playwright/manifest.collector"),

    serviceWorker: require("../collectors/playwright/serviceWorker.collector"),

    indexedDB: require("../collectors/playwright/indexedDB.collector"),

    cacheStorage: require("../collectors/playwright/cacheStorage.collector"),

    networkInformation: require("../collectors/playwright/networkInformation.collector"),

    deviceMemory: require("../collectors/playwright/deviceMemory.collector"),

    hardwareConcurrency: require("../collectors/playwright/hardwareConcurrency.collector"),

    permissions: require("../collectors/playwright/permissions.collector"),

    navigator: require("../collectors/playwright/navigator.collector"),

    seo: require("../collectors/playwright/seo.collector"),

    security: require("../collectors/playwright/security.collector"),

    screenshot: require("../collectors/playwright/screenshot.collector"),

    har: require("../collectors/playwright/har.collector"),

    trace: require("../collectors/playwright/trace.collector"),

    pdf: require("../collectors/playwright/pdf.collector"),

    paint: require("../collectors/playwright/paint.collector"),

    meta: require("../collectors/playwright/meta.collector"),

    links: require("../collectors/playwright/links.collector"),

};

class CollectorLoader {

    load(name) {

        return collectors[name];

    }

}

module.exports = new CollectorLoader();