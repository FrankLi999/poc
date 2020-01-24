const path    = require("path"),
      webpack = require("webpack");

module.exports = {

    entry: {
        "app": "./src/main.ts"
    },

    resolve: {
        modules: ["dist", "node_modules"]
    },

    output: {

        path: path.resolve(__dirname, "./sample/dist"),

        filename: "bundle.js"
    },

    //devtool: "source-map",

    plugins: [

        new webpack.optimize.UglifyJsPlugin({

            sourceMap: false,

            mangle: {
                //except: ['customValidator']
            }
        })
    ]
};