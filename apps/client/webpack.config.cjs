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
    pathinfo: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
            transpileOnly: false,
            compilerOptions: {
                noEmit: false,
                //noEmitOnError: false,
            },
        }
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".mts", ".json", ".mjs", ".js"], //, ".fonts", ".json", ".mjs", ".js", ".less", ".jpg", ".eot", ".woff"],
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
