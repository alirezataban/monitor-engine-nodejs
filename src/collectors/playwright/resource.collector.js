const contentTypeUtil = require("../../utils/content-type.util");
const numberUtil = require("../../utils/number.util");

module.exports = {

    name: "resource",

    async collect(ctx) {

        const resources = ctx.resourceTiming || [];

        const responses = ctx.network.responses || [];

        const responseMap = new Map();

        for (const response of responses) {

            responseMap.set(response.url, response);

        }

        const summary = {

            totalResources: resources.length,

            totalTransferSize: 0,

            totalEncodedSize: 0,

            totalDecodedSize: 0,

            slowestResource: null,

            largestResource: null

        };

        const byType = {};

        for (const resource of resources) {

            const response = responseMap.get(resource.name);
            const contentType = response?.headers?.["content-type"] || "";
            const type = contentTypeUtil.normalize(contentType);
            // جمع حجم‌ها
            summary.totalTransferSize += resource.transferSize || 0;
            summary.totalEncodedSize += resource.encodedBodySize || 0;
            summary.totalDecodedSize += resource.decodedBodySize || 0;

            // بزرگ‌ترین فایل
            if (
                !summary.largestResource ||
                resource.transferSize > summary.largestResource.transferSize
            ) {

                summary.largestResource = {

                    url: resource.name,

                    type,

                    contentType,

                    transferSize:
                        resource.transferSize,

                    status:
                        response?.status ?? null

                };

            }

            // کندترین فایل
            if (
                !summary.slowestResource ||
                resource.duration > summary.slowestResource.duration
            ) {

                summary.slowestResource = {

                    url: resource.name,

                    type,

                    contentType,

                    duration:
                        numberUtil.round(resource.duration),

                    status:
                        response?.status ?? null

                };

            }

            if (!byType[type]) {

                byType[type] = {

                    count: 0,

                    transferSize: 0,

                    encodedSize: 0,

                    decodedSize: 0,

                    totalDuration: 0,

                    averageDuration: 0

                };

            }

            byType[type].count++;

            byType[type].transferSize += resource.transferSize || 0;

            byType[type].encodedSize += resource.encodedBodySize || 0;

            byType[type].decodedSize += resource.decodedBodySize || 0;

            byType[type].totalDuration += numberUtil.round(resource.duration);

        }


        summary.totalTransferSize =
            numberUtil.round(
                summary.totalTransferSize
            );

        summary.totalEncodedSize =
            numberUtil.round(
                summary.totalEncodedSize
            );

        summary.totalDecodedSize =
            numberUtil.round(
                summary.totalDecodedSize
            );

        // محاسبه میانگین زمان هر گروه
        for (const type of Object.keys(byType)) {

            byType[type].averageDuration =
                numberUtil.round(

                    byType[type].totalDuration /
                    byType[type].count

                );

        }

        return {

            summary,

            byType

        };

    }

};