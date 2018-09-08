const path = require('path');
module.exports = {
    entry: ['./app/controllers/index.ts'], // Cấu hình file chính để webpack bundle.
    devtool: 'source-map',
    module: {
        rules: [
            //TS LOADER ĐỂ ĐÓNG GÓI CÁC FILE TYPESCRIPT
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
                    }
                ],
            },
            //ĐÓNG GÓI HÌNH ẢNH
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "../[path][name].[ext]",
                        limit: 1000, // Đóng gói những file dưới 1MB
                    },
                },
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js', //File đầu ra 
        path: path.resolve(__dirname, 'dist') // chứa trong dist
    },
};