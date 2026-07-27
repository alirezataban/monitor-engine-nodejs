module.exports = {

    normalize(contentType = "") {

        contentType = contentType.toLowerCase();

        if (contentType.includes("javascript"))
            return "javascript";

        if (contentType.includes("css"))
            return "stylesheet";

        if (contentType.startsWith("image/"))
            return "image";

        if (contentType.startsWith("font/"))
            return "font";

        if (
            contentType.includes("woff") ||
            contentType.includes("ttf") ||
            contentType.includes("otf")
        )
            return "font";

        if (contentType.includes("json"))
            return "json";

        if (contentType.includes("html"))
            return "html";

        if (contentType.includes("xml"))
            return "xml";

        if (contentType.startsWith("video/"))
            return "video";

        if (contentType.startsWith("audio/"))
            return "audio";

        if (contentType.includes("pdf"))
            return "pdf";

        return "other";

    }

};