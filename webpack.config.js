const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");

const loadModeConfig = (env) => {
  require(`./built-utils/${env.mode}.config`)(env);
};

module.exports = (env) =>
  merge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, "src"),

      entry: "./index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filenamr: "[name].bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.js$/, // регулярное выражение
            exclude: /node_modules/, // через указ папку свойства не прогонять
            use: ["babel-loader"],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[path]/[name].[ext]",
                  limit: 5000,
                },
              },
            ],
          },
          {
            test: /\.html$/,
            use: ["html-loader"],
          },
          {
            test: /\.hbs$/,
            use: ["handlebars-loader"],
          },
        ],
        // плагины применяются к результирующему бандлу
      },
      plugins: [new CleanWebpackPlugin(), new FriendlyErrorsWebpackPlugin(), new WebpackBar()],
    },
    loadModeConfig(env)
  );
