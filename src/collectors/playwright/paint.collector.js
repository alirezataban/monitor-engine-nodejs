const numberUtil =
require("../../utils/number.util");

module.exports = {

    name: "paint",

    async collect(ctx) {

        const paint = ctx.paint;

        if (!paint)
            return null;

        return {

            firstPaint:

                paint["first-paint"]

                    ? numberUtil.round(
                        paint["first-paint"].startTime
                    )

                    : null,

            firstContentfulPaint:

                paint["first-contentful-paint"]

                    ? numberUtil.round(
                        paint["first-contentful-paint"].startTime
                    )

                    : null

        };

    }

};