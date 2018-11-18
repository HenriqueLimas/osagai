import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default [
  {
    input: "./lib/index.js",
    output: [
      {
        name: "osagai",
        file: "./dist/osagai.js",
        format: "cjs"
      },
      {
        name: "osagai",
        file: "./dist/osagai.mjs",
        format: "esm"
      },
      {
        name: "osagai",
        file: "./dist/osagai.umd.js",
        format: "umd"
      }
    ],
    plugins: [resolve({ browser: true }), commonjs()]
  },
  {
    input: "./lib/events/index.js",
    output: [
      {
        name: "osagai/events",
        file: "./dist/events.js",
        format: "cjs"
      },
      {
        name: "osagai/events",
        file: "./dist/events.mjs",
        format: "esm"
      },
      {
        name: "osagai/events",
        file: "./dist/events.umd.js",
        format: "umd"
      }
    ],
    plugins: [resolve({ browser: true }), commonjs()]
  }
];
