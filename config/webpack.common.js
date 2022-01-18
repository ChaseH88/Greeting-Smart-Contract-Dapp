const { resolve } = require('path');

module.exports = {
  entry: "../src",
  context: resolve(__dirname),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css", ".css", ".ts", ".tsx"],
    alias: {
      'state': resolve(__dirname, '../src/state'),
      'types': resolve(__dirname, '../src/types')
    }
  },
  output: {
    path: `${resolve(__dirname)}/bundle`,
    publicPath: "/",
    filename: "build.js"
  }
}