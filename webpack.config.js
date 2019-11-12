const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + "/src/client/index.tsx",
  mode: "development",
  devtool: "cheap-eval-source-map",
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.bundle.js',
    publicPath: '',
    chunkFilename: '[id].js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html' //relative to root of the application
		})
	],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "awesome-typescript-loader"
        }
			},
			{ test: /\.s?css$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
			{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  },
};

