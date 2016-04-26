# intl-examples

## Environment

```
node >= 0.12
```

## Code Style

https://github.com/airbnb/javascript

## Develop


```
npm install
npm run dev
```

- Chinese: http://127.0.0.1:8989
- English: http://127.0.0.1:8989/index-en.html

## I18n Support

我们的国际化方案基于 [react-intl v2](https://github.com/yahoo/react-intl/issues/162) 实现，react-intl 是由 yahoo 开发的国际化类库（based on [formatjs](http://formatjs.io/)），具体使用请参考官方文档。

### message 自动提取说明

1. 推荐使用 defaultMessage 作为默认语言，比如中文；另外你也可以增加 description，描述有助于翻译时了解上下文

  ```javascript
  <FormattedMessage
      id="greeting"
      description="见客户时打招呼"
      defaultMessage="你好!"
  />
  ```

2. 有了 defaultMessage 之后，我们就可以自动提取所有的 messages（包括 id，defaultMessage，description）
这个过程时通过 react-intl 官方提供的一个 [babel 插件](https://github.com/yahoo/babel-plugin-react-intl) 完成的。

  提取的命令为：`npm run build:i18n-messages`  
  提取提取之后看到的内容大概是这样的（通常这些内容是给翻译看的）：
  ```
  i18n-messages
  └── src
      └── component
          └── App.json
  ```

  ```javascript
  // App.json
  [
    {
      "id": "greeting",
      "description": "见客户时打招呼",
      "defaultMessage": "你好!"
    }
  ]
  ```

3. 下一步我们可以将这些 messages 合并成 en.js/zh.js 等 locale 文件，这个过程是通过 `./scripts/translate.js` 完成的，具体文件格式大家可以自行修改；

  执行命令：`npm run build:i18n-js`  
  执行后可以看到 locale 目录下：
  ```
  .
  ├── en.js
  └── zh.js
  ```

  来解释下，我们默认的规则是将 defaultMessage 当成中文翻译来使用，也就是说提取出来的中文的 zh.js 应该是这样的：
  ```javascript
  // 该文件由脚本自动生成，请勿修改

  module.exports = {
    "greeting": "你好!"
  }
  ```

  除了默认语言文件，其他的文件比如 en.js，应该都是空值：
  ```javascript
  module.exports = {
    "greeting": ""
  }
  ```

  > 补充一点，如果你修改了 en.js，再次之行 `npm run build:i18n-js` 命令时，会保留你翻译好的值，但是如果你新增了一个 id，但是它在系统中未存在，那么它就会被删掉，也就是说所有的key（id），都会和系统中已经使用的保持一致；

4. 接下来大家就可以根据需求引用需要的 local 了，具体使用这边就不说明了
