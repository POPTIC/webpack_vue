const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = { // 暴露一个Object对象
    mode: "development",
    entry: './src/index.js',
    output: {
        path: undefined, // 这里没有使用变量解构[]所以path不会出现命名冲突问题
        // path.resolve(__dirname, 'dist') 在生产模式下再指定输出路径
        filename: 'static/js/main.js' // 指定打包输出文件的名称

    },
    module: { // module属性用于定义loader —— loader用于给其他文件类型指定打包规则
        unknownContextCritical : false,
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
            filename: 'index.html',// 指定文件名
            template: path.resolve(__dirname, 'index.html')//引入路径
        }),
        new VueLoaderPlugin({
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public', // 指定要复制的源目录
                    to: '', // 指定复制到输出目录的位置，默认是根目录
                },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        hot: true,
    },
}