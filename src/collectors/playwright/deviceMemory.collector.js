module.exports = {

    name: "deviceMemory",

    async collect(ctx) {

        return ctx.deviceMemory;

    }

};