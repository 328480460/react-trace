var config = require("./webpack.config.js");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

config.entry.app.unshift("webpack/hot/dev-server"); // 启用热替换     
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8099/"); // 热更新监听此地址  

var server = new WebpackDevServer(webpack(config), {
    disableHostCheck: true,
    publicPath: config.output.publicPath, // 本地服务器所加载的页面所在的目录
    stats: {colors: true}, // 终端中输出结果为彩色
    hot: true,  // 使用热加载插件 HotModuleReplacementPlugin
    historyApiFallback: true, // 不跳转
    inline:true,//是否实时刷新，即代码有更改，自动刷新浏览器 
    proxy: {}, // 代理
    hotOnly: false

});
server.listen(8099,function(err,result) {
    console.log('Listening at http://localhost:8099/');
});