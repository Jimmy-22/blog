### TS和JS的区别是什么？有什么优势？

1. 语法层面：Typescript = JavaScript + Type
2. 执行环境层面： 浏览器、Node.js可以直接执行JS，但不能执行TS(Deno可以执行TS)
3. 编译层面：TS有编译阶段，JS没有编译阶段（只有转译阶段和lint阶段）
4. 编写层面：TS更难写一点，但是类型更安全
5. 文档层面：TS的代码写出来就是文档，IDE可以完美提示。JS的提示主要靠TS



### type和interface的区别是什么？

1. 组合方式：interface使用extends来实现继承，type使用&来实现联合类型
2. 扩展方式：interface可以重复声明用来扩展，type一个类型只能声明一次
3. 范围不同：type适用于基本类型，interface一般不行
4. 命名方式：interface会创建新的类型名，type只是创建类型别名

