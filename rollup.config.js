import pkg from "./package.json";
import { uglify } from "rollup-plugin-uglify";

export default [
  // Browser-friendly UMD build.
  {
    input: "src/main.js",
    output: {
      name: "launchpad_midi_converter",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [uglify()]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: "src/main.js",
    external: [],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ],
    plugins: [uglify()]
  }
];
