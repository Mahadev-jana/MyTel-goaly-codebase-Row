const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        hot: true,
        disableHostCheck: true
        // host: '0.0.0.0',
        // port: 8080
    }
});