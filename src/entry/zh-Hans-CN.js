import datePickerLocale from 'antd/lib/datepicker/locale/zh_CN';
import appLocaleData from 'react-intl/lib/locale-data/zh';

window.appLocale = {
  locale: 'zh-Hans-CN',
  messages: {
    'app.date-picker.title': '日期选择',
    datePickerLocale,
  },
  data: appLocaleData,
};
