module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            {pattern: "src/**/*.ts"}
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },
        reporters: ["mocha", "karma-typescript"],
        browsers: ["Chrome"],
        phantomJsLauncher: {
            exitOnResourceError: true
        },
        port: 9876,
        autoWatch: false,
        singleRun: true
    });
};