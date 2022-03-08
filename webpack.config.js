const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode: mode,
  target: target,
  // entry: ["babel-polyfill", "./src/index.js"],
  entry: {
    index: "./src/index.js",
    database: "./src/database.js",
    home: "./src/js/home.js",
    api: "./src/js/api.js",
    login: "./src/js/login.js",
    profile: "./src/js/profile.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    // assetModuleFilename: "images/[name][ext][query]",
    filename: "js/[name].js",
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        type: "asset/resource",
        generator: {
          outputPath: "pages/",
          filename: "[name][ext]",
        },
        use: ["extract-loader", "html-loader"],
        // this exclude is required
        exclude: path.join(path.resolve(__dirname, "src"), "index.html"),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource", //or asset
        generator: {
          outputPath: "images/",
          filename: "[name][ext]",
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/i,
        exclude: [/node_modules/, /js/],
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["index"],
    }),
  ],

  devServer: {
    static: "./dist",
    hot: true, //no refreshing after saving css
  },
};