const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: 'static/js/main.js'

    },
    module: {
        unknownContextCritical: false,
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.html$/i, loader: 'html-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
    },
    resolve: { // 注意resolve的作用
        alias: {
            '/public/picture/*': path.resolve(
                __dirname,
                '/public/picture/*'
            ),
            '/public/icons/*': path.resolve(
                __dirname,
                '/public/icons/*'
            ),
            '/public/sound/*': path.resolve(
                __dirname,
                '/public/sound/*'
            )
        },
    },
    plugins: [
        new HtmlWebpackPlugin({//创建实例
            filename: 'index.html',
            template: path.resolve(__dirname, 'index.html')
        }),
        new VueLoaderPlugin({
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: '',
                },
            ],
        }),
    ],
}