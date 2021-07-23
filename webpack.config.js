const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const ENTRY_FILE = path.join(__dirname, "src", "front", "scripts", "main.js");
const OUTPUT_DIR = path.join(__dirname, "src", "static");

const config = {
    entry: ENTRY_FILE,
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
        filename: "scripts/main.js",
        clean: true
    }
}

module.exports = config;