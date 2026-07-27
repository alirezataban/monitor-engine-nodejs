module.exports = {

    name: "storage",

    async collect(ctx) {

        return await ctx.page.evaluate(() => {

            const localStorageData = {};
            const sessionStorageData = {};

            for (let i = 0; i < localStorage.length; i++) {

                const key = localStorage.key(i);

                localStorageData[key] =
                    localStorage.getItem(key);

            }

            for (let i = 0; i < sessionStorage.length; i++) {

                const key = sessionStorage.key(i);

                sessionStorageData[key] =
                    sessionStorage.getItem(key);

            }

            return {

                localStorage: localStorageData,

                sessionStorage: sessionStorageData

            };

        });

    }

};