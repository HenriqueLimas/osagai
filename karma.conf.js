const resolveRollupPlugin = require("rollup-plugin-node-resolve");
const commonjsRollupPlugin = require("rollup-plugin-commonjs");

module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["test/**/*.js"],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadless"],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    preprocessors: {
      "lib/**/*.js": ["rollup"],
      "test/**/*.js": ["rollup"]
    },
    rollupPreprocessor: {
      output: {
        format: "iife",
        name: "osagai",
        sourcemap: "inline"
      },
      plugins: [resolveRollupPlugin({ browser: true }), commonjsRollupPlugin()]
    }
  });
};
