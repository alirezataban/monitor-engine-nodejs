module.exports = {

    name: "console",

    async collect(ctx) {

        const summary = {

            total: ctx.console.length,

            log: 0,

            info: 0,

            warning: 0,

            error: 0,

            debug: 0

        };

        for (const message of ctx.console) {

            switch (message.type) {

                case "log":
                    summary.log++;
                    break;

                case "info":
                    summary.info++;
                    break;

                case "warning":
                    summary.warning++;
                    break;

                case "error":
                    summary.error++;
                    break;

                case "debug":
                    summary.debug++;
                    break;

            }

        }

        return {

            summary,

            messages: ctx.console

        };

    }

};