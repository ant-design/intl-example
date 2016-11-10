# antd/antd-mobile 国际化方案

* 国际化方案概述
* 前端国际化详解、举例
* 国际化资源文件管理
* 项目之间、开发者与翻译者之间的协作
* 国际化规范附录
* 扩展阅读

## 国际化方案概述

国际化是一个看似简单，实则非常复杂的领域，实际进行国际化工作时，大家会发现它往往会涉及很多内容：
* 前端国际化
* 服务端国际化
* 国际化资源文件管理
* 项目之间、开发者与翻译者之间如何协作

而且，国际化方案往往与具体的技术栈是绑定的。
本国际化方案仅针对 React 技术栈，且不会涉及服务端国际化内容。

## 前端国际化详解、举例

国际化的核心步骤有两步：

1. 创建资源文件，以 key-value 方式存储
2. 加载资源文件，将页面上 key 的内容替换为相关 value

在这里我们重点看下如何将页面上的 "key" 替换为相关 "value"。
首先，我需要跟大家介绍一个类库 [React Intl](https://github.com/yahoo/react-intl)，我们的国际化方案主要是基于它展开的。
React Intl 是由 yahoo 开发的，针对 React 的国际化类库，基于 Format.js，支持语言、时间、货币等等国际化。

### React Intl 国际化步骤

1. 判断是否需要引入 polyfill 文件
2. 引入 react-intl 的 local data
3. 创建 react-intl 国际化上下文组件
4. 使用 react-intl's components & apis，进行国际化开发

#### polyfill

> React Intl uses and builds on the Internationalization API built-in to JavaScript.

如官方文档提到的那样，JavaScript 有一套国际化标准 API，React Intl 也是基于它的，但是由于 Safari 或者一些旧版本的浏览器不支持，于是我们需要在这些浏览器下引入 polyfill 文件（方式有很多种，参见官方文档）：

```html
<!-- index.en.html -->
<script>
  // 我们这里采用的做法是直接判断 window.Intl 是否存在，从而确定是否要引入 polyfill 文件
  // 下面的 cdn 地址大家可以修改成本地资源文件，或者参考官方文档其他引入方式
  if (!window.Intl) {
    document.writeln('<script src="https://as.alipayobjects.com/g/component/intl/1.0.1/Intl.js">' + '<' + '/script>');
    document.writeln('<script src="https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/en.js">' + '<' + '/script>');
  }
</script>
```

#### 引入 react-intl 的 local data

```javascript
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
addLocaleData(en);
```

react-intl 在做国际化的时候需要一些特有的 local data，主要是进行相对时间翻译时，比如昨天、今天、明天、几分钟前、几个月前之类的。
我们通过 `addLocaleData` 这个方法加载相关内容，大家可以根据实际情况加载需要的 locale-data。

#### 创建 react-intl 国际化上下文组件

为了能够使用 react-intl 进行国际化，跟 redux 这些框架一样，我们需要一个 Provider Component，用它来提供国际化的上下文，具体用法：

```html
ReactDOM.render(
  <IntlProvider
    locale={appLocale.locale}
    messages={appLocale.messages}
    formats={appLocale.formats}
  >
    <Provider store={store}>
      <Routes history={window.appHistory} />
    </Provider>
  </IntlProvider>,
  document.getElementById('__react-content')
);
```

通常一个单页项目只有一个 IntlProvider，当然，IntlProvider 是支持嵌套的。
IntlProvider 有三个入参：
  * locale, <string>, 例如 'zh-CN' 'en-US'
  * messages, <object>, 翻译所需的 key-value 对象
  * formats, <object>, 自定义 format，比如日期格式等自定义

在定义好 `IntlProvider` 之后，我们就可以在页面使用它提供的 api 或者组件来进行国际化了。

#### use react-intl's components & apis

react-intl 提供了丰富的组件和 api 来完成页面部分的国际化，比如：

```html
import './NotFound.less';
import React from 'react';
import Button from 'antd/lib/button';
import { FormattedMessage } from 'react-intl';

const NotFound = () =>
<div className="page-404">
  <div className="page-404-cnt">
    <h1>404</h1>
    <p>
      <FormattedMessage id="page404.message" defaultMessage="未找到该页面" />
    </p>
    <a href="/">
      <Button type="primary" style={{ marginTop: 5 }}>
        <FormattedMessage id="page404.return home" defaultMessage="返回首页" />
      </Button>
    </a>
  </div>
</div>;

export default NotFound;
```

`<FormattedMessage />` 是我们最常用的一个组件，属性包括 `id` `defaultMessage` 等。

React Intl 国际化基本步骤就是这样，详情请查看官方文档。

## 国际化资源文件管理

上面的文档主要讲了在引入资源文件之后，如何进行国际化的步骤，接下来我们来聊下国际化资源文件的管理。

### 国际化资源文件内容
目前我们管理资源文件的方式是在 src/locales 文件夹下(当然，你放在哪里都可以)：
```
.
├── en-US.js
├── en-US.messages.js
├── zh-Hans-CN.js
└── zh-Hans-CN.messages.js
```

\*.messages.js 是我们的资源文件(这里我们采用了 js 格式，你也可以使用 json 等等)，返回的是一个对象，key 为我们翻译用的 id，value 为具体语言的翻译，内容是：
```javascript
module.exports = {
  "sendVerifyCode": "Resend verify code after {count} seconds",
  "resendVerifyCode": "Resend",
  "page404.message": "Not Found",
  "page404.return home": "Return To Home",
  "page500.message": "Server error, please try again."
}
```

en-US.js 文件封装了 messages、locale 等国际化上下文组件需要的内容：
```javascript
import datePickerLocale from 'antd/lib/date-picker/locale/en_US';
import appLocaleData from 'react-intl/locale-data/en';
import messages from './en-US.messages.js';

window.appLocale = {
  // 合并所有 messages，加入 antd 组件的 messages
  messages: Object.assign({}, messages, {
    datePickerLocale,
  }),

  // locale
  locale: 'en-US',

  // react-intl locale-data
  data: appLocaleData,

  // 自定义 formates
  formats: {
    date: {
      normal: {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      },
    },
  },
};
```

有了这些资源文件以及相关的封装之后，我们就可以在 `InltProvider` 中使用了。

### 国际化资源文件自动化生成

上面提到了 \*.messages.js，我们手动维护它们其实是比较麻烦的，对此，我们提供了一种自动化生成 messages 的方式，具体过程是这样的：

1. 约定 defaultMessage 必填，约定其内容就是中文翻译，这样对开发者来说了整个开发过程跟普通写代码并没有太多区别，只是需要使用特定组件来显示文案
2. 页面开发完毕后，执行 `npm run build:i18n-js`，这个时候我们的脚本会做几件事件:
    * 自动生成 zh-Hans-CN.messages.js，将所有的 defaultMessage 作为中文翻译 value
    * 自动生成 en-US.messages.js，默认 value 为空值，如果 value 你修改过，那 merge 的时候会保留用户修改的值
3. 如果你删除了部分国际化代码，执行脚本后，相关的 key-value 会从所有的 messages.js 中删除

### 资源文件的加载

大家可以看到我们根目录下有两个 html 文件：
* index.html
* index-en.html

这么做的主要目的是分开加载资源文件，index.html 加载中文资源文件，index-en.html 加载英文资源文件
这样做的好处不会加载多余的资源文件，性能上也不错，当然麻烦之处在于需要服务端判断显示中文还是英文页面
除此之外，也可以通过 ajax 请求获取资源文件，动态给 `IntlProvider` 传相应的 local data

## 项目之间、开发者与翻译者之间的协作

聊完了具体的国际化，我们来聊一聊国际化相关的协作，这里我就不提供具体的方案了，来说下思路吧。

> Todo

## 国际化规范附录

### React Intl 编写规范
1. 必须填写 defaultMessage，并将 defaultMessage 作为中文翻译
2. id 不得重复
3. 在使用 intl.formatMessage() 时，必须使用 defineMessages，预定义消息

> Todo

## 扩展阅读

* [react-intl](https://github.com/yahoo/react-intl)
* [react-intl-corner-cases](docs/react-intl-corner-cases.md)
