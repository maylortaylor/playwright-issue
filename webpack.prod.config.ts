// * The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumBuildCesium = 'node_modules/cesium/Build/Cesium';
const cesiumWorkers = '../Build/Cesium/Workers';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageVersion = require('./package.json').version;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ENV = require('dotenv').config({ path: './.env' });

import { BuildPaths } from './src/types/config';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { EnvironmentPlugin } from 'webpack';
import HtmlTagsPlugin from 'html-webpack-tags-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';

// * https://www.npmjs.com/package/babel-loader
// * JavaScript: Use Babel to transpile JavaScript files
const babelLoader = {
	test: /\.(js|jsx|ts|tsx)$/i,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader',
		options: {
			sourceType: 'unambiguous',
			plugins: ['transform-remove-console'],
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							browsers: ['> .5% or last 3 versions, not IE <= 11'],
						},
						loose: false,
						modules: false,
					},
				],
				['@babel/preset-react', { runtime: 'automatic' }],
				'@babel/preset-typescript',
			],
		},
	},
};

// * Styles: Inject CSS into the head with source maps
const cssLoader = {
	test: /\.(sass|scss|css)$/,
	use: [
		MiniCssExtractPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				importLoaders: 2,
				sourceMap: false,
				modules: false,
			},
		},
		'postcss-loader',
		'sass-loader',
	],
};

// * Images: Copy image files to build folder
const imageLoader = {
	test: /\.(ico|png|jpg|jpeg|gif|svg)$/i,
	type: 'asset/resource',
	generator: {
		filename: './images/[name][ext][query]',
		// filename: './images/[name]-[hash][ext][query]',
	},
};

// * exports a data URI of the asset. Previously achievable by using url-loader
const inlineLoader = {
	test: /\.(xml|json)$/i,
	type: 'asset/inline',
};

// * Woff | TTF | EOT | OTF files: emits a separate file and exports the URL. Previously achievable by using file-loader
const fontLoader = {
	test: /\.(woff|woff2|otf|eot|ttf|svg)$/i,
	type: 'asset/resource',
	generator: {
		filename: './fonts/[name][ext]',
		// filename: './fonts/[name]-[hash][ext]',
	},
};

// * https://www.npmjs.com/package/ts-loader
const typeScriptLoader = {
	test: /\.tsx?$/i,
	use: {
		loader: 'ts-loader',
		options: {
			onlyCompileBundledFiles: true,
			transpileOnly: true,
		},
	},
	exclude: /node_modules/,
};

const stripCesiumPragmas = {
	test: /\.js$/,
	enforce: 'pre',
	include: path.resolve(__dirname, cesiumSource),
	use: [
		{
			loader: 'strip-pragma-loader',
			options: {
				pragmas: {
					debug: false,
				},
			},
		},
	],
};

const paths: BuildPaths = {
	build: path.resolve(__dirname, 'dist/amver-ui/'),
	cesiumAssets: path.resolve(__dirname, cesiumSource, 'Assets'),
	cesiumBuildSource: path.resolve(__dirname, cesiumBuildCesium),
	cesiumThirdParty: path.join(cesiumSource, 'ThirdParty'),
	cesiumWidgets: path.join(cesiumSource, 'Widgets'),
	cesiumWorkers: path.join(cesiumSource, cesiumWorkers),
	css: path.resolve(__dirname, 'dist/amver-ui/css/'),
	fonts: path.resolve(__dirname, 'dist/amver-ui/fonts/'),
	images: path.resolve(__dirname, 'dist/amver-ui/images/'),
	entry: path.resolve(__dirname, 'src', 'main.tsx'),
	favicon: path.resolve(__dirname, 'src', 'assets/images/favicon.png'),
	html: path.join(path.resolve(__dirname, ''), 'index.html'),
	src: path.resolve(__dirname, 'src'),
	tsconfig: path.join(__dirname, 'tsconfig.json'),
	testResults: path.resolve(__dirname, 'dist/amver-ui/test-results')
};

export default () => {
	return {
		amd: {
			// * Enable webpack-friendly use of require in Cesium
			toUrlUndefined: true,
		},
		// * The base directory (absolute path!) for resolving the entry option.
		context: __dirname,
		// * Where webpack looks to start building the bundle and include polyfill
		entry: {
			// * [name] === main
			main: paths.entry,
		},
		externals: {
			cesium: 'Cesium',
		},
		// * Control how source maps are generated
		// devtool: 'source-map',
		// * Spin up a server for quick development
		devServer: undefined,
		// * Set the mode to development or production
		mode: 'production',
		// * Determine how modules within the project are treated
		module: {
			rules: [
				babelLoader,
				cssLoader,
				imageLoader,
				inlineLoader,
				fontLoader,
				typeScriptLoader,
				stripCesiumPragmas,
			],
		},
		node: {
			global: false,
			__filename: false,
			__dirname: false,
		},
		// * Where webpack outputs the assets and bundles
		output: {
			// filename: '[name].[contenthash].js',
			filename: '[name].js',
			// chunkFilename: '[name].chunk.js',
			path: paths.build,
			// * tells webpack which URL to use in order to load all the generated files in the browser
			publicPath: '/amver-ui/',
			clean: false,
			// * Needed to compile multiline strings in Cesium
			sourcePrefix: '',
		},
		optimization: {
			minimize: true,
			minimizer: [new CssMinimizerPlugin(), '...'],
			runtimeChunk: {
				name: 'runtime',
			},
			// splitChunks: {
			// 	chunks: 'all'
			// }
		},
		performance: {
			maxEntrypointSize: 512000,
			maxAssetSize: 512000,
			hints: false,
		},
		// * Customize the webpack build process
		plugins: [
			// * Removes/cleans build folders and unused assets when rebuilding
			new CleanWebpackPlugin({
				// * Automatically remove all unused webpack assets on rebuild
				cleanStaleWebpackAssets: true,
				// * Do not allow removal of current webpack assets
				protectWebpackAssets: true,
			}),
			// * Copies files from target to destination folder
			new CopyWebpackPlugin({
				patterns: [
					{
						from: paths.cesiumBuildSource,
						to: 'cesium',
					},
					{
						from: paths.cesiumAssets!,
						to: 'cesium/Assets',
					},
					{
						from: paths.cesiumThirdParty!,
						to: 'cesium/ThirdParty',
					},
					{
						from: paths.cesiumWidgets!,
						to: 'cesium/Widgets',
					},
					{
						from: paths.cesiumWorkers!,
						to: 'cesium/Workers',
					},
					{
						from: paths.css,
						to: 'amver-ui/css',
						noErrorOnMissing: true,
					},
					{
						from: paths.fonts,
						to: 'amver-ui/fonts',
						noErrorOnMissing: true,
					},
					{
						from: paths.images,
						to: 'amver-ui/images',
						noErrorOnMissing: true,
					},
				],
			}),
			new EnvironmentPlugin({
				'REACT_APP_VERSION': JSON.stringify(packageVersion),
				'EXPERIMENTAL': JSON.stringify(ENV.EXPERIMENTAL),
				'PORT': JSON.stringify(ENV.API_VERSION),
				'API_VERSION': JSON.stringify(ENV.PORT),
				'REACT_APP_AWS_DEV_URL': JSON.stringify(ENV.REACT_APP_AWS_DEV_URL),
				'REACT_APP_WS_DEV_URL': JSON.stringify(ENV.REACT_APP_WS_DEV_URL),
				'REACT_APP_MAPBOX_ACCESS_TOKEN': JSON.stringify(ENV.REACT_APP_MAPBOX_ACCESS_TOKEN),
				'REACT_APP_AWS_DEV_URL_MESSAGES_API': JSON.stringify(ENV.REACT_APP_AWS_DEV_URL_MESSAGES_API),
				// * Define relative base path in cesium for loading assets
				'CESIUM_BASE_URL': JSON.stringify('/amver-ui/cesium'),
			}),
			// * Generates an HTML file from a template
			new HtmlWebpackPlugin({
				template: paths.html,
				favicon: paths.favicon,
				inject: 'body',
			}),
			// * Add cesium css and js to index.html on webpack build
			new HtmlTagsPlugin({
				append: false,
				tags: ['cesium/Widgets/widgets.css', 'cesium/Cesium.js'],
			}),
			new MiniCssExtractPlugin({
				// filename: 'css/[name].[contenthash].css',
				filename: 'css/[name].css',
				chunkFilename: 'css/[name].css',
			}),
			// * Progress provides a way to customize how progress is reported during a compilation
			// new ProgressPlugin(),
			// * Terser minify/minimize your JavaScrip
			new TerserPlugin(),
		],
		resolve: {
			alias: {
				// * CesiumJS module name
				// * "node_modules/cesium/Source"
				cesium: path.resolve(__dirname, cesiumSource),
				// '@/*': options.paths.src,
			},
			// * Attempt to resolve these extensions in order
			extensions: ['.tsx', '.ts', '.jsx', '.js'],
			// * Redirect module requests when normal resolving fails.
			fallback: {
				https: false,
				zlib: false,
				http: false,
				url: false,
			},
			// * When importing from an npm package, e.g. import * as D3 from 'd3', this option will determine which fields in its package.json are checked
			mainFields: ['module', 'main'],
			// * The filename to be used while resolving directories
			mainFiles: ['index', 'Cesium'],
			// * Tell webpack what directories should be searched when resolving modules
			// modules: [__dirname, 'node_modules'],
			// * Prefer absolute paths to resolve.roots when resolving
			// preferAbsolute: true,
			// * Whether to resolve symlinks to their symlinked location
			// symlinks: true
			plugins: [
				new TsconfigPathsPlugin({
					configFile: paths.tsconfig,
				}),
			],
		},
		// * ENABLE "target: 'web'"  for use Hot Reload / HMR in Crome ( not in IE 11 )
		// * DISABLE ['web', 'es5'] for use IE 11 during testing => Hot Reload / HMR will stop working in Chrome due to a bug in Webpack 5
		// target: ['web', 'node', 'es5'],
		target: 'browserslist',
	};
};
