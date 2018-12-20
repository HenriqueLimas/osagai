import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const modules = [
  {
    name: "osagai",
    fileName: "osagai",
    input: "./lib/index.js"
  },
  {
    name: "osagai/events",
    fileName: "events",
    input: "./lib/events/index.js"
  },
  {
    name: "osagai/lifecycles",
    fileName: "lifecycles",
    input: "./lib/lifecycles/index.js"
  },
  {
    name: "osagai/dom",
    fileName: "dom",
    input: "./lib/dom/index.js"
  }
];

export default modules.map(moduleConfig => ({
  input: moduleConfig.input,
  output: [
    {
      name: moduleConfig.name,
      file: `./dist/${moduleConfig.fileName}.js`,
      format: "cjs"
    },
    {
      name: moduleConfig.name,
      file: `./dist/${moduleConfig.fileName}.mjs`,
      format: "esm"
    },
    {
      name: moduleConfig.name,
      file: `./dist/${moduleConfig.fileName}.umd.js`,
      format: "umd"
    }
  ],
  plugins: [resolve({ browser: true }), commonjs()]
}));
