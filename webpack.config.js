const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
    entry: {
        main: "./src/front/scripts/main.js",
        editChannel: "./src/front/scripts/editChannel.js",
        upload: "./src/front/scripts/upload.js"
    },
    mode: "development",
    watch: true,
    plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
    module: {
        rules: [{
            test: /\.(js)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                    ]
                }
            },
        }, {
            test: /\.(scss|sass)$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
            ]
        }]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "js/[name].js",
        clean: true
    }
}

module.exports = config;