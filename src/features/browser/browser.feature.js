const contextManager = require("../../core/context.manager");
const collectorRunner = require("../../core/collector.runner");
const resourceProvider = require("../../providers/browser/resource.provider");
const navigationTimingProvider = require("../../providers/browser/navigationTiming.provider");
const paintProvider = require("../../providers/browser/paint.provider");
const performanceProvider = require("../../providers/browser/performance.provider");
const cookiesProvider = require("../../providers/browser/cookies.provider");
const storageProvider = require("../../providers/browser/storage.provider");
const metaProvider = require("../../providers/browser/meta.provider");
const linksProvider = require("../../providers/browser/links.provider");
const domProvider = require("../../providers/browser/dom.provider");
const framesProvider = require("../../providers/browser/frames.provider");
const manifestProvider = require("../../providers/browser/manifest.provider");
const serviceWorkerProvider = require("../../providers/browser/serviceWorker.provider");
const indexedDBProvider = require("../../providers/browser/indexedDB.provider");
const cacheStorageProvider = require("../../providers/browser/cacheStorage.provider");
const networkInformationProvider = require("../../providers/browser/networkInformation.provider");
const deviceMemoryProvider = require("../../providers/browser/deviceMemory.provider");
const hardwareConcurrencyProvider = require("../../providers/browser/hardwareConcurrency.provider");
const permissionsProvider = require("../../providers/browser/permissions.provider");
const navigatorProvider = require("../../providers/browser/navigator.provider");

module.exports = {

    name: "browser",

    async execute(ctx, config) {

        // ساخت Browser + Context + Page
        await contextManager.create(ctx);

        try {
            // ثبت Event Listenerهای شبکه قبل از Navigation
            ctx.network = {
                requests: [],
                responses: [],
                failed: [],
            };
            ctx.console = [];

            ctx.pageErrors = [];

            ctx.dialogs = [];

            ctx.workers = [];

            ctx.webSockets = [];

            ctx.downloads = [];

            ctx.fileChoosers = [];

            ctx.frameEvents = {
                attached: [],
                detached: [],
                navigated: []
            };

            ctx.network.finished = [];

            ctx.pageErrors = [];

            ctx.redirectChain = [];


            ctx.page.on("request", request => {

                ctx.network.requests.push({
                    url: request.url(),
                    method: request.method(),
                    resourceType: request.resourceType(),
                    headers: request.headers(),
                    isNavigationRequest: request.isNavigationRequest(),
                    frameUrl: request.frame()?.url() || null
                });

            });

            ctx.page.on("response", response => {

                const request = response.request();

                if (request.isNavigationRequest()) {

                    ctx.redirectChain.push({

                        url: response.url(),

                        status: response.status()

                    });

                }

                ctx.network.responses.push({
                    url: response.url(),
                    status: response.status(),
                    statusText: response.statusText(),
                    headers: response.headers(),
                    resourceType: request.resourceType(),
                    fromServiceWorker: response.fromServiceWorker()
                });

            });

            ctx.page.on("requestfailed", request => {

                ctx.network.failed.push({
                    url: request.url(),
                    method: request.method(),
                    resourceType: request.resourceType(),
                    error: request.failure()?.errorText
                });

            });

            ctx.page.on("console", message => {

                ctx.console.push({

                    type: message.type(),

                    text: message.text(),

                    location: message.location()

                });

            });


            ctx.page.on("dialog", async dialog => {

                ctx.dialogs.push({

                    type: dialog.type(),

                    message: dialog.message(),

                    defaultValue: dialog.defaultValue()

                });

                await dialog.dismiss();

            });

            ctx.page.on("worker", worker => {

                ctx.workers.push({

                    url: worker.url()

                });

            });

            ctx.page.on("websocket", socket => {

                const ws = {

                    url: socket.url(),

                    framesSent: 0,

                    framesReceived: 0,

                    closed: false

                };

                socket.on("framesent", () => {

                    ws.framesSent++;

                });

                socket.on("framereceived", () => {

                    ws.framesReceived++;

                });

                socket.on("close", () => {

                    ws.closed = true;

                });

                ctx.webSockets.push(ws);

            });

            ctx.page.on("download", download => {

                ctx.downloads.push({

                    suggestedFilename:
                        download.suggestedFilename(),

                    url: download.url()

                });

            });

            ctx.page.on("filechooser", chooser => {

                ctx.fileChoosers.push({

                    multiple:
                        chooser.isMultiple()

                });

            });

            ctx.page.on("frameattached", frame => {

                ctx.frameEvents.attached.push({

                    url: frame.url()

                });

            });

            ctx.page.on("framedetached", frame => {

                ctx.frameEvents.detached.push({

                    url: frame.url()

                });

            });

            ctx.page.on("framenavigated", frame => {

                ctx.frameEvents.navigated.push({

                    url: frame.url()

                });

            });

            ctx.page.on("requestfinished", request => {

                ctx.network.finished.push({

                    url: request.url(),

                    method: request.method(),

                    resourceType: request.resourceType()

                });

            });

            ctx.page.on("pageerror", error => {

                ctx.pageErrors.push({

                    name: error.name,

                    message: error.message,

                    stack: error.stack

                });

            });
            // رفتن به سایت
            const response = await ctx.page.goto(ctx.site.url, {
                waitUntil: "load",
                timeout: 50000
            });

            ctx.navigation = {
                response: response,
                url: ctx.page.url()
            };

            ctx.resourceTiming = await resourceProvider.collect(ctx);
            ctx.navigationTiming = await navigationTimingProvider.collect(ctx);
            ctx.paint = await paintProvider.collect(ctx);
            ctx.performance = await performanceProvider.collect(ctx);
            ctx.cookies = await cookiesProvider.collect(ctx);
            ctx.storage = await storageProvider.collect(ctx);
            ctx.meta = await metaProvider.collect(ctx);
            ctx.links = await linksProvider.collect(ctx);
            ctx.dom = await domProvider.collect(ctx);
            ctx.frames = await framesProvider.collect(ctx);
            ctx.manifest = await manifestProvider.collect(ctx);
            ctx.serviceWorker = await serviceWorkerProvider.collect(ctx);
            ctx.indexedDB = await indexedDBProvider.collect(ctx);
            ctx.cacheStorage = await cacheStorageProvider.collect(ctx);
            ctx.networkInformation = await networkInformationProvider.collect(ctx);
            ctx.deviceMemory = await deviceMemoryProvider.collect(ctx);
            ctx.hardwareConcurrency = await hardwareConcurrencyProvider.collect(ctx);
            ctx.permissions = await permissionsProvider.collect(ctx);
            ctx.navigator = await navigatorProvider.collect(ctx);
            // اجرای Collectorها
            await collectorRunner.run(
                ctx,
                config.collectors || []
            );

        } finally {

            // همیشه Browser بسته شود
            await contextManager.destroy(ctx);

        }

    }

};