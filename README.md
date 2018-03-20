# webpack-config

这是一个webpack基本配置文件，使用npm start 来启动项目， npm run build 打包项目

几点说明：
1. 适用于spa项目开发，如果需要多页面开发，请参照webpack的多入口配置
2. 项目中配置webpack-dev-server， 对于react项目实现热替换（js和css），但是并没有集成react-hot-loader，来保存state,
   有需要可参照相应文档进行配置https://www.npmjs.com/package/react-hot-loader， 针对非 react项目，可以实现自动刷新。
3. 默认使用less来预处理css，并使用了postcss-loader中autoprefixer插件来自动补全前缀，如要使用其他css预处理器，请参照相应的说明文档
   或者参照项目中less-loader的配置方式进行配置
4. 项目打包时，css会单独进行打包，js可以单独打包公共库和公共js（需要进行配置），也可以不进行单独打包
5. 项目运行时自动打开浏览器 ，默认地址为 localhost:8099 可以自行修改





本项目并未做代码分离，编译时间优化等操作，完全以能用作为主

使用时，请参照自己的项目的结构和编译打包需求进行修改
