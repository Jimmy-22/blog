### 前端开发的复杂化

- 开发过程中需要**通过模块化**的方式来开发
- 比如也会使用一些高级特性来加快**开发效率或安全性**，如通过ES6+、TS开发脚本逻辑，通过sass、less编写css样式
- 比如开发过程中，还希望监听文件的变化，并且反应到浏览器上
- 开发完成后还需要将代码进行压缩、合并及其他相关优化

### 前端三个框架的脚手架

- 框架的创建过程都是借助于脚手架CLI的
- Vue-CLI、create-react-app都是基于webpeck来帮助我们支持模块化，less，Typescript，打包优化等

### Webpeck是什么？

webpeck is a static module bundler for modern JavaScript applications

- 打包bundler：webpeck是一个打包工具
- 静态的static：最终可以将代码打包成静态资源，部署到静态服务器
- 模块化：webpeck默认支持各种模块化开发，ES Module、CommonJS、AMD等

### 工作中webpeck

- 在开发Vue、React项目中可能需要一些特殊的配置：比如给某些目录结构起别名，让项目支持sass、less等预处理器，希望在项目中手动添加Typescript支持，都需要配置webpeck
- 希望在原有脚手架上来定制特殊配置提供性能。比如安装性能分析工具，使用gzip压缩代码，引用cdn资源，公共代码抽取等操作，甚至需要编写属于自己的loader和plugin等

webpeck的**安装**分为2个：` webpeck`、`webpeck-cli`，它们之间的关系？

- 执行webpeck命令，会执行`node_module`下`.bin`目录下的webpeck
- webpeck在执行时是依赖webpeck-cli的，如果没有安装就会报错
- 而webpeck-cli中执行代码时，才是真正利用webpeck进行编译和打包的过程
- 所以安装webpeck的同时，要安装webpeck-cli。而第三方脚手架事实上是没有使用webpeck-cli的，而是类似于`vue-service-cli`的东西











### 

