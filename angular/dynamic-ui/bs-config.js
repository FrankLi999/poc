let indexPath = "./sample/index.html";

module.exports = {

    server: {

        baseDir: [".", "sample"],

        middleware: {
            1: require("connect-history-api-fallback")({index: indexPath})
        }
    },

    startPath: indexPath
};