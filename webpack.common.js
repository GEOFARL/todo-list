const path = require("path");

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.html/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(svg|png|jpeg|jpg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs",
                        esModule: false,
                    }
                }
            }
        ]
    }
}