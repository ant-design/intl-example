import '../common/lib';
import App from '../component/App';
import ReactDOM from 'react-dom';
import React from 'react';
import {addLocaleData, IntlProvider} from 'react-intl';

const appLocale = window.appLocale;

addLocaleData(appLocale.data);

ReactDOM.render(
  <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
    <App />
  </IntlProvider>,
  document.getElementById('react-content')
);
