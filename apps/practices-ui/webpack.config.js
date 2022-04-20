const path = require("path");

const getEnv = () => process.env.NODE_ENV || "debug";
const isProd = () => getEnv() === "production";
const isLocal = () => getEnv() === "debug";

module.exports = {
  mode: isProd() ? "production" : "development",
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    filename: "[name].js",
    chunkFilename: `[name].[chunkhash].js`,
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            experimentalFileCaching: true,
            projectReferences: true,
            onlyCompileBundledFiles: true,
            transpileOnly: false,
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".json", ".mjs", ".js" ], //, ".fonts", ".json", ".mjs", ".js", ".less", ".jpg", ".eot", ".woff"],
    fallback: {
      fs: false,
    },
  },
  externals: [
    {
      jquery: "jQuery",
    },
  ],
};
