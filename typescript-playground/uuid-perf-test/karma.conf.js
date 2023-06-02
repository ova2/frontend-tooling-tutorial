process.env.CHROME_BIN = require('puppeteer').executablePath();

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
        browsers: ["ChromeHeadless"],
        browserNoActivityTimeout: 100000,
        phantomJsLauncher: {
            exitOnResourceError: true
        },
        port: 9876,
        autoWatch: false,
        singleRun: true,
        karmaTypescriptConfig: {
            compilerOptions: {
                target: "ES2022",
                lib: ["es2020", "dom"]
            }
        }
    });
};