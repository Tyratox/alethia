const path = require("path");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

require("dotenv").config(); //include env file in here as well

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

const context = __dirname;

const PUBLIC_PATH = process.env.PUBLIC_PATH;
const VERSION = require("child_process")
  .execSync("git rev-parse HEAD")
  .toString()
  .trim();

module.exports = {
  mode: "production",

  context,

  entry: [path.join(context, "src/index.jsx")],

  devtool: "source-map",

  output: {
    path: path.join(context, "build/"),
    filename: "[name].[chunkhash].js",
    publicPath: PUBLIC_PATH
  },
  optimization: {
    splitChunks: { chunks: "all" },
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        sourceMap: true,
        uglifyOptions: {
          ecma: 5,
          warnings: true,
          parallel: true,
          exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }
      })
    ]
  },

  plugins: [
    new CleanWebpackPlugin(["build/*.*"]),
    new HtmlWebpackPlugin({
      title: "Alethia",
      template: "index.prod.ejs",
      version: VERSION
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe),
      systemvars: false
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],

  resolve: {
    modules: [path.resolve(context, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    targets: {
                      browsers: ["> 1%", "last 2 major versions", "IE 10"]
                    },
                    // for uglifyjs...
                    forceAllTransforms: true
                  }
                ],
                "@babel/preset-react",
                "@babel/preset-typescript"
              ],
              plugins: [
                "babel-plugin-styled-components",

                ["@babel/plugin-proposal-class-properties", { loose: false }],
                "@babel/plugin-proposal-object-rest-spread"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true, minimize: true }
          },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(context, "src"),
          path.resolve(context, "node_modules")
        ],

        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true, minimize: true }
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          "resolve-url-loader",
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.woff2?$/,
        loader: "file-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  }
};
