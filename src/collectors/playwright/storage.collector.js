module.exports = {

    name: "storage",

    async collect(ctx) {

        const storage = ctx.storage;

        const localKeys =
            Object.keys(storage.localStorage);

        const sessionKeys =
            Object.keys(storage.sessionStorage);

        return {

            summary: {

                localStorageItems:
                    localKeys.length,

                sessionStorageItems:
                    sessionKeys.length

            },

            localStorage: storage.localStorage,

            sessionStorage: storage.sessionStorage

        };

    }

};