const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename: 'index.[fullhash].js'
    },

    module: {
        rules: [
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
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ]
    },
   
    optimization:{
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mi webpack App',
            filename: 'index.html',
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename:'styles.[fullhash].css',
        }),
        new CopyPlugin({
            patterns: [
                {from: './src/assets', to: 'assets'}
            ]
        })
    ],
}