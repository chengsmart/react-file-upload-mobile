####项目背景

> 为了统一管理前端开发中用到基础工具及函数库，通过构建 ucar-lib 基础库项目来统一进行的发布及版本管理。

---

#### 项目结构说明

```
	.
	├── README.md # readme  文件
	├── build.js # webpack 编译脚本
	├── dist # webpack 打包后文件目录
	│   ├── index.js
	│   └── index.js.map
	├── docs # 帮助文档
	│   └── index
	│       └── index.md
	├── es # typescript打包成ES6 文件目录
	│   └── env
	│       ├── index.d.ts
	│       ├── index.js
	│       └── index.js.map
	├── examples # 使用实例 （待完善通过md 直接生成html）
	│   └── index.html
	├── index.js # 所有模块统一打包后 package.json main 入口文件
	├── index.ts # 所有模块webpack 打包入口文件
	├── lerna.json # lerna 配置文件
	├── package.json # 项目 package.json 文件
	├── packages # 子模块 目录
	│   └── env # 环境检测模块
	│       ├── README.md
	│       ├── dist # 环境检测 webpack 打包文件目录
	│       │   ├── index.js
	│       │   └── index.js.map
	│       ├── es  环境检测 typescript打包ES6文件目录
	│       │   ├── index.d.ts
	│       │   ├── index.js
	│       │   └── index.js.map
	│       ├── index.ts # 环境检测 webpack 入口文件
	│       ├── package-lock.json
	│       ├── package.json
	│       ├── src  # 环境检测 源代码
	│       │   └── index.ts
	│       └── tsconfig.json  # typescript config 文件
	├── serve.js # example 示例html 启动node服务器 预览使用
	├── tsconfig.json  # typescript config 文件
	├── tslint.json
	├── typings  # typescrpit 定义文件
	│   └── index.d.ts
	└── yarn.lock
```

---

#### 开发调试

- 依赖安装

  ```
  npm install &  yarn install
  ```

#### 打包&发布

- 子模块单独发布(以 env 为例)

  1. 修改后子模块代码
  2. 提交 git （git add . && git commit -m '修改内容'）
  3. 在 ucar-lib 根目录下执行命令 `npm run pub-sub`

  > 子模块打包对外发布 @ucarinc/ucar-lib-env

  ```
   git add
   git commit -m "修改内容"
   npm run pub-sub
  ```

- 整包发布 ucar-lib 1. 修改 ucar-lib 项目根目录 package.json version 版本号 2. 执行发布命令`npm publish --registry https://unpm.10101111.com`

      	> 所有模块统一打包一起对外发布 @ucarinc/ucar-lib

  ```
   npm publish --registry  https://unpm.10101111.com
  ```

#### 开发新模块

> 以 jsbridge 为例

1. 在 packages 目录下复制 env，改名字为 jsbridge

2. 调整新模块 package.json name 、版本号、build-ts-all（--outDir） 、keywords

   ```json
   "name": "@ucarinc/ucar-lib-jsbridge",
   "version": "0.0.1",
   "description": "jsbridge基础库(h5与native桥接)",

   "build-ts-all": "tsc -p ./ --outDir ../../es/jsbridge/ -d true", #调整输出es目录为jsbridge

   "keywords": [
       "ucar-lib",
       "jsbridge"
     ],
   ```

3. 安装库独立依赖包 js-base64

   > 子模块和 ucar-lib 都要安装（因为 es 要全局打包，需要在 ucar-lib 把子模块依赖安装进来）

   ```powershell
   npm install js-base64
   npm install @ucarinc/ucar-lib-env@0.0.12
   ```

4. 在 ucar-lib 根目录 index.js index.ts 导出子模块到 ucar-lib 全局包中

   ```js
   export { default as JSBridge } from './es/jsbridge/index';
   ```

5. 在 ucar-lib typings/index.d.ts 完善 jsbridge typescript 的定义文件

   ```js
   export { default as JSBridge } from '../es/jsbridge/index';
   ```

6) 完善 ucar-lib-jsbridge 子模块中 README.md 及 ucar-lib docs 下 jsbridge/index.md

   > 说明：把模块使用方式及调用方式写清楚

7) 在 ucar-lib examples 新增 jsbridge.html 写清楚 script 引入调用方式
