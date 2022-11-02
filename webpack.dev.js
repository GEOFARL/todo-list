const path = require('path');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    }, 
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    {loader: "style-loader"}, 
                    {   
                        loader: "css-loader",
                        options: {
                        esModule: false
                        }
                    }, 
                    {loader: "sass-loader"}
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
    ],
    devServer: {
        hot: true,
        static: './dist'
    },
});