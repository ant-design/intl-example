import ReactDOM from 'react-dom';
import React from 'react';
import App from '../component/App';
import { LocaleProvider } from 'antd';

import { addLocaleData, IntlProvider } from 'react-intl';

const appLocale = window.appLocale;

addLocaleData(appLocale.data);

ReactDOM.render(
  <LocaleProvider locale={appLocale.antd}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <App />
    </IntlProvider>
  </LocaleProvider>,
  document.getElementById('react-content')
);
