import '../common/lib';
import App from '../component/App';
import ReactDOM from 'react-dom';
import React from 'react';
import {addLocaleData, IntlProvider} from 'react-intl';

const localePrefix = window.appLocale.slice(0, window.appLocale.indexOf('-'));
addLocaleData(window.ReactIntlLocaleData[localePrefix]);

ReactDOM.render(
  <IntlProvider locale={window.appLocale} messages={window.appRes}>
    <App />
  </IntlProvider>,
  document.getElementById('react-content')
);
