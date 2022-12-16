const path = require("path");

module.exports = (env) => ({
  mode: env.production ? "production" : "development",
  devtool: env.production ? "inline-source-map" : "eval",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  optimization: {
    usedExports: true,
  },
  target: "node",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    library: "rehype-lodash-template",
    umdNamedDefine: true,
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
});
