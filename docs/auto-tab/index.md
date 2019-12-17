### @ucarinc/ucar-lib-env

> 前端开发需要对系统环境、UA、浏览器环境检测，此工具主要实现以上三种环境检测。

---

#### install

```powershell
npm install @ucarinc/ucar-lib-env --registry  https://unpm.10101111.com
```

---

#### 使用说明

- ES6 单独引用-语法使用 - 示例代码：

  ````js
  ;

  境
  ;

  境
  ;

  境
  ;
  `

  ：

  ```json
  {"name":"Chrome","isChrome":true,"version":"72.0.3626.109"}
  {"appname":"unknown"}
  {"name":"Android","isAndroid":true,"version":"4.1"}
  ````

- ES6 全部引用-语法使用 - 示例代码：

      		```js
      		import { Env } from '@ucarinc/ucar-lib';

      		// 浏览器环境
      		console.log(`Env.getBrowserInfo:${JSON.stringify(Env.getBrowserInfo())}`);

      		// UA 环境
      		console.log(`getAppInfo:${JSON.stringify(Env.getAppInfo())}`);

      		// 系统环境
      		console.log(`getAppInfo:${JSON.stringify(Env.getOSInfo())}`);
      		```

      	- 实际输出：

      		```json
      		{"name":"Chrome","isChrome":true,"version":"72.0.3626.109"}
      		{"appname":"unknown"}
      		{"name":"Android","isAndroid":true,"version":"4.1"}
      		```

- 浏览器单独引入-语法使用 - 示例代码：

      		```html
      		<!DOCTYPE html>
      		<html lang="en">

      		<head>
      			<meta charset="UTF-8">
      			<meta name="viewport" content="width=device-width, initial-scale=1.0">
      			<meta http-equiv="X-UA-Compatible" content="ie=edge">
      			<title>Document</title>
      		</head>

      		<body>
      			<div id="http-result"></div>
      			<div id="push-result"></div>
      			<button class="network-btn" id="http-btn">测试env</button>

      			<script src="../packages/env/dist/index.js"></script>
      			<script>
      				var pushResult = document.querySelector('#push-result');
      				var httpResult = document.querySelector('#http-result');
      				var httpBtn = document.querySelector('#http-btn');
      				httpBtn.addEventListener('click', function () {

      					var browserInfo = UCAR_LIB_ENV.getBrowserInfo();

      					httpResult.innerHTML = `${JSON.stringify(browserInfo)}`;

      				});
      			</script>
      		</body>

      		</html>
      		```

      	- 实际输出：

  ```json
  { "name": "Chrome", "isChrome": true, "version": "72.0.3626.109" }
  ```

- 浏览器全部引入-语法使用 - 示例代码：

      		```html
      		<!DOCTYPE html>
      		<html lang="en">

      		<head>
      			<meta charset="UTF-8">
      			<meta name="viewport" content="width=device-width, initial-scale=1.0">
      			<meta http-equiv="X-UA-Compatible" content="ie=edge">
      			<title>Document</title>
      		</head>

      		<body>
      			<div id="http-result"></div>
      			<div id="push-result"></div>
      			<button class="network-btn" id="http-btn">测试env</button>

      			<script src="../dist/index.js"></script>
      			<script>
      				var pushResult = document.querySelector('#push-result');
      				var httpResult = document.querySelector('#http-result');
      				var httpBtn = document.querySelector('#http-btn');
      				httpBtn.addEventListener('click', function () {

      					var browserInfo = UCAR_LIB.Env.getBrowserInfo();

      					httpResult.innerHTML = `${JSON.stringify(browserInfo)}`;

      				});
      			</script>
      		</body>
      		</html>
      		```

      	- 实际输出：

  ```json
  { "name": "Chrome", "isChrome": true, "version": "72.0.3626.109" }
  ```
