const path = require('path');
module.exports = {
    entry: './',
    devtool: 'source-map',
    module: {
        rules: [
            //Typescript loader
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            //SASS LOADER ĐỂ ĐÓNG GÓI CÁC FILE SASS
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    },
                    { loader: "sass-loader" },
                ]
            },

            //CSS LOADER ĐỂ ĐÓNG GÓI CÁC FILE CSS
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" },
                {
                    loader: "css-loader",
                    options: {
                        minimize: true,
                    }
                }],
            },
            //ĐÓNG GÓI HÌNH ẢNH
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "../[path][name].[ext]",
                        limit: 1000,
                    },
                },
            },
        ]
    }, resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};
