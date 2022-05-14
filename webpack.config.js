const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  target: "electron-main",
  entry: {
    main: path.join(__dirname, "main_src/ts/main.ts"),
  },
  output: {
    path: path.join(__dirname, "main_src/js"),
    filename: "[name].js",
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
