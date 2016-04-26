import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../../locale/zh.js';

window.appLocale = {
  messages: {
    ...zhMessages,
  },
  antd: null,
  locale: 'zh-Hans-CN',
  data: appLocaleData,
};
