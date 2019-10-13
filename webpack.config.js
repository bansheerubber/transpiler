const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
	target: "node",
	entry: "./src/main.ts",
	devtool: "inline-source-map",
	plugins: [],
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: "ts-loader",
			exclude: /node_modules/
		}]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".json"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "transpiler.min.js"
	},
    externals: {
		'fs': 'commonjs fs', 
		'perf_hooks': 'commonjs perf_hooks',
		'readline': 'commonjs readline',
		'typescript-parser': 'commonjs typescript-parser',
		'typescript': 'commonjs typescript'
    },
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warnings: false,
					mangle: false
				}
			})
		]
	}
};