const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "production";
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
    firebase: "./src/firebase.js",
    home: "./src/js/home.js",
    api: "./src/js/api.js",
    login: "./src/js/login.js",
    profile: "./src/js/profile.js",
    oneRecipe: "./src/js/oneRecipe.js",
    recipes: "./src/js/recipes.js",
    contact: "./src/js/contact.js",
    community: "./src/js/community.js",
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
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
        test: /\.webmanifest$/i,
        // type: "asset/resource", //or asset
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /sw.js/i,
        //type: "asset/resource", //or asset
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
            // sourceMap: true,
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

  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    hot: true, //no refreshing after saving css
  },
  optimization: {
    runtimeChunk: "single",
    // chunkIds: false,
    // mergeDuplicateChunks: true,
    // minimize: true,
  },
};
