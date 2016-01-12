import datePickerLocale from 'antd/lib/date-picker/locale/zh_CN';
import appLocaleData from 'react-intl/lib/locale-data/zh';
import zhMessages from '../../locale/zh.js';

window.appLocale = {
  messages: Object.assign({}, zhMessages, {
    datePickerLocale,
  }),
  locale: 'zh-Hans-CN',
  data: appLocaleData,
};
