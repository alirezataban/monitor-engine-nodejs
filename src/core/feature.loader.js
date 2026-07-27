const features = {

    http: require("../features/http/http.feature"),

    ssl: require("../features/ssl/ssl.feature"),

    dns: require("../features/dns/dns.feature"),

    browser: require("../features/browser/browser.feature")

};

class FeatureLoader {

    load(name) {

        return features[name];

    }

}

module.exports = new FeatureLoader();