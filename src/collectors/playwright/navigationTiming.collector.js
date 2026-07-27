const numberUtil =
require("../../utils/number.util");

module.exports = {

    name: "navigationTiming",

    async collect(ctx) {

        const nav = ctx.navigationTiming;

        if (!nav)
            return null;

        return {

            dnsLookup:

                numberUtil.round(
                    nav.domainLookupEnd -
                    nav.domainLookupStart
                ),

            tcpConnection:

                numberUtil.round(
                    nav.connectEnd -
                    nav.connectStart
                ),

            sslHandshake:

                nav.secureConnectionStart > 0
                    ? numberUtil.round(
                        nav.connectEnd -
                        nav.secureConnectionStart
                    )
                    : 0,

            ttfb:

                numberUtil.round(
                    nav.responseStart -
                    nav.requestStart
                ),

            download:

                numberUtil.round(
                    nav.responseEnd -
                    nav.responseStart
                ),

            domInteractive:

                numberUtil.round(
                    nav.domInteractive
                ),

            domContentLoaded:

                numberUtil.round(
                    nav.domContentLoadedEventEnd
                ),

            loadComplete:

                numberUtil.round(
                    nav.loadEventEnd
                ),

            total:

                numberUtil.round(
                    nav.duration
                )

        };

    }

};