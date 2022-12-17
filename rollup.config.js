import json from "@rollup/plugin-json";

export default {
  input: "src/js/App.js",
  output: {
    file: "./js/app.js",
  },
  plugins: [json()],
};
