const path = require("path");

const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

const context = __dirname;

module.exports = {
  mode: "development",

  context,

  entry: [
    "react-hot-loader/patch",
    /*"webpack-hot-middleware/client",*/
    path.join(context, "src/index.jsx")
  ],

  output: {
    path: path.join(context, "build/"),
    filename: "bundle.js",
    publicPath: "/build"
  },

  devtool: "cheap-source-map",
  devServer: {
    contentBase: ".",
    hot: true,
    historyApiFallback: true
  },

  optimization: {
    minimize: false
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: "./.env", // Path to .env file (this is the default)
      safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
      systemvars: true
    }),
    new BundleAnalyzerPlugin()
  ],

  resolve: {
    modules: [path.resolve(context, "src"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [path.resolve(context, "src")],

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
                    }
                  }
                ],
                "@babel/preset-react"
              ],
              plugins: [
                "babel-plugin-styled-components",
                "react-hot-loader/babel",

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
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true, minimize: false }
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
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: { import: false, sourceMap: true, minimize: false }
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
