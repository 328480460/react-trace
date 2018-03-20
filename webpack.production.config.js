var path = require("path");
var webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");



module.exports = {
  devtool: "source-map",
  entry: {
    app: ["./src/index.js"],
    // 引用的库单独打包，公共js打包到vendor中
    react: ["react"],
    reactDom: ["react-dom"],
    reactRouter: ['react-router'],
    reactRouterDom: ["react-router-dom"],
    redux: ['redux'],
    reactRedux: ['react-redux'],
    // vendor: [] // 提取公共js的名字
  },
  output: {
    filename: "[name].[chunkhash:5].js",
    publicPath: "",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader", // 编译es6 jsx
          options: {
            //babel的配置参数，可以写在.babelrc文件里也可以写在这里
            presets: ["env", "react", "stage-0"]
          }
        },
        exclude: /node_modules/ // 不匹配 node_modules文件夹下的文件
      },
      {
        test: /\.(css|less)$/, // 处理less css 自动添加前缀后 并单独打包
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader", // 使用postcss-loader时, 调用autoprefixer插件，自动补全
              options: {
                plugins: () => [require("autoprefixer")]
              }
            },
            {
              loader: "less-loader"
            }
          ]
        }),
        exclude: /node_modules/
      },
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/], // 图片loader
        use: {
          loader: "url-loader",
          options: {
            limit: 5000 //5k以下大小的图片会自动转成base64
          }
        },
        exclude: /node_modules/
      },
      {
        test: [/\.woff$/, /\.woff2?$/, /\.svg$/, /\.ttf$/, /\.eot$/], // 字体文件loader
        use: {
          loader: "url-loader",
          options: {
            limit: 5000 //5k字节以下大小的图片会自动转成base64
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // 指定当前为生成环境 DefinePlugin插件生成的变量可以在全局使用
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 指定模板
      filename: "index.html", // 指定文件名
      inject: "body", // 插入文件的位置
      hash: true // 在生成的文件后面增加一个hash，防止缓存
    }),

    // 压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),

    // 分离出来的css样式
    new ExtractTextWebpackPlugin("[name].[hash:5].css"),

    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "[name].[chunkhash:5].js"
    })
  ]
};

