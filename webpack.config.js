const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true,
        filename: 'index.js'
    },

    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: [':data-src'],
            //             // source: false,
            //         }
            //     }
            // },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: [
                    {
                        loader:'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /styles.css$/,
                use:[ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file-loader',
            }
        ]
    },
    
    optimization:{},

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mi webpack App',
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename:'styles.css',
        }),
        new CopyPlugin({
            patterns: [
                {from: './src/assets', to: 'assets'}
            ]
        })
    ],
}