const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "smm",
      filename: "remoteEntry.js",
      exposes: {
        "./SMMApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};

module.exports = merge(commonConfig, prodConfig);
