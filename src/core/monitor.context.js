class MonitorContext {
    constructor(job) {

        // اطلاعات Job
        this.job = job;

        // اطلاعات سایت
        this.site = {
            id: job.site.id,
            domain: job.site.domain,
            url: job.site.url
        };

        // Feature هایی که باید اجرا شوند
        this.features = job.features || {};

        // Browser Objects
        this.browser = null;
        this.context = null;
        this.page = null;

        // خروجی Collector ها
        this.report = {
            summary: {},
            metrics: {},
            features: {},
            collectors: {},
            artifacts: {},
            exports: {}
        };

        // مسیر خروجی
        this.output = {
            root: null,
            screenshots: null,
            network: null,
            traces: null,
            pdf: null
        };

        // وضعیت اجرا
        this.startedAt = null;
        this.finishedAt = null;
    }
}

module.exports = MonitorContext;