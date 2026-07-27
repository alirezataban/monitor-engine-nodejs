const contentTypeUtil = require("../../utils/content-type.util");

module.exports = {

    name: "network",

    async collect(ctx) {

        const requests = ctx.network.requests || [];
        const responses = ctx.network.responses || [];
        const failed = ctx.network.failed || [];
        const finished = ctx.network.finished || [];

        const resources = {};
        const statusCodes = {};
        const contentTypes = {};
        const methods = {};

        // Resource Types + HTTP Methods
        for (const request of requests) {

            const resourceType = request.resourceType;

            resources[resourceType] =
                (resources[resourceType] || 0) + 1;

            const method = request.method;

            methods[method] =
                (methods[method] || 0) + 1;

        }

        // Status Codes + Content Types
        for (const response of responses) {

            const status = response.status;

            statusCodes[status] =
                (statusCodes[status] || 0) + 1;

            const contentType =
                response.headers["content-type"] || "";

            const type =
                contentTypeUtil.normalize(contentType);

            contentTypes[type] =
                (contentTypes[type] || 0) + 1;

        }

        const successRate =
            requests.length > 0

                ? Number(

                    (
                        (finished.length / requests.length) * 100
                    ).toFixed(2)

                )

                : 0;

        return {

            summary: {

                requests: requests.length,

                responses: responses.length,

                finished: finished.length,

                failed: failed.length,

                successRate

            },

            methods,

            resources,

            statusCodes,

            contentTypes,

            failedRequests: failed

        };

    }

};