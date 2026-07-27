module.exports = {

    round(value, precision = 2) {

        return Number(
            Number(value).toFixed(precision)
        );

    }

};