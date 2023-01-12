### 概览：
使用React Native进行客户端App开发，可以用React很方便的开发出兼容Android和ios两个平台的应用。考虑到这是一个新开发的轻量级App，我们会选择纯React Native模式，开发效率、开发成本更有优势。

### 技术选型方案：

- 前端打包发布
1. 准备工作：生成秘钥，项目配置等
2. 生成发行 APK 包，放置服务器。用户点击链接下载

- 开发工具：vscode、安卓手机模拟器、真机/模拟器运行测试代码工具Detox

- 项目工程技术选项：
1. 跨端框架：React Native
2. React Native周边生态：
    - 样式使用css in js，或者tailwind
    - 静态图片、网络图片、Base64图片加载方案，及图片缓存处理
    - 高性能的无限列表组件和瀑布流：开源的RecyclerListView组件
3. 开发语言：JavaScript或者TypeScript
4. 脚手架：使用官方的React Native init，或社区中其他的
5. 包管理：yarn
6. React
    - 状态管理：React自带+Redux
    - react-hook-form+formik管理表单
    - RESTful架构或者GraphQL

- 数据：使用hooks工具：开源react query库+SWR管理请求

- 集成：
1. 使用prettier，代码规范
2. 性能优化
3. 调试：安卓模拟器调试+真机调试
4. 其他用户体验优化：如按钮点击体验、输入框体验

目前版本只考虑适配Android
- 操作系统：Android 10
- 键盘：纯触屏式+导航键
- 显示屏：5.0”HD 1280x720

### 开发中的问题及风险点：
- 组件库自身样式，按UI设计的样式不好改动，或者很耗时
- 地图接入方案，SLD图片
- 前端打包发布问题
- 不同安卓版本适配和兼容问题。可能涉及到技术栈版本的选择
- 项目的登录鉴权方案
- 后续的版本升级和维护问题
