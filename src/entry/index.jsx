import ReactDOM from 'react-dom';
import React from 'react';

import { LocaleProvider, DatePicker, Pagination } from 'antd';

import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl';

const appLocale = window.appLocale;

addLocaleData(appLocale.data);

ReactDOM.render(
  <LocaleProvider locale={appLocale.antd}>
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
      <div>
        <div>
          <FormattedMessage id="app.date-picker.title" defaultMessage="日期选择" />
          <DatePicker />
        </div>
        <div>
          <Pagination showQuickJumper defaultCurrent={2} total={500} />
        </div>
      </div>
    </IntlProvider>
  </LocaleProvider>,
  document.getElementById('react-content')
);
