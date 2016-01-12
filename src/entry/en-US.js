import datePickerLocale from 'antd/lib/date-picker/locale/en_US';
import appLocaleData from 'react-intl/lib/locale-data/en';
import enMessages from '../../locale/en.js';

window.appLocale = {
  messages: Object.assign({}, enMessages, {
    datePickerLocale,
  }),
  locale: 'en-US',
  data: appLocaleData,
};
