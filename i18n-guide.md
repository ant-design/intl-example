# AntD 国际化方案

* AntD 国际化方案概述
* 前端国际化详解、举例
* 国际化资源文件管理
* 项目之间、开发者与翻译者之间的协作
* AntD 国际化规范附录
* 扩展阅读

# AntD 国际化方案概述

国际化是一个看似简单，实则非常复杂的领域，实际进行国际化工作时，大家会发现它往往会涉及很多内容：
* 前端国际化
* 服务端国际化
* 国际化资源文件管理
* 项目之间、开发者与翻译者之间如何协作

而且，国际化方案往往与具体的技术栈是绑定的，在这里需要申明的是本方案仅针对 React 技术栈，且不会涉及服务端国际化内容。

# 前端国际化详解、举例

国际化的核心步骤有两步：

1. 创建资源文件，以 key-value 方式存储
2. 加载资源文件，将页面上 key 的内容替换为相关 value

在这里我们重点看下如何将页面上的 "key" 替换为相关 "value"。  
首先，我需要跟大家介绍一个类库 [React Intl](https://github.com/yahoo/react-intl)，我们的国际化方案主要是基于它展开的。

### React Intl 国际化

1. polyfill
2. add react-intl locale data
3. add react-intl provider component
4. use react-intl's components & apis

#### polyfill

> React Intl uses and builds on the Internationalization API built-in to JavaScript.

如官方文档提到的那样，JavaScript 有一套国际化标准 API，React Intl 也是基于它的，但是由于 Safari 或者一些旧版本的浏览器不支持，于是我们需要在这些浏览器下引入 polyfill 文件（方式有很多种，参见官方文档）：

```html
<!-- index.en.html -->
<script>
  if (!window.Intl) {
    document.writeln('<script src="https://as.alipayobjects.com/g/component/intl/1.0.1/Intl.js">' + '<' + '/script>');
    document.writeln('<script src="https://as.alipayobjects.com/g/component/intl/1.0.1/locale-data/jsonp/en.js">' + '<' + '/script>');
  }
</script>
```

#### add react-intl locale data

```javascript
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
addLocaleData(en);
```

react-intl 在做国际化的时候需要一些特有的 local data，主要是进行相对时间翻译时，比如昨天、今天、明天、几分钟前、几个月前之类的。  
我们通过 `addLocaleData` 这个方法加载相关内容，大家可以根据实际情况加载需要的 locale-data。

#### add react-intl provider component

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

# 国际化资源文件管理

## 国际化资源文件内容
目前我们管理资源文件的方式是在 src/locales 文件夹下：
```
.
├── en-US.js
├── en-US.messages.js
├── zh-Hans-CN.js
└── zh-Hans-CN.messages.js
```

\*.messages.js 是我们的资源文件，返回的是一个对象，key 为我们翻译用的 id，value 为具体语言的翻译，内容是：
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

## 国际化资源文件自动化生成

正常的开发流程是这样的，比如：

1. 我们在页面中使用了 <FormattedMessage id="sayHello" defaultMessage="你好" />
2. 然后在 zh-Hans-CN.messages.js 中增加这个 id，value 为 "你好"
3. 然后在 en-US.messages.js 中增加这个 id，value 为 "hello"
4. 如果这段代码不需要了，那你需要去 \*.messages.js 文件中删除相关 id

对此，我们提供了一种自动化生成 messages 的方式，具体过程是这样的：

1. 约定 defaultMessage 必填，其内容就是中文翻译，这样对开发者来说了整个开发过程跟普通写代码并没有太多区别，只是需要使用特定组件来显示文案
2. 页面开发完毕后，执行 `npm run build:i18n-js`，这个时候我们的脚本会做几件事件:
    * 自动生成 zh-Hans-CN.messages.js，将所有的 defaultMessage 作为中文翻译 value
    * 自动生成 en-US.messages.js，默认 value 为空值，如果 value 你修改过，那 merge 的时候会保留用户修改的值
3. 如果你删除了部分国际化代码，执行脚本后，相关的 key-value 会从所有的 messages.js 中删除

# 项目之间、开发者与翻译者之间的协作
