module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["test/*.js"],
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
      }
    }
  });
};
