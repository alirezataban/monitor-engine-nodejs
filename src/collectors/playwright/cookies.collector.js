module.exports = {

    name: "cookies",

    async collect(ctx) {

        const cookies = ctx.cookies || [];

        const summary = {

            total: cookies.length,

            secure: 0,

            httpOnly: 0,

            session: 0,

            persistent: 0

        };

        const sameSite = {};

        for (const cookie of cookies) {

            if (cookie.secure)
                summary.secure++;

            if (cookie.httpOnly)
                summary.httpOnly++;

            if (cookie.expires === -1)
                summary.session++;
            else
                summary.persistent++;

            const policy =
                cookie.sameSite || "None";

            sameSite[policy] =
                (sameSite[policy] || 0) + 1;

        }

        return {

            summary,

            sameSite,

            cookies

        };

    }

};