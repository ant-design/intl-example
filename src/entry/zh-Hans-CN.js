import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../../locales/cn.json';

window.appLocale = {
  messages: {
    ...zhMessages,
  },
  antd: null,
  locale: 'zh-Hans-CN',
  data: appLocaleData,
};
